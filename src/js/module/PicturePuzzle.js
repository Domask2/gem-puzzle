import { Cell } from "./Cell";
 class PicturePuzzle {
  constructor(el, imageSrc, width, dimmension = 4, isNewGame) {
    this.parentEl = el;
    this.dimmension = dimmension;
    this.imageSrc = imageSrc;
    this.width = width;
    this.cells = [];
    this.shuffling = false;
    this.isNewGame = isNewGame;
    this.numberOfMovements = 0;

    this.onFinished = () => {};
    this.onSwap = () => {};
    this.init();
    this.showCells();
    const img = new Image();
    img.onload = () => {
      this.height = (img.height * this.width) / img.width;
      this.el.style.width = `${this.width}px`;
      this.el.style.height = `${this.height}px`;
      this.setup();
    };

    img.src = this.imageSrc;
  }

  showCells() {
    document.querySelector(".save").addEventListener("click", () => {
      localStorage.setItem("Cells", this.cells);
    });
  }

  init() {
    this.el = this.createWrapper();
    this.parentEl.appendChild(this.el);
    this.el.classList.add("game-puzzle");

    const btnYes = document.createElement("div");
    const btnNo = document.createElement("div");
    const menuForm = document.createElement("div");
    const menuBtn = document.createElement("div");
    const question = document.createElement("div");
    const btnWrapper = document.createElement("div");

    menuForm.classList.add("menu");
    btnYes.classList.add("btnyes");
    btnNo.classList.add("btnno");
    question.classList.add("question");
    btnWrapper.classList.add("btnWrapper");

    question.innerHTML = "Вы хотите начать новую игру?";
    btnYes.innerHTML = "ДА";
    btnNo.innerHTML = "НЕТ";

    menuBtn.appendChild(question);
    menuBtn.appendChild(btnWrapper);
    btnWrapper.appendChild(btnYes);
    btnWrapper.appendChild(btnNo);
    menuBtn.classList.add("menuBtn");
    menuForm.appendChild(menuBtn);
    document.querySelector(".game").appendChild(menuForm);
  }

  createWrapper() {
    const div = document.createElement("div");
    div.style.position = "relative";
    div.style.margin = "0 auto";
    return div;
  }

  setup() {
    for (let i = 0; i < this.dimmension * this.dimmension; i += 1) {
      this.cells.push(new Cell(this, i));
    }

    if (!this.isNewGame) {
      this.shuffle();
    }
  }

  shuffle() {
    this.shuffling = true;
    for (let i = this.cells.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      this.swapCells(i, j);
    }

    this.shuffling = false;
    const arr = [];
    let stack = 0;
    this.cells.forEach((el) => {
      arr.push(el.index);
    });
    const newArr = arr.map((el) => el + 1);
    const arrNotNine = newArr.filter(
      (el) => el < this.dimmension * this.dimmension
    );
    function spl(arr1, size) {
      const result = [];
      const len = arr1.length;
      let zeroCells;
      for (let i = 0; i < len; i += size) {
        result.push(arr.slice(i, i + size));
      }

      result.forEach((el, i) => {
        el.forEach((num) => {
          if (num === size * size) {
            zeroCells = i + 1;
          }
        });
      });
      return zeroCells;
    }

    for (let j = 0; j < arrNotNine.length; j += 1) {
      for (let i = j + 1; i < arrNotNine.length; i += 1) {
        if (arrNotNine[j] > arrNotNine[i]) {
         stack += 1;
        }
      }
    }
    const check = stack + spl(newArr, this.dimmension)  % 2;
    if ( check !== 0) {  
     this.shuffle();
    } 
      
    
  }

  swapCells(i, j) {
    this.cells[i].setPosition(j, i);
    this.cells[j].setPosition(i);
    [this.cells[i], this.cells[j]] = [this.cells[j], this.cells[i]];
    if (!this.shuffling && this.isAssembled()) {
      if (this.onFinished && typeof this.onFinished === "function") {
        this.onFinished.call(this);
      }
    }
  }

  isAssembled() {
    for (let i = 0; i < this.cells.length; i += 1) {
      if (i !== this.cells[i].index) {
        return false;
      }
    }
    return true;
  }

  findPosition(ind) {
    return this.cells.findIndex((cell) => cell.index === ind);
  }

  findEmpty() {
    return this.cells.findIndex((cell) => cell.isEmpty);
  }
}

export { PicturePuzzle };