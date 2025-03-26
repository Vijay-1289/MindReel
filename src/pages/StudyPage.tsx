
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ArrowLeft, Shuffle, RotateCcw, Check, X, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';
import { FlashcardDeck, Flashcard } from '@/types/flashcard';
import { mockDecks } from '@/data/mockData';

const StudyPage: React.FC = () => {
  const { deckId } = useParams<{ deckId: string }>();
  const [deck, setDeck] = useState<FlashcardDeck | null>(null);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [cardsToStudy, setCardsToStudy] = useState<Flashcard[]>([]);
  const [direction, setDirection] = useState<'left' | 'right'>('right');
  const [showConfetti, setShowConfetti] = useState(false);
  const [ratings, setRatings] = useState<Record<string, 'correct' | 'incorrect' | null>>({});

  useEffect(() => {
    if (deckId) {
      const foundDeck = mockDecks.find(d => d.id === deckId);
      if (foundDeck) {
        setDeck(foundDeck);
        setCardsToStudy([...foundDeck.cards]);
        
        // Initialize ratings
        const initialRatings: Record<string, 'correct' | 'incorrect' | null> = {};
        foundDeck.cards.forEach((card, index) => {
          initialRatings[index.toString()] = null;
        });
        setRatings(initialRatings);
      }
    }
  }, [deckId]);

  const handleNextCard = () => {
    setDirection('right');
    setIsFlipped(false);
    
    if (currentCardIndex < cardsToStudy.length - 1) {
      setCurrentCardIndex(prevIndex => prevIndex + 1);
    } else {
      // All cards completed
      setShowConfetti(true);
      toast.success('You completed the deck!');
      
      setTimeout(() => {
        setShowConfetti(false);
      }, 3000);
    }
  };

  const handlePrevCard = () => {
    if (currentCardIndex > 0) {
      setDirection('left');
      setIsFlipped(false);
      setCurrentCardIndex(prevIndex => prevIndex - 1);
    }
  };

  const handleShuffleDeck = () => {
    setIsFlipped(false);
    
    // Fisher-Yates shuffle algorithm
    const shuffled = [...cardsToStudy];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    
    setCardsToStudy(shuffled);
    setCurrentCardIndex(0);
    toast.success('Deck shuffled');
  };

  const handleRestartDeck = () => {
    setIsFlipped(false);
    setCurrentCardIndex(0);
    
    // Reset ratings
    const resetRatings: Record<string, 'correct' | 'incorrect' | null> = {};
    cardsToStudy.forEach((_, index) => {
      resetRatings[index.toString()] = null;
    });
    setRatings(resetRatings);
    
    toast.success('Deck restarted');
  };

  const handleRateCard = (rating: 'correct' | 'incorrect') => {
    const updatedRatings = { ...ratings };
    updatedRatings[currentCardIndex.toString()] = rating;
    setRatings(updatedRatings);
    
    // Move to next card after rating
    handleNextCard();
  };

  if (!deck) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <div className="text-center space-y-4">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent mx-auto" />
          <p className="text-muted-foreground">Loading flashcard deck...</p>
        </div>
      </div>
    );
  }

  const progressPercentage = cardsToStudy.length > 0
    ? ((currentCardIndex + 1) / cardsToStudy.length) * 100
    : 0;
  
  const currentCard = cardsToStudy[currentCardIndex];
  
  // Count ratings
  const ratedCount = Object.values(ratings).filter(r => r !== null).length;
  const correctCount = Object.values(ratings).filter(r => r === 'correct').length;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/dashboard">
            <Button variant="ghost" size="icon" className="mr-2">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold">{deck.title}</h1>
            <p className="text-muted-foreground">{deck.description}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={handleShuffleDeck} title="Shuffle deck">
            <Shuffle className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={handleRestartDeck} title="Restart deck">
            <RotateCcw className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="mb-6 space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span>Card {currentCardIndex + 1} of {cardsToStudy.length}</span>
          <span>{Math.round(progressPercentage)}% Complete</span>
        </div>
        <Progress value={progressPercentage} className="h-2" />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentCardIndex}
          initial={{ opacity: 0, x: direction === 'right' ? 100 : -100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: direction === 'right' ? -100 : 100 }}
          transition={{ duration: 0.3 }}
          className="flashcard-container min-h-[400px] mb-6"
        >
          <div 
            className={`flashcard h-full w-full rounded-xl ${isFlipped ? 'flipped' : ''}`}
            onClick={() => setIsFlipped(!isFlipped)}
          >
            <div className="flashcard-front rounded-xl border shadow-md bg-card p-8 flex flex-col items-center justify-center text-center">
              <div className="mb-4 badge-primary">Question</div>
              <h2 className="text-2xl font-medium mb-6">{currentCard.question}</h2>
              <p className="text-sm text-muted-foreground mt-auto">Tap to reveal answer</p>
            </div>
            <div className="flashcard-back rounded-xl border shadow-md bg-primary/5 p-8 flex flex-col items-center justify-center text-center">
              <div className="mb-4 badge-secondary">Answer</div>
              <p className="text-xl">{currentCard.answer}</p>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {isFlipped ? (
        <div className="flex justify-center gap-4">
          <Button
            variant="outline"
            className="border-destructive text-destructive hover:bg-destructive/10"
            onClick={() => handleRateCard('incorrect')}
          >
            <X className="mr-2 h-4 w-4" />
            Didn't Know
          </Button>
          <Button
            variant="outline"
            className="border-primary text-primary hover:bg-primary/10"
            onClick={() => handleRateCard('correct')}
          >
            <Check className="mr-2 h-4 w-4" />
            Got it Right
          </Button>
        </div>
      ) : (
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={handlePrevCard}
            disabled={currentCardIndex === 0}
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            Previous
          </Button>
          <Button onClick={() => setIsFlipped(true)}>
            <Zap className="mr-2 h-4 w-4" />
            Reveal Answer
          </Button>
          <Button
            variant="outline"
            onClick={handleNextCard}
            disabled={currentCardIndex === cardsToStudy.length - 1}
          >
            Next
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      )}

      {ratedCount > 0 && (
        <div className="mt-8 rounded-lg border p-4">
          <h3 className="font-medium mb-2">Study Progress</h3>
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <Progress value={(ratedCount / cardsToStudy.length) * 100} className="h-2 mb-1" />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>{ratedCount} of {cardsToStudy.length} cards</span>
                <span>{Math.round((ratedCount / cardsToStudy.length) * 100)}%</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 rounded-full bg-primary"></div>
              <span className="text-sm">{correctCount} correct</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 rounded-full bg-destructive"></div>
              <span className="text-sm">{ratedCount - correctCount} incorrect</span>
            </div>
          </div>
        </div>
      )}

      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center">
          <div className="absolute w-full h-full">
            {Array.from({ length: 100 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute"
                initial={{
                  top: '0%',
                  left: `${Math.random() * 100}%`,
                  opacity: 1,
                  scale: 0
                }}
                animate={{
                  top: '100%',
                  opacity: 0,
                  scale: 1,
                  rotate: Math.random() * 360
                }}
                transition={{
                  duration: Math.random() * 3 + 1,
                  delay: Math.random() * 0.5
                }}
                style={{
                  width: `${Math.random() * 10 + 5}px`,
                  height: `${Math.random() * 10 + 5}px`,
                  backgroundColor: `hsl(${Math.random() * 360}, 100%, 50%)`
                }}
              />
            ))}
          </div>
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-lg p-8 shadow-lg z-10"
          >
            <h2 className="text-2xl font-bold mb-4">Great job!</h2>
            <p className="mb-6">You've completed this flashcard deck!</p>
            <div className="flex gap-4">
              <Button variant="outline" onClick={handleRestartDeck}>
                <RotateCcw className="mr-2 h-4 w-4" />
                Study Again
              </Button>
              <Link to="/dashboard">
                <Button>
                  Return to Dashboard
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default StudyPage;
