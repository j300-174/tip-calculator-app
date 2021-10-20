/*
  get input from Bill
  get tip
  get no. of people
*/

bill.addEventListener("keyup", calculate);
custom.addEventListener("keyup", calculate);
people.addEventListener("keyup", calculate);

// calculate onclick on tip
const tip = document.querySelectorAll("input[name='tip\']");

for (let i = 0; i < tip.length; i++) {
  const tipsLabel = tip[i].closest("label");
  tip[i].onclick = () => {
    /*
      resets button to default color (only selected receive color change)
      buttons not selected are painted to their default colors
    */
    for (let i = 0; i < labels.length; i++) {
      labels[i].style.color = "white";
      labels[i].style.backgroundColor = "#00494d";
    }
    /*
      after all colors are painted default, clicked button is then changed to
      different color..
    */
    tipsLabel.style.color = "white";
    tipsLabel.style.background = "#26c2ad";
    custom.value = null;
    calculate();
  };
}

// when custom tip clicked, reset tips to default color
const labels = document.querySelectorAll(".button");
custom.onclick = () => {
  for (let i = 0; i < labels.length; i++) {
    labels[i].style.color = "white";
    labels[i].style.backgroundColor = "#00494d";
  }
};

// calculate tip amount & total amount
function calculate() {
  // activate reset button during any user input
  reset.style.color = "var(--dark-green)";
  reset.style.backgroundColor = "var(--light-green)";

  let userTip = 0;

  if (custom.value) {
    userTip = custom.value / 100;
  } else if (document.querySelector("input[name='tip']:checked")) {
    userTip = document.querySelector("input[name='tip']:checked").value / 100;
  }

  const tip = bill.value * userTip;
  const total = parseFloat(bill.value) + tip;

  tipAmount.innerHTML = `$${((tip / people.value) * 100) / 100}`;
  totalAmount.innerHTML = `$${((total / people.value) * 100) / 100}`;
}

reset.addEventListener("click", () => {
  bill.value = null;
  people.value = null;
  custom.value = null;
  tipAmount.innerHTML = "$0.00";
  totalAmount.innerHTML = "$0.00";
  reset.style.color = "var(--dark-green";
  reset.style.backgroundColor = "#0d686d";
});
