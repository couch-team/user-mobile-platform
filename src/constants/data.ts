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

export const exploreOptions = [
  {
    id: 1,
    title: 'THERAPY',
    description: 'Share problems with a Therapist',
    icon: Images['phone-calling'],
    color: Colors.GREEN_100,
    screen: 'Therapy',
  },
  {
    id: 2,
    title: 'STORE',
    description: 'Get items to help your mental wellbeing.',
    icon: Images.bag,
    color: Colors.WARNING_AMBER,
  },
  {
    id: 3,
    title: 'COMMUNITY',
    description: 'Join heartwarming communities ',
    icon: Images.users,
    color: Colors.COUCH_BLUE,
  },
  {
    id: 4,
    title: 'CBT',
    description: 'A little brain test would not hurt you...',
    icon: Images.activity,
    color: Colors.PURPLE,
  },
];

export const therapyOptions = [
  {
    id: 1,
    title: 'TELETHERAPY',
    description: 'Set & Crush goals and eat up tasks like biscuits.',
    icon: Images['phone-calling'],
    color: Colors.PURPLE,
    url: 'Therapy',
  },
  {
    id: 2,
    title: 'RELAXATION HUB',
    description: 'Join heartwarming communities ',
    icon: Images.headphones,
    color: Colors.GREEN_100,
    url: 'MindSpace',
  },
  {
    id: 3,
    title: 'JOURNAL',
    description: 'Write down your thoughts and feelings.',
    icon: Images.journal,
    textColor: Colors.COUCH_BLUE,
    url: 'Journal',
  },
  {
    id: 4,
    title: 'MOOD TRACKER',
    description: 'Track your mood and feel better in no time!',
    icon: Images['mood-5'],
    textColor: Colors.WARNING_AMBER,
    url: 'MoodTracker',
  },
];

export const loggedMoods = [
  {
    title: 'Today',
    data: [
      {
        id: 1,
        title: 'Happy',
        date: 'Today — 12:48PM',
        color: Colors.COUCH_GREEN_200,
        time: 'today',
        icon: Images['happy-2'],
      },
      {
        id: 2,
        title: 'Extremely Happy',
        date: 'Today — 12:48PM',
        color: Colors.COUCH_GREEN_200,
        time: 'today',
        icon: Images['happy-2'],
      },
      {
        id: 3,
        title: 'Happy',
        date: 'Today — 12:48PM',
        color: Colors.COUCH_GREEN_200,
        time: 'today',
        icon: Images['happy-2'],
      },
    ],
  },
  {
    title: 'Yesterday',
    data: [
      {
        id: 1,
        title: 'Happy',
        date: 'Today — 12:48PM',
        color: Colors.COUCH_GREEN_200,
        time: 'today',
        icon: Images['happy-2'],
      },
      {
        id: 2,
        title: 'Angry',
        date: 'Today — 12:48PM',
        time: 'today',
        color: Colors.PEACHY_RED,
        icon: Images['angry-2'],
      },
      {
        id: 3,
        title: 'Sad',
        date: 'Today — 12:48PM',
        time: 'today',
        color: Colors.LIGHT_YELLOW_300,
        icon: Images['sad-2'],
      },
      {
        id: 4,
        title: 'Extremely Happy',
        date: 'Today — 12:48PM',
        color: Colors.COUCH_GREEN_200,
        time: 'today',
        icon: Images['happy-2'],
      },
      {
        id: 5,
        title: 'Happy',
        date: 'Today — 12:48PM',
        color: Colors.COUCH_GREEN_200,
        time: 'today',
        icon: Images['happy-2'],
      },
    ],
  },
  {
    title: '8, Jan 2023',
    data: [
      {
        id: 1,
        title: 'Happy',
        date: 'Today — 12:48PM',
        color: Colors.COUCH_GREEN_200,
        time: 'today',
        icon: Images['happy-2'],
      },
      {
        id: 2,
        title: 'Angry',
        date: 'Today — 12:48PM',
        time: 'today',
        color: Colors.PEACHY_RED,
        icon: Images['angry-2'],
      },
      {
        id: 3,
        title: 'Sad',
        date: 'Today — 12:48PM',
        time: 'today',
        color: Colors.LIGHT_YELLOW_300,
        icon: Images['sad-2'],
      },
      {
        id: 4,
        title: 'Extremely Happy',
        date: 'Today — 12:48PM',
        time: 'today',
        color: Colors.COUCH_GREEN_200,
        icon: Images['happy-2'],
      },
      {
        id: 5,
        title: 'Happy',
        date: 'Today — 12:48PM',
        time: 'today',
        color: Colors.COUCH_GREEN_200,
        icon: Images['happy-2'],
      },
    ],
  },
];

export const stackData = [
  {
    stacks: [
      { value: 10, color: 'orange' },
      { value: 20, color: '#4ABFF4', marginBottom: 2 },
    ],
    label: 'Jan',
  },
  {
    stacks: [
      { value: 10, color: '#4ABFF4' },
      { value: 11, color: 'orange', marginBottom: 2 },
      { value: 15, color: '#28B2B3', marginBottom: 2 },
    ],
    label: 'Mar',
  },
  {
    stacks: [
      { value: 14, color: 'orange' },
      { value: 18, color: '#4ABFF4', marginBottom: 2 },
    ],
    label: 'Feb',
  },
  {
    stacks: [
      { value: 7, color: '#4ABFF4' },
      { value: 11, color: 'orange', marginBottom: 2 },
      { value: 10, color: '#28B2B3', marginBottom: 2 },
    ],
    label: 'Mar',
  },
];

export const todaysFeeling = [
  {
    id: 1,
    title: 'Good',
    color: Colors.GREEN,
    feelings: [
      {
        id: 1,
        title: 'Happy',
      },
      {
        id: 2,
        title: 'Excited',
      },
      {
        id: 3,
        title: 'Confident',
      },
      {
        id: 4,
        title: 'Joyful',
      },
      {
        id: 5,
        title: 'Calm',
      },
      {
        id: 6,
        title: 'Optimistic',
      },
      {
        id: 7,
        title: 'Grateful',
      },
      {
        id: 8,
        title: 'Chilled',
      },
    ],
  },
  {
    id: 2,
    title: 'Average',
    color: Colors.YELLOW_100,
    feelings: [
      {
        id: 1,
        title: 'Tired',
      },
      {
        id: 2,
        title: 'Numb',
      },
      {
        id: 3,
        title: 'Sad',
      },
      {
        id: 4,
        title: 'Annoyed',
      },
      {
        id: 5,
        title: 'Frustrated',
      },
      {
        id: 6,
        title: 'Overwhelmed',
      },
    ],
  },
  {
    id: 3,
    title: 'Bad',
    color: Colors.PEACHY_RED_200,
    feelings: [
      {
        id: 1,
        title: 'Angry',
      },
      {
        id: 2,
        title: 'Ashamed',
      },
      {
        id: 3,
        title: 'Guilty',
      },
      {
        id: 4,
        title: 'Afraid',
      },
      {
        id: 5,
        title: 'Insecure',
      },
      {
        id: 6,
        title: 'Anxious',
      },
      {
        id: 7,
        title: 'Depressed',
      },
    ],
  },
];

export const journalList = [
  {
    title: 'Today',
    data: [
      {
        id: 1,
        title: 'A little trip to the Bahamas',
        description: 'Sometime today, my mum told me the news...',
        date: 'Today — 12:48PM',
        color: Colors.COUCH_GREEN_200,
        time: 'today',
        icon: Images['happy-2'],
        bg: Colors.COUCH_BLUE,
      },
      {
        id: 2,
        title: 'A little trip to the Bahamas',
        description: 'Sometime today, my mum told me the news...',
        date: 'Today — 12:48PM',
        color: Colors.COUCH_GREEN_200,
        time: 'today',
        icon: Images['happy-2'],
        bg: Colors.COUCH_BLUE,
      },
      {
        id: 3,
        title: 'A little trip to the Bahamas',
        date: 'Today — 12:48PM',
        description: 'Sometime today, my mum told me the news...',
        color: Colors.COUCH_GREEN_200,
        time: 'today',
        icon: Images['happy-2'],
        bg: Colors.COUCH_BLUE,
      },
      {
        id: 4,
        title: 'A little trip to the Bahamas',
        date: 'Today — 12:48PM',
        color: Colors.COUCH_GREEN_200,
        description: 'Sometime today, my mum told me the news...',
        time: 'today',
        icon: Images['happy-white'],
        bg: Colors.COUCH_BLUE,
      },
      {
        id: 5,
        title: 'A little trip to the Bahamas',
        description: 'Sometime today, my mum told me the news...',
        date: 'Today — 12:48PM',
        color: Colors.COUCH_GREEN_200,
        time: 'today',
        icon: Images['happy-white'],
        bg: Colors.COUCH_BLUE,
      },
    ],
  },
  {
    title: 'Yesterday',
    data: [
      {
        id: 1,
        title: 'Happy',
        date: 'Today — 12:48PM',
        description: 'Sometime today, my mum told me the news...',
        color: Colors.COUCH_GREEN_200,
        time: 'today',
        icon: Images['happy-2'],
        bg: Colors.WHITE_TRANSPARENT,
      },
      {
        id: 2,
        title: 'Angry',
        date: 'Today — 12:48PM',
        description: 'Sometime today, my mum told me the news...',
        time: 'today',
        color: Colors.PEACHY_RED,
        icon: Images['angry-2'],
        bg: Colors.WHITE_TRANSPARENT,
      },
      {
        id: 3,
        title: 'Sad',
        date: 'Today — 12:48PM',
        description: 'Sometime today, my mum told me the news...',
        time: 'today',
        color: Colors.LIGHT_YELLOW_300,
        icon: Images['sad-2'],
        bg: Colors.WHITE_TRANSPARENT,
      },
      {
        id: 4,
        title: 'Extremely Happy',
        date: 'Today — 12:48PM',
        description: 'Sometime today, my mum told me the news...',
        color: Colors.COUCH_GREEN_200,
        time: 'today',
        icon: Images['happy-2'],
        bg: Colors.WHITE_TRANSPARENT,
      },
      {
        id: 5,
        title: 'Happy',
        date: 'Today — 12:48PM',
        description: 'Sometime today, my mum told me the news...',
        color: Colors.COUCH_GREEN_200,
        time: 'today',
        icon: Images['happy-2'],
        bg: Colors.WHITE_TRANSPARENT,
      },
    ],
  },
  {
    title: '8, Jan 2023',
    data: [
      {
        id: 1,
        title: 'Happy',
        date: 'Today — 12:48PM',
        description: 'Sometime today, my mum told me the news...',
        color: Colors.COUCH_GREEN_200,
        time: 'today',
        icon: Images['happy-2'],
        bg: Colors.WHITE_TRANSPARENT,
      },
      {
        id: 2,
        title: 'Angry',
        date: 'Today — 12:48PM',
        description: 'Sometime today, my mum told me the news...',
        time: 'today',
        color: Colors.PEACHY_RED,
        icon: Images['angry-2'],
        bg: Colors.WHITE_TRANSPARENT,
      },
      {
        id: 3,
        title: 'Sad',
        date: 'Today — 12:48PM',
        description: 'Sometime today, my mum told me the news...',
        time: 'today',
        color: Colors.LIGHT_YELLOW_300,
        icon: Images['sad-2'],
        bg: Colors.WHITE_TRANSPARENT,
      },
      {
        id: 4,
        title: 'Extremely Happy',
        date: 'Today — 12:48PM',
        description: 'Sometime today, my mum told me the news...',
        time: 'today',
        color: Colors.COUCH_GREEN_200,
        icon: Images['happy-2'],
        bg: Colors.WHITE_TRANSPARENT,
      },
      {
        id: 5,
        title: 'Happy',
        description: 'Sometime today, my mum told me the news...',
        date: 'Today — 12:48PM',
        time: 'today',
        color: Colors.COUCH_GREEN_200,
        icon: Images['happy-2'],
        bg: Colors.WHITE_TRANSPARENT,
      },
    ],
  },
];

export const noteOptionsIcons = [
  {
    id: 1,
    icon: Images['note-text'],
    'active-icon': Images['active-note-text'],
    value: 'text',
  },
  {
    id: 2,
    icon: Images['note-video'],
    value: 'video',
  },
  {
    id: 3,
    icon: Images['note-image'],
    'active-icon': Images['active-note-image'],
    value: 'image',
  },
  {
    id: 4,
    icon: Images['note-voice'],
    value: 'voice',
  },
  {
    id: 5,
    icon: Images['note-mood'],
    value: 'mood',
  },
];

export const recommendedOptions = [
  {
    id: 1,
    title: 'Recommended',
  },
  {
    id: 2,
    title: 'Sleep',
  },
];

export const categories = [
  {
    id: 1,
    title: 'Stress',
    tintColor: Colors.COUCH_BLUE,
  },
  {
    id: 2,
    title: 'Productivity',
    tintColor: Colors.GREEN_100,
  },
  {
    id: 3,
    title: 'Sleep',
    tintColor: Colors.WHITE,
  },
  {
    id: 4,
    title: 'Mental Health',
    tintColor: Colors.WARNING_AMBER,
  },
  {
    id: 5,
    title: 'Stress',
    tintColor: Colors.PURPLE,
  },
  {
    id: 6,
    title: 'Productivity',
    tintColor: Colors.COUCH_INFO_BLUE,
  },
];

export const recentlyRead = [
  {
    id: 1,
    title: 'How To Stay Calm And Centered During Financial Storms',
    image: Images['read-1'],
  },
  {
    id: 2,
    title: 'How To Stay Calm And Centered During Financial Storms',
    image: Images['read-2'],
  },
  {
    id: 3,
    title: 'How To Stay Calm And Centered During Financial Storms',
    image: Images['read-2'],
  },
];

export const recentlyWatched = [
  {
    id: 1,
    title: 'Productivity 101',
    description: '12:48 — Playtime',
    bg: Images['watch-recently'],
    options: ['#recommended', '#sleep'],
  },
  {
    id: 2,
    title: 'Productivity 101',
    description: '12:48 — Playtime',
    bg: Images['watch-recently'],
    options: ['#recommended', '#sleep'],
  },
  {
    id: 3,
    title: 'Productivity 101',
    description: '12:48 — Playtime',
    bg: Images['watch-recently'],
    options: ['#recommended', '#sleep'],
  },
];

export const topVideos = [
  {
    id: 1,
    title: 'Overcoming Work-related Stress',
    description: '12:48 — Playtime',
    bg: Images['watch-recently'],
    options: ['#stress', '#relief'],
  },
  {
    id: 2,
    title: 'Overcoming Work-related Stress',
    description: '12:48 — Playtime',
    bg: Images['watch-recently'],
    options: ['#stress', '#relief'],
  },
  {
    id: 3,
    title: 'Overcoming Work-related Stress',
    description: '12:48 — Playtime',
    bg: Images['watch-recently'],
    options: ['#stress', '#relief'],
  },
];

export const recentlyPlayed = [
  {
    id: 1,
    title: 'Productivity 101',
    tintColor: Colors.COUCH_BLUE,
    options: ['recommended', 'sleep'],
  },
  {
    id: 2,
    title: 'Dealing with work Stress...',
    tintColor: Colors.PURPLE_100,
    options: ['recommended', 'sleep'],
  },
  {
    id: 3,
    title: 'Productivity 101',
    tintColor: Colors.YELLOW_200,
    options: ['recommended', 'sleep'],
  },
];
