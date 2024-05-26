import debounce from "helpers/debounce";
import { $api } from "services";
import { AppThunk } from "store";
import { setHasFetchedMoods, setIsFetchingMoods, setMoods } from "store/slice/journalMoodSlice";

const debounceFetchJournalMoods = debounce(async (current_page, dispatch) => {
    try {
      const response = await $api.fetch('/api/mood/mood/');
      if ($api.isSuccessful(response)) {
        dispatch(setMoods(response?.data));
      }
    } catch (err) {
      console.log(err);
    } finally {
      dispatch(setIsFetchingMoods(false));
    }
}, 1000);
  
  export const fetchJournalMoods =
    (current_page: number, isSilent?: boolean): AppThunk =>
    async dispatch => {
      dispatch(setHasFetchedMoods(true));
      !isSilent && dispatch(setIsFetchingMoods(true));
      debounceFetchJournalMoods(current_page, dispatch);
  };