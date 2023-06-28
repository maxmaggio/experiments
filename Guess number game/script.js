"use strict";

const buttons = document.querySelectorAll(".btn-number");
const messageEl = document.querySelector(".message");
const numberEl = document.querySelector(".number");
const scoreEl = document.querySelector(".score");
const bodyEl = document.querySelector("body");
const titleEl = document.querySelector("h1");
const betweenEl = document.querySelector(".between");
const restartBtn = document.querySelector(".btn-restart");
let score, highscore, secretNumber, playing;

const calcRandon = function () {
  return Math.trunc(Math.random() * 10) + 1;
};
const displayTitle = function (message) {
  titleEl.textContent = message;
};
const displayMessage = function (message) {
  messageEl.textContent = message;
};
const init = function () {
  // reset all
  playing = true;
  score = 10;
  highscore = 0;
  secretNumber = calcRandon();
  scoreEl.textContent = score;
  // reset messages
  numberEl.textContent = "?";
  numberEl.classList.remove("revealed");
  displayTitle("Select a number");
  displayMessage("Select a number");
  // reset styles
  bodyEl.style.backgroundColor = "#DEF2F0";
  restartBtn.classList.remove("active");
  betweenEl.classList.remove("hidden");
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].classList.remove("selected");
    buttons[i].classList.remove("correct");
  }
};

init();

for (let i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener("click", function () {
    if (playing) {
      let selectedNumber = Number(buttons[i].textContent);
      buttons[i].classList.toggle("selected");
      messageEl.classList.toggle("wiggle-a");
      messageEl.classList.toggle("wiggle-b");

      if (selectedNumber === secretNumber) {
        displayMessage("Correct Number!");
        numberEl.textContent = secretNumber;
        numberEl.classList.add("revealed");
        bodyEl.style.backgroundColor = "#00C7BB";
        buttons[i].classList.add("correct");
        displayTitle("You won! 🎉");
        betweenEl.classList.add("hidden");
        restartBtn.classList.add("active");
        //store highest score
        if (score > highscore) {
          highscore = score;
          document.querySelector(".highscore").textContent = score;
        }
        playing = false;
      } else if (selectedNumber != secretNumber) {
        if (score > 1) {
          score--;
          scoreEl.textContent = score;
          displayMessage(
            selectedNumber > secretNumber ? "Too high!" : "Too low!"
          );
        } else {
          displayTitle("Game Over");
          betweenEl.classList.add("hidden");
          displayMessage("You can try again 💪!");
          bodyEl.style.backgroundColor = "#D1D1D1";
          restartBtn.classList.add("active");
          scoreEl.textContent = 0;
          playing = false;
        }
      }
    }
  });
}

// restart
restartBtn.addEventListener("click", init);
