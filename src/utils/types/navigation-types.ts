export type RootNavigationRoutes = {
  Auth: AuthParamList;
  Dashboard: DashboardParamList;
};

export type AuthParamList = {
  Onboarding: any;
  CompleteOnboarding: any;
  Login: any;
  OTPModal: any;
  Register: any;
  ForgetPassword: any;
  ConfirmEmail: any;
  EnterPin: any;
  ConfirmPin: any;
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
  Scan: any;
  Settings: any;
};
