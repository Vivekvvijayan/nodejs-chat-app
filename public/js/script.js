const input = document.querySelector("#message-box");
const button = document.querySelector(".send-section-button");
const message_body = document.querySelector(".chat");
const header_status = document.querySelector(".header-status");

let name;

name = prompt("Enter your name");
if (!name) {
  alert("Please enter your name");
} else {
  document.body.style.display = "block";
}

// detecct keybaord

// var socket

// window.addEventListener('load',() => {
var socket = io();

// })

input.addEventListener("input", () => {
  sendTypingStatus();
});



window.addEventListener("keydown", (e) => {
  if (input.value !== "") {
    if (e.keyCode === 13) {
      appendMessage();
      sendMessage(input.value);
      sendTypingStatus(isStoppedTyping = true);
      resetInput();
    }
  }
});

// send message after button clicked
button.addEventListener("click", () => {
  if (input.value !== "") {
    appendMessage();
    sendMessage(input.value);
    sendTypingStatus(isStoppedTyping = true);
    resetInput();
  } else {
    input.focus();
  }
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
    messageElement.classList.add("class", "send");
  } else {
    messageElement.classList.add("class", "receive");
  }
  const time = document.createElement("small");
  const user = document.createElement("p");
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
socket.on("connected", (socketID) => {
  // alert(`${socketID} Joined in chat`);
  statuselementCreateor(socketID, "Joined Chat");
});

// disconnection time
socket.on("leave", (socketID) => {
  // alert(`${socketID} Disconnected`);
  statuselementCreateor(socketID, "Left Chat");
  header_status.innerText = "online";
});

// handle isTyping incoming message
socket.on("typing", ({isTyping,name}) => {
  if (isTyping) {
  
    header_status.innerText = name+" "+"typing..."
  }else{
    header_status.innerText = "online";
  }
})



// push up when key baord open messgaes

const statuselementCreateor = (ID, method) => {
  const statusContainer = document.createElement("div");
  const status = document.createElement("div");
  const messageStatus = document.createElement("p");
  statusContainer.setAttribute("class", "join-status-container");
  status.setAttribute("class", "join-info");
  messageStatus.innerText = ID + " " + method;
  statusContainer.appendChild(status);
  status.appendChild(messageStatus);
  message_body.appendChild(statusContainer);
};

// handle ontyping status
const sendTypingStatus = (stoppedTyping) => {
 
  socket.emit("typing", {
    isTyping: stoppedTyping ? false : true,
    name: name,
  });
};
