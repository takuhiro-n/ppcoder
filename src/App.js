import React, { useState, useEffect, useMemo } from 'react';

function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [result, setResult] = useState('');

  const allQuestions = useMemo(() => [
    { prompt: "オブジェクトを複製したい", shortcut: 'd', description: 'Ctrl+D' },
    { prompt: "ページをリロードしたい", shortcut: 'r', description: 'Ctrl+R' },
    { prompt: "ページを保存したい", shortcut: 's', description: 'Ctrl+S' }
  ], []);

  const questions = useMemo(() => {
    let shuffled = [...allQuestions];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled.slice(0, 2);
  }, [allQuestions]);

  useEffect(() => {
    if (!gameStarted) return;

    const handleKeyDown = (event) => {
      event.preventDefault();
      if (event.key === 'Control') return;

      const nextIndex = currentQuestionIndex + 1;

      if (currentQuestionIndex < questions.length) {
        if (event.ctrlKey && event.key === questions[currentQuestionIndex].shortcut) {
          setCorrectAnswers(prev => prev + 1);  // Increment only if within question limit
          setResult('正解！');
        } else if (event.ctrlKey) {
          setResult('不正解');
        }
      }

      // Move to the next question or end the game
      if (nextIndex <= questions.length) {
        setCurrentQuestionIndex(nextIndex);
      }
      
      if (nextIndex >= questions.length) {
        setResult(`終了！あなたの正解数は${correctAnswers}です。`);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentQuestionIndex, correctAnswers, questions, gameStarted]);

  const startGame = () => {
    setGameStarted(true);
    setCurrentQuestionIndex(0);
    setCorrectAnswers(0);
    setResult('');
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>PpCoder</h1>
        {!gameStarted ? (
          <button onClick={startGame}>ゲームをする</button>
        ) : (
          <>
            {currentQuestionIndex < questions.length && <p>問題: {questions[currentQuestionIndex].prompt}</p>}
            <p>{result}</p>
          </>
        )}
      </header>
    </div>
  );
}

export default App;
