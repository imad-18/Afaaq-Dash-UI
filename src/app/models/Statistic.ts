import {StatisticAttribute} from './StatisticAttribute';

export interface Statistic {
  id?: number;
  yearEdition: string;
  compaignId: number;
  attributes: StatisticAttribute[];
}
