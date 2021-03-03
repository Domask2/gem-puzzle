import CONSTANS from "../constans/Constans";
export function bestSolution() {
  const question = document.querySelector(CONSTANS.QUESTION);
  const btnWrapper = document.querySelector(CONSTANS.BTN_WRAPPER);
  const menu = document.querySelector(CONSTANS.MENU);
  const best = document.querySelector(".best");

  best.removeEventListener("click", bestSolution);
  menu.style.opacity = "1";
  menu.style.zIndex = "3";
  question.style.display = "none";
  btnWrapper.style.display = "none";

  const listBest = document.createElement("div");
  const text = document.createElement("p");
  const close = document.createElement("div");
  const ul = document.createElement("ul");

  text.innerHTML = `Лучшие результаты`;
  close.innerHTML = "Закрыть";

  close.classList.add("close");
  listBest.classList.add("listBest");

  listBest.appendChild(text);
  listBest.appendChild(ul);
  listBest.appendChild(close);
  menu.appendChild(listBest);

  const arr = JSON.parse(localStorage.getItem("arr")) || [];

  if (arr.length < 1) {
    return;
  }

  for (let i = 0; i < arr.length; i += 1) {
    const li = document.createElement("li");
    li.classList.add("li");
    li.innerHTML = `<div> №${i + 1}</div><div> ${arr[i].now}</div><div>${arr[i].moves
      }</div> <div>${arr[i].time}</div><div>${arr[i].dim}x${arr[i].dim}</div>`;
    ul.appendChild(li);
  }

  close.addEventListener("click", () => {
    menu.style.opacity = "0";
    menu.style.zIndex = "1";
    question.style.display = "block";
    btnWrapper.style.display = "block";
    best.addEventListener("click", bestSolution);
    listBest.remove();
  });
}