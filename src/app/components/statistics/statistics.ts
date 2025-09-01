import {Component, inject, OnInit} from '@angular/core';
import {NzIconDirective, NzIconModule} from 'ng-zorro-antd/icon';
import {NzDropDownDirective, NzDropdownMenuComponent, NzDropDownModule} from 'ng-zorro-antd/dropdown';
import {CampaignService} from '../../services/campaign.service';
import {Campaign} from '../../models/Campaign';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {NzFlexModule} from 'ng-zorro-antd/flex';
import {NzSpaceModule} from 'ng-zorro-antd/space';
import {Activity} from '../../models/Activity';
import {ActivityService} from '../../services/activity.service';

@Component({
  selector: 'app-statistics',
  imports: [
    NzButtonModule, NzDropDownModule, NzFlexModule, NzIconModule, NzSpaceModule
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

  onSelectType(type: 'campaigns' | 'activities') {
    this.selectedType = type;
    this.filteredList = type === 'campaigns' ? this.campaigns : this.activities;
  }

}
