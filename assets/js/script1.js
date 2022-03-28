var rooEl = $("#root");

var welcomeText = document.querySelector(".lrgTitle");
var rules = document.querySelector(".intro-Rules");
var beginGame = document.querySelector(".start-btn");
var timeLeft = 10;
var blank = document.querySelector("#blankSpace");
var timeDisplay = document.getElementById("timer-start");
var quest = document.querySelector("questions");

const quizContainer = document.getElementById("quiz");
const resultsContainer = document.getElementById("results");
const submitButton = document.getElementById("submit");

beginGame.addEventListener("click", function () {
  var timer = setInterval(function () {
    console.log(timeLeft);
    timeLeft--;
    if (timeLeft < 0) {
      clearInterval(timer);
    } else if (timeLeft === 0) {
      alert("Game Over!");
      timeDisplay.textContent = timeLeft;
      timeLeft.textContent = "";
    } else timeDisplay.textContent = timeLeft;
  }, 1000);

  console.log(timeDisplay.textContent);
});

function buildQuiz() {}

function showResults() {}

// display quiz
buildQuiz();

// show results
submitButton.addEventListener("click", showResults);

function buildQuiz() {
  // variable to store the HTML output
  const output = [];

  // for each question...
  myQuestions.forEach((currentQuestion, questionNumber) => {
    // variable to store the list of possible answers
    const answers = [];

    // and for each available answer...
    for (letter in currentQuestion.answers) {
      // ...add an HTML radio button
      answers.push(
        `<label>
              <input type="radio" name="question${questionNumber}" value="${letter}">
              ${letter} :
              ${currentQuestion.answers[letter]}
            </label>`
      );
    }

    // add this question and its answers to the output
    output.push(
      `<div class="question"> ${currentQuestion.question} </div>
          <div class="answers"> ${answers.join("")} </div>`
    );
  });

  // finally combine our output list into one string of HTML and put it on the page
  quizContainer.innerHTML = output.join("");
  showSlide(currentSlide);
  function showNextSlide() {
    showSlide(currentSlide + 1);
  }

  function showPreviousSlide() {
    showSlide(currentSlide - 1);
  }
  previousButton.addEventListener("click", showPreviousSlide);
  nextButton.addEventListener("click", showNextSlide);
}

function showResults() {
  // gather answer containers from our quiz
  const answerContainers = quizContainer.querySelectorAll(".answers");

  // keep track of user's answers
  let numCorrect = 0;

  // for each question...
  myQuestions.forEach((currentQuestion, questionNumber) => {
    // find selected answer
    const answerContainer = answerContainers[questionNumber];
    const selector = `input[name=question${questionNumber}]:checked`;
    const userAnswer = (answerContainer.querySelector(selector) || {}).value;

    // if answer is correct
    if (userAnswer === currentQuestion.correctAnswer) {
      // add to the number of correct answers
      numCorrect++;

      // color the answers green
      answerContainers[questionNumber].style.color = "lightgreen";
    }
    // if answer is wrong or blank
    else {
      // color the answers red
      answerContainers[questionNumber].style.color = "red";
    }
  });

  // show number of correct answers out of total
  resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
}
var profile = [];

// userStore.addEventListener("click", function(event) {
//   event.preventDefault();

//   // TODO: Create user object from submissio
// var userProfile ={
// intials: initialsInput.value,

// }
//   // TODO: Set new submission to local storage
//   localStorage.setItem("userProfile", JSON.stringify(userProfile));
//   renderMessage();

// }