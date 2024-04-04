import moment from 'moment';
import { sortBy, groupBy } from 'lodash';
import { MoodType } from 'store/slice/moodSlice';

export const formatAmount = (value: string) =>
  Number(value)
    .toFixed(2)
    .replace(/\d(?=(\d{3})+\.)/g, '$&,');

export const groupTransactions = (data: MoodType[]) => {
  let transGroup: { title: string; isToday: string | boolean; data: any[] }[] =
    [];
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

export const groupJournalTransactions = (data: any) => {
  let transGroup: any[] = [];
  const sorted = sortBy(data, ['updated_at']);
  const groups = groupBy(sorted, (d: any) =>
    moment(d?.updated_at).startOf('day').format(),
  );
  Object.keys(groups).forEach((i, index) => {
    transGroup.push({
      title: moment(i).calendar(),
      isToday:
        moment(i).format('DD MMMM') === moment().format('DD MMMM') && 'Today',
      isYesterday:
        moment(i).subtract('DD MMMM') === moment().subtract('DD MMMM') &&
        'Yesterday',
      data: groups[i]?.reverse(),
      index: index,
    });
  });

  return transGroup.reverse();
};


export const convertDuration = (duration: any) => {
  if(duration){
    const [hours, minutes, rest] = duration.split(':');
    const [seconds, milliseconds] = (rest || '0').split('.');
    const roundedSeconds = Math.round(parseFloat(seconds));
    const hoursInt = parseInt(hours, 10);
    const minutesInt = parseInt(minutes, 10);
    const secondsInt = parseInt(roundedSeconds.toString(), 10);
    const totalMinutes = hoursInt * 60 + minutesInt;
    const formattedDuration = `${totalMinutes.toString().padStart(2, '0')}:${secondsInt.toString().padStart(2, '0')}`;
    return formattedDuration;
  }
}