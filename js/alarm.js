document.addEventListener('DOMContentLoaded', () => {
    const setAlarmBtn = document.getElementById('setAlarmBtn');
    const alarmModal = document.getElementById('alarmModal');
    const closeAlarmSpan = document.getElementsByClassName('closeAlarm')[0];
    const startAlarmBtn = document.getElementById('startAlarmBtn');
    const alarmInfoBar = document.getElementById('alarmInfoBar');
    const alarmTimeDisplay = document.getElementById('alarmTimeDisplay');
    
    // Create an audio object for the alarm sound
    const alarmSound = new Audio('./img_aud_txt_files/alarm.wav');

    function populateTimeDropdowns() {
        const alarmHoursDropdown = document.getElementById('alarmHours');
        const alarmMinutesDropdown = document.getElementById('alarmMinutes');
        populateDropdown(alarmHoursDropdown, 24);
        populateDropdown(alarmMinutesDropdown, 60);
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

    setAlarmBtn.onclick = function () {
        populateTimeDropdowns();
        alarmModal.style.display = "block";
    };

    closeAlarmSpan.onclick = function () {
        alarmModal.style.display = "none";
    };

    startAlarmBtn.onclick = function () {
        setAlarm();
    };

    function setAlarm() {
        const alarmHours = parseInt(document.getElementById('alarmHours').value, 10);
        const alarmMinutes = parseInt(document.getElementById('alarmMinutes').value, 10);
        const now = new Date();
        const alarmTime = new Date();
        alarmTime.setHours(alarmHours);
        alarmTime.setMinutes(alarmMinutes);
        alarmTime.setSeconds(0);

        // If the alarm time is before the current time, set it for the next day
        if (alarmTime <= now) {
            alarmTime.setDate(alarmTime.getDate() + 1);
        }

        alarmInfoBar.style.display = 'block';
        alarmTimeDisplay.textContent = `Alarm set for ${alarmTime.toLocaleTimeString()}`;

        // Check every second if the current time matches the alarm time
        const alarmInterval = setInterval(() => {
            const currentTime = new Date();
            if (currentTime >= alarmTime) {
                clearInterval(alarmInterval);
                triggerAlarm();
            }
        }, 1000);
    }

    function triggerAlarm() {
        const alarmPopup = document.createElement('div');
        alarmPopup.style.position = 'fixed';
        alarmPopup.style.top = '50%';
        alarmPopup.style.left = '50%';
        alarmPopup.style.transform = 'translate(-50%, -50%)';
        alarmPopup.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
        alarmPopup.style.color = 'white';
        alarmPopup.style.padding = '20px';
        alarmPopup.style.borderRadius = '8px';
        alarmPopup.style.zIndex = '1000';
        alarmPopup.innerText = 'Alarm is ringing!';

        document.body.appendChild(alarmPopup);

        // Play the alarm sound
        alarmSound.play();

        setTimeout(() => {
            document.body.removeChild(alarmPopup);
        }, 5000);
    }
});

