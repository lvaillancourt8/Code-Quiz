var timerEl = document.querySelector("#timer");
var timerBoxEl = document.querySelector('#timer-box');
var secondsLeft = 10;
var startQuizButtonEl = document.querySelector("#start-quiz");
var quizQuestionsEl = document.getElementsByTagName('section');

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

startQuizButtonEl.addEventListener("click", setTimer);