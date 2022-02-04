const buttons = document.querySelectorAll(".animated");

const updateButton = (button) => {
  button.classList.add("anim");
  setTimeout(resetButton, 500, button);
};

const resetButton = (button) => {
  button.classList.remove("anim");
};

const forButtons = (buttons, func) => {
  console.log(buttons);
  buttons.forEach((element) => {
    element.addEventListener("click", (element) => {
      updateButton(element.target);
    });
  });
};

forButtons(buttons);
