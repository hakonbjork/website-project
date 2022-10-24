document.addEventListener("readystatechange", function (event) {
  if (event.target.readyState === "interactive") {
    document
      .querySelector("#booking-form")
      .addEventListener("submit", validateForm);
    document
      .querySelector("#confirm-booking .confirm-button")
      .addEventListener("click", storeValuesSwitchPage);
    document
      .querySelector("#confirm-booking .change-button")
      .addEventListener("click", hidePopupEnableButtons);

    addKeyDownListeners();
    addCalendarInputListeners();
  }
});

// check if form is complete, and then if content makes sense
function validateForm(event) {
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
      document
        .querySelectorAll("#booking-form input, #booking-form button")
        .forEach((el) => el.setAttribute("disabled", true));
      document.querySelector("#booking-form button").innerHTML =
        "Confirming...";
      showConfirmBookingPopup();
    }
  }
  event.preventDefault();
}

// removes error class on input field and label
function addKeyDownListeners() {
  let formInputs = document.querySelectorAll("#booking-form input");
  for (let input of formInputs) {
    input.addEventListener("keydown", function (event) {
      input.classList.remove("form-error");
      event.preventDefault();
    });
  }
}

// removes error class on calendar fields when input change
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
// sets error class on fields if not valid
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

// Show popup with the details for the user to double check before confirming
// Disables form input fields and button while popup is showing
function showConfirmBookingPopup() {
  const confirmBookingElement = document.querySelector("#confirm-booking");
  confirmBookingElement.classList.remove("hidden");

  const name = document.querySelector("#form-name").value;
  const number = document.querySelector("#form-number").value;
  const mail = document.querySelector("#form-mail").value;
  const numGuests = document.querySelector("#form-num-guests").value;
  const startDate = document.querySelector("#form-start-date").value;
  const endDate = document.querySelector("#form-end-date").value;

  document.querySelector(
    "#confirm-booking #details p:nth-child(1)"
  ).innerHTML = `Name: ${name}`;
  document.querySelector(
    "#confirm-booking #details p:nth-child(2)"
  ).innerHTML = `Number: ${number}`;
  document.querySelector(
    "#confirm-booking #details p:nth-child(3)"
  ).innerHTML = `Mail: ${mail}`;
  document.querySelector(
    "#confirm-booking #details p:nth-child(4)"
  ).innerHTML = `Number of guests: ${numGuests}`;
  document.querySelector(
    "#confirm-booking #details p:nth-child(5)"
  ).innerHTML = `Date of arrival: ${formatDate(startDate)}`;
  document.querySelector(
    "#confirm-booking #details p:nth-child(6)"
  ).innerHTML = `Date of departure: ${formatDate(endDate)}`;
}

// Close popup, and enable the form inputs and button again
function hidePopupEnableButtons(event) {
  document.querySelector("#confirm-booking").classList.add("hidden");
  document.querySelector("#booking-form button").innerHTML = "Send booking";
  document
    .querySelectorAll("#booking-form input, #booking-form button")
    .forEach((el) => el.removeAttribute("disabled"));

  event.preventDefault();
}

// Store values in localStorage for later use
function storeValuesSwitchPage(event) {
  const name = document.querySelector("#form-name").value;
  const number = document.querySelector("#form-number").value;
  const mail = document.querySelector("#form-mail").value;
  const numGuests = document.querySelector("#form-num-guests").value;
  const startDate = document.querySelector("#form-start-date").value;
  const endDate = document.querySelector("#form-end-date").value;

  localStorage.setItem("booking-name", name);
  localStorage.setItem("booking-number", number);
  localStorage.setItem("booking-maill", mail);
  localStorage.setItem("booking-numGuests", numGuests);
  localStorage.setItem("booking-startDate", startDate);
  localStorage.setItem("booking-endDate", endDate);

  window.location.href = "./booking-confirmation.html";

  event.preventDefault();
}

/* Automatically fills form fields with some legal values
  used only to make development and testing faster */
function fillFields() {
  document.querySelector("#form-name").value = "Hans Hansen";
  document.querySelector("#form-number").value = 23456;
  document.querySelector("#form-mail").value = "hans@hansen.com";
  document.querySelector("#form-num-guests").value = 3;
  document.querySelector("#form-start-date").value = "2023-02-27";
  document.querySelector("#form-end-date").value = "2023-03-27";
}
