export type CompleteProfile = {
  gender: string;
  dob: Date;
  country : string;
  state_of_residence : string;
  avatar: any
};

export type CompleteOnboarding = {
  physical_status: string;
  ever_had_therapy : string;
  referral_channel : string;
  goal : any[];
};

type HealthInfo = {
  reasonForJoining: any[];
  physicalHealth: string;
  medicalConditions: {
    hasConditions: boolean;
    conditions: any[];
  };
};

type MentalInfo = {
  beenToTherapy: boolean;
  previousMood: string;
  presenceOfDifficultFeelings: string;
  pastTraumaTrigger: string;
  kindOfTrigger: any[];
};

type ProductivityInfo = {
  productivityLevel: string;
  sleepRate: string;
};

export type CompleteAccountRequest = {
  email: string;
  otp: string;
};

export type ResendEmailTokenRequest = {
  email: string;
};
