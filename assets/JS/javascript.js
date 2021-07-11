var timerEl = document.querySelector("#timer");
var timerBoxEl = document.querySelector('#timer-box');
var timerInterval;
var timer_is_on = false;
var secondsLeft = 60;
var startQuizButtonEl = document.querySelector("#start-quiz");
var question = 0;
var questionCorrect = 0;
var questionWrong = 0;
var welcomeEL = document.querySelector("#welcome");
var question1El = document.querySelector("#question1");
var questionSectionEL = document.querySelector("#question-section");
var element;
var finalScoreEl = document.querySelector("#final-score");
var validScoreEL = document.querySelector("#valid-score");
var noScoreEL = document.querySelector("#no-score");
var leaderScoreNoticeEl = document.querySelector("#leader-score-notice");
var leaderScoreInputEl = document.querySelector("#leader-score-input");
var scoreEL = document.querySelector("#score");
var enterInitialsBtnEL = document.querySelector("#enter-initials-btn");
var initialsEL = document.querySelector("#initials");
var topScores = JSON.parse(localStorage.getItem("topScores")) || [];
var leaderBoardEl = document.querySelector("#leader-board");
var scoreList = document.querySelector("#score-list");
var thanksEl = document.querySelector("#thanks");
var viewLeaderBoardBtnEl = document.querySelector("#view-leader-board");

//Quiz Timer Functions
//Timer Interval
function timedCount() {
  timerInterval = setInterval(function() {
    timerEl.textContent = secondsLeft;
    secondsLeft--;
    if(secondsLeft <= 5 && secondsLeft >= 1) {
      timerBoxEl.setAttribute("style", "color: red");
    }
    else if(secondsLeft === 0) {
      clearInterval(timerInterval);
      timerBoxEl.innerHTML = "Time's Up!";
      questionSectionEL.classList.add("hidden");
      finalScoreEl.classList.remove("hidden");
      noScoreEL.classList.remove("hidden");
    }
  }, 1000);
}

//Start Countdown
function startCount() {
  if (!timer_is_on) {
    timer_is_on = true;
    timedCount();
  }
}

//Stop Countdown
function stopCount() {
  clearTimeout(timerInterval);
  timer_is_on = false;
}

function showNextQuestion() {
  element.parentElement.classList.add("hidden");
  var parent = element.parentElement;
    if(parent.nextElementSibling !== null) {
      parent.nextElementSibling.classList.remove("hidden");
    }
  else {
    finalScore();
  }
}

function finalScore() {
  stopCount();
  if (secondsLeft > 0) {
    scoreEL.textContent = secondsLeft;
    timerBoxEl.innerHTML = "Great Job!"
    finalScoreEl.classList.remove("hidden");  
    validScoreEL.classList.remove("hidden");
  }
  else {
    timerBoxEl.innerHTML = "Time's Up!";
    finalScoreEl.classList.remove("hidden");  
    noScoreEL.classList.remove("hidden");
  }
}

function storeUserScore(event) {
  event.preventDefault();
  var score = {
    "score": secondsLeft,
    "initials": initialsEL.value
  }
  topScores.push(score);
  localStorage.setItem("topScores", JSON.stringify(topScores));
  finalScoreEl.setAttribute("class", "hidden");
  thanksEl.classList.remove("hidden");
}

function showLeaderBoard(event) {
  // document.body.getElementsByTagName("section").classList.add("hidden");
  leaderBoardEl.classList.remove("hidden");
}

startQuizButtonEl.addEventListener("click", function(){
  startCount();
  welcomeEL.setAttribute("class", "hidden");
  question1El.classList.remove("hidden");
});

// Listen for any clicks within quiz question container
questionSectionEL.addEventListener("click", function(event) {
  element = event.target;
  // Check if the clicked element was a button
  if (element.matches("button")) {
    var correct = element.getAttribute("class");
    if (correct === "correct") {
      secondsLeft += 5;
    } 
    else {
      secondsLeft -= 5;
    }
  }
  showNextQuestion();
});

enterInitialsBtnEL.addEventListener("click", storeUserScore);

viewLeaderBoardBtnEl.addEventListener("click", showLeaderBoard);