let soundID = "Ambiance";
let instance = null;
let muted = false;

const playBtn = document.getElementById('play');
const stopBtn = document.getElementById('stop');
const muteBtn = document.getElementById('mute');

const logEl = document.getElementById('log');

playBtn.addEventListener('click', playSound);
stopBtn.addEventListener('click', stopSound);
muteBtn.addEventListener('click', muteSounds);

function loadSound () {
    createjs.Sound.registerSound("sounds/Ambiance.mp3", soundID);

    setTimeout(()=>{
        instance = createjs.Sound.play(soundID, createjs.Sound.INTERRUPT_NONE);
        instance.pause();
    }, 2000)


}

function playSound () {
    setTimeout(()=>{
        instance.resume();
    }, 10)

}

function stopSound() {
    instance && instance.pause();
}


function muteSounds() {
    muted = !muted;

    createjs.Sound.setMute(muted);

    muteBtn.innerText = muted ? 'Un Mute' : 'Mute'
}


function logHTML(text) {
    const span = document.createElement('span');
    span.innerText = text
    logEl.appendChild(span);
}


window.logHTML = logHTML;

loadSound();
