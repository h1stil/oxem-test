const INTEREST_RATE = 5;
const MIN_COST = 1000000;
const MAX_COST = 6000000;
const MIN_LEASE = 1;
const MAX_LEASE = 60;
const MIN_RATE = 0.1;
const MAX_RATE = 0.6;

const form = document.getElementById("form");
form.addEventListener("input", function () {
  calc();
  initialSlider.noUiSlider.updateOptions({
    range: {
      min: 0.1 * calcAmount(),
      max: 0.6 * calcAmount(),
    },
  });
});

function numberWithSpaces(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

function calcAmount() {
  const inputCost = document.getElementById("input-cost");
  let value = parseInt(Number(inputCost.value.replace(/ /g, "")));
  if (value < MIN_COST) {
    value = MIN_COST;
  } else if (value > MAX_COST) {
    value = MAX_COST;
  }
  inputCost.value = numberWithSpaces(value);
  localStorage.setItem("costAuto", value);
  return value;
}

function calcInitial() {
  const inputInitial = document.getElementById("input-initial");
  const inputCost = document.getElementById("input-cost");
  const costNumber = Number(inputCost.value.replace(/ /g, ""));
  let value = parseInt(Number(inputInitial.value.replace(/ /g, "")));
  if (value < costNumber * MIN_RATE) {
    value = costNumber * MIN_RATE;
  } else if (value > costNumber * MAX_RATE) {
    value = costNumber * MAX_RATE;
  }
  inputInitial.value = numberWithSpaces(value);
  localStorage.setItem("initialCost", value);
}

function calcTime() {
  const inputTime = document.getElementById("input-time");
  let value = parseInt(Number(inputTime.value));
  if (value < MIN_LEASE) {
    value = MIN_LEASE;
  } else if (value > MAX_LEASE) {
    value = MAX_LEASE;
  }
  inputTime.value = value;
  localStorage.setItem("time", value);
}

function calcRes() {
  const inputCost = document.getElementById("input-cost");
  const inputInitial = document.getElementById("input-initial");
  const targetCost = Number(inputCost.value.replace(/ /g, ""));
  const targetInitial = Number(inputInitial.value.replace(/ /g, ""));
  const targetTime = Number(document.getElementById("input-time").value);
  const inputRate = document.getElementById("input-initial__amout");

  const resultRate = (100 * targetInitial) / targetCost;
  const resultInitial = (resultRate / 100) * targetCost;
  const resultPayment = (targetCost - resultInitial) / targetTime;
  const resultAmount = resultInitial + targetTime * resultPayment;

  console.log();

  inputRate.innerHTML = `${resultRate.toFixed(0)}%`;
  const totalSum = document.getElementById("sum");
  const payment = document.getElementById("payment");
  totalSum.innerText = `${numberWithSpaces(resultAmount.toFixed(0))} ₽`;
  payment.innerHTML = `${numberWithSpaces(resultPayment.toFixed(0))} ₽`;
}

function calc() {
  calcAmount();
  calcInitial();
  calcTime();
  calcRes();
}

const costValue = document.getElementById("input-cost");
const costSlider = document.getElementById("slider-cost");
noUiSlider.create(costSlider, {
  start: 3300000,
  connect: "lower",
  step: 100000,
  range: {
    min: MIN_COST,
    max: MAX_COST,
  },
});

costSlider.noUiSlider.on("update", () => {
  costValue.value = numberWithSpaces(costSlider.noUiSlider.get(true));
  calc();
});
costSlider.noUiSlider.on("end", () => {
  calc();
  initialSlider.noUiSlider.updateOptions({
    range: {
      min: 0.1 * calcAmount(),
      max: 0.6 * calcAmount(),
    },
  });
});

const initialValue = document.getElementById("input-initial");
parseInt(Number(costValue.value.replace(/ /g, "")));
const initialSlider = document.getElementById("slider-initial");
noUiSlider.create(initialSlider, {
  start: 420000,
  connect: "lower",
  step: 10000,
  range: {
    min: 0.1 * calcAmount(),
    max: 0.6 * calcAmount(),
  },
});

initialSlider.noUiSlider.on("update", () => {
  initialValue.value = numberWithSpaces(
    initialSlider.noUiSlider.get(true).toFixed(0)
  );
  calc();
});

const timeValue = document.getElementById("input-time");
const timeSlider = document.getElementById("slider-time");
noUiSlider.create(timeSlider, {
  start: 60,
  connect: "lower",
  step: 1,
  range: {
    min: MIN_LEASE,
    max: MAX_LEASE,
  },
});

timeSlider.noUiSlider.on("update", () => {
  timeValue.value = timeSlider.noUiSlider.get(true).toFixed(0);
  calc();
});
