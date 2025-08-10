import {Component, inject, OnInit} from '@angular/core';
import {Activity} from '../../models/Activity';
import {NgForOf} from '@angular/common';
import {NzTableComponent} from 'ng-zorro-antd/table';
import {ActivityService} from '../../services/activity.service';
import {NzCardComponent} from 'ng-zorro-antd/card';
import {NzCarouselComponent, NzCarouselContentDirective} from 'ng-zorro-antd/carousel';
import {NzColDirective, NzRowDirective} from 'ng-zorro-antd/grid';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {NzIconDirective} from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-activities',
  imports: [
    NgForOf,
    NzTableComponent,
    NzCardComponent,
    NzCarouselComponent,
    NzCarouselContentDirective,
    NzColDirective,
    NzRowDirective,
    NzButtonComponent,
    NzIconDirective,
  ],
  templateUrl: './activities.html',
  styleUrl: './activities.css'
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
}
