// add all event listeners when document is ready
document.addEventListener("readystatechange", function (event) {
  if (event.target.readyState === "interactive") {
    // both booking.html and booking-confirmation.html
    // has both a single ".no-js" element
    const noJsElement = document.querySelector(".no-js");
    if (document.body.contains(noJsElement)) {
      noJsElement.classList.add("hidden");
    }

    // show content that require JavaScript
    document
      .querySelectorAll(".js")
      .forEach((el) => el.classList.remove("hidden"));

    // if the page contains booking form, it must be the booking page
    const bookingForm = document.querySelector("#booking-form");
    if (document.body.contains(bookingForm)) {
      bookingForm.addEventListener("submit", validateForm);

      document
        .querySelector("#booking-form button")
        .removeAttribute("disabled");

      document
        .querySelector("#confirm-booking .confirm-button")
        .addEventListener("click", storeValuesSwitchPage);

      document
        .querySelector("#confirm-booking .change-button")
        .addEventListener("click", hidePopupEnableButtons);

      addKeyDownListeners();
      addCalendarInputListeners();
    }

    // booking-confirmation page
    const bookingExistElement = document.querySelector("#booking-exist");
    if (document.body.contains(bookingExistElement)) {
      fetchBookingShowContent();
    }

    // astronaut.html page
    const astronautChatFieldForm = document.querySelector(
      "#astronaut-chat-field form"
    );
    if (document.body.contains(astronautChatFieldForm)) {
      astronautChatFieldForm.addEventListener("submit", sendMessage);

      document
        .querySelectorAll(
          "#astronaut-chat-field #top-bar button, #hide-show-chat"
        )
        .forEach((el) => el.addEventListener("click", toggleChat));

      document
        .querySelectorAll("#astronaut-chat-field .example-container")
        .forEach((el) => el.addEventListener("click", useExampleMessage));
    }
  }
});

/* booking.html functions */

// set an error message next to the booking submit button
function setAndShowErrorMessage(message) {
  const errorMessage = document.querySelector("#error-message");
  errorMessage.classList.remove("hidden");
  errorMessage.firstChild.innerHTML = message;
}

// check if form is complete, and then if content makes sense
function validateForm(event) {
  let complete = true;
  let formInputs = document.querySelectorAll("#booking-form input");

  // check if form is complete
  for (let input of formInputs) {
    if (input.value == "") {
      complete = false;
      input.classList.add("form-error");
      setAndShowErrorMessage("Please fill inn all fields");
    }
  }

  // if complete, check if content is valid.
  // if valid, disable form elements and show popup
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

// removes error class on form input field and label if keys are pressed
function addKeyDownListeners() {
  let formInputs = document.querySelectorAll("#booking-form input");
  for (let input of formInputs) {
    input.addEventListener("keydown", function () {
      input.classList.remove("form-error");
      document.querySelector("#error-message").classList.add("hidden");
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
        document.querySelector("#error-message").classList.add("hidden");
        event.preventDefault();
      }
    });
  }
}

// check if content valid, returns true or false
// sets error class on relevant field if not valid
function validateFormContent() {
  let mail = document.querySelector("#form-mail");
  let startDate = document.querySelector("#form-start-date");
  let endDate = document.querySelector("#form-end-date");

  let contentValid = true;

  // check if mail field includes '@' and '.'
  if (!(mail.value.includes("@") && mail.value.includes("."))) {
    contentValid = false;
    mail.classList.add("form-error");
    setAndShowErrorMessage("Please make sure mail has a valid format");
  }

  const startDateDate = new Date(startDate.value);
  const endDateDate = new Date(endDate.value);

  // check if startdate is before enddate
  if (startDateDate > endDateDate) {
    contentValid = false;
    endDate.classList.add("form-error");
    setAndShowErrorMessage(
      "Please make sure date of departure is after date of arrival"
    );
  }

  // check if startdate is this day, or later
  if (startDateDate < new Date().setHours(0, 0, 0, 0)) {
    contentValid = false;
    startDate.classList.add("form-error");
    setAndShowErrorMessage("Date of arrival cannot be in the past");
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

  document.querySelector("#confirm-booking #details p:nth-child(1)").innerHTML =
    "Name: " + name;
  document.querySelector("#confirm-booking #details p:nth-child(2)").innerHTML =
    "Number: " + number;
  document.querySelector("#confirm-booking #details p:nth-child(3)").innerHTML =
    "Mail: " + mail;
  document.querySelector("#confirm-booking #details p:nth-child(4)").innerHTML =
    "Number of guests: " + numGuests;
  document.querySelector("#confirm-booking #details p:nth-child(5)").innerHTML =
    "Date of arrival: " + formatDate(startDate);
  document.querySelector("#confirm-booking #details p:nth-child(6)").innerHTML =
    "Date of departure: " + formatDate(endDate);
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

// Automatically fills form fields with some legal values
// used only to make development and testing faster
function fillFields() {
  document.querySelector("#form-name").value = "Hans Hansen";
  document.querySelector("#form-number").value = 23456;
  document.querySelector("#form-mail").value = "hans@hansen.com";
  document.querySelector("#form-num-guests").value = 3;
  document.querySelector("#form-start-date").value = "2023-02-27";
  document.querySelector("#form-end-date").value = "2023-03-27";
}

/* booking-confirmation.html functions */

// Gets booking information from localStorage and displays it if avaiable
function fetchBookingShowContent() {
  // get booking information from localStorage
  const name = localStorage.getItem("booking-name");
  const number = localStorage.getItem("booking-number");
  const mail = localStorage.getItem("booking-maill");
  const numGuests = localStorage.getItem("booking-numGuests");
  const startDate = localStorage.getItem("booking-startDate");
  const endDate = localStorage.getItem("booking-endDate");

  // if we have all information, display it on the website
  if (name && number && mail && numGuests && startDate && endDate) {
    document.querySelector("#booking-exist").classList.toggle("hidden");
    document.querySelector("#booking-exist li:nth-child(1)").innerHTML += name;
    document.querySelector("#booking-exist li:nth-child(2)").innerHTML +=
      number;
    document.querySelector("#booking-exist li:nth-child(3)").innerHTML += mail;
    document.querySelector("#booking-exist li:nth-child(4)").innerHTML +=
      numGuests;
    document.querySelector("#booking-exist li:nth-child(5)").innerHTML +=
      formatDate(startDate);
    document.querySelector("#booking-exist li:nth-child(6)").innerHTML +=
      formatDate(endDate);
  } else {
    // if not, show the user that no booking exist
    document.querySelector("#no-booking-exist").classList.toggle("hidden");
  }
}

/* astronaut.html functions */

// function to be called when user clicks on example message (suggestion)
// creates a new message (from the suggestion), sends that message
// and creates a response
function useExampleMessage(event) {
  // create message from example message
  const message = this.firstElementChild.innerHTML;
  const chat = document.querySelector("#messages");

  const newTextElement = document.createElement("p");
  newTextElement.innerHTML = message;

  const newMessageElement = document.createElement("div");
  newMessageElement.setAttribute("id", "message-container");
  newMessageElement.appendChild(newTextElement);

  chat.appendChild(newMessageElement);

  chat.scrollTop = chat.scrollHeight;

  const response = respondToMessage(message);

  // hide the example messages
  document.querySelector("#messages .examples").classList.add("hidden");

  // get answer and create answer element
  const answerTextElement = document.createElement("p");
  answerTextElement.innerHTML = response;

  const answerMessageElement = document.createElement("div");
  answerMessageElement.setAttribute("id", "answer-container");
  answerMessageElement.appendChild(answerTextElement);

  // wait to show it to make the chat seem more natural
  setTimeout(() => {
    chat.appendChild(answerMessageElement);
    chat.scrollTop = chat.scrollHeight;
  }, 700);

  event.preventDefault();
}

// creates message based on input field and create answer
function sendMessage(event) {
  // hide the example messages
  document.querySelector("#messages .examples").classList.add("hidden");
  const messageField = document.querySelector(
    "#astronaut-chat-field form input"
  );

  // create new message
  const chat = document.querySelector("#messages");

  const newTextElement = document.createElement("p");
  newTextElement.innerHTML = messageField.value;

  const newMessageElement = document.createElement("div");
  newMessageElement.setAttribute("id", "message-container");
  newMessageElement.appendChild(newTextElement);

  chat.appendChild(newMessageElement);

  chat.scrollTop = chat.scrollHeight;

  // get answer and create answer element
  const response = respondToMessage(messageField.value);
  messageField.value = "";

  const answerTextElement = document.createElement("p");
  answerTextElement.innerHTML = response;

  const answerMessageElement = document.createElement("div");
  answerMessageElement.setAttribute("id", "answer-container");
  answerMessageElement.appendChild(answerTextElement);

  // wait to show it to make the chat seem more natural
  setTimeout(() => {
    chat.appendChild(answerMessageElement);
    chat.scrollTop = chat.scrollHeight;
  }, 700);

  event.preventDefault();
}

// function that takes in a message, and creates a respons
function respondToMessage(message) {
  // default answer
  let answer =
    "I did not understand that. Could you try saying it in another way?";
  // object (dictionary) with known responses to messages
  const knownResponses = {
    hi: "Hello! Nice to meet you.",
    hello: "Hello! Nice to meet you.",
    hey: "Hello! Nice to meet you.",
    "have you been to mars":
      "Actually, I have never been to Mars. But i would love to go there!",
    "have you been to the moon":
      "Yes. The gravity is funny there. I could jump really high",
    "have you been to space":
      "I have. It is cold, and dark. But also really facinating",
  };

  // if message contains key in dictionary, we have an answer
  for (key in knownResponses) {
    if (message.toLowerCase().includes(key)) {
      answer = knownResponses[key];
    }
  }
  return answer;
}

function toggleChat(event) {
  document.querySelector("#astronaut-chat-field").classList.toggle("hidden");
  event.preventDefault();
}

/* function used in several pages */

// function used to format dates to a more human-readable format
// from this: 2023-02-27
// to this: February 27th, 2023
function formatDate(dateString) {
  const months = {
    "01": "January",
    "02": "February",
    "03": "March",
    "04": "April",
    "05": "May",
    "06": "June",
    "07": "July",
    "08": "August",
    "09": "September",
    10: "October",
    11: "November",
    12: "December",
  };

  const month = months[dateString.slice(5, 7)];
  const date = dateString.slice(8, 10);
  const year = dateString.slice(0, 4);

  let prefix = "th";
  if (+date == 1) {
    prefix = "st";
  } else if (+date == 2) {
    prefix = "nd";
  } else if (+date == 3) {
    prefix = "rd";
  }

  return `${month} ${+date}${prefix}, ${year}`;
}
