document.addEventListener('DOMContentLoaded', () => {
    const timerModal = document.getElementById('timerModal');
    const setTimerBtn = document.getElementById('setTimerBtn');
    const closeTimerSpan = document.getElementsByClassName('closeTimer')[0];
    const startTimerBtn = document.getElementById('startTimerBtn');
    const displayArea = document.getElementById('displayArea');
    const timerSound = new Audio('./img_aud_txt_files/alarm.wav'); // Adjust the path if necessary

    function populateTimeDropdowns() {
        const timerHoursDropdown = document.getElementById('timerHours');
        const timerMinutesDropdown = document.getElementById('timerMinutes');
        const timerSecondsDropdown = document.getElementById('timerSeconds');

        populateDropdown(timerHoursDropdown, 24);
        populateDropdown(timerMinutesDropdown, 60);
        populateDropdown(timerSecondsDropdown, 60);
    }

    function populateDropdown(dropdown, max) {
        if (!dropdown) return;
        dropdown.innerHTML = '';
        for (let i = 0; i < max; i++) {
            let option = document.createElement('option');
            option.value = i;
            option.textContent = i.toString().padStart(2, '0');
            dropdown.appendChild(option);
        }
    }

    setTimerBtn.onclick = function () {
        populateTimeDropdowns();
        timerModal.style.display = "block";
    };

    closeTimerSpan.onclick = function () {
        timerModal.style.display = "none";
        resetTimerDisplay();
    };

    startTimerBtn.onclick = function () {
        getTimerInfo();
    };

    function getTimerInfo() {
        const timerHours = parseInt(document.getElementById('timerHours').value, 10);
        const timerMinutes = parseInt(document.getElementById('timerMinutes').value, 10);
        const timerSeconds = parseInt(document.getElementById('timerSeconds').value, 10);
        displayArea.textContent = `You have set a timer for ${timerHours} Hours, ${timerMinutes} Minutes, ${timerSeconds} Seconds. The countdown will begin below!`;
        startTimer(timerHours, timerMinutes, timerSeconds);
    }

    function startTimer(hours, minutes, seconds) {
        let totalSeconds = hours * 3600 + minutes * 60 + seconds;
        const countdown = setInterval(() => {
            if (totalSeconds <= 0) {
                clearInterval(countdown);
                showTimerEndPopup();
                timerSound.play();
            } else {
                totalSeconds--;
                updateTimerDisplay(totalSeconds);
            }
        }, 1000);
    }

    function updateTimerDisplay(totalSeconds) {
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;

        const timeString = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        const timerDisplay = document.getElementById('timerDisplay');
        if (timerDisplay) {
            timerDisplay.textContent = `Time remaining: ${timeString}`;
        }
    }

    function resetTimerDisplay() {
        document.getElementById("box1").textContent = " ";
        document.getElementById("box2").textContent = " ";
        document.getElementById("box3").textContent = " ";
        document.getElementById("box4").textContent = " ";
        document.getElementById("box5").textContent = " ";
        document.getElementById("box6").textContent = " ";
        displayArea.textContent = "";
        const timerDisplay = document.getElementById('timerDisplay');
        if (timerDisplay) {
            timerDisplay.textContent = '';
        }
    }

    function showTimerEndPopup() {
        const timerEndPopup = document.createElement('div');
        timerEndPopup.id = 'timerEndPopup';
        timerEndPopup.style.position = 'fixed';
        timerEndPopup.style.top = '50%';
        timerEndPopup.style.left = '50%';
        timerEndPopup.style.transform = 'translate(-50%, -50%)';
        timerEndPopup.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
        timerEndPopup.style.color = 'white';
        timerEndPopup.style.padding = '20px';
        timerEndPopup.style.borderRadius = '8px';
        timerEndPopup.style.zIndex = '1000';
        timerEndPopup.innerText = 'Timer is up!';

        document.body.appendChild(timerEndPopup);

        setTimeout(() => {
            document.body.removeChild(timerEndPopup);
        }, 5000);
    }
});
