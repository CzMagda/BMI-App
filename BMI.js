"use strict";

const spanWeight = document.getElementById("weight-number");
const spanHeight = document.getElementById("height-number");
const spanBMI = document.getElementById("BMI");
const inputWeight = document.getElementById("weight");
const inputHeight = document.getElementById("height");
const list = document.getElementById("list");
const history = [];
const spanAVG = document.getElementById("AVG");

const button = document.getElementById("button");
const clearButton = document.getElementById("clear-button");

clearButton.addEventListener("click", () => {
  spanWeight.innerHTML = null;
  spanHeight.innerHTML = null;
  spanBMI.innerHTML = null;
  inputWeight.value = null;
  inputHeight.value = null;
});

button.addEventListener("click", () => {
  let heightInMeters = inputHeight.value / 100;
  let BMI = inputWeight.value / heightInMeters ** 2;

  if (inputWeight.value && inputHeight.value) {
    if (inputWeight.value < 40 || inputWeight.value > 200) alert("The weight is incorrect!");
    else if (inputHeight.value < 120 || inputHeight.value > 240) alert("The height is incorrect!");
    else {
      spanBMI.innerHTML = BMI.toFixed(1);
      spanWeight.innerHTML = inputWeight.value;
      spanHeight.innerHTML = inputHeight.value;
      history.push({ weight: inputWeight.value, height: inputHeight.value, BMI: BMI.toFixed(1), date: new Date() });
    }
  }

  for (let i = history.length - 1; i < history.length; i++) {
    let fullDate = history[i].date.toLocaleString();
    const li = document.createElement("li");
    li.textContent = `Date: ${fullDate}, Height: ${history[i].height}, Weight: ${history[i].weight}, BMI: ${history[i].BMI}`;
    list.appendChild(li);
  }

  if (history.length >= 2) {
    if (history[history.length - 1].BMI < history[history.length - 2].BMI) alert("Your BMI has decreased!");
    else if (history[history.length - 1].BMI > history[history.length - 2].BMI) alert("Your BMI has increased!");
    else alert("Your BMI did not change!");
  }

  let sum = 0;
  for (let i = 0; i < history.length; i++) {
    sum = sum + Number(history[i].BMI);
  }
  let avg = sum / history.length;
  spanAVG.innerHTML = avg.toFixed(1);
});
