import React from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Head } from '../types/game';

interface HeadSelectionPanelProps {
  head: Head | null;
  onQuestionSelect: (questionIndex: number) => void;
  currentQuestionIndex: number | null;
}

export const HeadSelectionPanel: React.FC<HeadSelectionPanelProps> = ({
  head,
  onQuestionSelect,
  currentQuestionIndex
}) => {
  if (!head) {
    return (
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center text-gray-500">
            Select a head to begin
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-gray-400">
            Click on any of the Ravana heads above to start answering questions
          </p>
        </CardContent>
      </Card>
    );
  }

  const getQuestionButtonClass = (index: number) => {
    const baseClass = "w-16 h-16 text-lg font-bold rounded-lg transition-all duration-200 ";
    const status = head.questionStatus[index];
    const isDisabled = head.status === 'defeated' || head.status === 'laughing';
    
    if (currentQuestionIndex === index && !isDisabled) {
      return baseClass + "bg-blue-500 text-white border-2 border-blue-600";
    }
    
    if (isDisabled) {
      return baseClass + "bg-gray-400 text-gray-600 cursor-not-allowed opacity-50";
    }
    
    switch (status) {
      case 'correct':
        return baseClass + "bg-green-500 text-white hover:bg-green-600";
      case 'wrong':
        return baseClass + "bg-red-500 text-white hover:bg-red-600";
      default:
        return baseClass + "bg-gray-200 text-gray-700 hover:bg-gray-300 border-2 border-gray-300";
    }
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const getProgressColor = () => {
    if (head.status === 'defeated') return 'text-green-600';
    if (head.status === 'laughing') return 'text-red-600';
    return 'text-blue-600';
  };

  const isHeadCompleted = head.status === 'defeated' || head.status === 'laughing';

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>{head.name}</span>
          <span className={`text-sm ${getProgressColor()}`}>
            {head.status === 'defeated' ? 'DEFEATED' : 
             head.status === 'laughing' ? 'LAUGHING' : 'ACTIVE'}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Topic Information */}
        <div className="p-3 bg-orange-50 rounded-lg">
          <h4 className="font-semibold text-orange-800">Topic:</h4>
          <p className="text-orange-700">{head.topic}</p>
        </div>
        
        {/* Statistics */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="text-center p-2 bg-blue-50 rounded">
            <div className="font-semibold text-blue-800">Questions</div>
            <div className="text-blue-600">{head.answeredCount}/5</div>
          </div>
          <div className="text-center p-2 bg-green-50 rounded">
            <div className="font-semibold text-green-800">Correct</div>
            <div className="text-green-600">{head.correctAnswers}</div>
          </div>
        </div>
        
        <div className="text-center p-2 bg-purple-50 rounded">
          <div className="font-semibold text-purple-800">Total Time</div>
          <div className="text-purple-600">{formatTime(head.totalTime)}</div>
        </div>
        
        {/* Question Buttons */}
        <div className="space-y-3">
          <h4 className="font-semibold text-gray-700">Questions:</h4>
          <div className="grid grid-cols-5 gap-2">
            {[0, 1, 2, 3, 4].map((index) => (
              <Button
                key={index}
                className={getQuestionButtonClass(index)}
                onClick={() => onQuestionSelect(index)}
                disabled={isHeadCompleted}
              >
                Q{index + 1}
              </Button>
            ))}
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className={`h-2 rounded-full transition-all duration-500 ${
              head.status === 'defeated' ? 'bg-green-500' :
              head.status === 'laughing' ? 'bg-red-500' :
              'bg-blue-500'
            }`}
            style={{ width: `${(head.answeredCount / 5) * 100}%` }}
          />
        </div>
        
        {/* Status Message */}
        {head.answeredCount === 5 && (
          <div className={`text-center p-3 rounded-lg ${
            head.correctAnswers >= 3 
              ? 'bg-green-100 text-green-800' 
              : 'bg-red-100 text-red-800'
          }`}>
            {head.correctAnswers >= 3 
              ? '🎉 Head Defeated!' 
              : '😈 Head is Laughing!'}
          </div>
        )}

        {/* Completion message for inactive heads */}
        {isHeadCompleted && (
          <div className="text-center p-2 bg-gray-100 rounded-lg text-gray-600 text-sm">
            This head is no longer interactive
          </div>
        )}
      </CardContent>
    </Card>
  );
};