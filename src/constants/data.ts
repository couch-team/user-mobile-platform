import { Colors, Images } from '../theme/config';

export const genderRoles = [
  {
    id: 1,
    title: 'Male',
    value: 'male',
  },
  {
    id: 2,
    title: 'Female',
    value: 'female',
  },
  {
    id: 3,
    title: 'Other',
    value: 'other',
  },
];

export const moods = [
  {
    id: 1,
    icon: Images['mood-1'],
  },
  {
    id: 2,
    icon: Images['mood-2'],
  },
  {
    id: 3,
    icon: Images['mood-3'],
  },
  {
    id: 4,
    icon: Images['mood-4'],
  },
];

export const helpLists = [
  {
    id: 1,
    title: 'Overcome Depression',
  },
  {
    id: 2,
    title: 'Talk to a Therapist',
  },
  {
    id: 3,
    title: 'Be more Productive',
  },
  {
    id: 4,
    title: 'Feel less anxious',
  },
  {
    id: 5,
    title: 'Recover from Traumatic events',
  },
  {
    id: 6,
    title: 'Improve Self Confidence',
  },
  {
    id: 7,
    title: 'Relax and Feel better',
  },
];

export const rates = [
  {
    id: 1,
    title: 'Good',
    color: Colors.GREEN,
  },
  {
    id: 2,
    title: 'Average',
    color: Colors.COUCH_BLUE_900,
  },
  {
    id: 3,
    title: 'Bad',
    color: Colors.YELLOW,
  },
  {
    id: 4,
    title: 'Very Bad',
    color: Colors.PEACHY_RED,
  },
];

export const medicalConditions = [
  {
    id: 1,
    title: 'Diabetes',
  },
  {
    id: 2,
    title: 'Asthma',
  },
  {
    id: 3,
    title: 'Back/Joint pain',
  },
  {
    id: 4,
    title: 'Heart disease',
  },
];

export const therapistsVisits = [
  {
    id: 1,
    title: 'Yes, I have',
  },
  {
    id: 2,
    title: 'None I can think of at the moment',
  },
];

export const anxiousState = [
  {
    id: 1,
    title: 'Not at all',
    color: Colors.GREEN,
  },
  {
    id: 2,
    title: 'Some days',
    color: Colors.COUCH_BLUE_900,
  },
  {
    id: 3,
    title: 'More than half the days',
    color: Colors.YELLOW,
  },
  {
    id: 4,
    title: 'Nearly everyday',
    color: Colors.PEACHY_RED,
  },
];

export const functionState = [
  {
    id: 1,
    title: 'Not at all',
    color: Colors.GREEN,
  },
  {
    id: 3,
    title: 'Im not sure',
    color: Colors.YELLOW,
  },
  {
    id: 4,
    title: 'Yes, definitely',
    color: Colors.PEACHY_RED,
  },
];

export const traumaticEvents = [
  {
    id: 1,
    title: 'Grief',
  },
  {
    id: 2,
    title: 'Domestic abuse',
  },
  {
    id: 3,
    title: 'Sexual abuse',
  },
  {
    id: 4,
    title: 'Accidents',
  },
  {
    id: 5,
    title: 'Childhood trauma',
  },
  {
    id: 6,
    title: 'Heart disease',
  },
  {
    id: 7,
    title: 'Back/Joint pain',
  },
  {
    id: 8,
    title: 'Heart disease',
  },
];

export const healthyLevel = [
  {
    id: 1,
    title: 'Nearly Everyday',
    color: Colors.GREEN,
  },
  {
    id: 2,
    title: 'More than half the days',
    color: Colors.COUCH_BLUE_900,
  },
  {
    id: 3,
    title: 'Some Days',
    color: Colors.YELLOW,
  },
  {
    id: 4,
    title: 'Not at All',
    color: Colors.PEACHY_RED,
  },
];

export const sleepPattern = [
  {
    id: 1,
    title: 'Good—(7-9 Hours of sleep)',
    color: Colors.GREEN,
  },
  {
    id: 4,
    title: 'Bad — (Less than 7 Hours of sleep)',
    color: Colors.PEACHY_RED,
  },
];

export const moodTracker = [
  {
    id: 1,
    title: 'Excited',
    icon: Images.excited,
    bgColor: Colors.LIGHT_PURPLE,
    textColor: Colors.COUCH_BLUE_1100,
  },
  {
    id: 2,
    title: 'Happy',
    icon: Images.happy,
    bgColor: Colors.LIGHT_GREEN_100,
    textColor: Colors.GREEN_100,
  },
  {
    id: 3,
    title: 'Sad',
    icon: Images.sad,
    bgColor: Colors.LIGHT_YELLOW_100,
    textColor: Colors.YELLOW_100,
  },
  {
    id: 4,
    title: 'Angry',
    icon: Images.angry,
    bgColor: Colors.LIGHT_PEACHY_RED_100,
    textColor: Colors.PEACHY_RED_100,
  },
];

export const tourInfoData = [
  {
    id: 1,
    title: 'Journals',
    color: Colors.COUCH_BLUE,
    icon: Images.dairy,
    description: 'Write how you feel...',
  },
  {
    id: 2,
    title: 'Mind Space',
    color: Colors.GREEN_100,
    description: 'Listen to soothing music & Podcasts...',
    icon: Images.headphones,
  },
  {
    id: 3,
    title: 'Mood Tracker',
    color: Colors.WARNING_AMBER,
    description: 'Let’s help you track your mood daily',
    icon: Images.smile,
  },
  {
    id: 4,
    title: 'Therapy',
    description: 'Let out your frustrations on us ❤️',
    color: Colors.PURPLE,
    icon: Images.heart,
  },
  {
    id: 5,
    title: 'Community',
    description: 'Let out your frustrations on us ❤️',
    color: Colors.GREEN_CYAN,
    icon: Images.users,
  },
];

export const notifications = [
  {
    id: 1,
    title: 'Mood trackers',
    notificationHistory: [
      {
        id: 1,
        title: 'You logged a mood ( Happy )  earlier today...',
        icon: Images.happy,
        time: '2hrs ago',
      },
      {
        id: 2,
        title: 'You logged a mood ( Sad ) earlier today...',
        icon: Images.sad,
        time: '2hrs ago',
      },
      {
        id: 3,
        title: 'You logged a mood ( Sad ) earlier today...',
        icon: Images.sad,
        time: '6hrs ago',
      },
    ],
    newNotifications: [
      {
        id: 1,
        title: 'You logged a mood ( Happy )  earlier today...',
        icon: Images.happy,
        time: 'Just now',
      },
      {
        id: 2,
        title: 'Reminder! Do tell us your mood for today...',
        icon: Images['time-circle'],
        time: '<1min ago',
      },
    ],
  },
  {
    id: 2,
    title: 'Therapy',
    notificationHistory: [
      {
        id: 1,
        title: 'You logged a mood ( Happy )  earlier today...',
        icon: Images.happy,
        time: '2hrs ago',
      },
      {
        id: 2,
        title: 'You logged a mood ( Sad ) earlier today...',
        icon: Images.sad,
        time: '2hrs ago',
      },
      {
        id: 3,
        title: 'You logged a mood ( Sad ) earlier today...',
        icon: Images.sad,
        time: '6hrs ago',
      },
    ],
    newNotifications: [
      {
        id: 1,
        title: 'You logged a mood ( Happy )  earlier today...',
        icon: Images.happy,
        time: 'Just now',
      },
      {
        id: 2,
        title: 'Reminder! Do tell us your mood for today...',
        icon: Images['time-circle'],
        time: '<1min ago',
      },
    ],
  },
  {
    id: 3,
    title: 'Community',
    notificationHistory: [
      {
        id: 1,
        title: 'You logged a mood ( Happy )  earlier today...',
        icon: Images.happy,
        time: '2hrs ago',
      },
      {
        id: 2,
        title: 'You logged a mood ( Sad ) earlier today...',
        icon: Images.sad,
        time: '2hrs ago',
      },
      {
        id: 3,
        title: 'You logged a mood ( Sad ) earlier today...',
        icon: Images.sad,
        time: '6hrs ago',
      },
    ],
    newNotifications: [
      {
        id: 1,
        title: 'You logged a mood ( Happy )  earlier today...',
        icon: Images.happy,
        time: 'Just now',
      },
      {
        id: 2,
        title: 'Reminder! Do tell us your mood for today...',
        icon: Images['time-circle'],
        time: '<1min ago',
      },
    ],
  },
  {
    id: 4,
    title: 'Productivity',
    notificationHistory: [
      {
        id: 1,
        title: 'You logged a mood ( Happy )  earlier today...',
        icon: Images.happy,
        time: '2hrs ago',
      },
      {
        id: 2,
        title: 'You logged a mood ( Sad ) earlier today...',
        icon: Images.sad,
        time: '2hrs ago',
      },
      {
        id: 3,
        title: 'You logged a mood ( Sad ) earlier today...',
        icon: Images.sad,
        time: '6hrs ago',
      },
    ],
    newNotifications: [
      {
        id: 1,
        title: 'You logged a mood ( Happy )  earlier today...',
        icon: Images.happy,
        time: 'Just now',
      },
      {
        id: 2,
        title: 'Reminder! Do tell us your mood for today...',
        icon: Images['time-circle'],
        time: '<1min ago',
      },
    ],
  },
  {
    id: 5,
    title: 'Store',
    notificationHistory: [
      {
        id: 1,
        title: 'You logged a mood ( Happy )  earlier today...',
        icon: Images.happy,
        time: '2hrs ago',
      },
      {
        id: 2,
        title: 'You logged a mood ( Sad ) earlier today...',
        icon: Images.sad,
        time: '2hrs ago',
      },
      {
        id: 3,
        title: 'You logged a mood ( Sad ) earlier today...',
        icon: Images.sad,
        time: '6hrs ago',
      },
    ],
    newNotifications: [
      {
        id: 1,
        title: 'You logged a mood ( Happy )  earlier today...',
        icon: Images.happy,
        time: 'Just now',
      },
      {
        id: 2,
        title: 'Reminder! Do tell us your mood for today...',
        icon: Images['time-circle'],
        time: '<1min ago',
      },
    ],
  },
];

export const podcasts4u = [
  {
    id: 1,
    title: 'Overcoming Work-related Stress',
    time: '3:45',
    played: '1.5M',
    shared: '400.56K',
    hashTags: ['#STRESS', '#RELIEF'],
    iconColor: Colors.LIGHT_PEACHY_RED_200,
  },
  {
    id: 2,
    title: 'Overcoming Work-related Stress',
    time: '3:45',
    played: '1.5M',
    shared: '400.56K',
    hashTags: ['#STRESS', '#RELIEF'],
    iconColor: Colors.LIGHT_YELLOW_200,
  },
  {
    id: 3,
    title: 'Overcoming Work-related Stress',
    time: '3:45',
    played: '1.5M',
    shared: '400.56K',
    hashTags: ['#STRESS', '#RELIEF'],
    iconColor: Colors.LIGHT_GREEN_200,
  },
];

export const heavyOptions = [
  {
    id: 1,
    title: 'TELETHERAPY',
    description: 'Share with a Therapist',
    icon: Images.phone,
    color: Colors.GREEN_100,
  },
  {
    id: 2,
    title: 'JOURNALS',
    description: 'Write out your feelings',
    icon: Images.journal,
    color: Colors.COUCH_BLUE,
  },
];
