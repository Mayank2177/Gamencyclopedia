import { Game } from '../types/Game';

export const premiumGames: Game[] = [
  {
    id: 'quantum-cat-simulator',
    title: 'Quantum Cat Simulator',
    description: 'Experience the mysteries of quantum physics through the eyes of Schrödinger\'s cat!',
    category: 'adventure',
    complexity: 'high',
    icon: '🐱',
    color: 'from-purple-500 to-indigo-700',
    isPlayable: true,
    tags: ['quantum', 'physics', 'simulation', 'premium'],
    estimatedPlayTime: '15-25 min',
    difficulty: 4
  },
  {
    id: 'interdimensional-pizza',
    title: 'Interdimensional Pizza Delivery',
    description: 'Deliver pizzas across parallel universes with unique physics in each dimension!',
    category: 'arcade',
    complexity: 'medium',
    icon: '🍕',
    color: 'from-red-500 to-orange-600',
    isPlayable: true,
    tags: ['delivery', 'multiverse', 'physics', 'premium'],
    estimatedPlayTime: '8-12 min',
    difficulty: 3
  },
  {
    id: 'emoji-evolution-lab',
    title: 'Emoji Evolution Lab',
    description: 'Breed and evolve emojis to create the ultimate digital life forms!',
    category: 'casual',
    complexity: 'medium',
    icon: '🧬',
    color: 'from-green-400 to-teal-600',
    isPlayable: true,
    tags: ['evolution', 'breeding', 'emojis', 'premium'],
    estimatedPlayTime: '10-20 min',
    difficulty: 2
  },
  {
    id: 'time-loop-escape',
    title: 'Time Loop Escape Room',
    description: 'Break free from an endless time loop by solving increasingly complex puzzles!',
    category: 'adventure',
    complexity: 'high',
    icon: '⏰',
    color: 'from-blue-500 to-purple-700',
    isPlayable: true,
    tags: ['puzzle', 'time-travel', 'escape', 'premium'],
    estimatedPlayTime: '20-35 min',
    difficulty: 5
  },
  {
    id: 'cosmic-karaoke',
    title: 'Cosmic Karaoke Battle',
    description: 'Sing your way through the galaxy in epic karaoke battles with alien species!',
    category: 'arcade',
    complexity: 'medium',
    icon: '🎤',
    color: 'from-pink-500 to-purple-600',
    isPlayable: true,
    tags: ['music', 'karaoke', 'space', 'premium'],
    estimatedPlayTime: '6-15 min',
    difficulty: 3
  }
];