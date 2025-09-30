import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Head } from '../types/game';

interface ScoreboardProps {
  heads: Head[];
}

interface ScoreEntry {
  name: string;
  correctAnswers: number;
  wrongAnswers: number;
  totalTime: number;
  status: 'active' | 'defeated' | 'laughing';
  completionRate: number;
}

export const Scoreboard: React.FC<ScoreboardProps> = ({ heads }) => {
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const getScoreEntries = (): ScoreEntry[] => {
    return heads
      .filter(head => head.answeredCount > 0) // Only show heads that have been attempted
      .map(head => ({
        name: head.name,
        correctAnswers: head.correctAnswers,
        wrongAnswers: head.answeredCount - head.correctAnswers,
        totalTime: head.totalTime,
        status: head.status,
        completionRate: head.answeredCount / 5
      }))
      .sort((a, b) => {
        // Priority 1: 3+ correct answers (defeated heads)
        if (a.correctAnswers >= 3 && b.correctAnswers < 3) return -1;
        if (b.correctAnswers >= 3 && a.correctAnswers < 3) return 1;
        
        // Priority 2: If both have 3+ correct, sort by time (faster wins)
        if (a.correctAnswers >= 3 && b.correctAnswers >= 3) {
          return a.totalTime - b.totalTime;
        }
        
        // Priority 3: For non-defeated heads, sort by correct answers (more correct wins)
        if (a.correctAnswers !== b.correctAnswers) {
          return b.correctAnswers - a.correctAnswers;
        }
        
        // Priority 4: If same correct answers, sort by wrong answers (fewer wrong wins)
        if (a.wrongAnswers !== b.wrongAnswers) {
          return a.wrongAnswers - b.wrongAnswers;
        }
        
        // Priority 5: If still tied, sort by time (faster wins)
        return a.totalTime - b.totalTime;
      });
  };

  const scoreEntries = getScoreEntries();

  const getRowClass = (entry: ScoreEntry, index: number) => {
    let baseClass = "border-b border-gray-200 ";
    
    if (entry.status === 'defeated') {
      baseClass += "bg-green-50 ";
    } else if (entry.status === 'laughing') {
      baseClass += "bg-red-50 ";
    } else if (index === 0) {
      baseClass += "bg-yellow-50 "; // Leader
    }
    
    return baseClass;
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'defeated':
        return '🎉';
      case 'laughing':
        return '😈';
      default:
        return '⚡';
    }
  };

  const getRankDisplay = (index: number, entry: ScoreEntry) => {
    if (entry.status === 'defeated') {
      return '👑';
    }
    return index + 1;
  };

  if (scoreEntries.length === 0) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center">
            🏆 Scoreboard
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-gray-500 py-8">
            No teams have started yet. Click on a head to begin!
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>🏆 Scoreboard</span>
          <span className="text-sm text-gray-500">
            {scoreEntries.filter(e => e.status === 'defeated').length} defeated, {' '}
            {scoreEntries.filter(e => e.status === 'laughing').length} laughing
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b-2 border-gray-300 bg-gray-50">
                <th className="text-left p-3 font-semibold">Rank</th>
                <th className="text-left p-3 font-semibold">Head Name</th>
                <th className="text-center p-3 font-semibold">Correct</th>
                <th className="text-center p-3 font-semibold">Wrong</th>
                <th className="text-center p-3 font-semibold">Time</th>
                <th className="text-center p-3 font-semibold">Status</th>
                <th className="text-center p-3 font-semibold">Progress</th>
              </tr>
            </thead>
            <tbody>
              {scoreEntries.map((entry, index) => (
                <tr key={entry.name} className={getRowClass(entry, index)}>
                  <td className="p-3 font-bold text-center">
                    {getRankDisplay(index, entry)}
                  </td>
                  <td className="p-3 font-medium">
                    {entry.name}
                    {index === 0 && entry.status !== 'defeated' && (
                      <span className="ml-2 text-yellow-600">👑</span>
                    )}
                  </td>
                  <td className="p-3 text-center">
                    <span className="inline-flex items-center justify-center w-8 h-8 bg-green-100 text-green-800 rounded-full font-bold">
                      {entry.correctAnswers}
                    </span>
                  </td>
                  <td className="p-3 text-center">
                    <span className="inline-flex items-center justify-center w-8 h-8 bg-red-100 text-red-800 rounded-full font-bold">
                      {entry.wrongAnswers}
                    </span>
                  </td>
                  <td className="p-3 text-center font-mono">
                    {formatTime(entry.totalTime)}
                  </td>
                  <td className="p-3 text-center">
                    <span className="text-lg" title={entry.status}>
                      {getStatusIcon(entry.status)}
                    </span>
                  </td>
                  <td className="p-3">
                    <div className="flex items-center space-x-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full transition-all duration-300 ${
                            entry.status === 'defeated' ? 'bg-green-500' :
                            entry.status === 'laughing' ? 'bg-red-500' :
                            'bg-blue-500'
                          }`}
                          style={{ width: `${entry.completionRate * 100}%` }}
                        />
                      </div>
                      <span className="text-xs text-gray-600 min-w-[3rem]">
                        {Math.round(entry.completionRate * 100)}%
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Summary Stats */}
        <div className="mt-6 grid grid-cols-3 gap-4 text-center">
          <div className="p-3 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">
              {scoreEntries.filter(e => e.status === 'defeated').length}
            </div>
            <div className="text-sm text-green-800">Heads Defeated</div>
          </div>
          <div className="p-3 bg-red-50 rounded-lg">
            <div className="text-2xl font-bold text-red-600">
              {scoreEntries.filter(e => e.status === 'laughing').length}
            </div>
            <div className="text-sm text-red-800">Heads Laughing</div>
          </div>
          <div className="p-3 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">
              {scoreEntries.filter(e => e.status === 'active').length}
            </div>
            <div className="text-sm text-blue-800">Heads Active</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};