// questionsService.js
export const getQuestions = (allQuestions) => {
    let shuffled = [...allQuestions];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]; // 要素の入れ替え
    }
    return shuffled.slice(0, 2);
  };
  