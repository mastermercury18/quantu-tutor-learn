
interface UserState {
  masteryLevel: number;
  streak: number;
  totalQuestions: number;
  correctAnswers: number;
  weakTopics: string[];
  strongTopics: string[];
}

export const updateState = (userState: UserState, isCorrect: boolean, timeTaken: number): UserState => {
  const newState = { ...userState };
  
  newState.totalQuestions += 1;
  
  if (isCorrect) {
    newState.correctAnswers += 1;
    newState.streak += 1;
    
    // Reward function: faster correct answers get higher rewards
    const timeBonus = Math.max(0, (10000 - timeTaken) / 10000);
    const masteryIncrease = Math.round((0.1 + timeBonus * 0.05) * 100) / 100;
    newState.masteryLevel = Math.min(10, Math.round((newState.masteryLevel + masteryIncrease) * 100) / 100);
  } else {
    newState.streak = 0;
    const masteryDecrease = Math.round(0.05 * 100) / 100;
    newState.masteryLevel = Math.max(1, Math.round((newState.masteryLevel - masteryDecrease) * 100) / 100);
  }
  
  // Update topic strengths (simplified Q-learning approach)
  const accuracy = newState.correctAnswers / newState.totalQuestions;
  if (accuracy < 0.6) {
    // Add current topics to weak topics if accuracy is low
    const currentTopics = ['algebra', 'geometry'];
    newState.weakTopics = [...new Set([...newState.weakTopics, ...currentTopics])];
  } else if (accuracy > 0.8) {
    // Move topics from weak to strong if accuracy is high
    newState.strongTopics = [...new Set([...newState.strongTopics, 'algebra'])];
    newState.weakTopics = newState.weakTopics.filter(topic => topic !== 'algebra');
  }
  
  return newState;
};
