import {Component, inject, OnInit} from '@angular/core';
import {NzIconModule} from 'ng-zorro-antd/icon';
import {NzDropDownModule} from 'ng-zorro-antd/dropdown';
import {CampaignService} from '../../services/campaign.service';
import {Campaign} from '../../models/Campaign';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {NzFlexModule} from 'ng-zorro-antd/flex';
import {NzSpaceModule} from 'ng-zorro-antd/space';
import {Activity} from '../../models/Activity';
import {ActivityService} from '../../services/activity.service';
import {NzTabComponent, NzTabsComponent, NzTabsModule} from 'ng-zorro-antd/tabs';
import {NzTableComponent} from 'ng-zorro-antd/table';
import {FormArray, FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {of} from 'rxjs';

@Component({
  selector: 'app-statistics',
  imports: [
    NzButtonModule, NzDropDownModule, NzFlexModule, NzIconModule, NzSpaceModule, NzTabsModule, NzTableComponent, ReactiveFormsModule
  ],
  templateUrl: './statistics.html',
  styleUrl: './statistics.css'
})
export class Statistics implements OnInit {
  log(): void {
    console.log('click dropdown button');
  }

  private campaignService = inject(CampaignService);
  private activityService = inject(ActivityService);
  private fb = inject(FormBuilder);

  campaigns!: Campaign[];
  activities!: Activity[];
  filteredList: any[] = [];

  isVisible: boolean = false;

  statisticForm!: FormGroup;

  selectedType: 'campaigns' | 'activities' | null = null;

  // step 2: Track which item is selected (campaign or activity)
  selectedItem: any = null;

  // step 3: Check if statistics exist for the selected item
  hasStatistics: boolean = false;

  ngOnInit() {
    this.loadData();

    // ✅ Initialize form once
    this.statisticForm = this.fb.group({
      attributes: this.fb.array([]) // empty initially
    });
  }

  loadData() {
    this.campaignService.getAllCampaigns().then(data => {
      this.campaigns = data;
    });

    this.activityService.getAllActivities().then(data => {
      this.activities = data;
    });
  }

  /*onSelectType(type: 'campaigns' | 'activities') {
    this.selectedType = type;
    this.filteredList = type === 'campaigns' ? this.campaigns : this.activities;

    this.selectedItem = null;   // reset when switching type
    this.hasStatistics = false; // reset as well
  }*/

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
    if (this.statisticForm.valid) {
      console.log('Saving statistic for:', this.selectedItem);
      console.log('Attributes:', this.statisticForm.value.attributes);

      // Example payload to backend
      const payload = {
        itemId: this.selectedItem.id,
        attributes: this.statisticForm.value.attributes
      };

      // TODO: call your statisticsService.saveStatistic(payload)
      this.isVisible = false; // hide form after saving
      this.statisticForm.reset(); // clear the form
      this.attributes.clear();    // clear form array
    }
  }

  protected readonly of = of;

  cancelStatisticForm() {
    this.isVisible = false;
  }
}
