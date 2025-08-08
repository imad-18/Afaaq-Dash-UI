import {Component, effect, inject, OnInit} from '@angular/core';
import {NgForOf} from '@angular/common';
import {CampaignService} from '../../services/campaign.service';
import {Campaign} from '../../models/Campaign';
import {NzTableComponent} from 'ng-zorro-antd/table';
import {NzCarouselComponent, NzCarouselContentDirective} from 'ng-zorro-antd/carousel';
import {NzCardComponent} from 'ng-zorro-antd/card';
import {NzColDirective, NzRowDirective} from 'ng-zorro-antd/grid';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon'
import {CreateCampaign} from '../shared/create-campaign/create-campaign';


@Component({
  selector: 'app-campaigns',
  imports: [
    NgForOf,
    NzTableComponent,
    NzCarouselComponent,
    NzCarouselContentDirective,
    NzCardComponent,
    NzRowDirective,
    NzColDirective,
    NzButtonModule,
    NzIconModule,
    CreateCampaign
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

  // Update campaign
  async updateCampaign(campaign: Campaign) {
    try {
      await this.campaignService.updateCampaignFct(campaign);
      alert('Campaign updated successfully!');
      this.campaignService.getAllCampaigns(); // Refresh list
    }catch (error) {
      console.error('Error updating campaign:', error);
      alert('Failed to update the campaign.');
    }
  }

  async deleteCampaign(campaign: Campaign) {
    try {
      await this.campaignService.deleteCampaignFct(campaign);
      // Remove the deleted campaign from the local array
      this.campaigns = this.campaigns.filter(c => c.id !== campaign.id);
    } catch (error) {
      console.error('Error deleting campaign:', error);
    }
  }



  /*added recently -not fixed yet-*/
  formVisible = false;
  selectedCampaign: Campaign | null = null;

  openCreateForm() {
    this.selectedCampaign = null;
    this.formVisible = true;
  }

  openUpdateForm(campaign: Campaign) {
    this.selectedCampaign = campaign;
    this.formVisible = true;
  }

  closeForm() {
    this.formVisible = false;
  }

  async onFormSaved() {
    this.formVisible = false;
    await this.initCampaigns(); // refresh list
  }
}
