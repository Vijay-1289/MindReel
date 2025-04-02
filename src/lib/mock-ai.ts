import { v4 as uuidv4 } from 'uuid';
import { Flashcard, DifficultyLevel, MultipleChoiceOption } from '@/types/flashcard';

export const mockGenerateFlashcards = async (content: string): Promise<Flashcard[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Generate flashcards based on the content type
  if (content.toLowerCase().includes('cell')) {
    return generateCellBiologyFlashcards();
  } else if (content.toLowerCase().includes('javascript') || content.toLowerCase().includes('programming')) {
    return generateJavaScriptFlashcards();
  } else if (content.toLowerCase().includes('history') || content.toLowerCase().includes('civilization')) {
    return generateHistoryFlashcards();
  } else {
    // Default flashcards if no specific content is detected
    return generateGeneralFlashcards();
  }
};

const createMultipleChoiceOptions = (correctAnswer: string, subject: string): MultipleChoiceOption[] => {
  // Generate plausible but incorrect options based on the subject
  let wrongOptions: string[] = [];
  
  if (subject === 'cell-biology') {
    wrongOptions = [
      'Transport proteins in the nucleus',
      'Lipid synthesis in the mitochondria',
      'RNA processing in the Golgi apparatus',
      'DNA replication in the cell membrane',
      'Protein digestion in the chloroplasts'
    ];
  } else if (subject === 'javascript') {
    wrongOptions = [
      'Converting strings to integers using String()',
      'A way to define classes in ES5',
      'A method to create asynchronous loops',
      'The process of bundling modules',
      'A technique for optimizing recursive functions'
    ];
  } else if (subject === 'history') {
    wrongOptions = [
      'The French Revolution began in 1805',
      'The Magna Carta was signed in 1300',
      'World War I ended in 1925',
      'The Renaissance began in the 18th century',
      'Alexander the Great was a Roman emperor'
    ];
  } else {
    wrongOptions = [
      'A process that occurs only in animal cells',
      'A theory proposed by Albert Einstein',
      'A concept related to quantum physics',
      'A mathematical formula for calculating probability',
      'A literary device used in poetry'
    ];
  }
  
  // Shuffle and take 3 wrong options
  wrongOptions = wrongOptions.sort(() => Math.random() - 0.5).slice(0, 3);
  
  const options: MultipleChoiceOption[] = [
    { id: uuidv4(), text: correctAnswer, isCorrect: true },
    ...wrongOptions.map(option => ({
      id: uuidv4(),
      text: option,
      isCorrect: false
    }))
  ];
  
  // Shuffle the options
  return options.sort(() => Math.random() - 0.5);
};

const assignDifficulty = (index: number, total: number): DifficultyLevel => {
  const position = index / total;
  
  if (position < 0.33) {
    return 'beginner';
  } else if (position < 0.67) {
    return 'intermediate';
  } else {
    return 'advanced';
  }
};

const generateCellBiologyFlashcards = (): Flashcard[] => {
  const questions = [
    {
      question: 'What is the cell membrane composed of?',
      answer: 'The cell membrane is primarily composed of a phospholipid bilayer with embedded proteins that control the movement of substances in and out of the cell.'
    },
    {
      question: 'What are the main functions of the nucleus?',
      answer: 'The nucleus contains genetic material (DNA), controls cell activities by regulating gene expression, and manages protein synthesis by producing messenger RNA (mRNA).'
    },
    {
      question: 'How does endocytosis differ from exocytosis?',
      answer: 'Endocytosis is the process of taking material into the cell by engulfing it with the cell membrane, while exocytosis is the process of expelling material from the cell by fusing vesicles with the cell membrane.'
    },
    {
      question: 'What is the function of ribosomes in a cell?',
      answer: 'Ribosomes are responsible for protein synthesis, translating the genetic code from messenger RNA into amino acid chains that form proteins.'
    },
    {
      question: 'Explain the difference between passive and active transport.',
      answer: 'Passive transport does not require energy and moves molecules from high to low concentration (diffusion, osmosis), while active transport requires energy (ATP) and can move molecules against their concentration gradient.'
    },
    {
      question: 'What happens during the process of cellular respiration?',
      answer: 'Cellular respiration is the process by which cells convert glucose and oxygen into energy in the form of ATP, along with carbon dioxide and water as byproducts. The main stages are glycolysis, the Krebs cycle, and the electron transport chain.'
    }
  ];
  
  return questions.map((q, index) => {
    const difficulty = assignDifficulty(index, questions.length);
    const answerType = index % 2 === 0 ? 'multiple-choice' : 'text';
    
    return {
      id: uuidv4(),
      question: q.question,
      answer: q.answer,
      difficulty,
      answerType,
      options: answerType === 'multiple-choice' ? 
        createMultipleChoiceOptions(q.answer, 'cell-biology') : undefined
    };
  });
};

const generateJavaScriptFlashcards = (): Flashcard[] => {
  const questions = [
    {
      question: 'What is the difference between null and undefined in JavaScript?',
      answer: 'undefined means a variable has been declared but has not been assigned a value, while null is an assignment value that represents no value or no object. undefined is a type itself, while null is an object.'
    },
    {
      question: 'Explain the concept of hoisting in JavaScript.',
      answer: 'Hoisting is JavaScript\'s default behavior of moving declarations to the top of their scope before code execution. This means that variables and function declarations are moved to the top of their containing scope.'
    },
    {
      question: 'What is the difference between == and === operators?',
      answer: '== is the equality operator that compares value but performs type coercion if necessary, while === is the strict equality operator that compares both value and type, with no type conversion.'
    },
    {
      question: 'What is the purpose of the map() function in JavaScript?',
      answer: 'The map() method creates a new array by calling a provided function on every element in the calling array, allowing you to transform each element without modifying the original array.'
    },
    {
      question: 'What is an immediately invoked function expression (IIFE)?',
      answer: 'An IIFE is a JavaScript function that runs as soon as it is defined. It is a design pattern used to create a scope where variables can be declared without polluting the global scope: (function() { /* code */ })();'
    },
    {
      question: 'How does event delegation work in JavaScript?',
      answer: 'Event delegation is a technique where instead of attaching an event listener to each individual element, you attach a single event listener to a parent element that will fire for all descendants matching a specified selector, due to event bubbling.'
    }
  ];
  
  return questions.map((q, index) => {
    const difficulty = assignDifficulty(index, questions.length);
    const answerType = index % 2 === 0 ? 'multiple-choice' : 'text';
    
    return {
      id: uuidv4(),
      question: q.question,
      answer: q.answer,
      difficulty,
      answerType,
      options: answerType === 'multiple-choice' ? 
        createMultipleChoiceOptions(q.answer, 'javascript') : undefined
    };
  });
};

const generateHistoryFlashcards = (): Flashcard[] => {
  const questions = [
    {
      question: 'What was the Renaissance?',
      answer: 'The Renaissance was a period of European cultural, artistic, political, and economic "rebirth" following the Middle Ages, spanning roughly the 14th to the 17th century. It marked the transition from medieval to modern times with a focus on classical learning and values.'
    },
    {
      question: 'What caused World War I?',
      answer: 'World War I was caused by a complex combination of factors including militarism, alliances, imperialism, nationalism, and specific triggering events like the assassination of Archduke Franz Ferdinand of Austria-Hungary in June 1914.'
    },
    {
      question: 'Who was Alexander the Great?',
      answer: 'Alexander the Great (356-323 BCE) was a king of the ancient Greek kingdom of Macedon who created one of the largest empires in ancient history, stretching from Greece to northwestern India, by the age of thirty.'
    },
    {
      question: 'What was the significance of the Magna Carta?',
      answer: 'The Magna Carta, signed in 1215, was a charter of rights limiting the powers of the English monarch. It established the principle that everyone, including the king, was subject to the law, and is considered a foundational document for constitutional governments and individual rights.'
    },
    {
      question: 'What was the Industrial Revolution?',
      answer: 'The Industrial Revolution was a period of major industrialization and innovation that took place during the late 1700s and early 1800s. It began in Great Britain and later spread to other countries, transforming economies from agricultural to manufacturing-based.'
    },
    {
      question: 'What were the main causes of the French Revolution?',
      answer: 'The main causes of the French Revolution (1789-1799) included social inequality among estates, ineffective leadership from King Louis XVI, financial crises, Enlightenment ideals challenging monarchy, and food scarcity leading to public unrest.'
    }
  ];
  
  return questions.map((q, index) => {
    const difficulty = assignDifficulty(index, questions.length);
    const answerType = index % 2 === 0 ? 'multiple-choice' : 'text';
    
    return {
      id: uuidv4(),
      question: q.question,
      answer: q.answer,
      difficulty,
      answerType,
      options: answerType === 'multiple-choice' ? 
        createMultipleChoiceOptions(q.answer, 'history') : undefined
    };
  });
};

const generateGeneralFlashcards = (): Flashcard[] => {
  const questions = [
    {
      question: 'What is photosynthesis?',
      answer: 'Photosynthesis is the process by which green plants, algae, and some bacteria convert light energy, usually from the sun, into chemical energy in the form of glucose or other sugars.'
    },
    {
      question: 'What are the three laws of motion formulated by Sir Isaac Newton?',
      answer: '1. An object at rest stays at rest, and an object in motion stays in motion unless acted upon by an external force. 2. Force equals mass times acceleration (F=ma). 3. For every action, there is an equal and opposite reaction.'
    },
    {
      question: 'What is the definition of a metaphor in literature?',
      answer: 'A metaphor is a figure of speech that makes a direct comparison between two unrelated things, stating that one thing is the other, to create a symbolic parallel. Unlike similes, metaphors don\'t use "like" or "as" in the comparison.'
    },
    {
      question: 'How does supply and demand work in economics?',
      answer: 'Supply and demand is a fundamental economic model where the price of a product or service is determined by the balance between its availability (supply) and consumer desire (demand). When supply exceeds demand, prices tend to fall; when demand exceeds supply, prices tend to rise.'
    },
    {
      question: 'What is the water cycle?',
      answer: 'The water cycle, or hydrologic cycle, is the continuous movement of water on, above, and below Earth\'s surface through processes of evaporation, transpiration, condensation, precipitation, and runoff.'
    },
    {
      question: 'What is the significance of DNA in living organisms?',
      answer: 'DNA (deoxyribonucleic acid) contains the genetic instructions used in the development and functioning of all known living organisms. It stores biological information that is passed from generation to generation and determines inherited traits.'
    }
  ];
  
  return questions.map((q, index) => {
    const difficulty = assignDifficulty(index, questions.length);
    const answerType = index % 2 === 0 ? 'multiple-choice' : 'text';
    
    return {
      id: uuidv4(),
      question: q.question,
      answer: q.answer,
      difficulty,
      answerType,
      options: answerType === 'multiple-choice' ? 
        createMultipleChoiceOptions(q.answer, 'general') : undefined
    };
  });
};
