
export const generateTEBDQuestion = (difficulty: number, weakTopics: string[]) => {
  const topics = ['algebra', 'geometry', 'calculus', 'statistics', 'trigonometry'];
  const selectedTopic = weakTopics.length > 0 ? 
    weakTopics[Math.floor(Math.random() * weakTopics.length)] : 
    topics[Math.floor(Math.random() * topics.length)];

  // Generate quantum state for TEBD simulation
  const quantumState = Array.from({length: 8}, () => (Math.random() - 0.5) * 2);
  
  const questions = {
    algebra: [
      {
        question: `Solve for x: ${Math.round(difficulty * 100) / 100}x + ${Math.round(difficulty * 2 * 100) / 100} = ${Math.round(difficulty * 5 * 100) / 100}`,
        answer: Math.round((difficulty * 3 / difficulty) * 100) / 100,
        explanation: "Subtract the constant term from both sides, then divide by the coefficient of x."
      },
      {
        question: `If f(x) = ${Math.round(difficulty * 100) / 100}x² + ${Math.round(difficulty * 2 * 100) / 100}x + 1, what is f(2)?`,
        answer: Math.round((difficulty * 4 + difficulty * 4 + 1) * 100) / 100,
        explanation: "Substitute x = 2 into the function and calculate."
      }
    ],
    geometry: [
      {
        question: `What is the area of a circle with radius ${Math.round(difficulty * 100) / 100}?`,
        answer: Math.round(Math.PI * difficulty * difficulty * 100) / 100,
        explanation: "Use the formula A = πr² where r is the radius."
      }
    ]
  };

  const topicQuestions = questions[selectedTopic as keyof typeof questions] || questions.algebra;
  const selectedQ = topicQuestions[Math.floor(Math.random() * topicQuestions.length)];

  return {
    id: Math.random().toString(36).substr(2, 9),
    type: 'numeric',
    difficulty: Math.round(difficulty * 100) / 100,
    topic: selectedTopic,
    question: selectedQ.question,
    answer: selectedQ.answer,
    explanation: selectedQ.explanation,
    quantumState
  };
};
