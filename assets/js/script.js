document.addEventListener("DOMContentLoaded", event => {
  printUserName();
  document.querySelector("form").addEventListener("submit", addUser);
  document.querySelector("#rem-user").addEventListener("click", remUser);
  document.querySelector("#play").addEventListener("click", play);
  document.querySelector("#pause").addEventListener("click", pause);
  document.querySelector("#stop").addEventListener("click", reset);
});

const printUserName = () => {
  const userName = localStorage.getItem("userName");
  if (userName) {
    document.querySelector("label").innerText = `Current user name is ${userName}.`;
  } else {
    document.querySelector("label").innerText = "User name is not set.";
  }
};

const addUser = event => {
  event.preventDefault();
  const userName = document.querySelector("#user-name").value;
  localStorage.setItem("userName", userName);
  printUserName();
};

const remUser = () => {
  localStorage.removeItem("userName");
  document.querySelector("form").reset();
  printUserName();
};

const timer = () => {
  let counter = sessionStorage.getItem("timer") || 0;
  const counterElm = document.querySelector("#timer");
  counter++;
  counterElm.innerText = counter;
  counterElm.classList.remove("placeholder");
  sessionStorage.setItem("timer", counter);
};

const resetActive = () => {
  const control = document.querySelectorAll("#timer-control > *");
  control.forEach(elm => {
    elm.classList.remove("active");
  });
};

const play = event => {
  if (!event.target.classList.contains("active")) {
    resetActive();
    timerInterval = setInterval(timer, 1000);
    event.target.classList.add("active");
  }
};

const pause = event => {
  const pauseBtn = event.target;
  const playBtn = document.querySelector("#play");
  if (playBtn.classList.contains("active")) {
    resetActive();
    clearInterval(timerInterval);
    pauseBtn.classList.add("active");
  } else {
    if (pauseBtn.classList.contains("active")) {
      playBtn.click();
    }
  }
};

const reset = () => {
  resetActive();
  clearInterval(timerInterval);
  sessionStorage.setItem("timer", 0);
  document.querySelector("#timer").innerText = "0";
};

let timerInterval = setInterval(timer, 1000);
