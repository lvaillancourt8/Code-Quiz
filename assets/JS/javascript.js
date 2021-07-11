var timerEl = document.querySelector("#timer");
var timerBoxEl = document.querySelector('#timer-box');
var timerInterval;
var timer_is_on = false;
var secondsLeft = 30;
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
var leaderScoreEl = document.querySelector(".leader-score");
var scoreEL = document.querySelector("#score");

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

// //Reset. Counter
// function resetCount() {
//   stopCount();
//   c = 0;
//   document.getElementById("textbox").value = c;
//     }

// function setTimer() {
//   var timerInterval = setInterval(function() {
//     secondsLeft--;
//     timerEl.textContent = secondsLeft;
//     if(secondsLeft <= 5 && secondsLeft >= 1) {
//       timerBoxEl.setAttribute("style", "color: red");
//     }
//     else if(secondsLeft === 0) {
//       clearInterval(timerInterval);
//       timerBoxEl.innerHTML = "Time's Up!";
//     }
//   }, 1000);
// }

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
  scoreEL.textContent = secondsLeft;
  timerBoxEl.innerHTML = "Great Job!"
  finalScoreEl.classList.remove("hidden");  
  validScoreEL.classList.remove("hidden");
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

