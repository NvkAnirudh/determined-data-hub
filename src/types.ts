
export type Category = {
  id: string;
  title: string;
  description: string;
  questionCount?: number;
};

export type DifficultyLevel = 'easy' | 'medium' | 'hard';

export type Question = {
  id: string;
  categoryId: string;
  title: string;
  date: string;
  url: string;
  tags: string[];
  difficulty?: DifficultyLevel;
};

export type Project = {
  id: string;
  title: string;
  description: string;
  date: string;
  url: string;
  tags: string[];
};

export type UserQuestionConfidence = {
  id: string;
  user_id: string;
  question_id: string;
  score: number;
  updated_at: string;
};
