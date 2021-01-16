const sampleTxt = document.getElementById("sample").innerHTML;
const inputTxt = document.getElementById("textInput");
const resetBtn = document.getElementById("resetBtn");
const timerTxt = document.getElementById("timer");

var timer = [0,0,0,0];
var interval;
var timerRunning = false;

inputTxt.addEventListener("keypress", start, false);
inputTxt.addEventListener("keyup", spellCheck, false);
resetBtn.addEventListener("click", reset, false);

// Start the timer:
function start() {
    let textEnterdLength = inputTxt.value.length;
    if (textEnterdLength === 0 && !timerRunning) {
        timerRunning = true;
        interval = setInterval(runTimer, 10);
    }
    console.log(textEnterdLength);
}

// Run html timer:
function runTimer() {
    let currentTime = leadingZero(timer[0]) + ":" + leadingZero(timer[1]) + ":" + leadingZero(timer[2]);
    timerTxt.innerHTML = currentTime;
    timer[3]++;
    timer[0] = Math.floor((timer[3]/100)/60);
    timer[1] = Math.floor((timer[3]/100) - (timer[0] * 60));
    timer[2] = Math.floor(timer[3] - (timer[1] * 100) - (timer[0] * 6000));
}

// Add leading zero
function leadingZero(time) {
    if (time <= 9) {
        time = "0" + time;
    }
    return time;
}

// Reset everything:
function reset() {
    clearInterval(interval);
    interval = null;
    timer = [0,0,0,0];
    timerRunning = false;
    inputTxt.value = "";
    timerTxt.innerHTML = "00:00:00";
    inputTxt.style.borderColor = "#777777";
}

// Match the input with sample text
function spellCheck() {
    let textEntered = inputTxt.value;
    let originTextMatch = sampleTxt.substring(0,textEntered.length);

    if (textEntered == sampleTxt) {
        clearInterval(interval);
        inputTxt.style.borderColor = "#429890";
    } else {
        if (textEntered == originTextMatch) {
            inputTxt.style.borderColor = "#65CCf3";
        } else {
            inputTxt.style.borderColor = "#fe4a49";
        }
    }

}