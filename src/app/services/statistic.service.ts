import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Statistic} from '../models/Statistic';
import {firstValueFrom} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StatisticService {

  private http = inject(HttpClient);

  //Get all statistics
  getAllStatistics(): Promise<Statistic[]> {
    return firstValueFrom(this.http.get<Statistic[]>("http://localhost:8080/statistics"));
  }

  //create statistic
  createStatisticFct(statistic: { yearEdition: any; compaign: { id: number }; attributes: any }) {
    return firstValueFrom(this.http.post<Statistic>("http://localhost:8080/statistics", statistic));
  }

  //delete statistic
  deleteStatistic(id: number | undefined): Promise<void> {
    return firstValueFrom(this.http.delete<void>(`http://localhost:8080/statistics/${id}`));
  }

}
