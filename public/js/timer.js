const WORK_MIN = 1;
const BREAK_MIN = 2;
const LONG_BREAK_MIN = 3; 

const btn = document.querySelector(".timer-btn button");
const timerOutput = document.querySelector(".timer-output");
let counter = 1;


const startTimer = async function() {
    if (counter % 8 == 0) {
        updateTimer(LONG_BREAK_MIN); 
    } else if (counter % 2 == 0) {
        updateTimer(BREAK_MIN); 
    } else if (counter % 2 == 1) {
        updateTimer(WORK_MIN);
    }
}

const updateTimer = function(minutes) {
    let time = minToSec(minutes);
    let intervalId = setInterval(()=> {
        if (time >= 0) {
            let leftMinutes = getMinutes(time);
            let leftSeconds = getSeconds(time);
            timerOutput.innerHTML = `${leftMinutes.toString().length == 1 ? "0" : ""}${leftMinutes}:${leftSeconds.toString().length == 1 ? "0" : ""}${leftSeconds}`;
            time -=1; 
        } else {
            clearInterval(intervalId);
            counter += 1;
            startTimer();
        }
    }, 1000)
}

btn.addEventListener("click", startTimer);

const minToSec = function (minutes) {
    totalSeconds = minutes * 60;
    return totalSeconds;
}

const getMinutes = function (seconds) {
    totalMinutes = Math.floor(seconds / 60);
    return totalMinutes;
}

const getSeconds = function (seconds) {
    totalSeconds = Math.floor(seconds % 60);
    return totalSeconds; 
}