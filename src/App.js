import React, { useState, useEffect, useMemo } from 'react';

function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0); // 正解数を追跡するための状態を追加
  const [result, setResult] = useState('');
  const [gameEnded, setGameEnded] = useState(false);

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
  
      // 現在の問題に対する回答を処理
      if (currentQuestionIndex < questions.length) {
        if (event.ctrlKey && event.key === questions[currentQuestionIndex].shortcut) {
          setCorrectAnswers(correctAnswers => correctAnswers + 1);  // 正解数を更新
          setResult('正解！');
        } else if (event.ctrlKey) {
          setResult('不正解');
        }
  
        // 次の問題へ進むか、すべての問題が終了した場合に結果を表示
        const nextIndex = currentQuestionIndex + 1;
        if (nextIndex < questions.length) {
          setCurrentQuestionIndex(nextIndex);
        } else {
          setGameEnded(true);
          setResult(`終了！あなたの正解数は${correctAnswers}です。`);  // ゲーム終了時に結果を表示
        }
      }
    };
  
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentQuestionIndex, questions, gameStarted, correctAnswers]);

  const startGame = () => {
    setGameStarted(true);
    setGameEnded(false);
    setCurrentQuestionIndex(0);
    setCorrectAnswers(0); // ゲーム開始時に正解数をリセット
    setResult('');
  };

  const resetGame = () => {
    setGameStarted(false);
    setGameEnded(false);
    setResult('');
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>PpCoder</h1>
        {!gameStarted && !gameEnded && (
          <button onClick={startGame}>ゲームをする</button>
        )}
        {gameEnded && (
          <>
            <p>{result}</p>
            <button onClick={resetGame}>戻る</button>
          </>
        )}
        {gameStarted && !gameEnded && (
          <>
            {currentQuestionIndex < questions.length ? (
              <p>問題: {questions[currentQuestionIndex].prompt}</p>
            ) : (
              <p>{result}</p> // 全問題終了後には結果を表示
            )}
          </>
        )}
      </header>
    </div>
  );
}

export default App;
