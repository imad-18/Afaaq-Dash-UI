import {inject, Injectable} from '@angular/core';
import {Campaign} from '../models/Campaign';
import {Campaigns} from '../components/campaigns/campaigns';
import {HttpClient} from '@angular/common/http';
import {firstValueFrom} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CampaignService {

  private http = inject(HttpClient);

  getAllCampaigns(): Promise<Campaign[]> {
    return firstValueFrom(this.http.get<Campaign[]>("http://localhost:8080/campaigns"));
  }

}
