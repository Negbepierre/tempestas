const API_KEY = '75619b64ee40bdd4ce3d565c250426eb';

function getWeather() {
  const city = document.getElementById('cityInput').value;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

  fetch(url)
    .then(res => res.json())
    .then(data => {
      if (data.cod !== 200) {
        document.getElementById('weatherDisplay').innerText = "City not found.";
        return;
      }

      const temp = data.main.temp;
      const condition = data.weather[0].description;
      const lat = data.coord.lat;
      const lon = data.coord.lon;

      const now = new Date();
      const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

      const weatherText = `📍 ${data.name}\n🕒 Time: ${timeString}\n🌡️ Temp: ${temp}°C\n🌥️ Condition: ${condition}`;
      const fashionAdvice = getFashionAdvice(temp, condition);

      document.getElementById('weatherDisplay').innerText = `${weatherText}\n\n👗 Fashion Tip:\n${fashionAdvice}`;

      // Fetch hourly forecast
      const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;

      fetch(forecastUrl)
        .then(res => res.json())
        .then(forecastData => {
          const upcoming = forecastData.list.slice(0, 5).map(item => {
            const hour = new Date(item.dt * 1000).getHours().toString().padStart(2, '0');
            const temp = item.main.temp.toFixed(1);
            const desc = item.weather[0].main;
            return `${hour}:00 - ${temp}°C - ${desc}`;
          }).join('\n');

          document.getElementById('weatherDisplay').innerText += `\n\n🔮 Forecast:\n${upcoming}`;
        });
    })
    .catch(() => {
      document.getElementById('weatherDisplay').innerText = "Error fetching data.";
    });
}

function getFashionAdvice(temp, condition) {
  condition = condition.toLowerCase();
  let advice = "";

  if (temp < 0) {
    advice = "🧥 Thermal layers, heavy winter coat, gloves, scarf, Chelsea boots";
  } else if (temp < 10) {
    advice = "🧣 Hoodie or sweater, trench coat, jeans, and Chelsea boots";
  } else if (temp < 20) {
    advice = "🧥 Light jacket or hoodie, long sleeves, and trousers";
  } else if (temp < 30) {
    advice = "👕 T-shirt, light trousers or skirt, sneakers";
  } else {
    advice = "🩳 Tank top, shorts, sandals, and sunglasses 😎";
  }

  if (condition.includes("rain")) {
    advice += "\n☔ Rain alert—carry an umbrella and wear a waterproof trench coat.";
  } else if (condition.includes("snow")) {
    advice += "\n❄️ Snow alert—opt for waterproof boots and thermal accessories.";
  }

  return advice;
}
