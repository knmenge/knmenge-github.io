document.addEventListener('DOMContentLoaded', () => {
    const setTimerBtn = document.getElementById('setTimerBtn');
    const timerModal = document.getElementById('timerModal');
    const closeTimerSpan = document.getElementsByClassName('closeTimer')[0];
    const startTimerBtn = document.getElementById('startTimerBtn');
    const timerInfoBar = document.getElementById('timerInfoBar');
    const timerTimeDisplay = document.getElementById('timerTimeDisplay');
    
    // Create an audio object for the timer sound
    const timerSound = new Audio('./img_aud_txt_files/alarm.wav');

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
    };

    startTimerBtn.onclick = function () {
        getTimerInfo();
    };

    function getTimerInfo() {
        const timerHours = parseInt(document.getElementById('timerHours').value, 10);
        const timerMinutes = parseInt(document.getElementById('timerMinutes').value, 10);
        const timerSeconds = parseInt(document.getElementById('timerSeconds').value, 10);
        timerInfoBar.style.display = 'block';
        timerTimeDisplay.textContent = timerHours.toString().padStart(2, '0') + ":" + timerMinutes.toString().padStart(2, '0') + ":" + timerSeconds.toString().padStart(2, '0');
        startTimer(timerHours, timerMinutes, timerSeconds);
    }

    function startTimer(hours, minutes, seconds) {
        const timerEndTime = new Date(new Date().getTime() + hours * 3600000 + minutes * 60000 + seconds * 1000);
        
        function updateDisplay() {
            const currentTime = new Date();
            const timeLeft = timerEndTime - currentTime;

            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                showTimerPopup();
                timerTimeDisplay.textContent = '00:00:00';
                return;
            }

            const hoursLeft = Math.floor(timeLeft / (1000 * 60 * 60));
            const minutesLeft = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
            const secondsLeft = Math.floor((timeLeft % (1000 * 60)) / 1000);

            timerTimeDisplay.textContent = hoursLeft.toString().padStart(2, '0') + ":" + minutesLeft.toString().padStart(2, '0') + ":" + secondsLeft.toString().padStart(2, '0');
        }

        updateDisplay(); // Initial display update
        const timerInterval = setInterval(updateDisplay, 1000); // Subsequent updates every second
    }

    function showTimerPopup() {
        const timerPopup = document.createElement('div');
        timerPopup.style.position = 'fixed';
        timerPopup.style.top = '50%';
        timerPopup.style.left = '50%';
        timerPopup.style.transform = 'translate(-50%, -50%)';
        timerPopup.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
        timerPopup.style.color = 'white';
        timerPopup.style.padding = '20px';
        timerPopup.style.borderRadius = '8px';
        timerPopup.style.zIndex = '1000';
        timerPopup.innerText = 'Timer is up!';

        document.body.appendChild(timerPopup);

        // Play the timer sound
        timerSound.play();

        setTimeout(() => {
            document.body.removeChild(timerPopup);
        }, 5000);
    }
});

