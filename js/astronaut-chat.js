document.addEventListener("readystatechange", function (event) {
  if (event.target.readyState === "interactive") {
    document
      .querySelectorAll(".js")
      .forEach((el) => el.classList.remove("hidden"));
    document
      .querySelector("#astronaut-chat-field form")
      .addEventListener("submit", sendMessage);
  }
  document
    .querySelectorAll("#astronaut-chat-field #top-bar button, #hide-show-chat")
    .forEach((el) => el.addEventListener("click", toggleChat));
});

function sendMessage(event) {
  // Message
  const messageField = document.querySelector(
    "#astronaut-chat-field form input"
  );
  const chat = document.querySelector("#messages");

  const newTextElement = document.createElement("p");
  newTextElement.innerHTML = messageField.value;

  const newMessageElement = document.createElement("div");
  newMessageElement.setAttribute("id", "message-container");
  newMessageElement.appendChild(newTextElement);

  chat.appendChild(newMessageElement);

  chat.scrollTop = chat.scrollHeight;

  // Answer
  const response = respondToMessage(messageField.value);
  messageField.value = "";

  const answerTextElement = document.createElement("p");
  answerTextElement.innerHTML = response;

  const answerMessageElement = document.createElement("div");
  answerMessageElement.setAttribute("id", "answer-container");
  answerMessageElement.appendChild(answerTextElement);

  setTimeout(() => {
    chat.appendChild(answerMessageElement);
    chat.scrollTop = chat.scrollHeight;
  }, 700);

  event.preventDefault();
}

function respondToMessage(message) {
  let answer =
    "I did not understand that. Could you try saying it in another way?";
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
