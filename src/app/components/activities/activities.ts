import {Component, inject, OnInit} from '@angular/core';
import {Activity} from '../../models/Activity';
import {ActivityService} from '../../services/activity.service';
import {NzCardComponent} from 'ng-zorro-antd/card';
import {NzCarouselComponent, NzCarouselContentDirective} from 'ng-zorro-antd/carousel';
import {NzColDirective, NzRowDirective} from 'ng-zorro-antd/grid';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {NzIconDirective} from 'ng-zorro-antd/icon';
import {NzWaveDirective} from 'ng-zorro-antd/core/wave';
import {CreateUpdateActivity} from '../shared/create-update-activity/create-update-activity';

@Component({
  selector: 'app-activities',
  imports: [
    NzCardComponent,
    NzCarouselComponent,
    NzCarouselContentDirective,
    NzColDirective,
    NzRowDirective,
    NzButtonComponent,
    NzIconDirective,
    NzWaveDirective,
    CreateUpdateActivity
  ],
  templateUrl: './activities.html',
  styleUrls: ['./activities.css', '../statistics/statistics.css']
})
export class Activities implements OnInit {

  private activityService = inject(ActivityService);

  activities!: Activity[];

  ngOnInit(): void {
    this.initActivities();
  }

  private async initActivities() : Promise<void> {
    this.activities = await this.activityService.getAllActivities()
  }

  // Call deleteActivity fct from the service
  async deleteActivity(activity : Activity) : Promise<void> {
    try {
      await this.activityService.deleteActivityFct(activity);
      this.activities = this.activities.filter(a => a.id !== activity.id);
    }catch (error) {
      console.error('Error deleting activity:', error);
    }
  }

  /* ------------- Create-Update logic -----------*/


  formVisible = false;
  selectedActivity: Activity | null = null;

  openCreateForm() {
    this.selectedActivity = null;
    this.formVisible = true;
  }

  openUpdateForm(activity: Activity) {
    this.selectedActivity = activity;
    this.formVisible = true;
  }

  closeForm() {
    this.formVisible = false;
  }

  /* Handle activity updating and creating*/
  addActivityToList(newActivity: Activity) {
    this.activities = [...this.activities, newActivity]; // ✅ update without refresh
  }

  updateActivityInList(updatedActivity: Activity) {
    this.activities = this.activities.map(a =>
      a.id === updatedActivity.id ? updatedActivity : a
    );
  }
}
