// Game.js
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import './Game.css'; // Game.css ファイルをインポートする
import questions from './questions'; // questions.js から questions 配列をインポート
import { getQuestions } from './questionsService';  // シャッフル関数をインポート



function Game() {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [correctAnswers, setCorrectAnswers] = useState(0);
    const [keysPressed, setKeysPressed] = useState(new Set());
    const numberOfQuestions = 2;
    const keysPressedCounter = new Set(); //押したキーの数を数える
    const [currentQuestions, setCurrentQuestions] = useState([]);

    useEffect(() => {
        setCurrentQuestions(getQuestions(questions));
    }, []);

    

    //正解時のエフェクト用
    const [showCorrectAnswerAnimation, setShowCorrectAnswerAnimation] = useState(false);

    //セット関数比較ファンクション
    function areSetsEqual(set1, set2) {
        // まずサイズを比較
        if (set1.size !== set2.size) return false;
    
        // set1のすべての要素がset2に含まれているか確認
        for (let item of set1) {
            if (!set2.has(item)) {
                return false;
            }
        }
        // すべての要素が一致していればtrue
        return true;
    }

    useEffect(() => {
        // キーボードイベントハンドラを定義
        const handleKeyPress = (event) => {
            event.preventDefault();// ブラウザのショートカットを無効化
            const currentQuestion = questions[currentQuestionIndex]; // 問題セット

            // キーダウンイベントが発生したときの処理。押されたキーをSetに追加します。
            console.log({key: event.key})
            setKeysPressed(prevKeys => new Set(prevKeys.add(event.key)));

            //押しているキーの数が出題のキーの数以上になるまで成否判定しないようにしている
            console.log("押しているキーの数が出題のキーの数以上になるまで成否判定しないようにしている")
            keysPressedCounter.add(event.key)
            if ( keysPressedCounter.size < currentQuestion.multiPressCount) {
                return; // ここで関数から抜ける

            } else {
                // 条件を満たさない場合、コンソールに「実行」と出力
                console.log('実行');


                // 正解判定
                console.log("currentQuestion.answer",{answer: currentQuestion.answer})
                console.log("keysPressedCounter",{keysPressedCounter})
                console.log(areSetsEqual(new Set(currentQuestion.answer), keysPressedCounter)); 

                const isCorrect = areSetsEqual(new Set(currentQuestion.answer), keysPressedCounter); // 正解判定

                //const isCorrect = currentQuestion.answer.every(check => check(event)); // 正解判定

                // 正解していた場合、正解数をカウントアップ
                if (isCorrect) {

                    setShowCorrectAnswerAnimation(true); // アニメーション開始
                    setTimeout(() => {
                        setShowCorrectAnswerAnimation(false); // アニメーション終了後にフラグをリセット
                    }, 500); // アニメーションの時間に合わせる
                    
                    setCorrectAnswers(correctAnswers + 1);
                    console.log("正解")
                }

                setCurrentQuestionIndex(currentQuestionIndex + 1)
                
                // 次の問題へ移動
                if (currentQuestionIndex < numberOfQuestions - 1) {
                } else {
                    // 最後の問題を解答した後はイベントリスナーを解除
                    console.log("最後の問題を解答した後はイベントリスナーを解除")
                    window.removeEventListener('keydown', handleKeyPress);
                    window.addEventListener('keyup', handleKeyUp);
                }

              }

            
        };

        const handleKeyUp = (event) => {
            setKeysPressed(prevKeys => {
                const newKeys = new Set(prevKeys);
                newKeys.delete(event.key);
                return newKeys;
            });
            keysPressedCounter.delete(event.key);
        };

        // イベントリスナーを登録
        if (currentQuestionIndex < numberOfQuestions ) {
            window.addEventListener('keydown', handleKeyPress);
            window.addEventListener('keyup', handleKeyUp);
        }         

        // クリーンアップ関数
        return () => {
            window.removeEventListener('keydown', handleKeyPress);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, [currentQuestionIndex, correctAnswers]);  // 依存関係に currentQuestionIndex と correctAnswers を追加

    const displayMessage = currentQuestionIndex < currentQuestions.length ? "" : `ゲーム終了。正解数: ${correctAnswers}/${currentQuestions.length}`;

    

    return (
        <div>
            <h1>{displayMessage}</h1>
            {currentQuestionIndex < currentQuestions.length && (
                <div>
                    <p>{currentQuestions[currentQuestionIndex].question}</p>
                    <p className={showCorrectAnswerAnimation ? "correct-answer-animation" : ""}>{currentQuestionIndex+1}/{currentQuestions.length}</p>
                </div>
            )}
            <Link to="/"><button>ホームに戻る</button></Link>
        </div>
    );
}

export default Game;
