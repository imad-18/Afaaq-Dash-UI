import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
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
export class CreateCampaign implements OnChanges{
  @Input() campaign: Campaign | null = null; // null = create mode
  @Output() close = new EventEmitter<void>();
  @Output() created = new EventEmitter<Campaign>();
  @Output() updated = new EventEmitter<Campaign>();

  formCampaign: Campaign = {
    id: 0,
    title: '',
    description: '',
    imagesPath: []
  };

  imagesInput: string = '';

  //Service injection
  constructor(private campaignService: CampaignService) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['campaign'] && this.campaign) {
      // Fill form when campaign is provided for update
      this.formCampaign = { ...this.campaign };
      this.imagesInput = this.campaign.imagesPath.join(', ');
    } else if (changes['campaign'] && !this.campaign) {
      // Reset form for create mode
      this.formCampaign = { id: 0, title: '', description: '', imagesPath: [] };
      this.imagesInput = '';
    }
  }

  async onSubmit() {
    // Convert comma-separated input into array
    if (this.imagesInput.trim()) {
      this.formCampaign.imagesPath = this.imagesInput.split(',').map(img => img.trim());
    }

    // create-update-campaign
    try {
      if (this.campaign){
        // UPDATE Mode
        const updatedCampaign = await this.campaignService.updateCampaignFct(this.formCampaign);
        this.updated.emit(updatedCampaign);
      }else {
        // CREATE Mode
        const createdCampaign = await this.campaignService.createCampaignFct(this.formCampaign);
        this.created.emit(createdCampaign); // ✅ Tell parent to add this new campaign
      }
      this.close.emit(); // Close form on submit 4 both modes

    } catch (error) {
      console.error('Error creating campaign:', error);
    }
  }


  // handle cancel form
  onCancel() {
    this.close.emit(); // just tell parent to close
  }
}
