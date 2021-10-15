/*
  get input from Bill
  get tip
  get no. of people
*/

// const bill = document.getElementById('bill').value;
// console.log(bill);

// const ppl = document.getElementById('people').value;
// console.log(ppl);

// let tip = 0;

bill.addEventListener('keyup', calculate);
custom.addEventListener('keyup', calculate);
people.addEventListener('keyup', calculate);
let userTip = 0;

// calculate onclick on tip
const tip = document.querySelectorAll('input[name="tip"]')
for (let i=0; i<tip.length;i++) {
  const tipsLabel = tip[i].closest('label');
  tip[i].onclick = () => {
    custom.value = null;
    calculate();
  }
}

// calculate tip amount & total amount
function calculate() {
  // activate reset button during any user input
  reset.style.color = 'var(--dark-green)';
  // --light-green
  reset.style.backgroundColor = 'var(--light-green)';

  // sort out selected tip...
  let tipList = document.querySelector('input[name="tip"]');
  if (custom.value) {
    userTip = custom.value / 100;
  }
  else if (document.querySelector('input[name="tip"]:checked')) {
    userTip = document.querySelector('input[name="tip"]:checked').value / 100;
  }

  const tip = bill.value * userTip;
  const total = parseFloat(bill.value) + tip;

  tipAmount.innerHTML = "$" + ((tip / people.value) * 100) / 100;
  totalAmount.innerHTML = "$" + ((total / people.value) * 100) / 100;
}

reset.addEventListener('click', () => {
  bill.value = null;
  people.value = null;
  custom.value = null;
  tipAmount.innerHTML = "$0.00";
  totalAmount.innerHTML = "$0.00";
  reset.style.color = 'var(--dark-green';
  reset.style.backgroundColor = "#0d686d";
})

// SETUP TIP AMOUNT

// SETUP TOTAL

// onclick RESET... clear all inputs and reset variables

// media query:
