var timerEl = document.querySelector("#timer");
var timerBoxEl = document.querySelector('#timer-box');
var secondsLeft = 60;
var startQuizButtonEl = document.querySelector("#start-quiz");
var question = 0;
var questionCorrect = 0;
var questionWrong = 0;
var welcomeEL = document.querySelector("#welcome");
var question1El = document.querySelector("#question1");
var questionSection = document.querySelector("#question-section");
var element;
var finalScoreReveal = document.querySelector("#final-score");

function setTimer() {
  var timerInterval = setInterval(function() {
    secondsLeft--;
    timerEl.textContent = secondsLeft;
    if(secondsLeft <= 5 && secondsLeft >= 1) {
      timerBoxEl.setAttribute("style", "color: red");
    }
    else if(secondsLeft === 0) {
      clearInterval(timerInterval);
      timerBoxEl.innerHTML = "Time's Up!";
    }
  }, 1000);
}

function showNextQuestion() {
  element.parentElement.classList.add("hidden");
  var parent = element.parentElement;
    if(parent.nextElementSibling !== "null") {
      parent.nextElementSibling.classList.remove("hidden");
    }
  else {
    // stop the clock
    finalScore();
  }
}

function finalScore() {
  finalScoreReveal.classList.remove("hidden");
}

startQuizButtonEl.addEventListener("click", function(){
  setTimer();
  welcomeEL.setAttribute("class", "hidden");
  question1El.classList.remove("hidden");
});

// Listen for any clicks within quiz question container
questionSection.addEventListener("click", function(event) {
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

