export type CompleteProfile = {
  id: number;
  gender: string;
  date_of_birth: Date;
  nationality: string;
  stateOfResidence: string;
  created_at: Date;
  updated_at: Date;
  user: number;
};

export type JournalType = {
  id: number;
  tags: string[];
  audio_file: string | null;
  notes: string;
  mood_emoji: string | null;
  image: string | null;
  timestamp: Date;
  user: number;
};

export type JournalPayloadType = {
  tags: string[];
  audio_file: string | null;
  notes: string;
  mood_emoji: string | null;
  image: string | null;
  user: number;
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
