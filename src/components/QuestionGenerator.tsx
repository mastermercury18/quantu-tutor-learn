
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, Clock, Atom } from 'lucide-react';
import { saveQuestionAttempt } from '@/utils/questionUtils';

interface Question {
  id: string;
  type: string;
  difficulty: number;
  question: string;
  answer: number;
  explanation: string;
  topic: string;
  quantumState: number[];
}

interface QuestionGeneratorProps {
  question: Question;
  onAnswer: (isCorrect: boolean, timeTaken: number) => void;
  isLoading: boolean;
}

export const QuestionGenerator: React.FC<QuestionGeneratorProps> = ({
  question,
  onAnswer,
  isLoading
}) => {
  const [userAnswer, setUserAnswer] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [startTime, setStartTime] = useState<number>(Date.now());
  const [feedback, setFeedback] = useState<string>('');

  useEffect(() => {
    setStartTime(Date.now());
    setSubmitted(false);
    setUserAnswer('');
    setFeedback('');
  }, [question]);

  const handleSubmit = async () => {
    const timeTaken = Date.now() - startTime;
    const numericAnswer = parseFloat(userAnswer);
    const isCorrect = Math.abs(numericAnswer - question.answer) < 0.01;
    
    setSubmitted(true);
    setFeedback(isCorrect ? 'Correct! Well done!' : `Incorrect. The answer is ${question.answer}`);
    
    // Save the attempt to the database
    await saveQuestionAttempt(question.id, numericAnswer, isCorrect, timeTaken);
    
    setTimeout(() => {
      onAnswer(isCorrect, timeTaken);
    }, 2000);
  };

  if (isLoading) {
    return (
      <Card className="bg-slate-800/50 border-purple-500/30 backdrop-blur-sm">
        <CardContent className="p-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Atom className="w-8 h-8 text-purple-400 animate-spin" />
            <span className="text-purple-200 text-lg">Quantum State Evolution...</span>
          </div>
          <div className="w-full bg-slate-700 rounded-full h-2">
            <div className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full animate-pulse" style={{width: '70%'}}></div>
          </div>
          <p className="text-sm text-purple-300 mt-3">
            Applying Time-Evolving Block Decimation to generate optimal question
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-slate-800/50 border-purple-500/30 backdrop-blur-sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-white flex items-center gap-2">
            <Atom className="w-6 h-6 text-purple-400" />
            Quantum Generated Problem
          </CardTitle>
          <div className="flex gap-2">
            <Badge variant="outline" className="border-purple-400 text-purple-300">
              {question.topic}
            </Badge>
            <Badge variant="outline" className="border-blue-400 text-blue-300">
              Level {question.difficulty}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="bg-slate-700/50 p-6 rounded-lg border border-purple-500/20">
          <p className="text-white text-lg leading-relaxed">{question.question}</p>
        </div>

        {!submitted ? (
          <div className="space-y-4">
            <div className="flex gap-3">
              <Input
                type="number"
                step="0.01"
                placeholder="Enter your answer..."
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                className="bg-slate-700 border-purple-500/30 text-white placeholder-purple-300"
                onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
              />
              <Button 
                onClick={handleSubmit}
                disabled={!userAnswer.trim()}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
              >
                Submit
              </Button>
            </div>
            <div className="flex items-center gap-2 text-purple-300">
              <Clock className="w-4 h-4" />
              <span className="text-sm">Quantum coherence maintained...</span>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className={`p-4 rounded-lg border ${
              feedback.startsWith('Correct') 
                ? 'bg-green-900/30 border-green-500/50' 
                : 'bg-red-900/30 border-red-500/50'
            }`}>
              <div className="flex items-center gap-2 mb-2">
                {feedback.startsWith('Correct') ? (
                  <CheckCircle className="w-5 h-5 text-green-400" />
                ) : (
                  <XCircle className="w-5 h-5 text-red-400" />
                )}
                <span className={
                  feedback.startsWith('Correct') ? 'text-green-300' : 'text-red-300'
                }>
                  {feedback}
                </span>
              </div>
              <p className="text-purple-200 text-sm">{question.explanation}</p>
            </div>
          </div>
        )}

        {/* Quantum State Visualization */}
        <div className="bg-slate-700/30 p-4 rounded-lg border border-purple-500/20">
          <h4 className="text-purple-300 text-sm font-medium mb-2">Quantum State Superposition</h4>
          <div className="flex gap-1">
            {question.quantumState.map((amplitude, index) => (
              <div
                key={index}
                className="bg-gradient-to-t from-purple-600 to-blue-400 rounded-sm"
                style={{
                  height: `${Math.abs(amplitude) * 30 + 5}px`,
                  width: '8px',
                  opacity: 0.7 + Math.abs(amplitude) * 0.3
                }}
              />
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
