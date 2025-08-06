import {Component, effect, inject, OnInit} from '@angular/core';
import {NgForOf} from '@angular/common';
import {CampaignService} from '../../services/campaign.service';
import {Campaign} from '../../models/Campaign';
import {NzTableComponent} from 'ng-zorro-antd/table';
import {NzCarouselComponent, NzCarouselContentDirective} from 'ng-zorro-antd/carousel';
import {NzCardComponent} from 'ng-zorro-antd/card';
import {NzColDirective, NzRowDirective} from 'ng-zorro-antd/grid';

@Component({
  selector: 'app-campaigns',
  imports: [
    NgForOf,
    NzTableComponent,
    NzCarouselComponent,
    NzCarouselContentDirective,
    NzCardComponent,
    NzRowDirective,
    NzColDirective
  ],
  templateUrl: './campaigns.html',
  styleUrl: './campaigns.css'
})
export class Campaigns implements OnInit {
  array = [1, 2, 3, 4];
  effect = 'scrollx';

  private campaignService = inject(CampaignService);

  campaigns!: Campaign[];

  ngOnInit(): void {
    this.initCampaigns();
  }

  private async initCampaigns(): Promise<void> {
    this.campaigns = await this.campaignService.getAllCampaigns();
  }

}
