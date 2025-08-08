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

  //Get all campaigns
  getAllCampaigns(): Promise<Campaign[]> {
    return firstValueFrom(this.http.get<Campaign[]>("http://localhost:8080/campaigns"));
  }

  //delete campaign
  deleteCampaignFct(campaign: Campaign) {
    return firstValueFrom(this.http.delete<Campaign>(`http://localhost:8080/campaigns/${campaign.id}`));
  }

  //update campaign
  updateCampaignFct(campaign: Campaign) {
    return firstValueFrom(this.http.put(`http://localhost:8080/campaigns/${campaign.id}`, campaign));
  }

  //create campaign
  createCampaignFct(campaign: Campaign) {
    return firstValueFrom(this.http.post<Campaign>("http://localhost:8080/campaigns", campaign));
  }

}
