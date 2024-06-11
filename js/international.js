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
        currentCity = city;
        lowercaseCity = city.toLowerCase();
        const timezone = cityToTimezoneMap[lowercaseCity];
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

// Call initializeButtonListeners when the document content has been loaded
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('showInternationalBtn').addEventListener('click', () => {
        document.getElementById('internationalModal').style.display = 'block';
    });

    document.getElementsByClassName('closeInternational')[0].onclick = () => {
        document.getElementById('internationalModal').style.display = 'none';
    };
});
