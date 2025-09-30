export interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number; // Index of correct option
}

export interface Head {
  id: string;
  name: string;
  topic: string;
  questions: Question[];
  answeredCount: number;
  correctAnswers: number;
  totalTime: number; // in seconds
  status: 'active' | 'defeated' | 'laughing'; // active, defeated (3+ correct), laughing (<3 correct after 5 questions)
  questionStatus: ('default' | 'correct' | 'wrong')[]; // Status for each question (Q1-Q5)
  isHidden?: boolean; // For hiding defeated heads after animation
  statusChangeTime?: number; // Timestamp when status changed
}

export interface GameState {
  heads: Head[];
  selectedHead: string | null;
  currentQuestion: string | null;
  timer: number;
  isAnswerSubmitted: boolean;
  selectedAnswer: number | null;
}

export const HEAD_NAMES = [
  'Kama', 'Krodha', 'Moha', 'Lobha', 'Mada', 
  'Ahamkara', 'Maatsarya', 'Ghrina', 'Bhaya', 'Buddhi'
];

export const TOPICS = [
  'Desire & Lust', 'Anger & Rage', 'Delusion & Ignorance', 'Greed & Avarice', 'Pride & Ego',
  'Arrogance & Vanity', 'Jealousy & Envy', 'Hatred & Disgust', 'Fear & Cowardice', 'Intelligence & Wisdom'
];