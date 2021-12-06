export const TYPES = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];

export const DESTINATIONS = [
  {
    name: 'Amsterdam',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
    pictures: [
      {
        src: `http://picsum.photos/248/152?r=${Math.random()}`,
        description: 'Description',
      },
      {
        src: `http://picsum.photos/248/152?r=${Math.random()}`,
        description: 'Description',
      },
      {
        src: `http://picsum.photos/248/152?r=${Math.random()}`,
        description: 'Description',
      },
      {
        src: `http://picsum.photos/248/152?r=${Math.random()}`,
        description: 'Description',
      },
    ],
  },
  {
    name: 'Geneva',
    description: 'Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. In rutrum ac purus sit amet tempus.',
    pictures: [
      {
        src: `http://picsum.photos/248/152?r=${Math.random()}`,
        description: 'Description',
      },
    ],
  },
  {
    name: 'Chamonix',
    description: '',
    pictures: [
      {
        src: `http://picsum.photos/248/152?r=${Math.random()}`,
        description: 'Description',
      },
      {
        src: `http://picsum.photos/248/152?r=${Math.random()}`,
        description: 'Description',
      },
    ],
  },
];

export const OFFERS = {
  'taxi': [
    {
      name: 'Upgrade to a business class',
      price: 120,
    },
    {
      name: 'Choose the radio station',
      price: 60,
    },
  ],
  'bus': [
    {
      name: 'Choose meal',
      price: 180,
    },
    {
      name: 'Upgrade to comfort class',
      price: 50,
    },
  ],
  'train': [
    {
      name: 'Choose meal',
      price: 110,
    },
    {
      name: 'Upgrade to comfort class',
      price: 50,
    },
  ],
  'ship': [
    {
      name: 'Add luggage',
      price: 30,
    },
    {
      name: 'Switch to comfort class',
      price: 140,
    },
  ],
  'flight': [
    {
      name: 'Add luggage',
      price: 30,
    },
    {
      name: 'Switch to comfort class',
      price: 100,
    },
    {
      name: 'Add meal',
      price: 15,
    },
    {
      name: 'Choose seats',
      price: 5,
    },
    {
      name: 'Travel by train',
      price: 40,
    },
  ],
  'check-in': [],
  'restaurant': [],
  'drive': [],
  'sightseeing': [],
};
