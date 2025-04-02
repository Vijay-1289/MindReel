
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import type { Flashcard as FlashcardType } from '@/types/flashcard';

interface FlashcardProps {
  card: FlashcardType;
  index: number;
}

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case 'beginner':
      return 'bg-green-100 text-green-800 border-green-200';
    case 'intermediate':
      return 'bg-blue-100 text-blue-800 border-blue-200';
    case 'advanced':
      return 'bg-purple-100 text-purple-800 border-purple-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

const Flashcard: React.FC<FlashcardProps> = ({ card, index }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  
  return (
    <div className="h-[280px] w-full cursor-pointer">
      <div className="flex justify-between mb-2">
        <Badge variant="outline" className={`${getDifficultyColor(card.difficulty)} capitalize`}>
          {card.difficulty}
        </Badge>
        <Badge variant="outline" className="bg-gray-100">
          {card.answerType === 'multiple-choice' ? 'Multiple Choice' : 'Text Answer'}
        </Badge>
      </div>
      
      <div 
        className={`flashcard h-full w-full rounded-lg ${isFlipped ? 'flipped' : ''}`}
        onClick={() => setIsFlipped(!isFlipped)}
      >
        <motion.div 
          className="flashcard-inner h-full w-full relative preserve-3d transition-all duration-500"
          initial={false}
          animate={{ 
            rotateY: isFlipped ? 180 : 0,
          }}
          transition={{ 
            duration: 0.8,
            ease: "easeInOut"
          }}
        >
          <div className="flashcard-front absolute inset-0 p-6 rounded-lg border shadow-sm bg-white">
            <div className="h-full flex flex-col">
              <div className="badge-primary w-fit mb-2">Question #{index + 1}</div>
              <p className="text-lg font-medium">{card.question}</p>
              
              {card.answerType === 'multiple-choice' && card.options && (
                <div className="mt-4 space-y-1">
                  {card.options.slice(0, 2).map((option, i) => (
                    <div key={i} className="text-sm text-muted-foreground flex items-center">
                      <span className="inline-block w-4 h-4 mr-2 rounded-full border"></span>
                      <span className="truncate">{option.text.length > 40 ? option.text.substring(0, 40) + '...' : option.text}</span>
                    </div>
                  ))}
                  <div className="text-sm text-muted-foreground">+ {(card.options.length - 2)} more options</div>
                </div>
              )}
              
              {card.answerType === 'text' && (
                <div className="mt-4 p-2 bg-gray-100 rounded-md text-sm text-muted-foreground">
                  [Text answer required]
                </div>
              )}
            </div>
          </div>
          <div className="flashcard-back absolute inset-0 p-6 rounded-lg border shadow-sm bg-primary/5">
            <div className="h-full flex flex-col">
              <div className="badge-secondary w-fit mb-2">Answer</div>
              <p className="text-lg">{card.answer}</p>
              
              {card.answerType === 'multiple-choice' && card.options && (
                <div className="mt-auto pt-2">
                  <p className="text-sm text-muted-foreground">
                    Correct: {card.options.find(o => o.isCorrect)?.text.substring(0, 60) + '...'}
                  </p>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Flashcard;
