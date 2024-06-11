const apiUrl = 'https://portfolio-backend-b61s.onrender.com/check_language';


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
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Response Data:', data); // Log the response data
            resultDiv.innerHTML = `English Probability: ${(data.english * 100).toFixed(2)}%<br>
                                   Spanish Probability: ${(data.spanish * 100).toFixed(2)}%`;
            resultDiv.style.color = 'black'; // Ensure the text color is always black
        })
        .catch(error => {
            console.error('Error:', error);
            resultDiv.innerHTML = 'An error occurred while processing your request. Please try again.';
            resultDiv.style.color = 'red'; // Highlight the error message in red
        });
    });
});
