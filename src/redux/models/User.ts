import { UserApi } from 'services/apis';
import { reducerActions as reducers } from './reducer';
import { showMessage } from 'react-native-flash-message';
import { CompleteProfile, CompleteOnboarding } from 'redux/types';

const IsState = {
  userProfile: null,
  gender: null,
  dataOfbirth: null,
  userProfileDetails: null,
  avatars: [],
  moods: [],
  userJournal: [],
  nextJournal: [],
  country: null,
  state: null,
  pageNumber: 1,
  isFetching: true,
  totalPages: null,
  nextPage: null,
  previousPage: null,
  goalOnboarding: null,
  physicalOnboarding: null,
  therapyOnboarding: null,
  journalById: null,
} as unknown as User;

interface User {
  gender: CompleteProfile;
  dataOfbirth: CompleteProfile;
  nationality: CompleteProfile;
  country: CompleteProfile;
  state: CompleteProfile;
  userProfileDetails: any;
  avatars: any;
  moods: any[];
  userJournal: any[];
  nextJournal: any[];
  totalPages: any;
  nextPage: any;
  previousPage: any;
  isFetching: boolean;
  pageNumber: number;
  journalById: any;
  goalOnboarding: CompleteOnboarding;
  physicalOnboarding: CompleteOnboarding;
  therapyOnboarding: CompleteOnboarding;
}

export const User = {
  name: 'User',
  state: IsState,
  reducers,
  effects: (dispatch: any) => ({
    async pendingProfileGender(data: CompleteProfile) {
      dispatch.User.setState({
        gender: data,
      });
      return true;
    },
    async pendingProfileDOB(data: CompleteProfile) {
      dispatch.User.setState({
        dataOfbirth: data,
      });
      return true;
    },

    async pendingProfileCountry(data: CompleteProfile) {
      dispatch.User.setState({
        country: data,
      });
      return true;
    },
    async pendingProfileState(data: CompleteProfile) {
      dispatch.User.setState({
        state: data,
      });
      return true;
    },

    async completeProfileCreation(data: CompleteProfile) {
      dispatch.User.setError(false);
      try {
        const response = await UserApi.completeProfile(data);
        if (response) {
          // console.log(response, 'complete profile');
        }
      } catch (error) {
        // console.log(error, 'complet profile error');
        this.handleError(error);
      }
    },

    async createJournal(data: any) {
      dispatch.User.setError(false);
      try {
        const response = await UserApi.createNewJournal(data);
        if (response) {
          // console.log(response, 'create journal');
        }
      } catch (error) {
        // console.log(error, 'create journal');
        this.handleError(error);
      }
    },

    async getUserProfileData() {
      dispatch.User.setError(false);
      try {
        const api: any = await UserApi.getUserProfile();
        if (api) {
          dispatch.User.setState({
            userProfileDetails: api,
          });
        }
      } catch (error) {
        this.handleError(error);
      }
    },

    async getAllMoods() {
      dispatch.User.setError(false);
      try {
        const api: any = await UserApi.getAllMoods();
        if (api) {
          dispatch.User.setState({
            moods: api,
          });
        }
        // console.log('journal-list', api)
      } catch (error) {
        this.handleError(error);
      }
    },

    async getJournal(pageNumber: number) {
      dispatch.User.setError(false);
      // dispatch.User.setState({isFetching: true})
      try {
        const api = await UserApi.getAllJournal({ page: pageNumber });
        if (api) {
          dispatch.User.setState({
            userJournal: api.results.map((item: { id: any }) => ({
              ...item,
              key: item.id,
            })),
            totalPages: api.count,
            nextPage: api.next,
            previousPage: api.previous,
          });
        }
        // console.log(...api.results.map((item: { id: any; }) => ({ ...item, key: item.id })),'listing')
      } catch (error) {
        this.handleError(error);
        // dispatch.User.setState({isFetching: false})
      }
    },

    async getJournalById(id: any) {
      dispatch.User.setError(false);
      try {
        const api = await UserApi.getJournalById({ id: id });
        if (api) {
          dispatch.User.setState({
            journalById: api,
          });
        }
      } catch (error) {
        this.handleError(error);
      }
    },

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async editJournalById({ id, formData }: { id: any; formData: FormData }) {
      dispatch.User.setError(false);
      try {
        const api = await UserApi.editJournalById({ id: id });
        console.log(api, 'edit data');
        if (api) {
          // dispatch.User.setState({
          //   journalById: api,
          // });o
        }
      } catch (error) {
        console.log(error, 'edit error');
        this.handleError(error);
      }
    },

    async deleteJournalById(id: any) {
      dispatch.User.setError(false);
      try {
        await UserApi.deleteJournalById({ id: id });
      } catch (error) {
        console.log(error);
        this.handleError(error);
      }
    },

    async onboardUser(data: any) {
      dispatch.User.setError(false);
      try {
        const api: any = await UserApi.setOnboarding(data);
        if (api) {
          console.log('onboarding redux', api);
          // return true;
        }
        console.log('onboarding redux', api);
      } catch (error: any) {
        console.log('onboard', error);
        this.handleError(error);
      }
    },
    async getUserAvatars() {
      dispatch.User.setError(false);
      try {
        const api: any = await UserApi.getAllAvatars();
        if (api) {
          console.log(api, 'get avatar');
          dispatch.User.setState({
            avatars: api,
          });
        }
      } catch (error) {
        this.handleError(error);
      }
    },

    async getUserMoods() {
      dispatch.User.setError(false);
      try {
        const api: any = await UserApi.getAllMoods();
        if (api) {
          console.log(api, 'get mood');
          dispatch.User.setState({
            moods: api,
          });
        }
      } catch (error) {
        this.handleError(error);
      }
    },

    async addUserMood(data: any) {
      dispatch.User.setError(false);
      try {
        const api: any = await UserApi?.setMood(data);
        if (api) {
          console.log(api, 'add mood');
          return api;
        }
      } catch (error) {
        this.handleError(error);
      }
    },
    async accessDashboard() {
      dispatch.User.setState({
        isLoggedIn: true,
      });
    },

    async goalOnboardingStage(data: CompleteOnboarding) {
      dispatch.User.setState({
        goalOnboarding: data,
      });
      return true;
    },

    async physicalOnboardingStage(data: CompleteOnboarding) {
      dispatch.User.setState({
        physicalOnboarding: data,
      });
      return true;
    },
    async therapyOnboardingStage(data: CompleteOnboarding) {
      dispatch.User.setState({
        therapyOnboarding: data,
      });
      return true;
    },

    async handleError(error: any) {
      dispatch.User.setError(true);
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
