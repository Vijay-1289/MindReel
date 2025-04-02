
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Check, X } from 'lucide-react';
import type { Flashcard } from '@/types/flashcard';

interface FlashcardStudyProps {
  card: Flashcard;
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

export const FlashcardStudy: React.FC<FlashcardStudyProps> = ({ card, index }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [textAnswer, setTextAnswer] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  
  const handleSubmitAnswer = () => {
    if (card.answerType === 'multiple-choice') {
      const correctOption = card.options?.find(option => option.isCorrect);
      setIsCorrect(selectedOption === correctOption?.id);
    } else {
      // For text answers, do a simple check if the answer contains key terms
      const keyTerms = card.answer.toLowerCase().split(' ').filter(word => word.length > 4);
      const userAnswerLower = textAnswer.toLowerCase();
      const hasKeyTerms = keyTerms.some(term => userAnswerLower.includes(term));
      setIsCorrect(hasKeyTerms);
    }
    setIsSubmitted(true);
  };
  
  const resetCard = () => {
    setIsFlipped(false);
    setSelectedOption(null);
    setTextAnswer('');
    setIsSubmitted(false);
    setIsCorrect(null);
  };
  
  const difficultyColor = getDifficultyColor(card.difficulty);
  
  return (
    <div className="my-4">
      <div className="flex justify-between mb-2">
        <Badge variant="outline" className={`${difficultyColor} capitalize`}>
          {card.difficulty}
        </Badge>
        <Badge variant="outline" className="bg-gray-100">
          Question #{index + 1}
        </Badge>
      </div>
      
      <Card className="relative overflow-hidden h-[340px]">
        <div 
          className={`flashcard-container w-full h-full ${isFlipped ? 'flipped' : ''}`}
        >
          <motion.div 
            className="flashcard-inner w-full h-full relative preserve-3d transition-all duration-500"
            initial={false}
            animate={{ 
              rotateY: isFlipped ? 180 : 0,
            }}
            transition={{ 
              duration: 0.8,
              ease: "easeInOut"
            }}
          >
            {/* Front Side - Question */}
            <div className="flashcard-front absolute inset-0 p-6 rounded-lg border bg-white flex flex-col backface-hidden">
              <div className="flex-grow">
                <h3 className="text-xl font-medium mb-6">{card.question}</h3>
                
                {!isSubmitted ? (
                  <>
                    {card.answerType === 'multiple-choice' && card.options && (
                      <div className="space-y-3">
                        <RadioGroup value={selectedOption || ''} onValueChange={setSelectedOption}>
                          {card.options.map((option) => (
                            <div key={option.id} className="flex items-center space-x-2 rounded-md border p-3 hover:bg-muted/50 transition-colors">
                              <RadioGroupItem value={option.id} id={option.id} />
                              <Label htmlFor={option.id} className="flex-grow cursor-pointer">{option.text}</Label>
                            </div>
                          ))}
                        </RadioGroup>
                      </div>
                    )}
                    
                    {card.answerType === 'text' && (
                      <div className="space-y-3">
                        <Input 
                          placeholder="Type your answer..." 
                          value={textAnswer}
                          onChange={(e) => setTextAnswer(e.target.value)} 
                        />
                      </div>
                    )}
                    
                    <div className="flex justify-between mt-6">
                      <Button 
                        variant="outline" 
                        onClick={() => setIsFlipped(true)}
                      >
                        Show Answer
                      </Button>
                      <Button 
                        onClick={handleSubmitAnswer}
                        disabled={card.answerType === 'multiple-choice' ? !selectedOption : !textAnswer.trim()}
                      >
                        Submit
                      </Button>
                    </div>
                  </>
                ) : (
                  <div className="space-y-4">
                    <div className={`p-4 rounded-md ${isCorrect ? 'bg-green-100 border border-green-200' : 'bg-red-100 border border-red-200'}`}>
                      <div className="flex items-center">
                        {isCorrect ? (
                          <Check className="h-5 w-5 text-green-600 mr-2" />
                        ) : (
                          <X className="h-5 w-5 text-red-600 mr-2" />
                        )}
                        <p className={`font-medium ${isCorrect ? 'text-green-800' : 'text-red-800'}`}>
                          {isCorrect ? 'Correct!' : 'Incorrect'}
                        </p>
                      </div>
                      
                      {!isCorrect && (
                        <Button 
                          variant="ghost" 
                          className="mt-2 text-red-800 hover:text-red-900 p-0"
                          onClick={() => setIsFlipped(true)}
                        >
                          View correct answer
                        </Button>
                      )}
                    </div>
                    
                    <Button onClick={resetCard} variant="secondary" className="w-full">
                      Try Again
                    </Button>
                  </div>
                )}
              </div>
              
              {!isSubmitted && (
                <motion.div 
                  className="text-muted-foreground text-sm mt-4 opacity-60 text-center"
                  animate={{ opacity: [0.6, 1, 0.6] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  Click 'Show Answer' to flip card
                </motion.div>
              )}
            </div>
            
            {/* Back Side - Answer */}
            <div className="flashcard-back absolute inset-0 p-6 rounded-lg bg-primary/5 border flex flex-col justify-center backface-hidden rotate-y-180">
              <div className="space-y-4">
                <Badge variant="outline">Answer</Badge>
                <h3 className="text-xl font-medium">{card.answer}</h3>
                <Button onClick={() => setIsFlipped(false)} className="mt-4">
                  Back to Question
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </Card>
    </div>
  );
};

export default FlashcardStudy;
