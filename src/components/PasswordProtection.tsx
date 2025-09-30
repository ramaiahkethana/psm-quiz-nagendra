import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

interface PasswordProtectionProps {
  onAuthenticate: () => void;
}

export const PasswordProtection: React.FC<PasswordProtectionProps> = ({
  onAuthenticate
}) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const correctPassword = 'Nagendra@665';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulate a brief loading state for better UX
    setTimeout(() => {
      if (password === correctPassword) {
        // Store authentication in localStorage so it persists across sessions
        localStorage.setItem('psm-quiz-authenticated', 'true');
        onAuthenticate();
      } else {
        setError('Incorrect password. Please try again.');
        setPassword('');
      }
      setIsLoading(false);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <img 
              src="/assets/company-logo.png" 
              alt="Company Logo" 
              className="bg-white h-16 w-24 rounded-lg shadow-md"
              onError={(e) => {
                e.currentTarget.src = '/assets/company-logo.png';
              }}
            />
          </div>
          <CardTitle className="text-2xl font-bold text-gray-800">
            PSM Quiz Challenge
          </CardTitle>
          <p className="text-gray-600 mt-2">
            Enter password to access the quiz
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full ${error ? 'border-red-500' : ''}`}
                disabled={isLoading}
                autoFocus
              />
              {error && (
                <p className="text-red-500 text-sm mt-2">{error}</p>
              )}
            </div>
            <Button 
              type="submit" 
              className="w-full bg-orange-600 hover:bg-orange-700"
              disabled={isLoading || !password.trim()}
            >
              {isLoading ? 'Verifying...' : 'Access Quiz'}
            </Button>
          </form>
          
          <div className="mt-6 p-4 bg-orange-50 rounded-lg">
            <h3 className="font-semibold text-orange-800 mb-2">
              Dahan Through Viveka: The PSM Purge
            </h3>
            <p className="text-orange-700 text-sm">
              The beginning of your Process Safety Management journey. 
              Test your knowledge and defeat the 10 challenges that await.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};