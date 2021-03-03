export function createDom() {
  const gameWrap = document.createElement("div");
  const game = document.createElement("div");
  const footer = document.createElement("div");
  const header = document.createElement("div");
  const headerTime = document.createElement("div");
  const timer = document.createElement("div");
  const moves = document.createElement("div");
  const pause = document.createElement("div");
  const headerMenu = document.createElement("div");
  const newGame = document.createElement("div");
  const best = document.createElement("div");
  const save = document.createElement("div");
  const numberOfImg = document.createElement("div");

  timer.innerHTML = `Timer: <span>00:00</span>`;
  moves.innerHTML = `Moves: <span>00</span>`;
  newGame.innerHTML = `New Game`;
  best.innerHTML = `Best Solution`;
  save.innerHTML = `Save`;
  numberOfImg.innerHTML = `Remove Numbers`;

  gameWrap.classList.add("gameWrap");
  game.classList.add("game");
  footer.classList.add("footer");
  header.classList.add("header");
  timer.classList.add("timer");
  moves.classList.add("movem");
  pause.classList.add("pause");
  newGame.classList.add("newGame");
  best.classList.add("best");
  save.classList.add("save");
  numberOfImg.classList.add("numberOfImg");
  headerTime.classList.add("headerTime");
  headerMenu.classList.add("headerMenu");

  document.body.prepend(gameWrap);
  gameWrap.prepend(game);
  headerTime.appendChild(timer);
  headerTime.appendChild(moves);
  headerTime.appendChild(pause);
  headerMenu.appendChild(newGame);
  headerMenu.appendChild(best);
  headerMenu.appendChild(save);
  headerMenu.appendChild(numberOfImg);
  header.appendChild(headerTime);
  header.appendChild(headerMenu);

  for (let i = 0; i < 6; i += 1) {
    const btnNumber = document.createElement("div");
    btnNumber.classList.add(`btnNum`);
    btnNumber.innerHTML = `${i + 3}x${i + 3}`;
    footer.appendChild(btnNumber);
  }

  gameWrap.appendChild(footer);
  gameWrap.prepend(header);
}
