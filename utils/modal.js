const modal = document.querySelector(".modal");

const phone = document.getElementById("phone");
const phoneSuccess = document.getElementById("phone_success");
const phoneError = document.querySelector(".phone_error");

const phoneMask = [
  "+",
  "7",
  "(",
  /\D/,
  /\D/,
  /\D/,
  ")",
  " ",
  /\D/,
  /\D/,
  /\D/,
  " ",
  /\D/,
  /\D/,
  " ",
  /\D/,
  /\D/,
];

function mask(e, formater) {
  const result = [];
  const { target } = e;
  for (let i = 0; i < target.value.length; i++) {
    if (i >= formater.length) break;
    result[i] =
      (typeof formater[i] === "string" ? formater[i] : "") +
      target.value[i].replace(formater[i], "");
  }
  e.target.value = result.join("");
}

phone.addEventListener("input", (e) => {
  mask(e, phoneMask);
  if (phone.value.length === 17) {
    phone.style.border = "none";
    phoneSuccess.style.display = "block";
    phoneError.style.display = "none";
    localStorage.setItem("userPhone", phone.value);
  } else {
    phoneSuccess.style.display = "none";
  }
});
phone.addEventListener("blur", () => {
  if (phone.value.length !== 17) {
    phoneError.style.display = "block";
    phone.style.border = "1px solid #d53234";
  } else {
    phoneError.style.display = "none";
  }
});

const userName = document.getElementById("name");
const nameSuccess = document.getElementById("name_success");
const nameError = document.querySelector(".name_error");
userName.addEventListener("input", () => {
  validName();
});
userName.addEventListener("blur", () => {
  refactorName();
});

function validName() {
  if (userName.value.length > 3) {
    nameSuccess.style.display = "block";
    userName.style.border = "none";
    nameError.style.display = "none";
    localStorage.setItem("userName", userName.value);
  } else if ((userName.value.length = 0)) {
    userName.style.border = "none";
  } else {
    nameSuccess.style.display = "none";
    userName.style.border = "1px solid #d53234";
    nameError.style.display = "block";
  }
}

function refactorName() {
  if (userName.value) {
    userName.value =
      userName.value[0].toUpperCase() + userName.value.slice(1).toLowerCase();
  } else {
    userName.style.border = "1px solid #d53234";
    nameError.style.display = "block";
  }
}

const openModalArray = document.querySelectorAll(".open__modal");
openModalArray.forEach((e) => {
  e.addEventListener("click", () => {
    modal.style.display = "block";
  });
});

const closeModal = document.querySelector(".modal__close");
closeModal.onclick = function () {
  modal.style.display = "none";
};

const sumbitButton = document.getElementById("submit");
sumbitButton.onclick = function () {
  if (localStorage.getItem("userPhone") && localStorage.getItem("userName")) {
    const button = document.querySelector(".button_submit");
    const loader = document.querySelector(".button_loader");
    button.style.opacity = "0";
    loader.style.opacity = "1";
    getUserData();

    setTimeout(() => {
      modal.style.display = "none";
      button.style.opacity = "1";
      loader.style.opacity = "0";
      localStorage.clear();
      userName.value = "";
      phone.value = "";
      phoneSuccess.style.display = "none";
      nameSuccess.style.display = "none";
    }, 2000);
  }
};

function getUserData() {
  const res = [];
  for (let i = 0; i < localStorage.length; i++) {
    let key = localStorage.key(i);
    res.push(`${key}: ${localStorage.getItem(key)}`);
  }
  console.log(res);
}
