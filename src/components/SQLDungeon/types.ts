
export interface GameState {
  currentLevel: number;
  score: number;
  lives: number;
  isGameActive: boolean;
  showMap: boolean;
}

export interface PlayerProgress {
  inventory: string[];
  defeatedMonsters: string[];
  unlockedDoors: string[];
  learnedConcepts: string[];
  achievements: string[];
}

export interface Level {
  id: number;
  title: string;
  description: string;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  successMessage: string;
  failureMessage: string;
  hint: string;
  concept: string;
  reward: string;
  roomType: 'selection' | 'join' | 'groupby' | 'where' | 'subquery' | 'boss';
  visualElements: {
    background: string;
    characters: string[];
    objects: string[];
  };
}

export interface DungeonRoom {
  id: string;
  x: number;
  y: number;
  type: 'room' | 'bridge' | 'door' | 'treasure' | 'monster';
  isUnlocked: boolean;
  isCompleted: boolean;
  level?: number;
}
