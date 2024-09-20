document.getElementById('searchButton').addEventListener('click', async () => {
    const city = document.getElementById('cityInput').value;
    if (!city) {
        alert('Please enter a city name');
        return;
    }
    const apiKey = '67e92d7ce9c79a340d648556651d3012';  // Replace with your OpenWeatherMap API key
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('City not found');
        }
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        document.getElementById('weatherInfo').innerText = error.message;
    }
});

function displayWeather(data) {
    const { name, main: { temp, humidity }, weather } = data;
    const weatherDescription = weather[0].description;
    const weatherIcon = `http://openweathermap.org/img/wn/${weather[0].icon}.png`;

    document.getElementById('weatherInfo').innerHTML = `
        <h2>${name}</h2>
        <p>Temperature: ${temp}°C</p>
        <p>Humidity: ${humidity}%</p>
        <p>Conditions: ${weatherDescription}</p>
        <img src="${weatherIcon}" alt="${weatherDescription}">
    `;
}
