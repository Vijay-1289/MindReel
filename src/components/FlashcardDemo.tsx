
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const FlashcardDemo: React.FC = () => {
  const [isFlipped, setIsFlipped] = useState(false);

  // Auto-flip the card every few seconds
  useEffect(() => {
    const flipInterval = setInterval(() => {
      setIsFlipped(prev => !prev);
    }, 4000);

    return () => clearInterval(flipInterval);
  }, []);

  return (
    <div className="relative mx-auto aspect-video overflow-hidden rounded-xl border bg-white shadow-xl md:aspect-[4/3]">
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
                <h3 className="text-xl font-medium">What is the role of mitochondria in cells?</h3>
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
                <h3 className="text-xl font-medium">Mitochondria are the powerhouse of the cell responsible for generating most of the cell's supply of ATP through cellular respiration.</h3>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default FlashcardDemo;
