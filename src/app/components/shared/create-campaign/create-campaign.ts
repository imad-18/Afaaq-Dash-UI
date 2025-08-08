import {Component, EventEmitter, Output} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NzFormControlComponent, NzFormItemComponent, NzFormLabelComponent} from 'ng-zorro-antd/form';
import {NzColDirective} from 'ng-zorro-antd/grid';
import {CampaignService} from '../../../services/campaign.service';
import {Campaign} from '../../../models/Campaign';
import {NzButtonComponent} from 'ng-zorro-antd/button';

@Component({
  selector: 'app-create-campaign',
  imports: [
    ReactiveFormsModule,
    NzFormItemComponent,
    NzFormLabelComponent,
    NzFormControlComponent,
    FormsModule,
    NzColDirective,
    NzButtonComponent
  ],
  templateUrl: './create-campaign.html',
  styleUrl: './create-campaign.css'
})
export class CreateCampaign {
  @Output() close = new EventEmitter<void>();
  @Output() created = new EventEmitter<Campaign>();

  campaign: Campaign = {
    id: 0,
    title: '',
    description: '',
    imagesPath: []
  };

  imagesInput: string = '';

  constructor(private campaignService: CampaignService) {}

  async onSubmit() {
    // Convert comma-separated input into array
    if (this.imagesInput.trim()) {
      this.campaign.imagesPath = this.imagesInput.split(',').map(img => img.trim());
    }

    try {
      const createdCampaign = await this.campaignService.createCampaignFct(this.campaign);
      console.log('Campaign created successfully', createdCampaign);

      // ✅ Tell parent to add this new campaign
      this.created.emit(createdCampaign);

      // Reset form after submit
      this.campaign = { id: 0, title: '', description: '', imagesPath: [] };
      this.imagesInput = '';
    } catch (error) {
      console.error('Error creating campaign:', error);
    }
  }



  onCancel() {
    this.close.emit(); // just tell parent to close
  }
}
