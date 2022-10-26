// explore.js
/*
Requirements:

On page load, all of the available voices that you can use for your SpeechSynthesizer should be loaded and populate the “Select Voice” dropdown. (These are browser specific, so you might get different ones browser to browser).

When you click the “Press to Talk” button, the following should happen:
  The text that you have typed into the “Text to speak here” textarea should be spoken out loud using the voice that you have selected
  Only while the synthesizer is speaking, the face should swap to being open mouthed (included in the images folder)
  Note: There is no event for Start / End of the speech synthesis, so it might take something a little clever using the SpeechSynthesis properties linked above
*/

const synth = window.speechSynthesis;

window.addEventListener('DOMContentLoaded', init);

function init() {
    // element queries
    const speechImg = document.querySelector("[src='assets/images/smiling.png']");
    const speechText = document.getElementById('text-to-speak');
    const speechOptions = document.getElementById('voice-select');
    const speechBtn = document.querySelector('button');

    // event listeners
    speechBtn.addEventListener('click', handleSpeechBtnClick);

    // fetch voices
    let currentVoices = []
    synth.addEventListener("voiceschanged", () => {
        currentVoices = speechSynthesis.getVoices();

        // load voice options
        populateVoices(speechOptions, currentVoices);
    })

    function handleSpeechBtnClick(e) {
        e.preventDefault();

        speechImg.src = 'assets/images/smiling-open.png';
        speechImg.alt = 'Talking face';

        const speech = new SpeechSynthesisUtterance(speechText.value);
        const selectedOption = speechOptions.selectedOptions[0].getAttribute('data-name');

        for (let i = 0; i < currentVoices.length ; i++) {
            if (currentVoices[i].name === selectedOption)
                speech.voice = currentVoices[i];
        }
        
        synth.speak(speech);

        const interval = setInterval(function() {
            if (!synth.speaking) {
                speechImg.src = 'assets/images/smiling.png';
                speechImg.alt = 'Smiling face';
                clearInterval(interval);
            }
        }, 1000);
    }
}

function populateVoices(options, voices) {
    for (let i = 0; i < voices.length ; i++) {
        const option = document.createElement('option');
        option.textContent = `${voices[i].name} (${voices[i].lang})`;
    
        if (voices[i].default) {
            option.textContent += ' — DEFAULT';
        }
    
        option.setAttribute('data-lang', voices[i].lang);
        option.setAttribute('data-name', voices[i].name);
        options.appendChild(option);
    }
}
