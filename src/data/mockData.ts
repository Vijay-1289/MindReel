
import { v4 as uuidv4 } from 'uuid';
import { FlashcardDeck } from '@/types/flashcard';

export const mockDecks: FlashcardDeck[] = [
  {
    id: '1',
    title: 'Cell Biology',
    description: 'Fundamental concepts in cell biology',
    cards: [
      {
        id: uuidv4(),
        question: 'What is the function of mitochondria in a cell?',
        answer: 'Mitochondria are the powerhouse of the cell, responsible for generating most of the cell\'s supply of ATP through cellular respiration.',
        tags: ['organelles', 'energy'],
        difficulty: 'medium'
      },
      {
        id: uuidv4(),
        question: 'What is the cell membrane composed of?',
        answer: 'The cell membrane is primarily composed of a phospholipid bilayer with embedded proteins that control the transport of molecules in and out of the cell.',
        tags: ['membrane', 'structure'],
        difficulty: 'medium'
      },
      {
        id: uuidv4(),
        question: 'What is the difference between prokaryotic and eukaryotic cells?',
        answer: 'Prokaryotic cells lack a defined nucleus and membrane-bound organelles, while eukaryotic cells have a true nucleus containing genetic material and membrane-bound organelles.',
        tags: ['cell types', 'structure'],
        difficulty: 'hard'
      },
      {
        id: uuidv4(),
        question: 'What is the function of the Golgi apparatus?',
        answer: 'The Golgi apparatus modifies, sorts, and packages proteins and lipids for storage in the cell or secretion outside the cell.',
        tags: ['organelles', 'protein processing'],
        difficulty: 'medium'
      },
      {
        id: uuidv4(),
        question: 'What is the process of mitosis?',
        answer: 'Mitosis is a process of cell division that results in two identical daughter cells, each with the same number of chromosomes as the parent cell.',
        tags: ['cell division', 'reproduction'],
        difficulty: 'hard'
      }
    ],
    createdAt: '2023-10-15T12:00:00Z',
    updatedAt: '2023-10-15T12:00:00Z'
  },
  {
    id: '2',
    title: 'JavaScript Fundamentals',
    description: 'Core concepts and features of JavaScript programming',
    cards: [
      {
        id: uuidv4(),
        question: 'What is the difference between let and var in JavaScript?',
        answer: 'The main difference is scope: var is function-scoped while let is block-scoped. Also, let variables cannot be redeclared in the same scope, and they are not hoisted to the top of their scope.',
        tags: ['variables', 'scope'],
        difficulty: 'medium'
      },
      {
        id: uuidv4(),
        question: 'What is a closure in JavaScript?',
        answer: 'A closure is a function that has access to its own scope, the outer function\'s variables, and the global variables, even after the outer function has returned.',
        tags: ['functions', 'scope'],
        difficulty: 'hard'
      },
      {
        id: uuidv4(),
        question: 'What is the purpose of the Promise object?',
        answer: 'Promises represent the eventual completion or failure of an asynchronous operation and its resulting value, allowing for cleaner asynchronous code compared to callbacks.',
        tags: ['async', 'promises'],
        difficulty: 'hard'
      },
      {
        id: uuidv4(),
        question: 'What is event bubbling in JavaScript?',
        answer: 'Event bubbling is a mechanism where an event triggered on a nested element "bubbles up" through its ancestors in the DOM tree, unless it is stopped.',
        tags: ['DOM', 'events'],
        difficulty: 'medium'
      },
      {
        id: uuidv4(),
        question: 'How does the this keyword work in JavaScript?',
        answer: 'The value of this depends on how a function is called: in a method, this refers to the owner object; alone, it refers to the global object; in a function, it refers to the global object; in strict mode, it is undefined; in an event, it refers to the element that received the event.',
        tags: ['functions', 'scope'],
        difficulty: 'hard'
      }
    ],
    createdAt: '2023-11-02T09:30:00Z',
    updatedAt: '2023-11-02T09:30:00Z'
  },
  {
    id: '3',
    title: 'World History: Ancient Civilizations',
    description: 'Key facts about ancient civilizations and their contributions',
    cards: [
      {
        id: uuidv4(),
        question: 'When was the Ancient Egyptian civilization established?',
        answer: 'The Ancient Egyptian civilization was established around 3150 BCE when Upper and Lower Egypt were unified under the first pharaoh.',
        tags: ['egypt', 'timeline'],
        difficulty: 'medium'
      },
      {
        id: uuidv4(),
        question: 'What was the significance of the Code of Hammurabi?',
        answer: 'The Code of Hammurabi, created around 1754 BCE, was one of the earliest and most complete written legal codes, establishing a system of justice based on "an eye for an eye" principles.',
        tags: ['mesopotamia', 'law'],
        difficulty: 'medium'
      },
      {
        id: uuidv4(),
        question: 'What were the main contributions of Ancient Greece to modern society?',
        answer: 'Ancient Greece contributed democracy, philosophy (with thinkers like Socrates, Plato, and Aristotle), advances in mathematics and science, Olympic Games, theatrical traditions, and architectural principles still used today.',
        tags: ['greece', 'contributions'],
        difficulty: 'hard'
      },
      {
        id: uuidv4(),
        question: 'Who was the first Emperor of unified China?',
        answer: 'Qin Shi Huang (259-210 BCE) was the first Emperor of unified China. He connected existing walls to create the first version of the Great Wall and standardized weights, measures, and writing.',
        tags: ['china', 'leadership'],
        difficulty: 'medium'
      },
      {
        id: uuidv4(),
        question: 'What led to the fall of the Roman Empire?',
        answer: 'The fall of the Roman Empire was caused by multiple factors including invasions by barbarian tribes, economic troubles, overreliance on slave labor, overexpansion, government corruption, and the rise of Christianity leading to political instability.',
        tags: ['rome', 'decline'],
        difficulty: 'hard'
      }
    ],
    createdAt: '2023-12-05T15:45:00Z',
    updatedAt: '2023-12-05T15:45:00Z'
  }
];
