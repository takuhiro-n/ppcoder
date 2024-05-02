// useKeyboardHandler.js
import { useEffect } from 'react';

const useKeyboardHandler = (questions, currentQuestionIndex, setCorrectAnswers, setCurrentQuestionIndex, setResult, correctAnswers) => {
  useEffect(() => {
    const handleKeyDown = (event) => {
      event.preventDefault();
      if (event.key === 'Control') return;
      const nextIndex = currentQuestionIndex + 1;

      if (currentQuestionIndex < questions.length) {
        if (event.ctrlKey && event.key === questions[currentQuestionIndex].shortcut) {
          setCorrectAnswers(prev => prev + 1);
          setResult('正解！');
        } else if (event.ctrlKey) {
          setResult('不正解');
        }
      }

      if (nextIndex <= questions.length) {
        setCurrentQuestionIndex(nextIndex);
      }
      
      if (nextIndex >= questions.length) {
        setResult(`終了！あなたの正解数は${correctAnswers}です。`);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentQuestionIndex, correctAnswers, questions]);
};

export default useKeyboardHandler;
