import { ImageSourcePropType } from 'react-native';

export type RootNavigationRoutes = {
  Auth: AuthParamList;
  Dashboard: DashboardParamList;
  TakeTour: any;
  ProfileOnboarding: any;
};

export type AuthParamList = {
  CompleteOnboarding: any;
  Login: any;
  VerifyOtp: { email?: string; password?: string };
  Register: any;
  ForgetPassword: any;
  VerifyEmailAccount: any;
  ResetPassword: any;
  Onboarding: any;
  BasicProfile: any;
  Nationality: any;
  UploadProfile: any;
  UserOnboarding5: any;
  UserOnboarding6: any;
  UserOnboarding7: any;
  UserOnboarding8: any;
  UserOnboarding9: any;
  UserOnboarding10: any;
  UserDashboard: any;
};

export type DashboardParamList = {
  DashboardHome: any;
  Home: any;
  TakeTour: any;
  UserProfile: any;
  Explore: undefined;
  WithdrawalMethods: any;
  Therapy: undefined;
  AccountStatement: any;
  AccountSubProfile: any;
  Referral: any;
  AddMood: any;
  AddMood2: { selected_mood: string; mood_color: string; emotion_id: string };
  Transfer: any;
  ScanQR: any;
  ProfileUpdate: any;
  VerifyAccount: any;
  Settings: any;
  TransactionPin: any;
  MoodTracker: any;
  ConfirmTransactionPin: any;
  ChangePassword: any;
  AccountSecurity: any;
  PrivacyPolicy: any;
  ChangePin: any;
  ConfirmPin: any;
  Notifications: any;
  VoucherHistory: any;
  Journal: undefined;
  CompleteAddMood: any;
  AddJournal: undefined;
  MindSpace: undefined;
  PreviewJournal: any;
  EditJournal: any;
  RecentlyPlayedAudio: undefined;
  RecentlyPlayedText: undefined;
  RecentlyPlayedVideo: undefined;
  Cbt: undefined;
  SingleCbt: {
    item: {
      id: number;
      title: string;
      description: string;
      image: ImageSourcePropType;
      options: any[];
    };
  };
  Sample: undefined;
};

export type BottomTabParamList = {
  Home: any;
  Explore: any;
  Activities: any;
  Settings: any;
  Profile: any;
};
