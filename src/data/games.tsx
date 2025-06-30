import { Game } from '../types/Game';

export const gameData: Game[] = [
  // Casual Games (Low Complexity)
  {
    id: 'chicken-nugget-chaos',
    title: 'Chicken Nugget Chaos',
    description: 'Collect falling nuggets while dodging sauce spills in this deliciously chaotic game!',
    category: 'casual',
    complexity: 'low',
    icon: '🍗',
    color: 'from-yellow-400 to-orange-500',
    isPlayable: true,
    tags: ['clicking', 'reflexes', 'food'],
    estimatedPlayTime: '2-5 min',
    difficulty: 2
  },
  {
    id: 'bubble-gum-blitz',
    title: 'Bubble Gum Blitz',
    description: 'Trap enemies in massive gum bubbles before they escape!',
    category: 'casual',
    complexity: 'low',
    icon: '🫧',
    color: 'from-pink-400 to-purple-500',
    isPlayable: true,
    tags: ['strategy', 'timing', 'colorful'],
    estimatedPlayTime: '3-6 min',
    difficulty: 2
  },
  {
    id: 'snail-racing-league',
    title: 'Snail Racing League',
    description: 'Experience the thrill of slow-motion racing with competitive snails.',
    category: 'casual',
    complexity: 'low',
    icon: '🐌',
    color: 'from-green-400 to-teal-500',
    isPlayable: true,
    tags: ['racing', 'humor', 'patience'],
    estimatedPlayTime: '4-8 min',
    difficulty: 1
  },
  {
    id: 'kitty-disco-fever',
    title: 'Kitty Disco Fever',
    description: 'Help cats groove to the beat in this purr-fect rhythm game!',
    category: 'casual',
    complexity: 'low',
    icon: '🐱',
    color: 'from-purple-400 to-pink-500',
    isPlayable: false,
    tags: ['rhythm', 'music', 'cats'],
    estimatedPlayTime: '3-7 min',
    difficulty: 3
  },
  {
    id: 'donut-defender',
    title: 'Donut Defender',
    description: 'Protect your precious donuts from hungry monsters!',
    category: 'casual',
    complexity: 'low',
    icon: '🍩',
    color: 'from-red-400 to-pink-500',
    isPlayable: false,
    tags: ['defense', 'clicking', 'sweet'],
    estimatedPlayTime: '2-5 min',
    difficulty: 2
  },

  // Arcade Games (Medium Complexity)
  {
    id: 'dance-battle-objects',
    title: 'Dance Battle: Objects',
    description: 'Challenge everyday objects to epic dance battles!',
    category: 'arcade',
    complexity: 'medium',
    icon: '💃',
    color: 'from-cyan-400 to-blue-500',
    isPlayable: true,
    tags: ['dancing', 'humor', 'competitive'],
    estimatedPlayTime: '5-10 min',
    difficulty: 3
  },
  {
    id: 'cloud-hopper',
    title: 'Cloud Hopper',
    description: 'Jump from cloud to cloud in this sky-high platformer adventure.',
    category: 'arcade',
    complexity: 'medium',
    icon: '☁️',
    color: 'from-blue-300 to-indigo-500',
    isPlayable: false,
    tags: ['platformer', 'jumping', 'sky'],
    estimatedPlayTime: '6-12 min',
    difficulty: 4
  },
  {
    id: 'toilet-plunger-hero',
    title: 'Toilet Plunger Hero',
    description: 'Save the day as a heroic plumber in this side-scrolling adventure.',
    category: 'arcade',
    complexity: 'medium',
    icon: '🪠',
    color: 'from-brown-400 to-yellow-600',
    isPlayable: false,
    tags: ['hero', 'plumbing', 'adventure'],
    estimatedPlayTime: '8-15 min',
    difficulty: 3
  },
  {
    id: 'pizza-delivery-space',
    title: 'Pizza Delivery in Space',
    description: 'Navigate asteroid fields to deliver hot pizza to alien customers.',
    category: 'arcade',
    complexity: 'medium',
    icon: '🚀',
    color: 'from-purple-500 to-indigo-600',
    isPlayable: false,
    tags: ['space', 'delivery', 'obstacles'],
    estimatedPlayTime: '7-14 min',
    difficulty: 4
  },
  {
    id: 'mermaid-makeup-madness',
    title: 'Mermaid Makeup Madness',
    description: 'Style beautiful mermaids with magical underwater cosmetics.',
    category: 'arcade',
    complexity: 'medium',
    icon: '🧜‍♀️',
    color: 'from-teal-400 to-cyan-600',
    isPlayable: false,
    tags: ['styling', 'creativity', 'underwater'],
    estimatedPlayTime: '10-20 min',
    difficulty: 2
  },

  // Adventure Games (High Complexity)
  {
    id: 'dream-walker',
    title: 'Dream Walker',
    description: 'Explore surreal 3D dreamscapes and solve mind-bending puzzles.',
    category: 'adventure',
    complexity: 'high',
    icon: '🌙',
    color: 'from-indigo-500 to-purple-700',
    isPlayable: false,
    tags: ['3D', 'puzzles', 'surreal'],
    estimatedPlayTime: '15-30 min',
    difficulty: 5
  },
  {
    id: 'plant-whisperer',
    title: 'Plant Whisperer',
    description: 'Communicate with sentient plants to unlock botanical mysteries.',
    category: 'adventure',
    complexity: 'high',
    icon: '🌱',
    color: 'from-green-500 to-emerald-700',
    isPlayable: false,
    tags: ['nature', 'communication', 'mystery'],
    estimatedPlayTime: '20-40 min',
    difficulty: 4
  },
  {
    id: 'shadow-puppet-warfare',
    title: 'Shadow Puppet Warfare',
    description: 'Command magical shadow puppets in epic 3D combat battles.',
    category: 'adventure',
    complexity: 'high',
    icon: '🎭',
    color: 'from-gray-700 to-black',
    isPlayable: false,
    tags: ['combat', '3D', 'strategy'],
    estimatedPlayTime: '12-25 min',
    difficulty: 5
  },
  {
    id: 'food-mutation-lab',
    title: 'Food Mutation Lab',
    description: 'Mix and mutate foods to create bizarre culinary creatures.',
    category: 'adventure',
    complexity: 'high',
    icon: '🧪',
    color: 'from-lime-400 to-green-600',
    isPlayable: false,
    tags: ['science', 'creativity', 'mutation'],
    estimatedPlayTime: '18-35 min',
    difficulty: 4
  },
  {
    id: 'time-traveler-wardrobe',
    title: 'Time Traveler\'s Wardrobe',
    description: 'Fix historical fashion disasters across different time periods.',
    category: 'adventure',
    complexity: 'high',
    icon: '⏰',
    color: 'from-amber-500 to-orange-700',
    isPlayable: false,
    tags: ['time-travel', 'fashion', 'history'],
    estimatedPlayTime: '25-45 min',
    difficulty: 4
  }
];
