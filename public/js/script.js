const input = document.querySelector("#message-box");
const button = document.querySelector(".send-section-button");
const message_body = document.querySelector(".chat");

let name;

name = prompt("Enter your name");
if (!name) {
  alert("Please enter your name");
} else {
  document.body.style.display = "block";
}

// var socket

// window.addEventListener('load',() => {
var socket = io();

// })

window.addEventListener("keydown", (e) => {
  if (e.keyCode === 13) {
    appendMessage();
    sendMessage(input.value);
    resetInput();
  }
});

// send message after button clicked
button.addEventListener("click", () => {
  console.log(input.value);
  appendMessage();
  sendMessage(input.value);
  resetInput();
});

const sendMessage = (msg) => {
  // socekt sneding message

  socket.emit("message", {
    name: name,
    message: msg,
  });
};

// socket reeceibing code

// append message codes
const appendMessage = (incoming_message, user) => {
  console.log(incoming_message);
  if (input.value !== "" || incoming_message !== "") {
    if (incoming_message) {
      createMessageElement(incoming_message, "receive", user);
      message_body.scrollTop = message_body.scrollHeight;
      return;
    }
    createMessageElement(input.value, "sender", name);
    message_body.scrollTop = message_body.scrollHeight;
  }
};

const createMessageElement = (message, person, userName) => {
  const messageElement = document.createElement("div");
  messageElement.setAttribute("class", "message-container");

  if (person === "sender") {
    messageElement.classList.add("send", "send");
  } else {
    messageElement.classList.add("class", "receive");
  }
  const time = document.createElement("small");
  const user = document.createElement("small");
  const p = document.createElement("p");
  p.setAttribute("class", "message");
  user.setAttribute("id", "userNameStyle");
  userName === name
    ? user.setAttribute("class", "uName")
    : user.setAttribute("class", "rName");
  user.innerText = userName;
  p.innerText = message;
  time.innerText = new Date().toLocaleTimeString();
  messageElement.appendChild(p);
  messageElement.appendChild(time);
  messageElement.appendChild(user);

  message_body.appendChild(messageElement);
};
// clear input after enter value
const resetInput = () => {
  input.value = "";
};

// on message arrived time
socket.on("msg", ({ name, message }) => {
  appendMessage(message, name);
});


// connected time
socket.on('connected',(socketID) => {
  alert(`${socketID} Joined in chat`)
})

// disconnection time
socket.on('leave',(socketID) => {
  alert(`${socketID} Disconnected`)
})