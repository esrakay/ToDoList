const WORK_MIN = 1;

const btn = document.querySelector(".timer-btn button");
const timerOutput = document.querySelector(".timer-output");


const startTimer = async function() {
    let time = minToSec(WORK_MIN);
    let intervalId = setInterval(()=> {
        if (time >= 0) {
            let leftMinutes = getMinutes(time);
            let leftSeconds = getSeconds(time);
            timerOutput.innerHTML = `${leftMinutes.toString().length == 1 ? "0" : ""}${leftMinutes}:${leftSeconds.toString().length == 1 ? "0" : ""}${leftSeconds}`;
            time -=1; 
        } else {
            console.log("finisehed")
            clearInterval(intervalId);
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