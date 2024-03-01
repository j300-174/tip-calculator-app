/*
  Tips
  Props:
*/
class TipsColors {
  constructor() {
    this.darkBlue = "#00494d";
    this.lightBlue = "#26c2ad";
    this.white = "#FFFFFF";
  }

}

class Tips {

  constructor(tips, labels) {
    this.tip = tips;
    this.labels = labels;
    this.colours = new TipsColors();
  }

  activateEventListeners() {
    bill.addEventListener("keyup", this.handleUserInput);
    custom.addEventListener("keyup", this.handleUserInput);
    // custom.addEventListener("onclick", this.resetLabels);
    people.addEventListener("keyup", this.handleUserInput);
    reset.addEventListener("click", this.resetAll);
    return this;
  }

  activateTipCalculator() {
    this.activateEventListeners();
    for (let i = 0; i < this.tip.length; i++) {
      const tipsLabel = this.tip[i].closest("label");
      this.tip[i].onclick = () => {
        this.handleBtnColours(tipsLabel);
        this.handleUserInput();
      };
    }

    // when custom tip clicked, reset tips to default color
    // const labels = ;
    custom.onclick = () => {
      for (let i = 0; i < this.labels.length; i++) {
        this.labels[i].style.color = this.colours.white;
        this.labels[i].style.backgroundColor = this.colours.darkBlue;
      }
    };

  }

  resetAll() {
    bill.value = null;
    people.value = null;
    custom.value = null;
    tipAmount.innerHTML = "£0.00";
    totalAmount.innerHTML = "£0.00";
    reset.style.color = "var(--dark-green";
    reset.style.backgroundColor = "#0d686d";
  }

  // When user inputs via bill, no. people, selecting tip, method triggered
  // method then sets styling
  // when bill || no. people input || custom input, only change output display
  // when select tip buttons clicked, handle custom, display, rest of buttons

  handleUserInput() {
    function activateResetButton() {
      reset.style.color = "var(--dark-green)";
      reset.style.backgroundColor = "var(--light-green)";
    }
    //calc tip & total
    activateResetButton();

    let userTip = 0;

    if (custom.value) {
      userTip = custom.value / 100;
    } else if (document.querySelector("input[name='tip']:checked")) {
      userTip = document.querySelector("input[name='tip']:checked").value / 100;
    }

    const tip = bill.value * userTip;
    const total = parseFloat(bill.value) + tip;

    tipAmount.innerHTML = `£${((tip / people.value) * 100) / 100}`;
    totalAmount.innerHTML = `£${((total / people.value) * 100) / 100}`;
  }

  // COLOURS
  handleBtnColours(tipsLabel) {
    this.setToDefaultColour();
    this.setClickedColour(tipsLabel);
    return this;
  }

  setToDefaultColour() {
    /*
      resets button to default color (only selected receive color change)
      buttons not selected are painted to their default colors
    */
    for (let i = 0; i < this.labels.length; i++) {
      this.labels[i].style.color = this.colours.white;
      this.labels[i].style.backgroundColor = this.colours.darkBlue;
    }
  }

  setClickedColour(tipsLabel) {
    /*
      after all colors are painted default, clicked button is then changed to
      different color..
    */
    tipsLabel.style.color = this.colours.white;
    tipsLabel.style.background = this.colours.lightBlue;
    custom.value = null;
  }
}

var tips = new Tips(document.querySelectorAll("input[name='tip']"), document.querySelectorAll(".button"));
tips.activateTipCalculator();