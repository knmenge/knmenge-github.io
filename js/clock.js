function updateTime() {
    const now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();

    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;

    const timeString = hours + ':' + minutes + ':' + seconds;

    document.getElementById('clockDisplay').textContent = timeString;
}

setInterval(updateTime, 1000);

// Call initializeButtonListeners when the document content has been loaded
document.addEventListener('DOMContentLoaded', () => {
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
});
