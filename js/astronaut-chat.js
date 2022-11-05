document.addEventListener("readystatechange", function (event) {
  if (event.target.readyState === "interactive") {
    // show content that require JavaScript
    document
      .querySelectorAll(".js")
      .forEach((el) => el.classList.remove("hidden"));

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
