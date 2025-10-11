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
  fileList2: NzUploadFile[] = [];

  //Service injection
  constructor(private campaignService: CampaignService,
              private message: NzMessageService
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['campaign'] && this.campaign) {
      // Fill form when campaign is provided for update
      this.formCampaign = { ...this.campaign };

      // Initialize fileList2 with existing images for edit mode
      this.fileList2 = this.campaign.imagesPath.map((path, index) => ({
        uid: `${index}`,
        name: path.split('/').pop() || `image-${index}`,
        status: 'done',
        url: `http://localhost:8080${path}`,
        response: { filePath: path } // Store original path
      } as NzUploadFile));
    } else if (changes['campaign'] && !this.campaign) {
      // Reset form for create mode
      this.formCampaign = { id: 0, title: '', description: '', imagesPath: [] };
      this.imagesInput = '';
      this.fileList2 = []; // Clear file list
    }
  }

  handleUploadChange(info: NzUploadChangeParam): void {
    console.log('Upload change:', info); // Debug log

    const fileList = [...info.fileList];

    // Update file list
    this.fileList2 = fileList;

    // Extract uploaded file paths from successful uploads
    const uploadedPaths = fileList
      .filter(file => file.status === 'done' && file.response?.filePath)
      .map(file => file.response.filePath);

    // Keep existing paths and add new ones
    const existingPaths = this.formCampaign.imagesPath.filter(path =>
      fileList.some(file =>
        (file.response?.filePath === path) ||
        (file.url && file.url.includes(path))
      )
    );

    // Merge and remove duplicates
    this.formCampaign.imagesPath = [...new Set([...existingPaths, ...uploadedPaths])];

    console.log('Updated imagesPath:', this.formCampaign.imagesPath); // Debug log

    // Handle upload status messages
    if (info.file.status === 'done') {
      this.message.success(`${info.file.name} uploaded successfully`);
    } else if (info.file.status === 'error') {
      this.message.error(`${info.file.name} upload failed.`);
      console.error('Upload error:', info.file.error);
    }
  }

  // Handle file removal
  handleRemove = (file: NzUploadFile): boolean => {
    console.log('Removing file:', file); // Debug log

    // Get the file path from response or URL
    let filePath = file.response?.filePath;

    if (!filePath && file.url) {
      // Extract path from URL (e.g., http://localhost:8080/uploads/images/xxx.jpg -> /uploads/images/xxx.jpg)
      const urlObj = new URL(file.url);
      filePath = urlObj.pathname;
    }

    if (filePath) {
      this.formCampaign.imagesPath = this.formCampaign.imagesPath.filter(
        path => path !== filePath
      );
      console.log('Updated imagesPath after removal:', this.formCampaign.imagesPath);
    }

    return true;
  };

  async onSubmit() {
    // Convert comma-separated input into array
    /*if (this.imagesInput.trim()) {
      this.formCampaign.imagesPath = this.imagesInput.split(',').map(img => img.trim());
    }*/

    // Validate that at least one image is uploaded (optional)
    if (this.formCampaign.imagesPath.length === 0) {
      this.message.warning('Please upload at least one image');
      return;
    }

    // create-update-campaign
    try {
      if (this.campaign){
        // UPDATE Mode
        const updatedCampaign = await this.campaignService.updateCampaignFct(this.formCampaign);
        this.updated.emit(updatedCampaign);
        this.message.success('Campaign updated successfully');
      }else {
        // CREATE Mode
        const createdCampaign = await this.campaignService.createCampaignFct(this.formCampaign);
        this.created.emit(createdCampaign); // ✅ Tell parent to add this new campaign
        this.message.success('Campaign created successfully');
      }
      this.close.emit(); // Close form on submit 4 both modes

    } catch (error) {
      console.error('Error saving campaign:', error);
      this.message.error('Failed to save campaign');
    }
  }


  // handle cancel form
  onCancel() {
    this.close.emit(); // just tell parent to close
  }
}
