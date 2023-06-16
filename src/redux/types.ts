export type CompleteProfile = {
  gender: string;
  dateOfBirth: Date;
  country: string;
  stateOfResidence: string;
  healthInfo: HealthInfo;
  mentalInfo: MentalInfo;
  productivityInfo: ProductivityInfo;
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
