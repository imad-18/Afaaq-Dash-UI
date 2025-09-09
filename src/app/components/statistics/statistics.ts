import {Component, EventEmitter, inject, OnInit, Output} from '@angular/core';
import {NzIconModule} from 'ng-zorro-antd/icon';
import {NzDropDownModule} from 'ng-zorro-antd/dropdown';
import {CampaignService} from '../../services/campaign.service';
import {Campaign} from '../../models/Campaign';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {NzFlexModule} from 'ng-zorro-antd/flex';
import {NzSpaceModule} from 'ng-zorro-antd/space';
import {Activity} from '../../models/Activity';
import {ActivityService} from '../../services/activity.service';
import {NzTabsModule} from 'ng-zorro-antd/tabs';
import {NzTableComponent} from 'ng-zorro-antd/table';
import {FormArray, FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {StatisticService} from '../../services/statistic.service';
import {Statistic} from '../../models/Statistic';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-statistics',
  imports: [
    NzButtonModule, NzDropDownModule, NzFlexModule, NzIconModule, NzSpaceModule, NzTabsModule, NzTableComponent, ReactiveFormsModule, DatePipe
  ],
  templateUrl: './statistics.html',
  styleUrl: './statistics.css'
})
export class Statistics implements OnInit {

  private campaignService = inject(CampaignService);
  private activityService = inject(ActivityService);
  private statisticService = inject(StatisticService);
  private fb = inject(FormBuilder);

  campaigns!: Campaign[];
  activities!: Activity[];
  statistics!: Statistic[];

  isVisible: boolean = false;

  statisticForm!: FormGroup;

  // step 2: Track which item is selected (campaign or activity)
  selectedItem: any = null;

  // step 3: Check if statistics exist for the selected item
  hasStatistics: boolean = false;

  ngOnInit() {
    this.loadData();
    this.loadStatistics();

    this.statisticForm = this.fb.group({
      yearEdition: [''],        // Date input
      attributes: this.fb.array([]) // Dynamic attributes array
    });
  }

  private async loadStatistics() {
    this.statistics = await this.statisticService.getAllStatistics();
    console.log("Statistics from backend:", this.statistics);
  }

  loadData() {
    this.campaignService.getAllCampaigns().then(data => {
      this.campaigns = data;
    });

    this.activityService.getAllActivities().then(data => {
      this.activities = data;
    });
  }


  onSelectedItem(item: any) {
    this.selectedItem = item;

    // Check if statistics exist for this item.
    // Assuming your Campaign/Activity object has a property `statistics`
    this.hasStatistics = item.statistics && item.statistics.length > 0;
  }

  openStatisticForm() {
    this.isVisible = true;
  }



  // ✅ Getter for attributes array
  get attributes(): FormArray {
    return this.statisticForm.get('attributes') as FormArray;
  }

  // ✅ Add new attribute row
  addAttribute(): void {
    const attrGroup = this.fb.group({
      attributeName: [''],
      attributeValue: ['']
    });
    this.attributes.push(attrGroup);
  }

  // ✅ Remove attribute row
  removeAttribute(index: number): void {
    this.attributes.removeAt(index);
  }

  // ✅ Handle form submission
  onSubmit(): void {
    if (this.statisticForm.valid && this.selectedItem) {
      const payload = {
        yearEdition: this.statisticForm.value.yearEdition,
        compaign: { id: this.selectedItem.id },  // link to campaign
        attributes: this.statisticForm.value.attributes
      };

      //console.log('Payload to backend:', payload);

      this.statisticService.createStatisticFct(payload)
        .then((res) => {
          //console.log('Statistic saved successfully:', res);

          // update local list immediately
          this.addStatisticToList(res);

          // reset or hide form
          this.isVisible = false;
          this.statisticForm.reset();
          this.attributes.clear();
        })
        .catch((err) => {
          console.error('Error saving statistic:', err);
        });

    }
  }

  cancelStatisticForm() {
    this.isVisible = false;
  }

  /* ----- Tab1 ----- */
  /*getStatisticsForCampaign(campaignId: number) {
    if (!this.statistics) return []; // nothing loaded yet
    return this.statistics.filter(s => s.compaignId === campaignId);
  }*/


  /*update the stat tables (in tabs 1 & 2) without refresh*/
  addStatisticToList(newStat: Statistic) {
    //Since I already know the campaign (from selectedItem),
    // I can manually inject 'compaignId' and 'compaignTitle':
    newStat.compaignId = this.selectedItem.id;
    newStat.compaignTitle = this.selectedItem.title;

    this.statistics = [...this.statistics, newStat];
  }

  /*delete stat by id method*/
  deleteStatistic(id: number | undefined) {
    if (confirm("Are you sure you want to delete this statistic?")) {
      this.statisticService.deleteStatistic(id).then(() => {
        // filter out deleted stat from the list -to auto update the stat table without refresh-
        this.statistics = this.statistics.filter(stat => stat.id !== id);
      }).catch(err => {
        console.error("Error deleting statistic:", err);
      });
    }
  }
}
