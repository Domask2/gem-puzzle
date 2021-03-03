import "../css/style.scss";
import "animate";
import { PicturePuzzle } from "./module/PicturePuzzle";
import { createDom } from "./helper/CreateDom";
import { importAll, randomInteger } from "./helper/RandomImg";
import bestSolution from "./helper/BestSolution";
import { CONSTANS } from "./constans/Constans";

let dim = null;
let imgRandom = null;
const isTextForCell = true;
let startTime = null;
let updatedTime = null;
let difference = null;
let tInterval = null;
let savedTime = null;
let paused = 0;
let running = 0;
let isTimer = false;
const images = importAll(
  require.context("../img", false, /\.(png|jpe?g|svg)$/)
);

createDom();
newImg();

const game = document.querySelector(CONSTANS.GAME);
const picturePuzzle = new PicturePuzzle(game, imgRandom, 500, 4, true);
const timerDisplay = document.querySelector(CONSTANS.TIMER_SPAN);
const btnMenu = document.querySelectorAll(CONSTANS.BTN_NUM);
const menu = document.querySelector(CONSTANS.MENU);
const best = document.querySelector(".best");
const movemSpan = document.querySelector(CONSTANS.MOVEM_SPAN);
const footer = document.querySelector(CONSTANS.FOOTER);
const newGame = document.querySelector(CONSTANS.NEW_GAME);

btnMenu.forEach((el) => {
  el.addEventListener("click", (e) => {
    best.addEventListener("click", bestSolution);
    pauseTimer();
    newImg();
    menu.style.opacity = "1";
    menu.style.zIndex = "3";
    game.classList.remove("animate__animated", "animate__zoomIn");

    switch (e.target.textContent) {
      case "3x3":
        dim = 3;
        break;
      case "4x4":
        dim = 4;
        break;
      case "5x5":
        dim = 5;
        break;
      case "6x6":
        dim = 6;
        break;
      case "7x7":
        dim = 7;
        break;
      case "8x8":
        dim = 8;
        break;
      default:
        dim = 4;
        break;
    }

    document.querySelector(".menu").style.opacity = "1";
    document.querySelector(".menu").style.zIndex = "3";

    document.querySelector(".menuBtn").addEventListener("click", (e) => {
      if (e.target.matches(".btnyes")) {
        resetTimer();
        isTimer = false;
        movemSpan.innerHTML = "";
        game.innerHTML = "";
        footer.style.opacity = "0";
        game.classList.add("animate__animated", "animate__zoomIn");
        const picturePuzzle = new PicturePuzzle(
          game,
          imgRandom,
          500,
          dim,
          true
        );

        picturePuzzle.onSwap = function (movements) {
          movemSpan.innerHTML = movements;
        };

        picturePuzzle.onFinished = function () {
          this.winny = true;
          menu.style.opacity = "1";
          menu.style.zIndex = "3";
          document.querySelector(".menuBtn").style.display = "none";
          const moves = movemSpan.textContent;
          const time = timerDisplay.innerHTML;
          const p = document.createElement("p");
          const close = document.createElement("div");
          close.classList.add("close");
          close.innerHTML = "Закрыть";
          p.innerHTML = `Ура! Вы решили головоломку за ${time} и ${moves} ходов»:`;
          p.appendChild(close);
          menu.prepend(p);

          const now = new Date();
          const obj = {
            now: `${now.getFullYear()}:${now.getMonth() + 1}:${now.getDate()}`,
            moves: +moves,
            time: time,
            dim: 4,
          };
          const arr = JSON.parse(localStorage.getItem("arr")) || [];
          arr.map((el, i, ar) => {
            if (ar.length > 10) {
              ar.pop();
            }
          });
          arr.push(obj);
          arr.sort((a, b) => (a.moves > b.moves ? 1 : -1));
          localStorage.setItem("arr", JSON.stringify(arr));

          pauseTimer();

          document.querySelector(".close").addEventListener("click", () => {
            menu.style.opacity = "0";
            menu.style.zIndex = "1";
            movemSpan.innerHTML = "00";
            document.querySelector(".menuBtn").style.display = "block";
            p.remove();
            resetTimer();
          });
        };

        footer.style.opacity = "1";
        movemSpan.innerHTML = "00";

        picturePuzzle.onSwap = function (movements) {
          movemSpan.innerHTML = movements;
        };
      } else {
        pauseTimer();
        menu.style.opacity = "0";
        menu.style.zIndex = "1";
      }
    });
  });
});

newGame.addEventListener("click", function () {
  game.innerHTML = "";
  const picturePuzzle = new PicturePuzzle(
    game,
    imgRandom,
    500,
    (dim = 4),
    false
  );
  best.addEventListener("click", bestSolution);

  picturePuzzle.onSwap = function (movements) {
    movemSpan.innerHTML = movements;
  };

  picturePuzzle.onFinished = function () {
    this.winny = true;
    menu.style.opacity = "1";
    menu.style.zIndex = "3";
    document.querySelector(".menuBtn").style.display = "none";
    const moves = movemSpan.textContent;
    const time = timerDisplay.innerHTML;
    const p = document.createElement("p");
    const close = document.createElement("div");
    close.classList.add("close");
    close.innerHTML = "Закрыть";
    p.innerHTML = `Ура! Вы решили головоломку за ${time} и ${moves} ходов»:`;
    p.appendChild(close);
    menu.prepend(p);

    const now = new Date();
    const obj = {
      now: `${now.getFullYear()}:${now.getMonth() + 1}:${now.getDate()}`,
      moves: +moves,
      time: time,
      dim: 4,
    };
    const arr = JSON.parse(localStorage.getItem("arr")) || [];
    arr.map((el, i, ar) => {
      if (ar.length > 10) {
        ar.pop();
      }
    });
    arr.push(obj);
    arr.sort((a, b) => (a.moves > b.moves ? 1 : -1));
    localStorage.setItem("arr", JSON.stringify(arr));

    pauseTimer();

    document.querySelector(".close").addEventListener("click", () => {
      menu.style.opacity = "0";
      menu.style.zIndex = "1";
      movemSpan.innerHTML = "00";
      document.querySelector(".menuBtn").style.display = "block";
      p.remove();
      resetTimer();
    });
  };

  if (!isTimer) {
    startTime = new Date().getTime();
    tInterval = setInterval(getShowTime, 1);
    isTimer = true;
    movemSpan.innerHTML = "00";
    picturePuzzle.onSwap = function (movements) {
      movemSpan.innerHTML = movements;
    };
  } else (isTimer) {
    resetTimer();
    startTime = new Date().getTime();
    tInterval = setInterval(getShowTime, 1);
    isTimer = false;
    movemSpan.innerHTML = "00";
    picturePuzzle.onSwap = function (movements) {
      movemSpan.innerHTML = movements;
    };
  }
});

best.addEventListener("click", bestSolution);

picturePuzzle.onSwap = function (movements) {
  movemSpan.innerHTML = movements;
};

picturePuzzle.onFinished = function () {
  this.winny = true;
  menu.style.opacity = "1";
  menu.style.zIndex = "3";
  document.querySelector(".menuBtn").style.display = "none";
  const moves = movemSpan.textContent;
  const time = timerDisplay.innerHTML;
  const p = document.createElement("p");
  const close = document.createElement("div");
  close.classList.add("close");
  close.innerHTML = "Закрыть";
  p.innerHTML = `Ура! Вы решили головоломку за ${time} и ${moves} ходов»:`;
  p.appendChild(close);
  menu.prepend(p);

  const now = new Date();
  const obj = {
    now: `${now.getFullYear()}:${now.getMonth() + 1}:${now.getDate()}`,
    moves: +moves,
    time: time,
    dim: 4,
  };
  const arr = JSON.parse(localStorage.getItem("arr")) || [];
  arr.map((el, i, ar) => {
    if (ar.length > 10) {
      ar.pop();
    }
  });
  arr.push(obj);
  arr.sort((a, b) => (a.moves > b.moves ? 1 : -1));
  localStorage.setItem("arr", JSON.stringify(arr));

  pauseTimer();

  document.querySelector(".close").addEventListener("click", () => {
    menu.style.opacity = "0";
    menu.style.zIndex = "1";
    movemSpan.innerHTML = "00";
    document.querySelector(".menuBtn").style.display = "block";
    p.remove();
    resetTimer();
  });
};

function startTimer() {
  if (!running) {
    startTime = new Date().getTime();
    tInterval = setInterval(getShowTime, 1);
    paused = 0;
    running = 1;
  }
}

function pauseTimer() {
  if (difference && !paused) {
    clearInterval(tInterval);
    savedTime = difference;
    paused = 1;
    running = 0;
  } else {
    startTimer();
  }
}

function resetTimer() {
  clearInterval(tInterval);
  savedTime = 0;
  difference = 0;
  paused = 0;
  running = 0;
  timerDisplay.innerHTML = "00:00:00";
}

function getShowTime() {
  updatedTime = new Date().getTime();
  if (savedTime) {
    difference = updatedTime - startTime + savedTime;
  } else {
    difference = updatedTime - startTime;
  }
  let hours = Math.floor(
    (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((difference % (1000 * 60)) / 1000);
  let milliseconds = Math.floor((difference % (1000 * 60)) / 100);
  hours = hours < 10 ? "0" + hours : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;
  milliseconds =
    milliseconds < 100
      ? milliseconds < 10
        ? "00" + milliseconds
        : "0" + milliseconds
      : milliseconds;
  timerDisplay.innerHTML = hours + ":" + minutes + ":" + seconds;
}

function newImg() {
  imgRandom = images[randomInteger(1, 9)];
}