
export interface Flashcard {
  id: string;
  question: string;
  answer: string;
  tags?: string[];
  difficulty?: 'easy' | 'medium' | 'hard';
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
