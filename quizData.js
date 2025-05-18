const quizData = [
  {
    question: "玉ねぎの根の成長を観察したとき、もっとも成長しやすいのはどの部分か。",
    choices: [
      { text: "茎の先端付近" },
      { text: "根の先端付近" },
    ],
    correct: 1,
  },
  {
    question: "根の最も先端にあり、成長点（最も成長するところ）を保護している部分を何というか。",
    choices: [
      { text: "根冠" },
      { text: "冠根" },
    ],
    correct: 0,
  },
  {
    question: "タマネギの細胞分裂を観察する際は、細胞をばらばらにするため、あたためた何につけるか。",
    choices: [
      { text: "うすい塩酸" },
      { text: "うすい酢酸" },
    ],
    correct: 0,
  },
  {
    question: "タマネギの細胞分裂を観察するプレパラートをつくるときは、カバーガラスを押して少しつぶす。これはなぜか。",
    choices: [
      { text: "細胞をちゃんとつぶすため。" },
      { text: "細胞の重なりをなくして観察しやすくするため。" },
    ],
    correct: 1,
  },
];

const totalQuestions = 4; // 出題する問題数を設定
let currentQuiz = quizData;
let currentQuestion = 0;
let score = 0;
//const totalQuestions = 4; // 出題する問題数を4に設定
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
