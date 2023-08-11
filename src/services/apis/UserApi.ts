import { CompleteProfile } from 'redux/types';
import Axios from 'services/Axios';

export default {
  completeProfile: (payload: CompleteProfile) =>
    Axios.post('userprofiles/', payload).then(({ data }) => data),
  getUserProfile: () => Axios.get('userprofiles/').then(({ data }) => data),
};
