import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NzFormControlComponent, NzFormItemComponent, NzFormLabelComponent} from 'ng-zorro-antd/form';
import {NzColDirective} from 'ng-zorro-antd/grid';
import {CampaignService} from '../../../services/campaign.service';
import {Campaign} from '../../../models/Campaign';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {NzMessageService} from 'ng-zorro-antd/message';
import {NzUploadChangeParam, NzUploadComponent, NzUploadFile} from 'ng-zorro-antd/upload';
import {NzIconDirective} from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-create-campaign',
  imports: [
    ReactiveFormsModule,
    NzFormItemComponent,
    NzFormLabelComponent,
    NzFormControlComponent,
    FormsModule,
    NzColDirective,
    NzButtonComponent,
    NzUploadComponent,
    NzIconDirective
  ],
  templateUrl: './create-campaign.html',
  styleUrl: './create-campaign.css'
})
export class CreateCampaign implements OnChanges {
  @Input() campaign: Campaign | null = null;
  @Output() close = new EventEmitter<void>();
  @Output() created = new EventEmitter<Campaign>();
  @Output() updated = new EventEmitter<Campaign>();

  formCampaign: Campaign = {
    id: 0,
    title: '',
    description: '',
    imagesPath: []
  };

  fileList2: NzUploadFile[] = [];

  constructor(
    private campaignService: CampaignService,
    private message: NzMessageService
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['campaign'] && this.campaign) {
      // Edit mode
      this.formCampaign = { ...this.campaign };
      this.fileList2 = this.campaign.imagesPath.map((path, index) => ({
        uid: `${index}`,
        name: path.split('/').pop() || `image-${index}`,
        status: 'done',
        url: `http://localhost:8080${path}`
      }));
    } else if (changes['campaign'] && !this.campaign) {
      // Create mode
      this.formCampaign = { id: 0, title: '', description: '', imagesPath: [] };
      this.fileList2 = [];
    }
  }

  /**
   * Called before upload — return false to prevent auto-upload
   */
  beforeUpload = (file: NzUploadFile): boolean => {
    this.fileList2 = [file]; // only one image allowed
    return false; // ❌ prevents auto-upload
  };

  /**
   * Manual submit logic
   */
  async onSubmit() {
    if (this.fileList2.length === 0) {
      this.message.warning('Please select an image before submitting');
      return;
    }

    try {
      // 1️⃣ Upload image manually first
      const file = this.fileList2[0] as any; // the selected file
      const uploadResponse = await this.campaignService.uploadFile(file as File).toPromise();

      if (!uploadResponse?.fileUrl) {
        this.message.error('Image upload failed');
        return;
      }

      // 2️⃣ Update formCampaign with image URL from backend
      this.formCampaign.imagesPath = [uploadResponse.fileUrl];

      // 3️⃣ Create or update campaign
      if (this.campaign) {
        const updated = await this.campaignService.updateCampaignFct(this.formCampaign);
        console.log("updated success... "+updated);
        this.updated.emit(updated);
        this.message.success('Campaign updated successfully');
      } else {
        const created = await this.campaignService.createCampaignFct(this.formCampaign);
        this.created.emit(created);
        this.message.success('Campaign created successfully');
      }

      this.close.emit();
    } catch (error) {
      console.error('Error during submission:', error);
      this.message.error('Failed to save campaign');
    }
  }

  onCancel() {
    this.close.emit();
  }
}
