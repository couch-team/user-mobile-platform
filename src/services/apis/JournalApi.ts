import { JournalPayloadType } from 'redux/types';
import Axios from 'services/Axios';

export default {
  addJournal: (payload: JournalPayloadType) =>
    Axios.post('mobile/api/journal/', payload).then(({ data }) => data),
  getJournals: () => Axios.get('mobile/api/journal/').then(({ data }) => data),
};
