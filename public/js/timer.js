const WORK_MIN = 25;
const BREAK_MIN = 5;
const LONG_BREAK_MIN = 30; 

const btn = document.querySelector(".timer-btn button");
const timerOutput = document.querySelector(".timer-display");
const timerStatus = document.querySelector(".timer-status");
let counter = 1;
let hasTimerStarted = false; 


const startTimer = async function() {
    if (!hasTimerStarted) {
        hasTimerStarted = true; 
        const {duration, type} = determinePeriodType(counter); 
        updateTimer(duration, type, counter); 
    }
}

const determinePeriodType = (periodCounter) => {
    if (periodCounter % 8 === 0) {
        return { duration: LONG_BREAK_MIN, type: "Break" };
    } else if (periodCounter % 2 === 0) {
        return { duration: BREAK_MIN, type: "Break" };
    } else {
        return { duration: WORK_MIN, type: "Work" };
    }
};

const updateTimer = function(minutes, status, counter) {
    let period = counter; 
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
            period += 1;
            const {duration, type} = determinePeriodType(period);
            updateTimer(duration, type, period);
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