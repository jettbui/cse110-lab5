// expose.js

window.addEventListener('DOMContentLoaded', init);

function init() {
    // element queries
    const hornInput = document.getElementById('horn-select');
    const hornImg = document.querySelector("[src='assets/images/no-image.png']")
    const volumeInput = document.querySelector("[type='range']");
    const volumeImg = document.querySelector("[src='assets/icons/volume-level-2.svg']");
    const playBtn = document.querySelector('button');
    const audioElement = document.querySelector('audio');

    // initialize variables
    let currentHorn = '';
    let currentVolume = parseInt(volumeInput.value);
    const jsConfetti = new JSConfetti();

    // event listeners
    hornInput.addEventListener('change', handleHornInputChange);
    volumeInput.addEventListener('input', handleVolumeInputChange);
    playBtn.addEventListener('click', handlePlayBtnClick);

    // event handlers
    function handleHornInputChange(e) {
        const value = e.target.value;
    
        if (value === 'air-horn') {
            hornImg.src = 'assets/images/air-horn.svg';
            hornImg.alt = 'Air horn';
            audioElement.src = 'assets/audio/air-horn.mp3';
        } else if (value === 'car-horn') {
            hornImg.src = 'assets/images/car-horn.svg';
            hornImg.alt = 'Car horn';
            audioElement.src = 'assets/audio/car-horn.mp3';
        } else if (value === 'party-horn') {
            hornImg.src = 'assets/images/party-horn.svg';
            hornImg.alt = 'Party horn';
            audioElement.src = 'assets/audio/party-horn.mp3';
        } else {
            hornImg.src = 'assets/images/no-image.png';
            hornImg.alt = 'No image selected';
            audioElement.src = '';
        }
    
        currentHorn = value;
    }
    
    function handleVolumeInputChange(e) {
        const value = parseInt(e.target.value);
    
        if (value <= 0) {
            volumeImg.src = 'assets/icons/volume-level-0.svg';
            volumeImg.alt = 'Volume level 0';
        } else if (value < 33) {
            volumeImg.src = 'assets/icons/volume-level-1.svg';
            volumeImg.alt = 'Volume level 1';
        } else if (value < 67) {
            volumeImg.src = 'assets/icons/volume-level-2.svg';
            volumeImg.alt = 'Volume level 2';
        } else {
            volumeImg.src = 'assets/icons/volume-level-3.svg';
            volumeImg.alt = 'Volume level 3';
        }
    
        currentVolume = value;
        audioElement.volume = value / 100;
    }

    function handlePlayBtnClick() {
        audioElement.play();

        if (currentHorn === 'party-horn') {
            // TODO: confetti if party-horn
            jsConfetti.addConfetti();
        }
    }
}
