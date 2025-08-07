import {Component, inject, OnInit} from '@angular/core';
import {Activity} from '../../models/Activity';
import {NgForOf} from '@angular/common';
import {NzTableComponent} from 'ng-zorro-antd/table';
import {ActivityService} from '../../services/activity.service';
import {NzCardComponent} from 'ng-zorro-antd/card';
import {NzCarouselComponent, NzCarouselContentDirective} from 'ng-zorro-antd/carousel';
import {NzColDirective, NzRowDirective} from 'ng-zorro-antd/grid';

@Component({
  selector: 'app-activities',
  imports: [
    NgForOf,
    NzTableComponent,
    NzCardComponent,
    NzCarouselComponent,
    NzCarouselContentDirective,
    NzColDirective,
    NzRowDirective
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
}
