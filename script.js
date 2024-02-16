function populateTimeDropdowns() {
    // Timer Dropdowns
    const timerHoursDropdown = document.getElementById('timerHours');
    const timerMinutesDropdown = document.getElementById('timerMinutes');
    const timerSecondsDropdown = document.getElementById('timerSeconds');
    // Alarm Dropdowns
    const alarmHoursDropdown = document.getElementById('alarmHours');
    const alarmMinutesDropdown = document.getElementById('alarmMinutes');

    populateDropdown(timerHoursDropdown, 24);
    populateDropdown(timerMinutesDropdown, 60);
    populateDropdown(alarmHoursDropdown, 24);
    populateDropdown(alarmMinutesDropdown, 60);
    populateDropdown(timerSecondsDropdown, 60);
}

function populateDropdown(dropdown, max) {
    if (!dropdown) return; // Skip if dropdown doesn't exist
    dropdown.innerHTML = ''; // Clear existing options
    for (let i = 0; i < max; i++) {
        let option = document.createElement('option');
        option.value = i;
        option.textContent = i.toString().padStart(2, '0');
        dropdown.appendChild(option);
    }
}


function getTimerInfo(){

    var timerSeconds = parseInt(document.getElementById('timerSeconds').value, 10);
    var timerMinutes = parseInt(document.getElementById('timerMinutes').value, 10);
    var timerHours = parseInt(document.getElementById('timerHours').value, 10);
    document.getElementById("displayArea").textContent = "you have set a timer for " + timerHours + " Hours, " + timerMinutes + " Minutes, " + timerSeconds + " Seconds. The countdown will begin below!";

    startTimer(timerHours, timerMinutes, timerSeconds);

}
function startTimer(hours, minutes, seconds ){
    
    //this function is correctly called when the start timer button is pressed
    
    
    document.getElementById("box1").textContent = Math.floor(hours/10);
    document.getElementById("box2").textContent = Math.floor(hours - (Math.floor(hours/10) * 10));

    document.getElementById("box3").textContent = Math.floor(minutes/10);
    document.getElementById("box4").textContent = Math.floor(minutes - (Math.floor(minutes/10) * 10));

    document.getElementById("box5").textContent = Math.floor(seconds/10);
    document.getElementById("box6").textContent = Math.floor(seconds - (Math.floor(seconds/10) * 10));

    if ((hours == 0) && (minutes==0) &&(seconds == 0)){
        //timer is over
    }else if (seconds > 0){
        seconds = seconds - 1;
        setTimeout(function(){ startTimer(hours, minutes, seconds);
        }, 1000);
    }else if (minutes > 0){
        minutes = minutes - 1;
        seconds = 59;
        setTimeout(function(){ startTimer(hours, minutes, seconds);
        }, 1000);    } else if (hours > 0){
        hours = hours - 2;
        minutes = 59;
        seconds = 59;
        setTimeout(function(){ startTimer(hours, minutes, seconds);
        }, 1000);    } 

    

    //convert it all to seconds

    


}


// Function to handle setting an alarm
function setAlarm() {
    console.log("Setting an alarm...");
    // Placeholder for setting an alarm functionality
    // You might later replace this with actual code to set an alarm
}


// Get the modal
var alarmModal = document.getElementById('alarmModal');

// Get the button that opens the modal
var setAlarmBtn = document.getElementById('setAlarmBtn');

// Get the <span> element that closes the modal
var closeAlarmSpan = document.getElementsByClassName('closeAlarm')[0];

// When the user clicks the button, open the modal
setAlarmBtn.onclick = function() {
    populateTimeDropdowns();
    alarmModal.style.display = "block";

}
closeAlarmSpan.onclick = function() {
    alarmModal.style.display = "none";
}


// Function to handle setting a timer
function setTimer() {
    console.log("Setting a timer...");
    // Placeholder for setting a timer functionality
    // This could involve showing an input for the user to specify the timer duration
}
var timerModal = document.getElementById('timerModal');

// Get the button that opens the modal
var setTimerBtn = document.getElementById('setTimerBtn');

// Get the <span> element that closes the modal
var closeTimerSpan = document.getElementsByClassName('closeTimer')[0];

setTimerBtn.onclick = function() {
    populateTimeDropdowns();
    timerModal.style.display = "block";

}

closeTimerSpan.onclick = function() {
    timerModal.style.display = "none";
   
}



// Function to handle showing the current time clock
function showClock() {
    console.log("Showing the clock...");
    // Placeholder for showing the current time clock functionality
    // You could display the current time or implement additional features like choosing time zones
}
var clockModal = document.getElementById('clockModal');

// Get the button that opens the modal
var showClockBtn = document.getElementById('showClockBtn');

// Get the <span> element that closes the modal
var closeClockSpan = document.getElementsByClassName('closeClock')[0];

showClockBtn.onclick = function() {
    clockModal.style.display = "block";

}

closeClockSpan.onclick = function(){
    clockModal.style.display = "none";
}

function showInternational() {
    console.log("Showing the international...");
    // Placeholder for showing the current time clock functionality
    // You could display the current time or implement additional features like choosing time zones
}

var internationalModal = document.getElementById('internationalModal');

// Get the button that opens the modal
var showInternationalBtn = document.getElementById('showInternationalBtn');

// Get the <span> element that closes the modal
var closeInternationalSpan = document.getElementsByClassName('closeInternational')[0];

showInternationalBtn.onclick = function() {
    internationalModal.style.display = "block";
    
}

closeInternationalSpan.onclick = function() {
    internationalModal.style.display = "none";
}

// When the user clicks on <span> (x), close the modal


// When the user clicks anywhere outside of the modal, close it
// window.onclick = function(event) {
//     if (event.target == alarmModal) {
//         alarmModal.style.display = "none";
//     } else if (event.target == timerModal){
//         timerModal.style.display = "none";
//     } else if (event.target == clockModal){
//         clockModal.style.display = "none";
//     } else if (event.target == internationalModal){
//         internationalModal.style.display = "none";
//     }
// }

// Function to initialize event listeners for the buttons
function initializeButtonListeners() {
    document.getElementById('setAlarmBtn').addEventListener('click', setAlarm);
    document.getElementById('setTimerBtn').addEventListener('click', setTimer);
    document.getElementById('showClockBtn').addEventListener('click', showClock);
    document.getElementById('showInternationalBtn').addEventListener('click', showInternational);
    document.getElementById('startTimerBtn').addEventListener('click', getTimerInfo);
}



// Call initializeButtonListeners when the document content has been loaded
document.addEventListener('DOMContentLoaded', initializeButtonListeners);