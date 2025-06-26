
import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Brain, Zap, Target, TrendingUp } from 'lucide-react';
import { QuestionGenerator } from './QuestionGenerator';
import { MasteryTracker } from './MasteryTracker';
import { ReinforcementAgent } from './ReinforcementAgent';
import { generateTEBDQuestion } from '@/utils/questionUtils';
import { updateState } from '@/utils/reinforcementUtils';

interface UserState {
  masteryLevel: number;
  streak: number;
  totalQuestions: number;
  correctAnswers: number;
  weakTopics: string[];
  strongTopics: string[];
}

const QuantumTutor: React.FC = () => {
  const [userState, setUserState] = useState<UserState>({
    masteryLevel: 1,
    streak: 0,
    totalQuestions: 0,
    correctAnswers: 0,
    weakTopics: [],
    strongTopics: []
  });

  const [currentQuestion, setCurrentQuestion] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [sessionActive, setSessionActive] = useState(false);

  const generateNewQuestion = useCallback(async () => {
    setIsLoading(true);
    try {
      // Simulate quantum-inspired question generation with TEBD
      await new Promise(resolve => setTimeout(resolve, 1000));
      const difficulty = Math.min(userState.masteryLevel + (Math.random() - 0.5), 10);
      const question = await generateTEBDQuestion(difficulty, userState.weakTopics);
      setCurrentQuestion(question);
    } catch (error) {
      console.error('Error generating question:', error);
    } finally {
      setIsLoading(false);
    }
  }, [userState.masteryLevel, userState.weakTopics]);

  const handleAnswer = (isCorrect: boolean, timeTaken: number) => {
    const newState = updateState(userState, isCorrect, timeTaken);
    setUserState(newState);
    
    // Generate next question based on updated state
    setTimeout(() => generateNewQuestion(), 1500);
  };

  const startSession = () => {
    setSessionActive(true);
    generateNewQuestion();
  };

  const accuracy = userState.totalQuestions > 0 ? 
    Math.round((userState.correctAnswers / userState.totalQuestions) * 100) : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Brain className="w-8 h-8 text-purple-400" />
            <h1 className="text-4xl font-bold text-white">Quantum Math Tutor</h1>
            <Zap className="w-8 h-8 text-yellow-400" />
          </div>
          <p className="text-purple-200 text-lg">
            Adaptive Learning with Deep Q-Learning & Time-Evolving Block Decimation
          </p>
        </div>

        {/* Stats Dashboard */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-slate-800/50 border-purple-500/30 backdrop-blur-sm">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Target className="w-5 h-5 text-green-400" />
                <span className="text-green-400 font-medium">Mastery Level</span>
              </div>
              <div className="text-2xl font-bold text-white">{userState.masteryLevel}</div>
              <Progress value={userState.masteryLevel * 10} className="mt-2" />
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-purple-500/30 backdrop-blur-sm">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-5 h-5 text-blue-400" />
                <span className="text-blue-400 font-medium">Accuracy</span>
              </div>
              <div className="text-2xl font-bold text-white">{accuracy}%</div>
              <Progress value={accuracy} className="mt-2" />
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-purple-500/30 backdrop-blur-sm">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="w-5 h-5 text-yellow-400" />
                <span className="text-yellow-400 font-medium">Streak</span>
              </div>
              <div className="text-2xl font-bold text-white">{userState.streak}</div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-purple-500/30 backdrop-blur-sm">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Brain className="w-5 h-5 text-purple-400" />
                <span className="text-purple-400 font-medium">Questions</span>
              </div>
              <div className="text-2xl font-bold text-white">{userState.totalQuestions}</div>
            </CardContent>
          </Card>
        </div>

        {!sessionActive ? (
          <Card className="bg-slate-800/50 border-purple-500/30 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white text-center">Ready to Start Learning?</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-purple-200 mb-6">
                Our quantum-inspired AI will adapt to your learning style using advanced reinforcement learning
              </p>
              <Button 
                onClick={startSession}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-3 text-lg"
              >
                Begin Adaptive Session
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Main Question Area */}
            <div className="lg:col-span-2">
              {currentQuestion && (
                <QuestionGenerator 
                  question={currentQuestion}
                  onAnswer={handleAnswer}
                  isLoading={isLoading}
                />
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <MasteryTracker userState={userState} />
              <ReinforcementAgent 
                userState={userState}
                onStateUpdate={setUserState}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuantumTutor;
