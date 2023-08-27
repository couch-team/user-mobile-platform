import { CompleteProfile } from 'redux/types';
import Axios from 'services/Axios';

export default {
  completeProfile: (payload: CompleteProfile) =>
    Axios.post('userprofiles/', payload).then(({ data }) => data),
  getUserProfile: () => Axios.get('api/userprofiles/').then(({ data }) => data),
  getAllAvatars: () => Axios.get('mobile/avatars/').then(({ data }) => data),
  getAllMoods: () => Axios.get('mobile/my_moods/').then(({ data }) => data),
  getSingleMood: (req: { id: string }) =>
    Axios.get(`mobile/moods/${req?.id}`).then(({ data }) => data),
  setMood: (req: { mood: string; reason?: string }) =>
    Axios.post('mobile/user_mood/', req).then(({ data }) => data),
  getOnboarding: () =>
    Axios.get('mobile/user_onboarding/1/').then(({ data }) => data),
  setOnboarding: (req: any) =>
    Axios.post('mobile/api/user_onboarding/', req).then(({ data }) => data),
};
