const input = document.querySelector("#message-box");
const button = document.querySelector(".send-section-button");
const message_body = document.querySelector(".chat");


window.addEventListener('load',() => {
  let socket = io();
  socket.emit("connection",socket)
})  




window.addEventListener("keydown", (e) => {
  if (e.keyCode === 13) {
    appendMessage();
  }
});

// send message after button clicked
button.addEventListener("click", () => {
  appendMessage();
  sendMessage();
});

const sendMessage = () => {
  // socekt sneding message

  console.log(input.value);
};

const receiveMessage = () => {
  // socket reeceibing code
};

// append message codes
const appendMessage = () => {
  if (input.value !== "") {
    createMessageElement(input.value, "sender");
    message_body.scrollTop = message_body.scrollHeight;
  }
};

const createMessageElement = (message, person) => {
  const messageElement = document.createElement("div");
  messageElement.setAttribute("class", "message-container");

  if (person === "sender") {
    messageElement.classList.add("send", "send");
  } else {
    messageElement.classList.add("class", "receive");
  }
  const time = document.createElement("small");
  const p = document.createElement("p");
  p.setAttribute("class", "message");

  p.innerText = message;
  time.innerText = new Date().toLocaleTimeString();
  messageElement.appendChild(p);
  messageElement.appendChild(time);
  message_body.appendChild(messageElement);
  resetInput();
};
// clear input after enter value
const resetInput = () => {
  input.value = "";
};


