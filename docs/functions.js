'use strict';

const recognition = new(window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition)();
recognition.lang = 'en-US';
recognition.interimResults = false;
recognition.maxAlternatives = 5;

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
      if (data.fulfillmentMessages[0].card) {
        buildCard(data.fulfillmentMessages[0].card);
      }
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

function startListening(input) {
  document.querySelector('body').className = document.querySelector('body').className + ' listening';
    recognition.start();
    recognition.onresult = function(event) {
      userInputs(event.results[0][0].transcript);
      stopListening();
    };
}
function stopListening() {
    recognition.stop();
    document.querySelector('body').className = document.querySelector('body').className.replace(/\slistening/gi, '');
}

function botToggleMute() {
  mute = !mute;
}

function buildCard(input) {
    let bubble = document.createElement('div'),
      container = document.querySelector('.chat-container');
    bubble.innerHTML = `<h2>${input.title}</h2><p>${input.subtitle}</p>`;
    bubble.classList = `card bot-said`;
    container.appendChild(bubble);
}
