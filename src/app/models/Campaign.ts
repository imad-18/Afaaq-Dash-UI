import {Statistic} from './Statistic';

export interface Campaign {
  id: number;
  title: string;
  description?: string;
  imagesPath: string[];
  //statistics?: Statistic[];   // 👈 add this
}
