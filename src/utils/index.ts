import { store } from '../store';
import moment from 'moment';
import { sortBy, groupBy } from 'lodash';

export const getModelKeys = (model: any) =>
  Object.keys(model.effects({})).map(a => `${model.name}/${a}`);

export const getAllModels = () => {
  return store.getState();
};

export const formatAmount = (value: string) =>
  Number(value)
    .toFixed(2)
    .replace(/\d(?=(\d{3})+\.)/g, '$&,');

export const groupTransactions = (data = []) => {
  let transGroup: any[] = [];
  const sorted = sortBy(data, ['created_at']);
  const groups = groupBy(sorted, (d: any) =>
    moment(d?.created_at).startOf('day').format(),
  );
  Object.keys(groups).forEach(i => {
    transGroup.push({
      title: moment(i).format('ddd Do MMMM, YYYY'),
      isToday:
        moment(i).format('DD MMMM') === moment().format('DD MMMM') && 'Today',
      data: groups[i]?.reverse(),
    });
  });

  return transGroup.reverse();
};


export const groupJournalTransactions = (data:any) => {
  let transGroup: any[] = [];
  const sorted = sortBy(data, ['created_at']);
  const groups = groupBy(sorted, (d: any) =>
    moment(d?.created_at).startOf('day').format(),
  );
  Object.keys(groups).forEach(i => {
    transGroup.push({
      title: moment(i).calendar(),
      isToday:
        moment(i).format('DD MMMM') === moment().format('DD MMMM') && 'Today',
        isYesterday:
        moment(i).subtract('DD MMMM') === moment().subtract('DD MMMM') && 'Yesterday',
      data: groups[i]?.reverse(),
    });
  });

  return transGroup.reverse();
};