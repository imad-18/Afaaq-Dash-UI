import {StatisticAttribute} from './StatisticAttribute';
import {Campaign} from './Campaign';
import {Activity} from './Activity';

export interface Statistic {
  id?: number;
  yearEdition: string;
  compaign?: Campaign;
  activity?: Activity;
  attributes: StatisticAttribute[];
  compaignId: number;
  compaignTitle: string;
  activityId: number;
  activityTitle: string;

}
