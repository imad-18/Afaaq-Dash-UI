import {Component, inject, OnInit} from '@angular/core';
import {NgForOf} from '@angular/common';
import {CampaignService} from '../../services/campaign.service';
import {Campaign} from '../../models/Campaign';
import {NzTableComponent} from 'ng-zorro-antd/table';

@Component({
  selector: 'app-campaigns',
  imports: [
    NgForOf,
    NzTableComponent
  ],
  templateUrl: './campaigns.html',
  styleUrl: './campaigns.css'
})
export class Campaigns implements OnInit {

  private campaignService = inject(CampaignService);

  campaigns!: Campaign[];

  ngOnInit(): void {
    this.initCampaigns();
  }

  private async initCampaigns(): Promise<void> {
    this.campaigns = await this.campaignService.getAllCampaigns();
  }

}
