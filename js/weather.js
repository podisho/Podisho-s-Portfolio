
    // Check if Geolocation is supported
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
    } else {
      document.getElementById('weather-info').innerHTML = "Geolocation is not supported by this browser.";
    }

    // Success callback
    function successCallback(position) {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      getWeather(latitude, longitude);
    }

    // Error callback
    function errorCallback(error) {
      document.getElementById('weather-info').innerHTML = `Error: ${error.message}`;
    }

    // Function to get weather data from API
    async function getWeather(lat, lon) {
      const apiKey = 'f1dfecd7fcabb122df4071f23a6bfdd6'; // Replace with your actual API key
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Weather data could not be fetched');
        }
        const data = await response.json();
        displayWeather(data);
      } catch (error) {
        document.getElementById('weather-info').innerHTML = `Error: ${error.message}`;
      }
    }

    // Function to display weather data
    function displayWeather(data) {
        console.log(data);
        
      const weatherInfo = `
        <h2>Weather in ${data.name}</h2>
        <p>Temperature: ${data.main.temp}°C</p>
        <p>Weather: ${data.weather[0].description}</p>
        <p>Humidity: ${data.main.humidity}%</p>
        <p>Wind Speed: ${data.wind.speed} m/s</p>
      `;
      document.getElementById('weather-info').innerHTML = weatherInfo;
    }
  