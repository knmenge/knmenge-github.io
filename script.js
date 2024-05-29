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




// Function to handle setting an alarm
function setAlarm() {
    console.log("Setting an alarm...");
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

function getAlarmInfo(){
    var alarmHours = parseInt(document.getElementById('alarmHours').value, 10);
    var alarmMinutes = parseInt(document.getElementById('alarmMinutes').value, 10);
    document.getElementById('alarmInfoBar').style.display = 'block';
    if (alarmMinutes < 10){
        document.getElementById("alarmTimeDisplay").textContent = alarmHours + ":0" + alarmMinutes + " o'clock";
    } else {
        document.getElementById("alarmTimeDisplay").textContent = alarmHours + ":" + alarmMinutes + " o'clock";

    }


    startAlarm(alarmHours, alarmMinutes);
}

function startAlarm(hours, minutes){

    


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
    document.getElementById("box1").textContent = " ";
    document.getElementById("box2").textContent = " ";

    document.getElementById("box3").textContent = " ";
    document.getElementById("box4").textContent = " ";

    document.getElementById("box5").textContent = " ";
    document.getElementById("box6").textContent = " ";

    document.getElementById("displayArea").textContent = "";

    timerModal.style.display = "none";
   
}

function getTimerInfo(){

    var timerSeconds = parseInt(document.getElementById('timerSeconds').value, 10);
    var timerMinutes = parseInt(document.getElementById('timerMinutes').value, 10);
    var timerHours = parseInt(document.getElementById('timerHours').value, 10);
    document.getElementById("displayArea").textContent = "you have set a timer for " + timerHours + " Hours, " + timerMinutes + " Minutes, " + timerSeconds + " Seconds. The countdown will begin below!";

    startTimer(timerHours, timerMinutes, timerSeconds);

}
function startTimer(hours, minutes, seconds ){
        
    
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



// Function to handle showing the current time clock
function showClock() {
    console.log("Showing the clock...");
    // Placeholder for showing the current time clock functionality
    // You could display the current time or implement additional features like choosing time zones
}

function updateTime() {
    const now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();

    hours = hours<10 ? '0' + hours:hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;

    const timeString = hours + ':' + minutes + ':' + seconds;

    document.getElementById('clockDisplay').textContent = timeString;

}

setInterval(updateTime, 1000);

const cityToTimezoneMap = {
    "new york": "America/New_York",
    "philadelphia": "America/New_York",
    "miami": "America/New_York",
    "boston": "America/New_York",
    "atlanta": "America/New_York",
    "charlotte": "America/New_York",
    "washington d.c.": "America/New_York",
    "orlando": "America/New_York",
    "chicago": "America/Chicago",
    "houston": "America/Chicago",
    "dallas": "America/Chicago",
    "madison": "America/Chicago",
    "san antonio": "America/Chicago",
    "austin": "America/Chicago",
    "nashville": "America/Chicago",
    "new orleans": "America/Chicago",
    "los angeles": "America/Los_Angeles",
    "san francisco": "America/Los_Angeles",
    "san diego": "America/Los_Angeles",
    "las vegas": "America/Los_Angeles",
    "denver": "America/Denver",
    "salt lake city": "America/Denver",
    "phoenix": "America/Phoenix",
    "detroit": "America/Detroit",
    "indianapolis": "America/Indiana/Indianapolis",
    "seattle": "America/Los_Angeles",
    "portland": "America/Los_Angeles",
    "london": "Europe/London",
    "tokyo": "Asia/Tokyo",
    "sydney": "Australia/Sydney",
    "paris": "Europe/Paris",
    "beijing": "Asia/Shanghai",
    "dubai": "Asia/Dubai",
    "singapore": "Asia/Singapore",
    "hong kong": "Asia/Hong_Kong",
    "berlin": "Europe/Berlin",
    "rome": "Europe/Rome",
    "são paulo": "America/Sao_Paulo",
    "mexico city": "America/Mexico_City",
    "mumbai": "Asia/Kolkata",
    "jakarta": "Asia/Jakarta",
    "istanbul": "Europe/Istanbul",
    "buenos aires": "America/Argentina/Buenos_Aires",
    "cairo": "Africa/Cairo",
    "bangkok": "Asia/Bangkok",
    "seoul": "Asia/Seoul",
    "johannesburg": "Africa/Johannesburg",
    "madrid": "Europe/Madrid",
    "lagos": "Africa/Lagos",
    "riyadh": "Asia/Riyadh",
    "tehran": "Asia/Tehran",
    "karachi": "Asia/Karachi"
};

function displayCityTime() {
    const city = document.getElementById('cityName').value.trim();
    if (city !== '') {
        currentCity = city
        lowercaseCity = city.toLowerCase();
        const timezone = cityToTimezoneMap[city];
        if (timezone) {
            getInternationalTime(timezone, lowercaseCity);
        } else {
            alert('City not found. Please enter a valid city name.');
        }
    } else {
        alert('Please enter a city name.');
    }
}

function getInternationalTime(timezone, city) {
    fetch(`https://worldtimeapi.org/api/timezone/${timezone}`)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        console.log(data.datetime);  // Log the entire response for debugging
        const dateTime = new Date(data.datetime);
        const options = {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            timeZone: timezone
        };
        const timeString = new Intl.DateTimeFormat('en-GB', options).format(dateTime);
        const timeDisplay = document.getElementById('timeDisplay');
        if (timeDisplay) {
            timeDisplay.textContent = `Local time in ${currentCity}: ${timeString}`;
        } else {
            console.error('Element with id "timeDisplay" not found');
        }
    })
    .catch(error => {
        console.error('Error fetching time:', error);
        document.getElementById('timeDisplay').textContent = 'Invalid timezone or error fetching time.';
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const internationalModal = document.getElementById('internationalModal');
    const showInternationalBtn = document.getElementById('showInternationalBtn');
    const closeInternationalSpan = document.getElementsByClassName('closeInternational')[0];

    showInternationalBtn.onclick = () => {
        internationalModal.style.display = 'block';
    };

    closeInternationalSpan.onclick = () => {
        internationalModal.style.display = 'none';
    };
});

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
    document.getElementById('startAlarmBtn').addEventListener('click', getAlarmInfo)
}



// Call initializeButtonListeners when the document content has been loaded
document.addEventListener('DOMContentLoaded', initializeButtonListeners);

document.addEventListener('DOMContentLoaded', () => {
    const checkLanguageBtn = document.getElementById('checkLanguageBtn');
    const resultDiv = document.getElementById('result');

    checkLanguageBtn.addEventListener('click', () => {
        const inputText = document.getElementById('inputText').value;
        
        console.log('Input Text:', inputText); // Log the input text to verify it

        fetch('http://127.0.0.1:5000/check_language', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ text: inputText })
        })
        .then(response => {
            console.log('Response:', response); // Log the response object
            return response.json();
        })
        .then(data => {
            console.log('Response Data:', data); // Log the response data
            resultDiv.innerHTML = `English Probability: ${(data.english * 100).toFixed(2)}%<br>
                                   Spanish Probability: ${(data.spanish * 100).toFixed(2)}%`;
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });
});

//beginning of code for the flappy birt project

document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('flappyBirdCanvas');
    const ctx = canvas.getContext('2d');

    const bird = {
        x: 50,
        y: 150,
        width: 20,
        height: 20,
        gravity: 0.3,
        lift: -5,
        velocity: 0
    };

    let pipes = [];
    const pipeWidth = 20;
    const pipeGap = 100;
    let frame = 0;
    let animationFrameId;
    let score = 0;
    let gameStarted = false;

    const backgroundImage = new Image();
    backgroundImage.src = 'IMG_background.jpg'; // Add your image path here

    function drawBackground() {
        ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
    }

    function drawBird() {
        ctx.fillStyle = 'yellow';
        ctx.fillRect(bird.x, bird.y, bird.width, bird.height);
    }

    function drawPipes() {
        ctx.fillStyle = 'green';
        pipes.forEach(pipe => {
            ctx.fillRect(pipe.x, 0, pipeWidth, pipe.top);
            ctx.fillRect(pipe.x, canvas.height - pipe.bottom, pipeWidth, pipe.bottom);
        });
    }

    function updatePipes() {
        if (frame % 90 === 0) {
            const pipeHeight = Math.floor(Math.random() * (canvas.height - pipeGap));
            pipes.push({
                x: canvas.width,
                top: pipeHeight,
                bottom: canvas.height - pipeHeight - pipeGap,
                passed: false // Add this property to check if bird passed the pipe
            });
        }

        pipes.forEach(pipe => {
            pipe.x -= 2;
        });

        pipes = pipes.filter(pipe => pipe.x + pipeWidth > 0);
    }

    function updateBird() {
        bird.velocity += bird.gravity;
        bird.y += bird.velocity;

        if (bird.y + bird.height > canvas.height) {
            bird.y = canvas.height - bird.height;
            bird.velocity = 0;
        }

        if (bird.y < 0) {
            bird.y = 0;
            bird.velocity = 0;
        }
    }

    function checkCollision() {
        for (const pipe of pipes) {
            if (
                bird.x < pipe.x + pipeWidth &&
                bird.x + bird.width > pipe.x &&
                (bird.y < pipe.top || bird.y + bird.height > canvas.height - pipe.bottom)
            ) {
                cancelAnimationFrame(animationFrameId);
                document.getElementById('gameOverModal').style.display = 'block';
                document.getElementById('finalScore').textContent = score; // Update this line
                return true;
            }
        }
        return false;
    }

    function updateScore() {
        pipes.forEach(pipe => {
            if (!pipe.passed && pipe.x + pipeWidth < bird.x) {
                score++;
                pipe.passed = true; // Mark this pipe as passed
            }
        });
        document.getElementById('score').textContent = `Score: ${score}`;
    }

    function resetGame() {
        bird.y = 150;
        bird.velocity = 0;
        pipes = [];
        frame = 0;
        score = 0;
        document.getElementById('score').textContent = `Score: ${score}`;
        if (animationFrameId) {
            cancelAnimationFrame(animationFrameId);
        }
        drawBackground(); // Draw the background when the game resets
    }

    function gameLoop() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawBackground();
        drawBird();
        drawPipes();
        updateBird();
        updatePipes();
        if (!checkCollision()) {
            updateScore();
            frame++;
            animationFrameId = requestAnimationFrame(gameLoop);
        } else {
            gameStarted = false;
            document.getElementById('gameOverModal').style.display = 'block';
        }
    }

    function startGame() {
        resetGame();
        gameStarted = true;
        document.getElementById('startGameBtn').style.display = 'none';
        document.getElementById('gameOverModal').style.display = 'none';
        gameLoop();
    }

    // Event listeners
    document.getElementById('startGameBtn').addEventListener('click', startGame);
    document.getElementById('restartGameOverBtn').addEventListener('click', startGame);

    canvas.addEventListener('click', () => {
        bird.velocity = bird.lift;
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === 'Space' && gameStarted) {
            bird.velocity = bird.lift;
        }
    });

    // Draw the background initially
    backgroundImage.onload = () => {
        drawBackground();
    };
});
