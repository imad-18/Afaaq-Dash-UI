import {StatisticAttribute} from './StatisticAttribute';
import {Campaign} from './Campaign';

export interface Statistic {
  id?: number;
  yearEdition: string;
  compaign: Campaign;
  attributes: StatisticAttribute[];
}
