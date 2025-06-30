export type GameCategory = 'casual' | 'arcade' | 'adventure';

export type GameComplexity = 'low' | 'medium' | 'high';

export interface Game {
  id: string;
  title: string;
  description: string;
  category: GameCategory;
  complexity: GameComplexity;
  icon: string;
  color: string;
  isPlayable: boolean;
  tags: string[];
  estimatedPlayTime: string;
  difficulty: number; // 1-5 scale
}

export interface GameProgress {
  gameId: string;
  highScore: number;
  timesPlayed: number;
  achievements: string[];
  lastPlayed: Date;
}

export interface User {
  id: string;
  username: string;
  redditUsername?: string;
  avatar: string;
  level: number;
  totalScore: number;
  gamesUnlocked: string[];
  isPremium: boolean;
}
