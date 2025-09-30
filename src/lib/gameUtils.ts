// Audio manager for playing sounds
export class AudioManager {
  private static instance: AudioManager;
  private blastAudio: HTMLAudioElement | null = null;
  private laughingAudio: HTMLAudioElement | null = null;

  private constructor() {
    this.initializeAudio();
  }

  public static getInstance(): AudioManager {
    if (!AudioManager.instance) {
      AudioManager.instance = new AudioManager();
    }
    return AudioManager.instance;
  }

  private initializeAudio() {
    try {
      this.blastAudio = new Audio('/assets/blast.mp3');
      this.laughingAudio = new Audio('/assets/laughing.mp3');
      
      // Set volume
      if (this.blastAudio) this.blastAudio.volume = 0.7;
      if (this.laughingAudio) this.laughingAudio.volume = 0.7;
    } catch (error) {
      console.warn('Audio files not found, sound effects will be disabled');
    }
  }

  public playBlast(): void {
    try {
      if (this.blastAudio) {
        this.blastAudio.currentTime = 0;
        this.blastAudio.play().catch(e => console.warn('Could not play blast sound:', e));
      }
    } catch (error) {
      console.warn('Error playing blast sound:', error);
    }
  }

  public playLaughing(): void {
    try {
      if (this.laughingAudio) {
        this.laughingAudio.currentTime = 0;
        this.laughingAudio.play().catch(e => console.warn('Could not play laughing sound:', e));
      }
    } catch (error) {
      console.warn('Error playing laughing sound:', error);
    }
  }
}

// Game state management utilities
export const checkVictoryCondition = (correctAnswers: number, totalAnswered: number): 'victory' | 'defeat' | 'ongoing' => {
  const wrongAnswers = totalAnswered - correctAnswers;
  
  if (correctAnswers >= 3) {
    return 'victory';
  } else if (wrongAnswers >= 3) {
    return 'defeat';
  }
  return 'ongoing';
};

export const handleHeadStatusChange = (correctAnswers: number, totalAnswered: number): {
  newStatus: 'active' | 'defeated' | 'laughing';
  shouldPlaySound: boolean;
  soundType: 'blast' | 'laughing' | null;
} => {
  const condition = checkVictoryCondition(correctAnswers, totalAnswered);
  
  if (condition === 'victory') {
    return {
      newStatus: 'defeated',
      shouldPlaySound: true,
      soundType: 'blast'
    };
  } else if (condition === 'defeat') {
    return {
      newStatus: 'laughing',
      shouldPlaySound: true,
      soundType: 'laughing'
    };
  }
  
  return {
    newStatus: 'active',
    shouldPlaySound: false,
    soundType: null
  };
};

// Local storage utilities
export const STORAGE_KEY = 'ravana-quiz-game-state';

export const saveGameState = (gameState: any): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(gameState));
  } catch (error) {
    console.warn('Could not save game state:', error);
  }
};

export const loadGameState = (): any | null => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : null;
  } catch (error) {
    console.warn('Could not load game state:', error);
    return null;
  }
};

export const clearGameState = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.warn('Could not clear game state:', error);
  }
};