const input = document.querySelector("#message-box");
const button = document.querySelector(".send-section-button");
const message_body = document.querySelector(".chat");
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
  
  socket.emit('message',msg)
 
};







  // socket reeceibing code




// append message codes
const appendMessage = (incoming_message) => {
  console.log(incoming_message);
  if (input.value !== "" || incoming_message !== "") {

    if(incoming_message){

      createMessageElement(incoming_message,"receive");
      message_body.scrollTop = message_body.scrollHeight;
      return;
    }
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
 
};
// clear input after enter value
const resetInput = () => {
  input.value = "";
};



socket.on('msg',(msg) => {
    
  appendMessage(msg);
})

