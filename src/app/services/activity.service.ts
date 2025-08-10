import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Activity} from '../models/Activity';
import {firstValueFrom} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ActivityService {
  private http = inject(HttpClient);

  // Get all activities
  getAllActivities(): Promise<Activity[]> {
    return firstValueFrom(this.http.get<Activity[]>("http://localhost:8080/activities"));
  }

  // Delete activity
  deleteActivityFct(activity: Activity) {
    return firstValueFrom(this.http.delete<Activity>("http://localhost:8080/activities/" + activity.id));
  }

  // Update activity
  updateActivityFct(activity: Activity) {
    return firstValueFrom(this.http.put<Activity>("http://localhost:8080/activities/" + activity.id, activity));
  }

  // Create activity
  createActivityFct(activity: Activity) {
    return firstValueFrom(this.http.post<Activity>("http://localhost:8080/activities/", activity));
  }
}

