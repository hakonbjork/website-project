document.addEventListener("readystatechange", function (event) {
  if (event.target.readyState === "interactive") {
    // site interactive
    addValidateFormInputListener();
    addKeyDownListeners();
    addCalendarInputListeners();
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
        if (validateFormContent()) {
          console.log("all valid, moooooving on");
          const button = document.querySelector("#booking-form button");
          button.innerHTML = "Booking Completed ✅";
          button.setAttribute("disabled", "true");
        }
      } else {
        console.log("not completed form");
        // do stuff
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

function addCalendarInputListeners() {
  let dateInputs = document.querySelectorAll("input[type=date]");
  for (let dateInput of dateInputs) {
    dateInput.addEventListener("change", function () {
      if (dateInput.value != "") {
        dateInput.classList.remove("form-error");
      }
    });
  }
}

// check if content valid, returns true or false;
function validateFormContent() {
  let mail = document.querySelector("#form-mail");
  let startDate = document.querySelector("#form-start-date");
  let endDate = document.querySelector("#form-end-date");

  let contentValid = true;

  if (!(mail.value.includes("@") && mail.value.includes("."))) {
    contentValid = false;
    mail.classList.add("form-error");
  }

  const startDateDate = new Date(startDate.value);
  const endDateDate = new Date(endDate.value);

  if (startDateDate > endDateDate) {
    contentValid = false;
    endDate.classList.add("form-error");
  }

  if (startDateDate < new Date().setHours(0, 0, 0, 0)) {
    contentValid = false;
    startDate.classList.add("form-error");
  }

  return contentValid;
}
