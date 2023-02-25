const burgerButton = document.getElementById("burger__toggle");
const burgerBox = document.querySelector(".burger__box");
const burgerContainer = document.querySelector("main");
const header = document.getElementById("header");

burgerButton.onclick = () => {
  if (burgerButton.checked) {
    burgerContainer.style.opacity = "0.5";
    burgerBox.style.opacity = "1";
    header.style.background = "rgb(17 17 17 / 0.5)";
  } else {
    burgerContainer.style.opacity = "1";
    if (header.offsetWidth < 752) {
      header.style.background = "#000";
    } else {
      header.style.background = "#fff";
    }
  }
};
