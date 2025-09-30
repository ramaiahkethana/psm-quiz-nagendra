import React, { useState, useEffect, useCallback } from 'react';
import { HeadsLayout } from './components/HeadsLayout';
import { HeadSelectionPanel } from './components/HeadSelectionPanel';
import { QuestionDisplay } from './components/QuestionDisplay';
import { Scoreboard } from './components/Scoreboard';
import { Menu } from './components/Menu';
import { PasswordProtection } from './components/PasswordProtection';
import { createInitialHeads } from './data/questions';
import { GameState } from './types/game';
import { 
  AudioManager, 
  handleHeadStatusChange, 
  saveGameState, 
  loadGameState, 
  clearGameState 
} from './lib/gameUtils';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [gameState, setGameState] = useState<GameState>({
    heads: createInitialHeads(),
    selectedHead: null,
    currentQuestion: null,
    timer: 60,
    isAnswerSubmitted: false,
    selectedAnswer: null
  });

  const audioManager = AudioManager.getInstance();

  const [questionStartTime, setQuestionStartTime] = useState<number>(0);
  const [showResults, setShowResults] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number | null>(null);
  const [isInitialized, setIsInitialized] = useState(false); // Flag to track if state is loaded

  // Check authentication on app load
  useEffect(() => {
    const checkAuth = () => {
      const isAuth = localStorage.getItem('psm-quiz-authenticated') === 'true';
      setIsAuthenticated(isAuth);
      setIsCheckingAuth(false);
    };

    checkAuth();
  }, []);

  // Handle successful authentication
  const handleAuthSuccess = () => {
    setIsAuthenticated(true);
  };

  // Load saved game state on component mount (only if authenticated)
  useEffect(() => {
    if (!isAuthenticated) return;
    
    const savedState = loadGameState();
    if (savedState && savedState.heads) {
      setGameState({
        heads: savedState.heads,
        selectedHead: savedState.selectedHead || null,
        currentQuestion: savedState.currentQuestion || null,
        timer: savedState.timer || 60,
        isAnswerSubmitted: savedState.isAnswerSubmitted || false,
        selectedAnswer: savedState.selectedAnswer || null
      });
      if (savedState.currentQuestionIndex !== undefined) {
        setCurrentQuestionIndex(savedState.currentQuestionIndex);
      }
      if (savedState.showResults !== undefined) {
        setShowResults(savedState.showResults);
      }
    }
    setIsInitialized(true); // Mark as initialized after loading
  }, [isAuthenticated]);

  // Save game state whenever it changes (only after initialization)
  useEffect(() => {
    if (!isInitialized) return; // Don't save until we've loaded the initial state
    
    saveGameState({ 
      heads: gameState.heads,
      selectedHead: gameState.selectedHead,
      currentQuestion: gameState.currentQuestion,
      timer: gameState.timer,
      isAnswerSubmitted: gameState.isAnswerSubmitted,
      selectedAnswer: gameState.selectedAnswer,
      currentQuestionIndex,
      showResults
    });
  }, [gameState, currentQuestionIndex, showResults, isInitialized]);

  // Timer effect for hiding defeated heads after 10 seconds
  useEffect(() => {
    const checkHeadsToHide = () => {
      const currentTime = Date.now();
      setGameState(prev => ({
        ...prev,
        heads: prev.heads.map(head => {
          if (head.status === 'defeated' && head.statusChangeTime && !head.isHidden) {
            const timeSinceStatusChange = currentTime - head.statusChangeTime;
            if (timeSinceStatusChange >= 10000) { // 10 seconds
              return { ...head, isHidden: true };
            }
          }
          return head;
        })
      }));
    };

    const interval = setInterval(checkHeadsToHide, 1000);
    return () => clearInterval(interval);
  }, []);

  // Timer effect for question countdown
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (gameState.currentQuestion && !gameState.isAnswerSubmitted && gameState.timer > 0) {
      interval = setInterval(() => {
        setGameState(prev => ({
          ...prev,
          timer: Math.max(0, prev.timer - 1)
        }));
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [gameState.currentQuestion, gameState.isAnswerSubmitted, gameState.timer]);

  const handleHeadClick = useCallback((headId: string) => {
    // Don't allow clicking on defeated or laughing heads
    const selectedHead = gameState.heads.find(h => h.id === headId);
    if (selectedHead && (selectedHead.status === 'defeated' || selectedHead.status === 'laughing')) {
      return;
    }

    setGameState(prev => ({
      ...prev,
      selectedHead: headId,
      currentQuestion: null,
      timer: 60,
      isAnswerSubmitted: false,
      selectedAnswer: null
    }));
    setShowResults(false);
    setCurrentQuestionIndex(null);
  }, [gameState.heads]);

  const handleQuestionSelect = useCallback((questionIndex: number) => {
    const selectedHead = gameState.heads.find(h => h.id === gameState.selectedHead);
    if (!selectedHead || !selectedHead.questions[questionIndex]) return;

    setGameState(prev => ({
      ...prev,
      currentQuestion: selectedHead.questions[questionIndex].id,
      timer: 60,
      isAnswerSubmitted: false,
      selectedAnswer: null
    }));
    setQuestionStartTime(Date.now());
    setShowResults(false);
    setCurrentQuestionIndex(questionIndex);
  }, [gameState.heads, gameState.selectedHead]);

  const handleAnswerSubmit = useCallback((selectedAnswer: number) => {
    const selectedHead = gameState.heads.find(h => h.id === gameState.selectedHead);
    const currentQuestion = selectedHead?.questions.find(q => q.id === gameState.currentQuestion);
    
    if (!selectedHead || !currentQuestion || currentQuestionIndex === null) return;

    const timeTaken = gameState.timer === 0 ? 60 : Math.min(60, Math.ceil((Date.now() - questionStartTime) / 1000));
    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;

    // Update head state
    const updatedHeads = gameState.heads.map(head => {
      if (head.id === selectedHead.id) {
        const newAnsweredCount = head.questionStatus[currentQuestionIndex] === 'default' ? 
          head.answeredCount + 1 : head.answeredCount;
        const newCorrectAnswers = isCorrect && head.questionStatus[currentQuestionIndex] === 'default' ? 
          head.correctAnswers + 1 : 
          isCorrect && head.questionStatus[currentQuestionIndex] === 'wrong' ?
          head.correctAnswers + 1 :
          !isCorrect && head.questionStatus[currentQuestionIndex] === 'correct' ?
          head.correctAnswers - 1 :
          head.correctAnswers;
        
        const newQuestionStatus = [...head.questionStatus];
        newQuestionStatus[currentQuestionIndex] = isCorrect ? 'correct' : 'wrong';

        const newTotalTime = head.questionStatus[currentQuestionIndex] === 'default' ? 
          head.totalTime + timeTaken : head.totalTime;

        // Check for status changes
        const statusInfo = handleHeadStatusChange(newCorrectAnswers, newAnsweredCount);
        
        // Play sound effects and set status change time
        let statusChangeTime = head.statusChangeTime;
        if (statusInfo.shouldPlaySound) {
          const audioManager = AudioManager.getInstance();
          if (statusInfo.soundType === 'blast') {
            audioManager.playBlast();
          } else if (statusInfo.soundType === 'laughing') {
            audioManager.playLaughing();
          }
          statusChangeTime = Date.now(); // Record when status changed
        }

        return {
          ...head,
          answeredCount: newAnsweredCount,
          correctAnswers: newCorrectAnswers,
          totalTime: newTotalTime,
          status: statusInfo.newStatus,
          questionStatus: newQuestionStatus,
          statusChangeTime
        };
      }
      return head;
    });

    setGameState(prev => ({
      ...prev,
      heads: updatedHeads,
      isAnswerSubmitted: true,
      selectedAnswer
    }));

    setShowResults(true);
  }, [gameState, currentQuestionIndex, questionStartTime]);

  const handleClearStorage = useCallback(() => {
    clearGameState();
    setGameState({
      heads: createInitialHeads(),
      selectedHead: null,
      currentQuestion: null,
      timer: 60,
      isAnswerSubmitted: false,
      selectedAnswer: null
    });
    setShowResults(false);
    setCurrentQuestionIndex(null);
    setIsInitialized(true); // Keep initialized flag true after clearing
  }, []);

  const selectedHead = gameState.heads.find(h => h.id === gameState.selectedHead);
  const currentQuestion = selectedHead?.questions.find(q => q.id === gameState.currentQuestion);

  return (
    <>
      {/* Show loading state while checking authentication */}
      {isCheckingAuth && (
        <div className="min-h-screen bg-gradient-to-br from-red-900 via-orange-800 to-yellow-600 flex items-center justify-center">
          <div className="text-white text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white mx-auto mb-4"></div>
            <p className="text-xl">Loading PSM Quiz...</p>
          </div>
        </div>
      )}

      {/* Show password protection if not authenticated */}
      {!isCheckingAuth && !isAuthenticated && (
        <PasswordProtection onAuthenticate={handleAuthSuccess} />
      )}

      {/* Show main quiz app if authenticated */}
      {!isCheckingAuth && isAuthenticated && (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50">
          {/* Header */}
          <header className="bg-gradient-to-r from-red-600 to-orange-600 text-white shadow-lg">
            <div className="max-w-7xl mx-auto px-4 py-6 flex justify-between items-center">
              {/* Company Logo */}
              <div className="flex items-center">
                <img 
                  src="/assets/company-logo.png" 
                  alt="Company Logo" 
                  className="bg-white h-16 w-24 rounded-lg shadow-md"
                  onError={(e) => {
                    // Fallback to local logo if external URL fails
                    e.currentTarget.src = '/assets/company-logo.png';
                  }}
                />
              </div>
              
              {/* Quiz Title - Center */}
              <div className="flex-1 text-center">
                <h1 className="text-3xl font-bold">Dahan Through Viveka: The PSM Purge</h1>
                <p className="text-orange-100 mt-1">The beginning.</p>
              </div>
              
              {/* Menu - Right */}
              <Menu onClearStorage={handleClearStorage} />
            </div>
          </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Heads Layout */}
        <div className="mb-8">
          <HeadsLayout
            heads={gameState.heads}
            selectedHeadId={gameState.selectedHead}
            onHeadClick={handleHeadClick}
          />
        </div>

        {/* Game Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Panel - Head Selection */}
          <div className="lg:col-span-1">
            <HeadSelectionPanel
              head={selectedHead || null}
              onQuestionSelect={handleQuestionSelect}
              currentQuestionIndex={currentQuestionIndex}
            />
          </div>

          {/* Center Panel - Question Display */}
          <div className="lg:col-span-2">
            {currentQuestion ? (
              <QuestionDisplay
                question={currentQuestion}
                timeLeft={gameState.timer}
                onSubmit={handleAnswerSubmit}
                isAnswerSubmitted={gameState.isAnswerSubmitted}
                selectedAnswer={gameState.selectedAnswer}
                showResults={showResults}
              />
            ) : (
              <div className="bg-white rounded-lg shadow-md p-8 text-center">
                <h3 className="text-xl font-semibold text-gray-600 mb-4">
                  Question Area
                </h3>
                <p className="text-gray-500">
                  {selectedHead 
                    ? "Select a question from the panel on the left to begin" 
                    : "Select a head and then choose a question to start the challenge"}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Scoreboard */}
        <div className="mt-12">
          <Scoreboard heads={gameState.heads} />
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p>&copy; 2025 PSM Quiz Challenge. Test your knowledge and defeat the demon king!</p>
        </div>
      </footer>
        </div>
      )}
    </>
  );
}

export default App;
