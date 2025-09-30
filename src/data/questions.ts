import { Head, HEAD_NAMES, TOPICS } from '../types/game';

// Sample questions for each head
const sampleQuestions = {
  'Kama': [
    {
      id: 'kama-1',
      question: 'What does Kama represent in Hindu philosophy?',
      options: ['Anger', 'Desire and Love', 'Greed', 'Pride'],
      correctAnswer: 1
    },
    {
      id: 'kama-2', 
      question: 'Which god is associated with Kama?',
      options: ['Vishnu', 'Shiva', 'Kamadeva', 'Brahma'],
      correctAnswer: 2
    },
    {
      id: 'kama-3',
      question: 'Kama is one of the four goals of human life. What are these called?',
      options: ['Purusharthas', 'Vedas', 'Upanishads', 'Darshanas'],
      correctAnswer: 0
    },
    {
      id: 'kama-4',
      question: 'What weapon does Kamadeva traditionally carry?',
      options: ['Sword', 'Bow and Arrow', 'Trident', 'Mace'],
      correctAnswer: 1
    },
    {
      id: 'kama-5',
      question: 'What happens when Kama is balanced according to Hindu philosophy?',
      options: ['It leads to suffering', 'It brings harmony', 'It causes anger', 'It creates fear'],
      correctAnswer: 1
    }
  ],
  'Krodha': [
    {
      id: 'krodha-1',
      question: 'Krodha is often translated as which emotion?',
      options: ['Love', 'Fear', 'Anger', 'Joy'],
      correctAnswer: 2
    },
    {
      id: 'krodha-2',
      question: 'In the Bhagavad Gita, what does Krishna say about anger?',
      options: ['It is always beneficial', 'It destroys wisdom', 'It brings peace', 'It is necessary'],
      correctAnswer: 1
    },
    {
      id: 'krodha-3',
      question: 'Which of these is considered a consequence of uncontrolled anger?',
      options: ['Clarity of mind', 'Loss of discrimination', 'Increased wisdom', 'Better relationships'],
      correctAnswer: 1
    },
    {
      id: 'krodha-4',
      question: 'What color is traditionally associated with anger in Hindu iconography?',
      options: ['Blue', 'Red', 'Yellow', 'Green'],
      correctAnswer: 1
    },
    {
      id: 'krodha-5',
      question: 'According to Ayurveda, anger is primarily associated with which dosha?',
      options: ['Vata', 'Pitta', 'Kapha', 'All doshas equally'],
      correctAnswer: 1
    }
  ],
  'Moha': [
    {
      id: 'moha-1',
      question: 'Moha represents which spiritual obstacle?',
      options: ['Anger', 'Greed', 'Delusion/Ignorance', 'Pride'],
      correctAnswer: 2
    },
    {
      id: 'moha-2',
      question: 'What is the opposite of Moha in spiritual terms?',
      options: ['Vidya (Knowledge)', 'Kama (Desire)', 'Dharma (Duty)', 'Moksha (Liberation)'],
      correctAnswer: 0
    },
    {
      id: 'moha-3',
      question: 'In Buddhism, what is Moha considered as?',
      options: ['One of the Three Jewels', 'One of the Three Poisons', 'One of the Four Truths', 'One of the Five Precepts'],
      correctAnswer: 1
    },
    {
      id: 'moha-4',
      question: 'Moha is said to cloud which faculty of the mind?',
      options: ['Memory', 'Imagination', 'Discrimination', 'Emotion'],
      correctAnswer: 2
    },
    {
      id: 'moha-5',
      question: 'What is the traditional remedy for Moha?',
      options: ['Wealth', 'Power', 'Knowledge and Meditation', 'Pleasure'],
      correctAnswer: 2
    }
  ],
  'Lobha': [
    {
      id: 'lobha-1',
      question: 'Lobha is primarily associated with which vice?',
      options: ['Anger', 'Greed', 'Pride', 'Lust'],
      correctAnswer: 1
    },
    {
      id: 'lobha-2',
      question: 'What does Lobha prevent a person from achieving?',
      options: ['Wealth', 'Contentment', 'Power', 'Fame'],
      correctAnswer: 1
    },
    {
      id: 'lobha-3',
      question: 'In Jainism, Lobha is considered one of the main?',
      options: ['Virtues', 'Passions (Kashayas)', 'Mantras', 'Meditation techniques'],
      correctAnswer: 1
    },
    {
      id: 'lobha-4',
      question: 'What virtue is considered the antidote to Lobha?',
      options: ['Daan (Charity/Generosity)', 'Tapas (Austerity)', 'Dhyana (Meditation)', 'Japa (Chanting)'],
      correctAnswer: 0
    },
    {
      id: 'lobha-5',
      question: 'According to Hindu scriptures, what does excessive Lobha lead to?',
      options: ['Happiness', 'Spiritual bondage', 'Enlightenment', 'Peace'],
      correctAnswer: 1
    }
  ],
  'Mada': [
    {
      id: 'mada-1',
      question: 'Mada represents which negative quality?',
      options: ['Fear', 'Pride/Arrogance', 'Sadness', 'Confusion'],
      correctAnswer: 1
    },
    {
      id: 'mada-2',
      question: 'What does Mada make a person believe?',
      options: ['They are humble', 'They are superior to others', 'They are equal to all', 'They are inferior'],
      correctAnswer: 1
    },
    {
      id: 'mada-3',
      question: 'In the story of Ravana, what was his greatest Mada?',
      options: ['Wealth', 'Knowledge and Power', 'Beauty', 'Strength'],
      correctAnswer: 1
    },
    {
      id: 'mada-4',
      question: 'What virtue counters Mada effectively?',
      options: ['Anger', 'Humility (Vinaya)', 'Wealth', 'Power'],
      correctAnswer: 1
    },
    {
      id: 'mada-5',
      question: 'According to scriptures, Mada prevents?',
      options: ['Learning and growth', 'Eating', 'Sleeping', 'Working'],
      correctAnswer: 0
    }
  ],
  'Ahamkara': [
    {
      id: 'ahamkara-1',
      question: 'Ahamkara literally means?',
      options: ['I-maker/Ego', 'Love-maker', 'Fear-maker', 'Anger-maker'],
      correctAnswer: 0
    },
    {
      id: 'ahamkara-2',
      question: 'In Sankhya philosophy, Ahamkara is?',
      options: ['The soul', 'A component of mind', 'The body', 'The universe'],
      correctAnswer: 1
    },
    {
      id: 'ahamkara-3',
      question: 'What does excessive Ahamkara create?',
      options: ['Unity', 'Separation and individualism', 'Love', 'Compassion'],
      correctAnswer: 1
    },
    {
      id: 'ahamkara-4',
      question: 'To transcend Ahamkara, one should cultivate?',
      options: ['More ego', 'Self-surrender and selflessness', 'Anger', 'Pride'],
      correctAnswer: 1
    },
    {
      id: 'ahamkara-5',
      question: 'Ahamkara is said to be the root of?',
      options: ['Liberation', 'All suffering', 'Happiness', 'Peace'],
      correctAnswer: 1
    }
  ],
  'Maatsarya': [
    {
      id: 'matsarya-1',
      question: 'Matsarya is commonly known as?',
      options: ['Love', 'Jealousy/Envy', 'Peace', 'Joy'],
      correctAnswer: 1
    },
    {
      id: 'matsarya-2',
      question: 'What does Matsarya prevent a person from feeling?',
      options: ['Anger', 'Joy in others\' success', 'Sadness', 'Fear'],
      correctAnswer: 1
    },
    {
      id: 'matsarya-3',
      question: 'In Hindu ethics, Matsarya is considered?',
      options: ['A virtue', 'A vice to be overcome', 'Neutral', 'Beneficial'],
      correctAnswer: 1
    },
    {
      id: 'matsarya-4',
      question: 'What quality helps overcome Matsarya?',
      options: ['Competitiveness', 'Mudita (sympathetic joy)', 'Aggression', 'Isolation'],
      correctAnswer: 1
    },
    {
      id: 'matsarya-5',
      question: 'Matsarya often arises from?',
      options: ['Contentment', 'Comparison with others', 'Self-satisfaction', 'Inner peace'],
      correctAnswer: 1
    }
  ],
  'Ghrina': [
    {
      id: 'ghrina-1',
      question: 'Ghrina represents which emotion?',
      options: ['Love', 'Hatred/Disgust', 'Joy', 'Peace'],
      correctAnswer: 1
    },
    {
      id: 'ghrina-2',
      question: 'What does Ghrina do to relationships?',
      options: ['Strengthens them', 'Destroys them', 'Improves them', 'Has no effect'],
      correctAnswer: 1
    },
    {
      id: 'ghrina-3',
      question: 'According to Vedanta, what is the antidote to Ghrina?',
      options: ['More hatred', 'Universal love (Vishva-prema)', 'Indifference', 'Fear'],
      correctAnswer: 1
    },
    {
      id: 'ghrina-4',
      question: 'Ghrina is often accompanied by?',
      options: ['Compassion', 'Aversion and rejection', 'Acceptance', 'Understanding'],
      correctAnswer: 1
    },
    {
      id: 'ghrina-5',
      question: 'In spiritual practice, how should one deal with Ghrina?',
      options: ['Suppress it', 'Express it more', 'Transform it through understanding', 'Ignore it'],
      correctAnswer: 2
    }
  ],
  'Bhaya': [
    {
      id: 'bhaya-1',
      question: 'Bhaya means?',
      options: ['Courage', 'Fear', 'Anger', 'Love'],
      correctAnswer: 1
    },
    {
      id: 'bhaya-2',
      question: 'What is considered the ultimate fear in spiritual contexts?',
      options: ['Death', 'Poverty', 'Loneliness', 'All of the above'],
      correctAnswer: 0
    },
    {
      id: 'bhaya-3',
      question: 'According to Hindu philosophy, what conquers all fears?',
      options: ['Wealth', 'Power', 'Self-realization/God-realization', 'Education'],
      correctAnswer: 2
    },
    {
      id: 'bhaya-4',
      question: 'The Gita mentions that fear arises from?',
      options: ['Knowledge', 'Attachment and duality', 'Detachment', 'Wisdom'],
      correctAnswer: 1
    },
    {
      id: 'bhaya-5',
      question: 'Which practice is most effective against Bhaya?',
      options: ['Avoiding challenges', 'Abhaya (fearlessness) cultivation', 'Running away', 'Aggression'],
      correctAnswer: 1
    }
  ],
  'Buddhi': [
    {
      id: 'buddhi-1',
      question: 'Buddhi refers to?',
      options: ['Emotion', 'Intelligence/Discrimination', 'Body', 'Breath'],
      correctAnswer: 1
    },
    {
      id: 'buddhi-2',
      question: 'In the Katha Upanishad, Buddhi is compared to?',
      options: ['A horse', 'The charioteer', 'The chariot', 'The reins'],
      correctAnswer: 1
    },
    {
      id: 'buddhi-3',
      question: 'What is the highest function of Buddhi?',
      options: ['Calculating', 'Discriminating between real and unreal', 'Memorizing', 'Imagining'],
      correctAnswer: 1
    },
    {
      id: 'buddhi-4',
      question: 'According to Sankhya, Buddhi is the first evolute of?',
      options: ['Purusha', 'Prakriti', 'Ahamkara', 'Mahat'],
      correctAnswer: 3
    },
    {
      id: 'buddhi-5',
      question: 'A purified Buddhi leads to?',
      options: ['Confusion', 'Clear perception and wisdom', 'Anger', 'Fear'],
      correctAnswer: 1
    }
  ]
};

export function createInitialHeads(): Head[] {
  return HEAD_NAMES.map((name, index) => ({
    id: name.toLowerCase(),
    name,
    topic: TOPICS[index],
    questions: sampleQuestions[name as keyof typeof sampleQuestions] || [],
    answeredCount: 0,
    correctAnswers: 0,
    totalTime: 0,
    status: 'active',
    questionStatus: ['default', 'default', 'default', 'default', 'default']
  }));
}