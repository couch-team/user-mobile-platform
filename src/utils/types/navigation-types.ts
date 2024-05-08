import { ReactNode } from 'react';
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
  VerifyOtp: { email?: string; password?: string; token: string };
  Register: any;
  ForgetPassword: any;
  VerifyEmailAccount: any;
  ResetPassword: any;
  Onboarding: any;
  BasicProfile: { token: string; email?: string; password?: string };
  Nationality: { token: string; email?: string; password?: string };
  UploadProfile: { token: string; email?: string; password?: string };
  UserOnboarding: { token: string; email?: string; password?: string };
  UserOnboarding4: { token: string; email?: string; password?: string };
  UserOnboarding1: { token: string; email?: string; password?: string };
  UserOnboarding2: { token: string; email?: string; password?: string };
  UserOnboarding3: { token: string; email?: string; password?: string };
  UserOnboarding5: { token: string; email?: string; password?: string };
  CompleteOnboarding1: { email?: string; password?: string; token: string };
  UserOnboarding6: any;
  UserOnboarding7: any;
  UserOnboarding8: any;
  UserOnboarding9: any;
  UserOnboarding10: any;
  UserDashboard: any;
  DashboardHome: any;
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
  AddMood2: { mood: string; emotion: string; emotion_id: string };
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
  MindSpaceAudioSection: {
    header: string,
    sub_header: string,
  }
  MindSpaceVideoSection: {
    header: string,
    sub_header: string,
  }
  MindSpaceSection: {
    header: string;
    sub_header: string;
    content: ReactNode;
  };
  PreviewJournal: any;
  EditJournal: any;
  RecentlyPlayedAudio: undefined;
  RecentlyPlayedText: undefined;
  RecentlyPlayedVideo: undefined;
  Cbt: undefined;
  SingleCbt: { id: string };
  CbtAudio: {
    header: string,
    backgroundImageUri: string,
    audio_uri: string,
    id: string,
    is_complete: boolean,
    duration: string
  };
  CbtVideo: {
    header: string,
    backgroundImageUri: string,
    video_uri: string,
    id: string,
    is_complete: boolean,
    duration: string
  };
  CbtText: {
    id: string, 
    content: any,
  };
  CbtExercise: {
    id: string, 
    content: any,
  };
  UserOnboarding: any;
  UserOnboarding4: any;
  UserOnboarding1: any;
  UserOnboarding2: any;
  UserOnboarding3: any;
  CompleteOnboarding1: any;
  Planner: any;
  EditProfile: { id?: string };
  NotificationPreference: any;
  Account: any;
  Subscription: any;
  More: any;
};

export type BottomTabParamList = {
  Home: any;
  Explore: any;
  Activities: any;
  Settings: any;
  Profile: any;
};
