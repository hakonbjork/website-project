document.addEventListener("readystatechange", function (event) {
  if (event.target.readyState === "interactive") {
    // site interactive
    addValidateFormInputListener();
    addKeyDownListeners();
    addCalendarInputlisteners();
  }
});

function addValidateFormInputListener() {
  document
    .querySelector("#booking-form")
    .addEventListener("submit", function (event) {
      let complete = true;
      /*
      let nameField = document.querySelector("#form-name");
      let numberField = document.querySelector("#form-number");
      let mailField = document.querySelector("#form-mail");
      let numGuestsField = document.querySelector("#form-num-guests");
      let startDateField = document.querySelector("#form-start-date");
      let endDateField = document.querySelector("#form-end-date");

      if (
        nameField.value != "" &&
        numberField.value != "" &&
        mailField.value != "" &&
        numGuestsField.value != "" &&
        startDateField.value != "" &&
        endDateField.value != ""
      ) {
        complete = true;
      }
      */

      let formInputs = document.querySelectorAll("#booking-form input");

      for (let input of formInputs) {
        if (input.value != "") {
        } else {
          complete = false;
          input.classList.add("form-error");
        }
      }

      if (complete) {
        console.log("complete form");
      } else {
        console.log("not completed form");
      }

      event.preventDefault();
    });
}

// removes error class on input field and label
function addKeyDownListeners() {
  let formInputs = document.querySelectorAll("#booking-form input");
  for (let input of formInputs) {
    input.addEventListener("keydown", function () {
      input.classList.remove("form-error");
    });
  }
}

function addCalendarInputlisteners() {
  let dateInputs = document.querySelectorAll("input[type=date]");
  for (let dateInput of dateInputs) {
    dateInput.addEventListener("change", function () {
      if (dateInput.value != "") {
        dateInput.classList.remove("form-error");
      }
    });
  }
}
