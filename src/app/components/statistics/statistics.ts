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

@Component({
  selector: 'app-statistics',
  imports: [
    NzButtonModule, NzDropDownModule, NzFlexModule, NzIconModule, NzSpaceModule, NzTabsModule, NzTableComponent
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

  campaigns!: Campaign[];
  activities!: Activity[];
  filteredList: any[] = [];

  selectedType: 'campaigns' | 'activities' | null = null;

  // step 2: Track which item is selected (campaign or activity)
  selectedItem: any = null;

  // step 3: Check if statistics exist for the selected item
  hasStatistics: boolean = false;

  ngOnInit() {
    this.loadData();
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

}
