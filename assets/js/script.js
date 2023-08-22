document.addEventListener("DOMContentLoaded", event => {
  window.setInterval(timer, 1000);
  printUserName();
  document.querySelector("form").addEventListener("submit", formSubmit);
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
