document.addEventListener("DOMContentLoaded", event => {
  printUserName();
  document.querySelector("form").addEventListener("submit", formSubmit);
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

const formSubmit = event => {
  event.preventDefault();
  const buttonId = event.submitter.id;
  if (buttonId === "add-user") addUser();
  if (buttonId === "rem-user") {
    remUser();
    event.target.reset();
  }
  printUserName();
};

const addUser = () => {
  const userName = document.querySelector("#user-name").value;
  localStorage.setItem("userName", userName);
};

const remUser = event => {
  localStorage.removeItem("userName");
};

const timer = () => {
  let counter = sessionStorage.getItem("timer") || 0;
  const counterElm = document.querySelector("#timer");
  counterElm.innerText = counter;
  counterElm.classList.remove("placeholder");
  counter++;
  sessionStorage.setItem("timer", counter);
};

const resetActive = () => {
  const control = document.querySelectorAll("#timer-control > *");
  control.forEach(elm => {
    elm.classList.remove("active");
  });
};

const play = event => {
  resetActive();
  timerInterval = setInterval(timer, 1000);
  event.target.classList.add("active");
};
const pause = event => {
  clearInterval(timerInterval);
  resetActive();
  event.target.classList.add("active");
};
const reset = event => {
  resetActive();
  clearInterval(timerInterval);
  sessionStorage.setItem("timer", 0);
  document.querySelector("#timer").innerText = "0";
};

let timerInterval = setInterval(timer, 1000);
