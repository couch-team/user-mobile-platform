import { CompleteProfile } from 'redux/types';
import Axios from 'services/Axios';

export default {
  completeProfile: (payload: CompleteProfile) =>
    Axios.post('api/user/profile/', payload, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }).then(({ data }) => data),
  getUserProfile: () => Axios.get('api/user/profile/').then(({ data }) => data),
  getAllAvatars: () => Axios.get('mobile/avatars/').then(({ data }) => data),
  getAllMoods: () => Axios.get('/api/mood/mood/').then(({ data }) => data),
  getSingleMood: (req: { id: string }) =>
    Axios.get(`/api/mood/log/${req?.id}`).then(({ data }) => data),
  setMood: (req: { mood: string; reason?: string }) =>
    Axios.post('/api/mood/log/', req).then(({ data }) => data),
  getOnboarding: () =>
    Axios.get('mobile/user_onboarding/1/').then(({ data }) => data),
  setOnboarding: (payload: any) =>
    Axios.post('api/user/preference/', payload, {
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(({ data }) => data),
  createNewJournal: (payload: any) =>
    Axios.post('api/journal/log/', payload, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }).then(({ data }) => data),
  getAllJournal: ({ page }: any) =>
    Axios.get(`api/journal/log/?page=${page}`).then(({ data }) => data),
  getJournalById: ({ id }: any) =>
    Axios.get(`api/journal/log/${id}`).then(({ data }) => data),
  editJournalById: ({ id, payload }: any) => Axios.patch(`api/journal/log/${id}/`, payload, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  }).then(({ data }) => data),
  deleteJournalById: ({ id }: any) =>
    Axios.delete(`api/journal/log/${id}/`).then(({ data }) => data),
};
