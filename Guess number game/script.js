"use strict";

const buttons = document.querySelectorAll(".btn-number");
const messageEl = document.querySelector(".message");
const numberEl = document.querySelector(".number");
const scoreEl = document.querySelector(".score");
const bodyEl = document.querySelector("body");

const calcRandon = function () {
  return Math.trunc(Math.random() * 10) + 1;
};
const displayMessage = function (message) {
  messageEl.textContent = message;
};

let score, highscore, secretNumber, playing;

const init = function () {
  // reset all
  playing = true;
  score = 10;
  highscore = 0;
  secretNumber = calcRandon();

  numberEl.textContent = "?";
  numberEl.classList.remove("revealed");
  // reset score
  scoreEl.textContent = score;
  // reset messages
  document.querySelector("h1").textContent = "Select a number";
  displayMessage("Select a number");
  // reset styles
  bodyEl.style.backgroundColor = "#DEF2F0";
  document.querySelector(".between").classList.remove("hidden");
  //log
  // console.log(secretNumber);
  // console.log(`score:` + score);
  // console.log();
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].classList.remove("selected");
    buttons[i].classList.remove("correct");
  }
};

init();

// buttons
for (let i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener("click", function () {
    if (playing) {
      let selectedNumber = Number(buttons[i].textContent);
      buttons[i].classList.toggle("selected");
      messageEl.classList.toggle("wiggle-a");
      messageEl.classList.toggle("wiggle-b");

      if (selectedNumber === secretNumber) {
        console.log("yeaaa");
        displayMessage("Correct Number!");
        numberEl.textContent = secretNumber;
        numberEl.classList.add("revealed");
        bodyEl.style.backgroundColor = "#00C7BB";
        buttons[i].classList.add("correct");
        //store highest score
        document.querySelector("h1").textContent = "You won!";
        document.querySelector(".between").classList.add("hidden");
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
          document.querySelector("h1").textContent = "Game Over";
          document.querySelector(".between").classList.add("hidden");
          displayMessage("You can try again 💪!");
          bodyEl.style.backgroundColor = "#D1D1D1";
          scoreEl.textContent = 0;
          playing = false;
        }
      }
    }
  });
}

// restart
document.querySelector(".btn-restart").addEventListener("click", init);
