export type RootNavigationRoutes = {
  Auth: AuthParamList;
  Dashboard: DashboardParamList;
  TakeTour: any;
};

export type AuthParamList = {
  Onboarding: any;
  CompleteOnboarding: any;
  Login: any;
  VerifyOtp: any;
  Register: any;
  ForgetPassword: any;
  BasicProfile: any;
  Nationality: any;
  UploadProfile: any;
  UserOnboarding: any;
  UserOnboarding1: any;
  UserOnboarding2: any;
  UserOnboarding3: any;
  CompleteOnboarding1: any;
  UserOnboarding4: any;
  UserOnboarding5: any;
  UserOnboarding6: any;
  UserOnboarding7: any;
  UserOnboarding8: any;
  UserOnboarding9: any;
  UserOnboarding10: any;
};

export type DashboardParamList = {
  Dashboard: BottomTabParamList;
  Home: any;
  UserProfile: any;
  WithdrawalMethods: any;
  ProfileType: any;
  AccountStatement: any;
  AccountSubProfile: any;
  Referral: any;
  AddBankAccount: any;
  Transfer: any;
  ScanQR: any;
  ProfileUpdate: any;
  VerifyAccount: any;
  Settings: any;
  TransactionPin: any;
  AddUser: any;
  ConfirmTransactionPin: any;
  ChangePassword: any;
  AccountSecurity: any;
  PrivacyPolicy: any;
  ChangePin: any;
  ConfirmPin: any;
  Notifications: any;
  VoucherHistory: any;
  VoucherCode: any;
};

export type BottomTabParamList = {
  Home: any;
  Explore: any;
  Activities: any;
  Settings: any;
  Profile: any;
};
