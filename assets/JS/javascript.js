// Global Variables
var timerBoxEl = document.querySelector('#timer-box');
var timerInterval;
var timer_is_on = false;
var secondsLeft = 60;
var startQuizButtonEl = document.querySelector("#start-quiz");
var question = 0;
var welcomeEl = document.querySelector("#welcome");
var questionSectionEl = document.querySelector("#question-section");
var element;
var finalScoreEl = document.querySelector("#final-score");
var noScoreEl = document.querySelector("#no-score");
var enterInitialsBtnEl = document.querySelector("#enter-initials-btn");
var topScores = JSON.parse(localStorage.getItem("topScores")) || [];
var scoreListEl = document.querySelector("#score-list");
var thanksEl = document.querySelector("#thanks");
var viewLeaderBoardBtnEl = document.querySelector("#view-leader-board");
var playAgain1El = document.querySelector("#play-again1");
var playAgain2El = document.querySelector("#play-again2");
var topFiveScores = [];
// var topScoresList = [];

//Quiz Timer Functions
//Timer Interval / Turn Font Red When Timer Gets to 5 Seconds / Stop Timer and Display "Times Up!" when timer reaches 0
function timedCount() {
  var timerEl = document.querySelector("#timer");
  timerInterval = setInterval(function() {
    timerEl.textContent = secondsLeft;
    secondsLeft--;
    if(secondsLeft <= 5 && secondsLeft >= 1) {
      timerBoxEl.setAttribute("style", "color: red");
    }
    else if(secondsLeft === 0) {
      clearInterval(timerInterval);
      timerBoxEl.innerHTML = "Time's Up!";
      questionSectionEl.classList.add("hidden");
      finalScoreEl.classList.remove("hidden");
      noScoreEl.classList.remove("hidden");
    }
  }, 1000);
}

//Start Timer Countdown
function startCount() {
  if (!timer_is_on) {
    timer_is_on = true;
    timedCount();
  }
}

//Stop Timer Countdown
function stopCount() {
  clearTimeout(timerInterval);
  timer_is_on = false;
}

//Show the Next Quiz Question and Show Final Score when last Question is Answered
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

//Evaluate score at the end of the quiz and display appropriate messages
function finalScore() {
  var validScoreEl = document.querySelector("#valid-score");
  var scoreEl = document.querySelector("#score");
  stopCount();
  if (secondsLeft > 0) {
    scoreEl.textContent = secondsLeft;
    timerBoxEl.innerHTML = "Great Job!"
    finalScoreEl.classList.remove("hidden");  
    validScoreEl.classList.remove("hidden");
  }
  else {
    timerBoxEl.innerHTML = "Time's Up!";
    finalScoreEl.classList.remove("hidden");  
    noScoreEl.classList.remove("hidden");
  }
}

//Refresh the screen when a user wants to take the quiz again
function startAgain(event) {
  console.log("hello");
  window.location.reload();			
}

//Sorts Top Scores List and Creates a List of the Top 5 Scores
function sortTopScoresList() {
  topScores.sort((a, b) => b.score - a.score);
  topFiveScores = topScores.slice(0, 5);
}

//Renders the top five scores to the Leader Board
function renderScoresToPage() {
  scoreListEl.innerHTML = "";
  var scores = document.getElementById("score-list");

  for (var i = 0; i < topFiveScores.length; i++ ) {
      var item = document.createElement("li");
      item.innerHTML = topFiveScores[i].score + " points by " + topFiveScores[i].initials;
      scores.appendChild(item);
  }
}

//Start Quiz Button Event Listener
startQuizButtonEl.addEventListener("click", function(){
  var question1El = document.querySelector("#question1");
  startCount();
  welcomeEl.setAttribute("class", "hidden");
  question1El.classList.remove("hidden");
});

// Listen for any clicks within quiz question container / update seconds based on correct and incorrect answers 
questionSectionEl.addEventListener("click", function(event) {
  element = event.target;
  // Check if the clicked element was a button
  if (!element.matches("button")) {
    return;
    }
  else {
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

//Event Listener for when user enters their initials
enterInitialsBtnEl.addEventListener("click", function(event) {
  event.preventDefault();
  var initialsEl = document.querySelector("#initials");
  var score = {
    "score": secondsLeft,
    "initials": initialsEl.value
  }
  topScores.push(score);
  localStorage.setItem("topScores", JSON.stringify(topScores));
  finalScoreEl.setAttribute("class", "hidden");
  thanksEl.classList.remove("hidden");
});

//Event Listener for when user clicks on View Leader Board Button 
viewLeaderBoardBtnEl.addEventListener("click", function(event) {
  sortTopScoresList();
  renderScoresToPage();
  var leaderBoardEl = document.querySelector("#leader-board");
  welcomeEl.setAttribute("class", "hidden");
  questionSectionEl.setAttribute("class", "hidden");
  finalScoreEl.setAttribute("class", "hidden");
  thanksEl.setAttribute("class", "hidden");
  leaderBoardEl.classList.remove("hidden");
});

//Event Listener for start again button on the Thanks for Playing page
playAgain1El.addEventListener("click", startAgain);

//Event Listener for start again button on the Leader Board page
playAgain2El.addEventListener("click", startAgain);

