import { CompleteProfile } from 'redux/types';
import Axios from 'services/Axios';

export default {
  completeProfile: (payload: CompleteProfile) =>
    Axios.post('userprofiles/', payload).then(({ data }) => data),
  getUserProfile: () => Axios.get('userprofiles/').then(({ data }) => data),
  getAllAvatars: () => Axios.get('avatars/').then(({ data }) => data),
  getAllMoods: () => Axios.get('moods/').then(({ data }) => data),
  getSingleMood: (req: { id: string }) =>
    Axios.get(`moods/${req?.id}`).then(({ data }) => data),
  setMood: (req: { mood: string; reason?: string }) =>
    Axios.post('user_mood/', req).then(({ data }) => data),
  getOnboarding: () => Axios.get('user_onboarding/1/').then(({ data }) => data),
  setOnboarding: (req: any) =>
    Axios.post('user_onboarding/', req).then(({ data }) => data),
};
