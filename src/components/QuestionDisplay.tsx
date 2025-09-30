import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Question } from '../types/game';

interface QuestionDisplayProps {
  question: Question;
  timeLeft: number;
  onSubmit: (selectedAnswer: number) => void;
  isAnswerSubmitted: boolean;
  selectedAnswer: number | null;
  showResults: boolean;
}

export const QuestionDisplay: React.FC<QuestionDisplayProps> = ({
  question,
  timeLeft,
  onSubmit,
  isAnswerSubmitted,
  selectedAnswer,
  showResults
}) => {
  const [localSelectedAnswer, setLocalSelectedAnswer] = useState<number | null>(null);

  useEffect(() => {
    setLocalSelectedAnswer(null);
  }, [question.id]);

  const handleSubmit = () => {
    if (localSelectedAnswer !== null) {
      onSubmit(localSelectedAnswer);
    }
  };

  const getOptionClass = (optionIndex: number) => {
    let baseClass = "w-full p-4 text-left border-2 rounded-lg transition-all duration-200 ";
    
    if (!showResults) {
      // Before showing results
      if (localSelectedAnswer === optionIndex) {
        baseClass += "border-blue-500 bg-blue-50";
      } else {
        baseClass += "border-gray-300 hover:border-gray-400 hover:bg-gray-50";
      }
    } else {
      // After showing results
      if (optionIndex === question.correctAnswer) {
        baseClass += "border-green-500 bg-green-50 text-green-800";
      } else if (selectedAnswer === optionIndex && optionIndex !== question.correctAnswer) {
        baseClass += "border-red-500 bg-red-50 text-red-800";
      } else {
        baseClass += "border-gray-300 bg-gray-50";
      }
    }
    
    return baseClass;
  };

  const formatTime = (seconds: number) => {
    return `${Math.floor(seconds / 60)}:${(seconds % 60).toString().padStart(2, '0')}`;
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl">{question.question}</CardTitle>
          <div className={`text-lg font-bold px-4 py-2 rounded-lg ${
            timeLeft <= 10 ? 'bg-red-100 text-red-600' : 
            timeLeft <= 30 ? 'bg-yellow-100 text-yellow-600' : 
            'bg-green-100 text-green-600'
          }`}>
            {formatTime(timeLeft)}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {question.options.map((option, index) => (
            <button
              key={index}
              className={getOptionClass(index)}
              onClick={() => !isAnswerSubmitted && setLocalSelectedAnswer(index)}
              disabled={isAnswerSubmitted}
            >
              <span className="font-medium">{String.fromCharCode(65 + index)}. </span>
              {option}
            </button>
          ))}
        </div>
        
        {!isAnswerSubmitted && (
          <div className="flex justify-center mt-6">
            <Button
              onClick={handleSubmit}
              disabled={localSelectedAnswer === null}
              className="px-8 py-2"
            >
              Submit Answer
            </Button>
          </div>
        )}
        
        {showResults && (
          <div className="mt-4 p-4 rounded-lg bg-gray-50">
            <p className="text-center font-medium">
              {selectedAnswer === question.correctAnswer ? (
                <span className="text-green-600">✓ Correct!</span>
              ) : (
                <span className="text-red-600">✗ Incorrect. The correct answer is {String.fromCharCode(65 + question.correctAnswer)}.</span>
              )}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

interface TimerProps {
  timeLeft: number;
  isActive: boolean;
}

export const Timer: React.FC<TimerProps> = ({ timeLeft, isActive }) => {
  const radius = 30;
  const circumference = 2 * Math.PI * radius;
  const progress = (60 - timeLeft) / 60;
  const strokeDashoffset = circumference * (1 - progress);

  return (
    <div className="relative w-20 h-20">
      <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 68 68">
        <circle
          cx="34"
          cy="34"
          r={radius}
          stroke="currentColor"
          strokeWidth="4"
          fill="transparent"
          className="text-gray-200"
        />
        <circle
          cx="34"
          cy="34"
          r={radius}
          stroke="currentColor"
          strokeWidth="4"
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          className={`transition-all duration-1000 ${
            timeLeft <= 10 ? 'text-red-500' : 
            timeLeft <= 30 ? 'text-yellow-500' : 
            'text-green-500'
          }`}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className={`text-lg font-bold ${
          timeLeft <= 10 ? 'text-red-600' : 
          timeLeft <= 30 ? 'text-yellow-600' : 
          'text-green-600'
        }`}>
          {timeLeft}
        </span>
      </div>
    </div>
  );
};