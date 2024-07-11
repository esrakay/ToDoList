const WORK_MIN = 25;
const BREAK_MIN = 5;
const LONG_BREAK_MIN = 30; 

const btn = document.querySelector(".timer-btn button");
const timerOutput = document.querySelector(".timer-display");
const timerStatus = document.querySelector(".timer-status");
let counter = 1;


const startTimer = async function() {
    if (counter % 8 == 0) {
        updateTimer(LONG_BREAK_MIN, "Break"); 
    } else if (counter % 2 == 0) {
        updateTimer(BREAK_MIN, "Break"); 
    } else if (counter % 2 == 1) {
        updateTimer(WORK_MIN, "Work");
    }
}

const updateTimer = function(minutes, status) {
    timerStatus.innerHTML = `${status}`;
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