const apiKey = "dc6796e6d3f55db5f5a6dc4018ed168c"; 
const lat = -17.824858;
const lon = 31.053028;

const currentTemp = document.querySelector('#current-temp');
const tempHigh = document.querySelector('#temp-high');
const tempLow = document.querySelector('#temp-low');
const humidity = document.querySelector('#humidity');
const sunriseSpan = document.querySelector('#sunrise');
const sunsetSpan = document.querySelector('#sunset');
const weatherIcon = document.querySelector('#weather-icon');
const weatherDesc = document.querySelector('#weather-desc');

const forecastDay1 = document.querySelector('#forecast-day1');
const forecastDay2 = document.querySelector('#forecast-day2');
const forecastDay3 = document.querySelector('#forecast-day3');

function formatTime(timestamp) {
    const date = new Date(timestamp * 1000);
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
    return `${hours}:${formattedMinutes} ${ampm}`;
}

async function apiFetch() {
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

    try {
        const weatherResponse = await fetch(weatherUrl);
        if (weatherResponse.ok) {
            const weatherData = await weatherResponse.json();
            displayCurrentWeather(weatherData);
        } else {
            throw Error(await weatherResponse.text());
        }

        const forecastResponse = await fetch(forecastUrl);
        if (forecastResponse.ok) {
            const forecastData = await forecastResponse.json();
            displayForecast(forecastData);
        } else {
            throw Error(await forecastResponse.text());
        }

    } catch (error) {
        console.error("Error fetching weather data:", error);
    }
}

function displayCurrentWeather(data) {
    const tempInCelsius = data.main.temp;
    const highInCelsius = data.main.temp_max;
    const lowInCelsius = data.main.temp_min;

    currentTemp.textContent = tempInCelsius.toFixed(0);
    tempHigh.textContent = highInCelsius.toFixed(0);
    tempLow.textContent = lowInCelsius.toFixed(0);
    humidity.textContent = data.main.humidity;

    const sunriseTime = formatTime(data.sys.sunrise);
    const sunsetTime = formatTime(data.sys.sunset);
    sunriseSpan.textContent = sunriseTime;
    sunsetSpan.textContent = sunsetTime;

    const iconCode = data.weather[0].icon;
    const desc = data.weather[0].description;
    const iconsrc = `https://openweathermap.org/img/wn/${iconCode}.png`;
    weatherIcon.setAttribute('src', iconsrc);
    weatherIcon.setAttribute('alt', desc);
    weatherDesc.textContent = desc;
}

function displayForecast(data) {
    const forecastEntries = data.list.filter(item => item.dt_txt.includes('12:00:00'));

    if (forecastEntries[0]) {
        const temp1 = forecastEntries[0].main.temp;
        forecastDay1.textContent = temp1.toFixed(0);
    }

    if (forecastEntries[1]) {
        const temp2 = forecastEntries[1].main.temp;
        forecastDay2.textContent = temp2.toFixed(0);
    }
    
    if (forecastEntries[2]) {
        const temp3 = forecastEntries[2].main.temp;
        forecastDay3.textContent = temp3.toFixed(0);
    }
}

apiFetch();