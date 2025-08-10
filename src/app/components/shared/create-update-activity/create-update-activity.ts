import {Component, EventEmitter, inject, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {NzButtonComponent} from "ng-zorro-antd/button";
import {NzColDirective, NzRowDirective} from "ng-zorro-antd/grid";
import {NzFormControlComponent, NzFormItemComponent, NzFormLabelComponent} from "ng-zorro-antd/form";
import {Activity} from '../../../models/Activity';
import {ActivityService} from '../../../services/activity.service';

@Component({
  selector: 'app-create-update-activity',
  imports: [
    FormsModule,
    NzButtonComponent,
    NzColDirective,
    NzFormControlComponent,
    NzFormItemComponent,
    NzFormLabelComponent,
    NzRowDirective
  ],
  templateUrl: './create-update-activity.html',
  styleUrl: './create-update-activity.css'
})
export class CreateUpdateActivity implements OnChanges{
  private activityService = inject(ActivityService);

  @Input() activity: Activity | null = null; // null = create mode
  @Output() close = new EventEmitter<void>();
  @Output() updated = new EventEmitter<Activity>();
  @Output() created = new EventEmitter<Activity>();

  formActivity: Activity = {
    id: 0,
    title: '',
    description: '',
    albums: [],
    category: '',
    duration: '',
    effective: 0,
    feedback: '',
    goals: [],
    iconPath: '',
    launchDate: '',
    location: ''
  };

  albumsInput: string = '';
  gaolsInput: string = '';


  ngOnChanges(changes: SimpleChanges): void {
    if (changes['activity'] && this.activity) {
      // Fill form when activity is provided for update
      this.formActivity = { ...this.activity };
      this.albumsInput = this.activity.albums.join(', ');
      this.gaolsInput = this.activity.goals.join(', ');
    } else if (changes['activity'] && !this.activity) {
      // Reset form for create mode
      this.formActivity = {
        id: 0,
        title: '',
        description: '',
        category: '',
        duration: '',
        effective: 0,
        feedback: '',
        goals: [],
        iconPath: '',
        launchDate: '',
        location: '',
        albums: []
      };
      this.albumsInput = '';
      this.gaolsInput = '';
    }
  }


  //Handle activity creation & updating
  async onSubmit() {
    // Convert comma-separated input into array
    if (this.albumsInput.trim() && this.gaolsInput.trim()) {
      this.formActivity.albums = this.albumsInput.split(',').map(img => img.trim());
      this.formActivity.goals = this.gaolsInput.split(',').map(goal => goal.trim());
    }

    // create-update-activity
    try {
      if (this.activity) {
        // UPDATE Mode
        const updatedActivity = await this.activityService.updateActivityFct(this.formActivity);
        this.updated.emit(updatedActivity);
      } else {
        // CREATE Mode
        const createdActivity = await this.activityService.createActivityFct(this.formActivity);
        this.created.emit(createdActivity); // ✅ Tell parent to add this new activity
      }
      this.close.emit(); // Close form on submit 4 both modes

    } catch (error) {
      console.error('Error creating activity:', error);
    }

  }

  onCancel() {
    this.close.emit();
  }
}
