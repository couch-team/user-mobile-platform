export type CompleteProfile = {
  gender: string;
  date_of_birth: Date;
  nationality: string;
  stateOfResidence: string;
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
