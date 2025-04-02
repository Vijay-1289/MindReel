
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';

const FlashcardDemo: React.FC = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [difficulty, setDifficulty] = useState<'beginner' | 'intermediate' | 'advanced'>('intermediate');

  // Auto-flip the card every few seconds
  useEffect(() => {
    const flipInterval = setInterval(() => {
      setIsFlipped(prev => !prev);
    }, 4000);

    // Rotate through difficulties
    const difficultyInterval = setInterval(() => {
      setDifficulty(prev => {
        if (prev === 'beginner') return 'intermediate';
        if (prev === 'intermediate') return 'advanced';
        return 'beginner';
      });
    }, 12000);

    return () => {
      clearInterval(flipInterval);
      clearInterval(difficultyInterval);
    };
  }, []);

  const getDifficultyColor = () => {
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

  return (
    <div className="relative mx-auto aspect-video overflow-hidden rounded-xl border bg-white shadow-xl md:aspect-[4/3]">
      <div className="absolute top-3 left-3">
        <Badge variant="outline" className={`${getDifficultyColor()} capitalize`}>
          {difficulty}
        </Badge>
      </div>
      <div className="flashcard-container w-full h-full p-6">
        <div 
          className="flashcard relative w-full h-full rounded-lg border border-border/40 shadow-lg cursor-pointer"
          onClick={() => setIsFlipped(prev => !prev)}
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
            <div className="flashcard-front absolute inset-0 rounded-lg bg-white p-8 flex flex-col justify-center items-center backface-hidden">
              <div className="w-full space-y-4">
                <div className="badge-primary w-fit px-2 py-1 rounded-full text-xs font-medium">Question</div>
                <h3 className="text-xl font-medium">
                  {difficulty === 'beginner' && "What is the role of mitochondria in cells?"}
                  {difficulty === 'intermediate' && "How do mitochondria contribute to cellular metabolism?"}
                  {difficulty === 'advanced' && "Explain the chemiosmotic theory of ATP synthesis in mitochondria."}
                </h3>
                
                {difficulty === 'intermediate' && (
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center space-x-2">
                      <input type="radio" id="option1" name="answer" className="h-4 w-4 rounded-full" />
                      <label htmlFor="option1" className="text-sm">They produce most of the cell's ATP</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="radio" id="option2" name="answer" className="h-4 w-4 rounded-full" />
                      <label htmlFor="option2" className="text-sm">They store genetic material</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="radio" id="option3" name="answer" className="h-4 w-4 rounded-full" />
                      <label htmlFor="option3" className="text-sm">They digest macromolecules</label>
                    </div>
                  </div>
                )}
                
                {difficulty === 'advanced' && (
                  <div className="mt-4">
                    <input type="text" placeholder="Type your answer..." className="w-full p-2 border rounded-md text-sm" />
                  </div>
                )}
                
                <motion.div 
                  className="text-muted-foreground text-sm mt-4 opacity-60"
                  animate={{ opacity: [0.6, 1, 0.6] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  Click to flip card
                </motion.div>
              </div>
            </div>
            <div className="flashcard-back absolute inset-0 rounded-lg bg-primary/5 p-8 flex flex-col justify-center items-center backface-hidden rotate-y-180">
              <div className="w-full space-y-4">
                <div className="badge-secondary w-fit px-2 py-1 rounded-full text-xs font-medium">Answer</div>
                <h3 className="text-xl font-medium">
                  {difficulty === 'beginner' && "Mitochondria are the powerhouse of the cell responsible for generating most of the cell's supply of ATP through cellular respiration."}
                  {difficulty === 'intermediate' && "Mitochondria use oxygen and nutrients to create adenosine triphosphate (ATP), the energy currency that powers most cellular processes through aerobic respiration."}
                  {difficulty === 'advanced' && "The chemiosmotic theory states that ATP synthesis in mitochondria is driven by an electrochemical gradient across the inner membrane. This gradient is generated by the electron transport chain, which pumps protons into the intermembrane space, creating a proton-motive force that drives ATP synthase to produce ATP."}
                </h3>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default FlashcardDemo;
