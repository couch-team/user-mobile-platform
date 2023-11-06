import { JournalApi } from 'services/apis';
import { reducerActions as reducers } from './reducer';
import { showMessage } from 'react-native-flash-message';
import { JournalType } from 'redux/types';

const IsState = {
  journals: [],
} as unknown as Journal;

interface Journal {
  journals: JournalType[];
}

export const Journal = {
  name: 'Journal',
  state: IsState,
  reducers,
  effects: (dispatch: any) => ({
    async addJournal(data: JournalType) {
      dispatch.Journal.setError(false);
      try {
        const res = await JournalApi.addJournal(data);
        if (res) {
          dispatch.Journal.getJournals();
        }
        return true;
      } catch (error) {
        this.handleError(error);
      }
    },
    async getJournals() {
      dispatch.Journal.setError(false);
      try {
        const api: any = await JournalApi.getJournals();
        if (api) {
          const data = Array.isArray(api) ? api[0] : api;
          dispatch.Journal.setState({
            journals: data,
          });
          console.log(api);
        }
      } catch (error) {
        this.handleError(error);
      }
    },
    async handleError(error: any) {
      dispatch.Journal.setError(true);
      if (error || error?.data?.errors || error?.data?.status === 'error') {
        var message =
          error?.message ||
          error?.data?.message ||
          'An error occured. Please try again.';

        return showMessage({
          message,
          type: 'danger',
          duration: 2500,
        });
      }
    },
  }),
};
