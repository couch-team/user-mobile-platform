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
    title: 'Depression',
  },
  {
    id: 2,
    title: 'Anxiety',
  },
  {
    id: 3,
    title: 'Trauma/PTSD',
  },
  {
    id: 4,
    title: 'Self Improvement',
  },
  {
    id: 5,
    title: 'Relationship Issues',
  },
  {
    id: 6,
    title: 'Direction',
  },
  {
    id: 7,
    title: 'Other',
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
    title: 'Social media ads',
  },
  {
    id: 2,
    title: 'Referral',
  },
  {
    id: 3,
    title: 'Online search',
  },
  {
    id: 4,
    title: 'Event',
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
    title: 'Good — (7-9 Hours of sleep)',
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
    screen: 'Cbt',
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

export const cbtData = [
  {
    id: 1,
    title: 'Overcoming Anxiety and Fear',
    description: 'Beat up fear and anxiety. Own your mind and thoughts.',
    image: Images['cbt-1'],
    options: ['10 Sessions', '4 Days', '~10Mins / Day'],
  },
  {
    id: 2,
    title: 'Overcoming Anxiety and Fear',
    description: 'Beat up fear and anxiety. Own your mind and thoughts.',
    image: Images['cbt-2'],
    options: ['10 Sessions', '4 Days', '~10Mins / Day'],
  },
  {
    id: 3,
    title: 'Overcoming Anxiety and Fear',
    description: 'Beat up fear and anxiety. Own your mind and thoughts.',
    image: Images['cbt-3'],
    options: ['10 Sessions', '4 Days', '~10Mins / Day'],
  },
  {
    id: 4,
    title: 'Overcoming Anxiety and Fear',
    description: 'Beat up fear and anxiety. Own your mind and thoughts.',
    image: Images['cbt-4'],
    options: ['10 Sessions', '4 Days', '~10Mins / Day'],
  },
  {
    id: 5,
    title: 'Overcoming Anxiety and Fear',
    description: 'Beat up fear and anxiety. Own your mind and thoughts.',
    image: Images['cbt-1'],
    options: ['10 Sessions', '4 Days', '~10Mins / Day'],
  },
  {
    id: 6,
    title: 'Overcoming Anxiety and Fear',
    description: 'Beat up fear and anxiety. Own your mind and thoughts.',
    image: Images['cbt-2'],
    options: ['10 Sessions', '4 Days', '~10Mins / Day'],
  },
];

export const cbtPlayData = [
  {
    title: 'Day 1',
    hasStarted: true,
    data: [
      {
        id: 1,
        title: 'Try not to believe everything you see',
        type: 'video',
        isPlayed: true,
        hasStarted: true,
        options: ['4 Mins', 'Cognitive Journal'],
      },
      {
        id: 2,
        title: 'How to view things positively from a negative mindset',
        type: 'text',
        isPlayed: true,
        hasStarted: true,
        options: ['4 Mins', 'Cognitive Journal'],
      },
      {
        id: 3,
        title: 'How to view things positively from a negative mindset',
        type: 'audio',
        isPlayed: true,
        hasStarted: true,
        options: ['4 Mins', 'Cognitive Journal'],
      },
    ],
  },
  {
    title: 'Day 2',
    hasStarted: true,
    data: [
      {
        id: 1,
        title: 'Try not to believe everything you see',
        type: 'video',
        isPlayed: true,
        hasStarted: true,
        options: ['4 Mins', 'Cognitive Journal'],
      },
      {
        id: 2,
        title: 'How to view things positively from a negative mindset',
        type: 'text',
        isPlayed: true,
        hasStarted: true,
        options: ['4 Mins', 'Cognitive Journal'],
      },
      {
        id: 3,
        title: 'How to view things positively from a negative mindset',
        type: 'test',
        isPlayed: true,
        hasStarted: true,
        options: ['6 Mins', 'Trivia'],
      },
    ],
  },
  {
    title: 'Day 3',
    hasStarted: false,
    data: [
      {
        id: 1,
        title: 'Try not to believe everything you see',
        type: 'video',
        isPlayed: true,
        hasStarted: false,
        options: ['4 Mins', 'Cognitive Journal'],
      },
      {
        id: 2,
        title: 'How to view things positively from a negative mindset',
        type: 'text',
        isPlayed: true,
        hasStarted: false,
        options: ['4 Mins', 'Cognitive Journal'],
      },
      {
        id: 3,
        title: 'How to view things positively from a negative mindset',
        type: 'test',
        isPlayed: true,
        hasStarted: true,
        options: ['6 Mins', 'Trivia'],
      },
    ],
  },
];

export const states = [
  'Abia',
  'Adamawa',
  'Akwa Ibom',
  'Anambra',
  'Bauchi',
  'Bayelsa',
  'Benue',
  'Borno',
  'Cross River',
  'Delta',
  'Ebonyi',
  'Edo',
  'Ekiti',
  'Enugu',
  'FCT - Abuja',
  'Gombe',
  'Imo',
  'Jigawa',
  'Kaduna',
  'Kano',
  'Katsina',
  'Kebbi',
  'Kogi',
  'Kwara',
  'Lagos',
  'Nasarawa',
  'Niger',
  'Ogun',
  'Ondo',
  'Osun',
  'Oyo',
  'Plateau',
  'Rivers',
  'Sokoto',
  'Taraba',
  'Yobe',
  'Zamfara',
];

export const countryList = [
  { name: 'Afghanistan', dial_code: '+93', code: 'AF', flag: '🇦🇫' },
  { name: 'Albania', dial_code: '+355', code: 'AL', flag: '🇦🇱' },
  { name: 'Algeria', dial_code: '+213', code: 'DZ', flag: '🇩🇿' },
  { name: 'AmericanSamoa', dial_code: '+1684', code: 'AS', flag: '🇦🇸' },
  { name: 'Andorra', dial_code: '+376', code: 'AD', flag: '🇦🇩' },
  { name: 'Angola', dial_code: '+244', code: 'AO', flag: '🇦🇴' },
  { name: 'Anguilla', dial_code: '+1264', code: 'AI', flag: '🇦🇮' },
  { name: 'Antarctica', dial_code: '+672', code: 'AQ', flag: '🇦🇶' },
  { name: 'Antigua and Barbuda', dial_code: '+1268', code: 'AG', flag: '🇦🇬' },
  { name: 'Argentina', dial_code: '+54', code: 'AR', flag: '🇦🇷' },
  { name: 'Armenia', dial_code: '+374', code: 'AM', flag: '🇦🇲' },
  { name: 'Aruba', dial_code: '+297', code: 'AW', flag: '🇦🇼' },
  {
    name: 'Australia',
    dial_code: '+61',
    code: 'AU',
    preferred: true,
    flag: '🇦🇺',
  },
  { name: 'Austria', dial_code: '+43', code: 'AT', flag: '🇦🇹' },
  { name: 'Azerbaijan', dial_code: '+994', code: 'AZ', flag: '🇦🇿' },
  { name: 'Bahamas', dial_code: '+1242', code: 'BS', flag: '🇧🇸' },
  { name: 'Bahrain', dial_code: '+973', code: 'BH', flag: '🇧🇭' },
  { name: 'Bangladesh', dial_code: '+880', code: 'BD', flag: '🇧🇩' },
  { name: 'Barbados', dial_code: '+1246', code: 'BB', flag: '🇧🇧' },
  { name: 'Belarus', dial_code: '+375', code: 'BY', flag: '🇧🇾' },
  { name: 'Belgium', dial_code: '+32', code: 'BE', flag: '🇧🇪' },
  { name: 'Belize', dial_code: '+501', code: 'BZ', flag: '🇧🇿' },
  { name: 'Benin', dial_code: '+229', code: 'BJ', flag: '🇧🇯' },
  { name: 'Bermuda', dial_code: '+1441', code: 'BM', flag: '🇧🇲' },
  { name: 'Bhutan', dial_code: '+975', code: 'BT', flag: '🇧🇹' },
  {
    name: 'Bolivia, Plurinational State of',
    dial_code: '+591',
    code: 'BO',
    flag: '🇧🇴',
  },
  { name: 'Bosnia and Herzegovina', dial_code: '+387', code: 'BA', flag: '🇧🇦' },
  { name: 'Botswana', dial_code: '+267', code: 'BW', flag: '🇧🇼' },
  { name: 'Brazil', dial_code: '+55', code: 'BR', flag: '🇧🇷' },
  {
    name: 'British Indian Ocean Territory',
    dial_code: '+246',
    code: 'IO',
    flag: '🇮🇴',
  },
  { name: 'Brunei Darussalam', dial_code: '+673', code: 'BN', flag: '🇧🇳' },
  { name: 'Bulgaria', dial_code: '+359', code: 'BG', flag: '🇧🇬' },
  { name: 'Burkina Faso', dial_code: '+226', code: 'BF', flag: '🇧🇫' },
  { name: 'Burundi', dial_code: '+257', code: 'BI', flag: '🇧🇮' },
  { name: 'Cambodia', dial_code: '+855', code: 'KH', flag: '🇰🇭' },
  { name: 'Cameroon', dial_code: '+237', code: 'CM', flag: '🇨🇲' },
  { name: 'Canada', dial_code: '+1', code: 'CA', flag: '🇨🇦' },
  { name: 'Cape Verde', dial_code: '+238', code: 'CV', flag: '🇨🇻' },
  { name: 'Cayman Islands', dial_code: '+345', code: 'KY', flag: '🇰🇾' },
  {
    name: 'Central African Republic',
    dial_code: '+236',
    code: 'CF',
    flag: '🇨🇫',
  },
  { name: 'Chad', dial_code: '+235', code: 'TD', flag: '🇹🇩' },
  { name: 'Chile', dial_code: '+56', code: 'CL', flag: '🇨🇱' },
  { name: 'China', dial_code: '+86', code: 'CN', flag: '🇨🇳' },
  { name: 'Christmas Island', dial_code: '+61', code: 'CX', flag: '🇨🇽' },
  { name: 'Cocos (Keeling) Islands', dial_code: '+61', code: 'CC', flag: '🇨🇨' },
  { name: 'Colombia', dial_code: '+57', code: 'CO', flag: '🇨🇴' },
  { name: 'Comoros', dial_code: '+269', code: 'KM', flag: '🇰🇲' },
  { name: 'Congo', dial_code: '+242', code: 'CG', flag: '🇨🇬' },
  {
    name: 'Congo, The Democratic Republic of the',
    dial_code: '+243',
    code: 'CD',
    flag: '🇨🇩',
  },
  { name: 'Cook Islands', dial_code: '+682', code: 'CK', flag: '🇨🇰' },
  { name: 'Costa Rica', dial_code: '+506', code: 'CR', flag: '🇨🇷' },
  { name: "Cote d'Ivoire", dial_code: '+225', code: 'CI', flag: '🇨🇮' },
  { name: 'Croatia', dial_code: '+385', code: 'HR', flag: '🇭🇷' },
  { name: 'Cuba', dial_code: '+53', code: 'CU', flag: '🇨🇺' },
  { name: 'Cyprus', dial_code: '+357', code: 'CY', flag: '🇨🇾' },
  { name: 'Czech Republic', dial_code: '+420', code: 'CZ', flag: '🇨🇿' },
  { name: 'Denmark', dial_code: '+45', code: 'DK', flag: '🇩🇰' },
  { name: 'Djibouti', dial_code: '+253', code: 'DJ', flag: '🇩🇯' },
  { name: 'Dominica', dial_code: '+1767', code: 'DM', flag: '🇩🇲' },
  { name: 'Dominican Republic', dial_code: '+1849', code: 'DO', flag: '🇩🇴' },
  { name: 'Ecuador', dial_code: '+593', code: 'EC', flag: '🇪🇨' },
  { name: 'Egypt', dial_code: '+20', code: 'EG', flag: '🇪🇬' },
  { name: 'El Salvador', dial_code: '+503', code: 'SV', flag: '🇸🇻' },
  { name: 'Equatorial Guinea', dial_code: '+240', code: 'GQ', flag: '🇬🇶' },
  { name: 'Eritrea', dial_code: '+291', code: 'ER', flag: '🇪🇷' },
  { name: 'Estonia', dial_code: '+372', code: 'EE', flag: '🇪🇪' },
  { name: 'Ethiopia', dial_code: '+251', code: 'ET', flag: '🇪🇹' },
  {
    name: 'Falkland Islands (Malvinas)',
    dial_code: '+500',
    code: 'FK',
    flag: '🇫🇰',
  },
  { name: 'Faroe Islands', dial_code: '+298', code: 'FO', flag: '🇫🇴' },
  { name: 'Fiji', dial_code: '+679', code: 'FJ', flag: '🇫🇯' },
  { name: 'Finland', dial_code: '+358', code: 'FI', flag: '🇫🇮' },
  { name: 'France', dial_code: '+33', code: 'FR', flag: '🇫🇷' },
  { name: 'French Guiana', dial_code: '+594', code: 'GF', flag: '🇬🇫' },
  { name: 'French Polynesia', dial_code: '+689', code: 'PF', flag: '🇵🇫' },
  { name: 'Gabon', dial_code: '+241', code: 'GA', flag: '🇬🇦' },
  { name: 'Gambia', dial_code: '+220', code: 'GM', flag: '🇬🇲' },
  { name: 'Georgia', dial_code: '+995', code: 'GE', flag: '🇬🇪' },
  { name: 'Germany', dial_code: '+49', code: 'DE', flag: '🇩🇪' },
  { name: 'Ghana', dial_code: '+233', code: 'GH', flag: '🇬🇭' },
  { name: 'Gibraltar', dial_code: '+350', code: 'GI', flag: '🇬🇮' },
  { name: 'Greece', dial_code: '+30', code: 'GR', flag: '🇬🇷' },
  { name: 'Greenland', dial_code: '+299', code: 'GL', flag: '🇬🇱' },
  { name: 'Grenada', dial_code: '+1473', code: 'GD', flag: '🇬🇩' },
  { name: 'Guadeloupe', dial_code: '+590', code: 'GP', flag: '🇬🇵' },
  { name: 'Guam', dial_code: '+1671', code: 'GU', flag: '🇬🇺' },
  { name: 'Guatemala', dial_code: '+502', code: 'GT', flag: '🇬🇹' },
  { name: 'Guernsey', dial_code: '+44', code: 'GG', flag: '🇬🇬' },
  { name: 'Guinea', dial_code: '+224', code: 'GN', flag: '🇬🇳' },
  { name: 'Guinea-Bissau', dial_code: '+245', code: 'GW', flag: '🇬🇼' },
  { name: 'Guyana', dial_code: '+595', code: 'GY', flag: '🇬🇾' },
  { name: 'Haiti', dial_code: '+509', code: 'HT', flag: '🇭🇹' },
  {
    name: 'Holy See (Vatican City State)',
    dial_code: '+379',
    code: 'VA',
    flag: '🇻🇦',
  },
  { name: 'Honduras', dial_code: '+504', code: 'HN', flag: '🇭🇳' },
  { name: 'Hong Kong', dial_code: '+852', code: 'HK', flag: '🇭🇰' },
  { name: 'Hungary', dial_code: '+36', code: 'HU', flag: '🇭🇺' },
  { name: 'Iceland', dial_code: '+354', code: 'IS', flag: '🇮🇸' },
  { name: 'India', dial_code: '+91', code: 'IN', preferred: true, flag: '🇮🇳' },
  { name: 'Indonesia', dial_code: '+62', code: 'ID', flag: '🇮🇩' },
  {
    name: 'Iran, Islamic Republic of',
    dial_code: '+98',
    code: 'IR',
    flag: '🇮🇷',
  },
  { name: 'Iraq', dial_code: '+964', code: 'IQ', flag: '🇮🇶' },
  { name: 'Ireland', dial_code: '+353', code: 'IE', flag: '🇮🇪' },
  { name: 'Isle of Man', dial_code: '+44', code: 'IM', flag: '🇮🇲' },
  { name: 'Israel', dial_code: '+972', code: 'IL', flag: '🇮🇱' },
  { name: 'Italy', dial_code: '+39', code: 'IT', flag: '🇮🇹' },
  { name: 'Jamaica', dial_code: '+1876', code: 'JM', flag: '🇯🇲' },
  { name: 'Japan', dial_code: '+81', code: 'JP', flag: '🇯🇵' },
  { name: 'Jersey', dial_code: '+44', code: 'JE', flag: '🇯🇪' },
  { name: 'Jordan', dial_code: '+962', code: 'JO', flag: '🇯🇴' },
  { name: 'Kazakhstan', dial_code: '+77', code: 'KZ', flag: '🇰🇿' },
  { name: 'Kenya', dial_code: '+254', code: 'KE', flag: '🇰🇪' },
  { name: 'Kiribati', dial_code: '+686', code: 'KI', flag: '🇰🇮' },
  {
    name: "Korea, Democratic People's Republic of",
    dial_code: '+850',
    code: 'KP',
    flag: '🇰🇵',
  },
  { name: 'Korea, Republic of', dial_code: '+82', code: 'KR', flag: '🇰🇷' },
  { name: 'Kuwait', dial_code: '+965', code: 'KW', flag: '🇰🇼' },
  { name: 'Kyrgyzstan', dial_code: '+996', code: 'KG', flag: '🇰🇬' },
  {
    name: "Lao People's Democratic Republic",
    dial_code: '+856',
    code: 'LA',
    flag: '🇱🇦',
  },
  { name: 'Latvia', dial_code: '+371', code: 'LV', flag: '🇱🇻' },
  { name: 'Lebanon', dial_code: '+961', code: 'LB', flag: '🇱🇧' },
  { name: 'Lesotho', dial_code: '+266', code: 'LS', flag: '🇱🇸' },
  { name: 'Liberia', dial_code: '+231', code: 'LR', flag: '🇱🇷' },
  { name: 'Libyan Arab Jamahiriya', dial_code: '+218', code: 'LY', flag: '🇱🇾' },
  { name: 'Liechtenstein', dial_code: '+423', code: 'LI', flag: '🇱🇮' },
  { name: 'Lithuania', dial_code: '+370', code: 'LT', flag: '🇱🇹' },
  { name: 'Luxembourg', dial_code: '+352', code: 'LU', flag: '🇱🇺' },
  { name: 'Macao', dial_code: '+853', code: 'MO', flag: '🇲🇴' },
  {
    name: 'Macedonia, The Former Yugoslav Republic of',
    dial_code: '+389',
    code: 'MK',
    flag: '🇲🇰',
  },
  { name: 'Madagascar', dial_code: '+261', code: 'MG', flag: '🇲🇬' },
  { name: 'Malawi', dial_code: '+265', code: 'MW', flag: '🇲🇼' },
  { name: 'Malaysia', dial_code: '+60', code: 'MY', flag: '🇲🇾' },
  { name: 'Maldives', dial_code: '+960', code: 'MV', flag: '🇲🇻' },
  { name: 'Mali', dial_code: '+223', code: 'ML', flag: '🇲🇱' },
  { name: 'Malta', dial_code: '+356', code: 'MT', flag: '🇲🇹' },
  { name: 'Marshall Islands', dial_code: '+692', code: 'MH', flag: '🇲🇭' },
  { name: 'Martinique', dial_code: '+596', code: 'MQ', flag: '🇲🇶' },
  { name: 'Mauritania', dial_code: '+222', code: 'MR', flag: '🇲🇷' },
  { name: 'Mauritius', dial_code: '+230', code: 'MU', flag: '🇲🇺' },
  { name: 'Mayotte', dial_code: '+262', code: 'YT', flag: '🇾🇹' },
  { name: 'Mexico', dial_code: '+52', code: 'MX', flag: '🇲🇽' },
  {
    name: 'Micronesia, Federated States of',
    dial_code: '+691',
    code: 'FM',
    flag: '🇫🇲',
  },
  { name: 'Moldova, Republic of', dial_code: '+373', code: 'MD', flag: '🇲🇩' },
  { name: 'Monaco', dial_code: '+377', code: 'MC', flag: '🇲🇨' },
  { name: 'Mongolia', dial_code: '+976', code: 'MN', flag: '🇲🇳' },
  { name: 'Montenegro', dial_code: '+382', code: 'ME', flag: '🇲🇪' },
  { name: 'Montserrat', dial_code: '+1664', code: 'MS', flag: '🇲🇸' },
  { name: 'Morocco', dial_code: '+212', code: 'MA', flag: '🇲🇦' },
  { name: 'Mozambique', dial_code: '+258', code: 'MZ', flag: '🇲🇿' },
  { name: 'Myanmar', dial_code: '+95', code: 'MM', flag: '🇲🇲' },
  { name: 'Namibia', dial_code: '+264', code: 'NA', flag: '🇳🇦' },
  { name: 'Nauru', dial_code: '+674', code: 'NR', flag: '🇳🇷' },
  { name: 'Nepal', dial_code: '+977', code: 'NP', flag: '🇳🇵' },
  { name: 'Netherlands', dial_code: '+31', code: 'NL', flag: '🇳🇱' },
  { name: 'Netherlands Antilles', dial_code: '+599', code: 'AN', flag: '🇦🇳' },
  { name: 'New Caledonia', dial_code: '+687', code: 'NC', flag: '🇳🇨' },
  { name: 'New Zealand', dial_code: '+64', code: 'NZ', flag: '🇳🇿' },
  { name: 'Nicaragua', dial_code: '+505', code: 'NI', flag: '🇳🇮' },
  { name: 'Niger', dial_code: '+227', code: 'NE', flag: '🇳🇪' },
  { name: 'Nigeria', dial_code: '+234', code: 'NG', flag: '🇳🇬' },
  { name: 'Niue', dial_code: '+683', code: 'NU', flag: '🇳🇺' },
  { name: 'Norfolk Island', dial_code: '+672', code: 'NF', flag: '🇳🇫' },
  {
    name: 'Northern Mariana Islands',
    dial_code: '+1670',
    code: 'MP',
    flag: '🇲🇵',
  },
  { name: 'Norway', dial_code: '+47', code: 'NO', flag: '🇳🇴' },
  { name: 'Oman', dial_code: '+968', code: 'OM', flag: '🇴🇲' },
  { name: 'Pakistan', dial_code: '+92', code: 'PK', flag: '🇵🇰' },
  { name: 'Palau', dial_code: '+680', code: 'PW', flag: '🇵🇼' },
  {
    name: 'Palestinian Territory, Occupied',
    dial_code: '+970',
    code: 'PS',
    flag: '🇵🇸',
  },
  { name: 'Panama', dial_code: '+507', code: 'PA', flag: '🇵🇦' },
  { name: 'Papua New Guinea', dial_code: '+675', code: 'PG', flag: '🇵🇬' },
  { name: 'Paraguay', dial_code: '+595', code: 'PY', flag: '🇵🇾' },
  { name: 'Peru', dial_code: '+51', code: 'PE', flag: '🇵🇪' },
  { name: 'Philippines', dial_code: '+63', code: 'PH', flag: '🇵🇭' },
  { name: 'Pitcairn', dial_code: '+872', code: 'PN', flag: '🇵🇳' },
  { name: 'Poland', dial_code: '+48', code: 'PL', flag: '🇵🇱' },
  { name: 'Portugal', dial_code: '+351', code: 'PT', flag: '🇵🇹' },
  { name: 'Puerto Rico', dial_code: '+1939', code: 'PR', flag: '🇵🇷' },
  { name: 'Qatar', dial_code: '+974', code: 'QA', flag: '🇶🇦' },
  { name: 'Romania', dial_code: '+40', code: 'RO', flag: '🇷🇴' },
  { name: 'Russia', dial_code: '+7', code: 'RU', flag: '🇷🇺' },
  { name: 'Rwanda', dial_code: '+250', code: 'RW', flag: '🇷🇼' },
  { name: 'Réunion', dial_code: '+262', code: 'RE', flag: '🇷🇪' },
  { name: 'Saint Barthélemy', dial_code: '+590', code: 'BL', flag: '🇧🇱' },
  {
    name: 'Saint Helena, Ascension and Tristan Da Cunha',
    dial_code: '+290',
    code: 'SH',
    flag: '🇸🇭',
  },
  { name: 'Saint Kitts and Nevis', dial_code: '+1869', code: 'KN', flag: '🇰🇳' },
  { name: 'Saint Lucia', dial_code: '+1758', code: 'LC', flag: '🇱🇨' },
  { name: 'Saint Martin', dial_code: '+590', code: 'MF', flag: '🇲🇫' },
  {
    name: 'Saint Pierre and Miquelon',
    dial_code: '+508',
    code: 'PM',
    flag: '🇵🇲',
  },
  {
    name: 'Saint Vincent and the Grenadines',
    dial_code: '+1784',
    code: 'VC',
    flag: '🇻🇨',
  },
  { name: 'Samoa', dial_code: '+685', code: 'WS', flag: '🇼🇸' },
  { name: 'San Marino', dial_code: '+378', code: 'SM', flag: '🇸🇲' },
  { name: 'Sao Tome and Principe', dial_code: '+239', code: 'ST', flag: '🇸🇹' },
  { name: 'Saudi Arabia', dial_code: '+966', code: 'SA', flag: '🇸🇦' },
  { name: 'Senegal', dial_code: '+221', code: 'SN', flag: '🇸🇳' },
  { name: 'Serbia', dial_code: '+381', code: 'RS', flag: '🇷🇸' },
  { name: 'Seychelles', dial_code: '+248', code: 'SC', flag: '🇸🇨' },
  { name: 'Sierra Leone', dial_code: '+232', code: 'SL', flag: '🇸🇱' },
  { name: 'Singapore', dial_code: '+65', code: 'SG', flag: '🇸🇬' },
  { name: 'Slovakia', dial_code: '+421', code: 'SK', flag: '🇸🇰' },
  { name: 'Slovenia', dial_code: '+386', code: 'SI', flag: '🇸🇮' },
  { name: 'Solomon Islands', dial_code: '+677', code: 'SB', flag: '🇸🇧' },
  { name: 'Somalia', dial_code: '+252', code: 'SO', flag: '🇸🇴' },
  { name: 'South Africa', dial_code: '+27', code: 'ZA', flag: '🇿🇦' },
  {
    name: 'South Georgia and the South Sandwich Islands',
    dial_code: '+500',
    code: 'GS',
    flag: '🇬🇸',
  },
  { name: 'Spain', dial_code: '+34', code: 'ES', flag: '🇪🇸' },
  { name: 'Sri Lanka', dial_code: '+94', code: 'LK', flag: '🇱🇰' },
  { name: 'Sudan', dial_code: '+249', code: 'SD', flag: '🇸🇩' },
  { name: 'Suriname', dial_code: '+597', code: 'SR', flag: '🇸🇷' },
  { name: 'Svalbard and Jan Mayen', dial_code: '+47', code: 'SJ', flag: '🇸🇯' },
  { name: 'Swaziland', dial_code: '+268', code: 'SZ', flag: '🇸🇿' },
  { name: 'Sweden', dial_code: '+46', code: 'SE', flag: '🇸🇪' },
  { name: 'Switzerland', dial_code: '+41', code: 'CH', flag: '🇨🇭' },
  { name: 'Syrian Arab Republic', dial_code: '+963', code: 'SY', flag: '🇸🇾' },
  {
    name: 'Taiwan, Province of China',
    dial_code: '+886',
    code: 'TW',
    flag: '🇹🇼',
  },
  { name: 'Tajikistan', dial_code: '+992', code: 'TJ', flag: '🇹🇯' },
  {
    name: 'Tanzania, United Republic of',
    dial_code: '+255',
    code: 'TZ',
    flag: '🇹🇿',
  },
  { name: 'Thailand', dial_code: '+66', code: 'TH', flag: '🇹🇭' },
  { name: 'Timor-Leste', dial_code: '+670', code: 'TL', flag: '🇹🇱' },
  { name: 'Togo', dial_code: '+228', code: 'TG', flag: '🇹🇬' },
  { name: 'Tokelau', dial_code: '+690', code: 'TK', flag: '🇹🇰' },
  { name: 'Tonga', dial_code: '+676', code: 'TO', flag: '🇹🇴' },
  { name: 'Trinidad and Tobago', dial_code: '+1868', code: 'TT', flag: '🇹🇹' },
  { name: 'Tunisia', dial_code: '+216', code: 'TN', flag: '🇹🇳' },
  { name: 'Turkey', dial_code: '+90', code: 'TR', flag: '🇹🇷' },
  { name: 'Turkmenistan', dial_code: '+993', code: 'TM', flag: '🇹🇲' },
  {
    name: 'Turks and Caicos Islands',
    dial_code: '+1649',
    code: 'TC',
    flag: '🇹🇨',
  },
  { name: 'Tuvalu', dial_code: '+688', code: 'TV', flag: '🇹🇻' },
  { name: 'Uganda', dial_code: '+256', code: 'UG', flag: '🇺🇬' },
  { name: 'Ukraine', dial_code: '+380', code: 'UA', flag: '🇺🇦' },
  {
    name: 'United Arab Emirates',
    dial_code: '+971',
    code: 'AE',
    preferred: true,
    flag: '🇦🇪',
  },
  {
    name: 'United Kingdom',
    dial_code: '+44',
    code: 'GB',
    preferred: true,
    flag: '🇬🇧',
  },
  {
    name: 'United States',
    dial_code: '+1',
    code: 'US',
    preferred: true,
    flag: '🇺🇸',
  },
  { name: 'Uruguay', dial_code: '+598', code: 'UY', flag: '🇺🇾' },
  { name: 'Uzbekistan', dial_code: '+998', code: 'UZ', flag: '🇺🇿' },
  { name: 'Vanuatu', dial_code: '+678', code: 'VU', flag: '🇻🇺' },
  {
    name: 'Venezuela, Bolivarian Republic of',
    dial_code: '+58',
    code: 'VE',
    flag: '🇻🇪',
  },
  { name: 'Viet Nam', dial_code: '+84', code: 'VN', flag: '🇻🇳' },
  {
    name: 'Virgin Islands, British',
    dial_code: '+1284',
    code: 'VG',
    flag: '🇻🇬',
  },
  { name: 'Virgin Islands, U.S.', dial_code: '+1340', code: 'VI', flag: '🇻🇮' },
  { name: 'Wallis and Futuna', dial_code: '+681', code: 'WF', flag: '🇼🇫' },
  { name: 'Yemen', dial_code: '+967', code: 'YE', flag: '🇾🇪' },
  { name: 'Zambia', dial_code: '+260', code: 'ZM', flag: '🇿🇲' },
  { name: 'Zimbabwe', dial_code: '+263', code: 'ZW', flag: '🇿🇼' },
  { name: 'Åland Islands', dial_code: '+358', code: 'AX', flag: '🇦🇽' },
];
