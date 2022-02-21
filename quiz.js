function quiz(questions) {
  this.score = 0;
  this.questions = questions;
  this.index = 0;
}

quiz.prototype.isQuizOver = function () {
  return this.index === this.questions.length;
};

quiz.prototype.getQuestionByIndex = function () {
  return this.questions[this.index];
};

quiz.prototype.checkAnswer = function (answer) {
  if (this.getQuestionByIndex().isCorrectAnswerSelected(answer)) {
    this.score++;
  }
  this.index++;
};

function question(question, options, answer) {
  this.question = question;
  this.options = options;
  this.answer = answer;
}

question.prototype.isCorrectAnswerSelected = function (option) {
  return this.answer === option;
};

function showProgress() {
  var currentQuestion = quiz.index + 1;
  var progressSection = document.getElementById("progress");

  progressSection.innerHTML =
    "Question " + currentQuestion + " of " + this.questions.length;
}

function showScore() {
  var scoreWindow = document.getElementById("quiz");
  var scorePercentage = (quiz.score / questions.length) * 100;

  scoreWindow.innerHTML =
    "<h2 id='score'> Your Score is " +
    quiz.score +
    " and your percentage is " +
    scorePercentage +
    "</h2>";
}

function displayQuestions() {
  if (quiz.isQuizOver()) {
    showScore();
  } else {
    var questionElement = document.getElementById("question");
    questionElement.innerHTML = quiz.getQuestionByIndex().question;

    var options = quiz.getQuestionByIndex().options;
    for (var id = 0; id < options.length; id++) {
      var optionElement = document.getElementById("choice" + id);
      optionElement.innerHTML = options[id];

      answerSelected(id, options[id]);
    }
    showProgress();
  }
}

function answerSelected(id, option) {
  var button = document.getElementById("btn" + id);
  button.onclick = function () {
    quiz.checkAnswer(option);
    displayQuestions();
  };
}

var questions = [
  new question(
    "Who invented the BALLPOINT PEN?",
    ["Biro Brothers", "Waterman Brothers", "Bicc Brothers", "Write Brothers"],
    "Biro Brothers"
  ),
  new question(
    "In which decade was the first solid state integrated circuit demonstrated?",
    ["1950s", "1960s", "1970s", "1980s"],
    "1950s"
  ),
  new question(
    "What J. B. Dunlop invented?",
    [
      "Automobile wheel rim",
      "Pneumatic rubber tire",
      "Rubber boot",
      "Model airplanes",
    ],
    "Pneumatic rubber tire"
  ),
  new question(
    "Which scientist discovered the radioactive element radium?",
    ["Isaac Newton", "Albert Einstein", "Benjamin Franklin", "Marie Curie"],
    "Marie Curie"
  ),
  new question(
    "What is the name of the CalTech seismologist who invented the scale used to measure the magnitude of earthquakes?",
    ["Joshua Rumble", "Giuseppe Mercalli", "Charles Richter", "	Hiram Walker"],
    "Charles Richter"
  ),
];

var quiz = new quiz(questions);

displayQuestions();
