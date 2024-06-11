document.addEventListener('DOMContentLoaded', () => {
    const alarmModal = document.getElementById('alarmModal');
    const setAlarmBtn = document.getElementById('setAlarmBtn');
    const closeAlarmSpan = document.getElementsByClassName('closeAlarm')[0];
    const startAlarmBtn = document.getElementById('startAlarmBtn');
    const alarmInfoBar = document.getElementById('alarmInfoBar');
    const alarmTimeDisplay = document.getElementById('alarmTimeDisplay');
    const alarmSound = new Audio('./img_aud_txt_files/alarm.wav'); // Adjust the path if necessary

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

    function setAlarm() {
        console.log("Setting an alarm...");
    }

    setAlarmBtn.onclick = function () {
        populateTimeDropdowns();
        alarmModal.style.display = "block";
    };

    closeAlarmSpan.onclick = function () {
        alarmModal.style.display = "none";
    };

    startAlarmBtn.onclick = function () {
        getAlarmInfo();
    };

    function getAlarmInfo() {
        const alarmHours = parseInt(document.getElementById('alarmHours').value, 10);
        const alarmMinutes = parseInt(document.getElementById('alarmMinutes').value, 10);
        alarmInfoBar.style.display = 'block';
        alarmTimeDisplay.textContent = alarmHours.toString().padStart(2, '0') + ":" + alarmMinutes.toString().padStart(2, '0') + " o'clock";
        startAlarm(alarmHours, alarmMinutes);
    }

    function startAlarm(hours, minutes) {
        const now = new Date();
        const alarmTime = new Date();
        alarmTime.setHours(hours);
        alarmTime.setMinutes(minutes);
        alarmTime.setSeconds(0);
        
        const timeToAlarm = alarmTime.getTime() - now.getTime();
        
        if (timeToAlarm > 0) {
            setTimeout(() => {
                showAlarmPopup();
                alarmSound.play();
            }, timeToAlarm);
        }
    }

    function showAlarmPopup() {
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

        setTimeout(() => {
            document.body.removeChild(alarmPopup);
        }, 5000);
    }
});
