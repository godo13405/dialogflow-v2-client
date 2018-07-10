'use strict';

let mute = false;

function userInputs(input) {
  console.log('User asked: ', input);
  speechBubble(input, 'user');
  document.querySelector('.user-input').value = '';
  fetch('bridge?input=' + input, {
    method: 'get'
  }).then(response => {
    response.json().then(data => {
      speechBubble(data.fulfillmentText, 'bot');
      if (!mute) {say(data.fulfillmentText)};
    });

  }).catch(err => {
    console.log(err);
  });
}

function speechBubble(input, speaker) {
  let bubble = document.createElement('div'),
    container = document.querySelector('.chat-container');
  bubble.innerHTML = input;
  bubble.classList = `speech-bubble ${speaker}-said`;
  container.appendChild(bubble);
}

function say(input) {
  let synth = window.speechSynthesis;
  let utterThis = new SpeechSynthesisUtterance(input);
  synth.speak(utterThis);
}

function listen(input) {
  let recognition = new(window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition)();
  recognition.lang = 'en-US';
  recognition.interimResults = false;
  recognition.maxAlternatives = 5;
  recognition.start();

  recognition.onresult = function(event) {
    userInputs(event.results[0][0].transcript);
  };
}

function startListening(input) {
  listen(input);
}

function botToggleMute() {
  mute = !mute;
}
