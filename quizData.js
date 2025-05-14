const quizData = [
  {
    question: "日本の首都はどこですか？",
    choices: [
      { text: "大阪" },
      { text: "京都" },
      { text: "東京" },
      { text: "札幌" },
    ],
    correct: 2,
  },
  {
    question: "富士山の標高は何メートルですか？",
    choices: [
      { text: "3,776メートル" },
      { text: "4,000メートル" },
      { text: "2,500メートル" },
      { text: "3,500メートル" },
    ],
    correct: 0,
  },
  {
    question: "日本で一番面積の大きい都道府県はどこですか？",
    choices: [
      { text: "北海道" },
      { text: "沖縄県" },
      { text: "愛知県" },
      { text: "兵庫県" },
    ],
    correct: 0,
  },
  {
    question: "日本で最も長い川はどれですか？",
    choices: [
      { text: "利根川" },
      { text: "信濃川" },
      { text: "淀川" },
      { text: "木曽川" },
    ],
    correct: 1,
  },
  {
    question: "桜の花が咲く時期は一般的にいつですか？",
    choices: [
        { text: "夏" }, 
        { text: "秋" }, 
        { text: "冬" }, 
        { text: "春" },
    ],
    correct: 3,
  },
];

const totalQuestions = 5; // 出題する問題数を設定
let currentQuiz = quizData;
let currentQuestion = 0;
let score = 0;
//const totalQuestions = 5; // 出題する問題数を5に設定
document.getElementById("total-questions").textContent = totalQuestions;

// 問題を指定数だけ取得（ランダムではなく、最初から totalQuestions 分だけ取得する）
function selectQuestions() {
  currentQuiz = quizData.slice(0, totalQuestions); // 最初の totalQuestions 数だけを選択
}

// 初期化
function initQuiz() {
  currentQuestion = 0; // 問題番号の初期化
  score = 0; // スコアの初期化
  selectQuestions(); // 出題する問題を設定
  loadQuestion();
}

// 問題と選択肢を表示
function loadQuestion() {
  document.getElementById("quiz-container").style.display = "block";
  document.getElementById("answer-section").style.display = "none";
  document.getElementById("final-result").style.display = "none";

  // 問題番号を表示
  document.getElementById("question-number").textContent = `第 ${
    currentQuestion + 1
  } 問`;

  const questionData = currentQuiz[currentQuestion];

  document.getElementById("question").textContent = questionData.question;
  const choicesContainer = document.getElementById("choices-container");
  choicesContainer.innerHTML = "";

  // 選択肢に番号を付ける
  questionData.choices.forEach((choice, index) => {
    const choiceDiv = document.createElement("div");
    choiceDiv.classList.add("choice");
    choiceDiv.textContent = `${index + 1}. ${choice.text}`; // 番号付きの選択肢
    choiceDiv.onclick = () => checkAnswer(index, questionData);
    choicesContainer.appendChild(choiceDiv);
  });
}

// 答えを確認
function checkAnswer(selected, questionData) {
  document.getElementById("quiz-container").style.display = "none";
  document.getElementById("answer-section").style.display = "block";

  const resultText = document.getElementById("answer-result");
  const choicesContainer = document.getElementById("choices-container");
  choicesContainer.innerHTML = ""; // クリアして選択肢を再描画

  // 正解・不正解のメッセージ表示
  if (selected === questionData.correct) {
    resultText.innerHTML = "<span class='correct'>正解！</span>";
    score++;
  } else {
    resultText.innerHTML = "<span class='wrong'>不正解です。</span>";
  }

  // 最終問題かどうかのチェック
  if (currentQuestion === currentQuiz.length - 1) {
    document.getElementById("next-question").textContent = "結果を見る";
  } else {
    document.getElementById("next-question").textContent = "次の問題へ";
  }
}

// 次の問題へ
function nextQuestion() {
  currentQuestion++;
  if (currentQuestion < currentQuiz.length) {
    loadQuestion();
    document.getElementById("container").scrollIntoView({ behavior: "smooth" }); // containerにスクロール
  } else {
    showResult();
  }
}

// 結果を表示
function showResult() {
  document.getElementById("answer-section").style.display = "none";
  document.getElementById("final-result").style.display = "block";

  const percentage = (score / currentQuiz.length) * 100;
  document.getElementById("score").textContent = `正解数: ${score}/${
    currentQuiz.length
  } (${percentage.toFixed(2)}%)`;
}

// もう一度遊ぶ
function restartQuiz() {
  currentQuestion = 0;
  score = 0;
  initQuiz();
}

// クイズ開始
initQuiz();