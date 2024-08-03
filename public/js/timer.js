const WORK_MIN = 25;
const BREAK_MIN = 5;
const LONG_BREAK_MIN = 30; 

const timerBtn = document.querySelector(".timer-btn button");
const timerDisplay = document.querySelector(".timer-display");
const timerStatus = document.querySelector(".timer-status");

let counter = 1;
let hasTimerStarted = false; 
let intervalId = null; 

const startTimer = async function() {
    if (!hasTimerStarted) {
        hasTimerStarted = true; 
        const {duration, type} = determinePeriodType(counter); 
        updateTimer(duration, type); 
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

const updateTimerDisplay = function(minutes, seconds) {
    const formattedMinutes = minutes.toString().padStart(2, "0");
    const formattedSeconds = seconds.toString().padStart(2, "0"); 
    timerDisplay.innerHTML = `${formattedMinutes}:${formattedSeconds}`;
}

const updateTimer = function(duration, type) {
    timerStatus.innerHTML = `${type}`;
    let time = minToSec(duration);

    intervalId = setInterval(()=> {
        if (time >= 0) {
            let minutes = getMinutes(time);
            let seconds = getSeconds(time);
            updateTimerDisplay(minutes, seconds); 
            time -=1; 
        } else {
            clearInterval(intervalId);
            counter += 1;
            const {duration, type} = determinePeriodType(counter);
            updateTimer(duration, type);
        }
    }, 1000)
}

const minToSec = (minutes) => minutes * 60; 

const getMinutes = (seconds) => Math.floor(seconds / 60);

const getSeconds = (seconds) => Math.floor(seconds % 60);

timerBtn.addEventListener("click", startTimer);