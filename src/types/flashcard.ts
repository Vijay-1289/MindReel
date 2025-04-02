
export type DifficultyLevel = 'beginner' | 'intermediate' | 'advanced' | 'medium' | 'hard';

export type AnswerType = 'multiple-choice' | 'text';

export interface MultipleChoiceOption {
  id: string;
  text: string;
  isCorrect: boolean;
}

export interface Flashcard {
  id: string;
  question: string;
  answer: string;
  difficulty: DifficultyLevel;
  answerType: AnswerType;
  options?: MultipleChoiceOption[];
  tags?: string[];
  lastReviewed?: string;
}

export interface FlashcardDeck {
  id: string;
  title: string;
  description: string;
  cards: Flashcard[];
  createdAt: string;
  updatedAt: string;
}
