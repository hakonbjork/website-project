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
      let formInputs = document.querySelectorAll("#booking-form input");

      for (let input of formInputs) {
        if (input.value != "") {
        } else {
          complete = false;
          input.classList.add("form-error");
        }
      }

      if (complete) {
        if (validateFormContent()) {
          const button = document.querySelector("#booking-form button");
          button.innerHTML = "Booking Completed ✅";
          button.setAttribute("disabled", "true");
          storeValues();
        }
      }
      event.preventDefault();
    });
}

// removes error class on input field and label
function addKeyDownListeners() {
  let formInputs = document.querySelectorAll("#booking-form input");
  for (let input of formInputs) {
    input.addEventListener("keydown", function (event) {
      input.classList.remove("form-error");
    });
  }
}

function addCalendarInputListeners() {
  let dateInputs = document.querySelectorAll("input[type=date]");
  for (let dateInput of dateInputs) {
    dateInput.addEventListener("change", function (event) {
      if (dateInput.value != "") {
        dateInput.classList.remove("form-error");
        event.preventDefault();
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

// Store values in localStorage for later use
function storeValues() {
  const name = document.querySelector("#form-name").value;
  const number = document.querySelector("#form-number").value;
  const mail = document.querySelector("#form-mail").value;
  const numGuests = document.querySelector("#form-num-guests").value;
  const startDate = document.querySelector("#form-start-date").value;
  const endDate = document.querySelector("#form-end-date").value;

  console.log(name);
  console.log(number);
  console.log(mail);
  console.log(numGuests);
  console.log(startDate);
  console.log(endDate);

  localStorage.setItem("booking-name", name);
  localStorage.setItem("booking-number", number);
  localStorage.setItem("booking-maill", mail);
  localStorage.setItem("booking-numGuests", numGuests);
  localStorage.setItem("booking-startDate", startDate);
  localStorage.setItem("booking-endDate", endDate);
}
