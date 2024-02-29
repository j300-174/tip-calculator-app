class Tips {
  colours = {
    darkBlue: "#00494d",
    lightBlue: "#26c2ad",
    white: "#FFFFFF",
  };

  constructor(tips, labels) {
    this.tip = tips;
    this.labels = labels;
  }

  activateEventListeners() {
    bill.addEventListener("keyup", this.calculateTipAmountAndTotal);
    custom.addEventListener("keyup", this.calculateTipAmountAndTotal);
    // custom.addEventListener("onclick", this.resetLabels);
    people.addEventListener("keyup", this.calculateTipAmountAndTotal);
    reset.addEventListener("click", this.resetAll);
  }

  activateTipCalculator() {
    this.activateEventListeners();

    for (let i = 0; i < this.tip.length; i++) {
      const tipsLabel = this.tip[i].closest("label");
      this.tip[i].onclick = () => {
        this.handleBtnColours(tipsLabel);
        this.calculateTipAmountAndTotal();
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


  calculateTipAmountAndTotal() {
    function activateResetButtonStyling() {
      reset.style.color = "var(--dark-green)";
      reset.style.backgroundColor = "var(--light-green)";
    }
    activateResetButtonStyling();

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