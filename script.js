const apiKey = "1bfba92b1fe8236bca5a294e803d5c2a"; 

function getWeather() {
  const cityInput = document.getElementById("cityInput").value.trim();
  const city = cityInput + ",IN"; // Add country code for Kulpi or Indian cities
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then(response => {
      if (!response.ok) throw new Error("City not found");
      return response.json();
    })
    .then(data => {
      const temp = data.main.temp;
      const condition = data.weather[0].main;
      const emoji = getWeatherEmoji(condition);
      const bg = getBgColor(condition);

      document.body.style.background = bg;

      document.getElementById("weatherInfo").innerHTML = `
        <h2>${cityInput} Weather ${emoji}</h2>
        <p>🌡️ Temperature: ${temp}°C</p>
        <p>🌥️ Condition: ${condition}</p>
      `;
    })
    .catch(() => {
      document.getElementById("weatherInfo").innerHTML = "❌ City not found!";
    });
}

function getWeatherEmoji(condition) {
  switch (condition.toLowerCase()) {
    case "clear": return "☀️";
    case "clouds": return "☁️";
    case "rain": return "🌧️";
    case "thunderstorm": return "🌩️";
    case "snow": return "❄️";
    case "mist": return "🌫️";
    default: return "🌈";
  }
}

function getBgColor(condition) {
  switch (condition.toLowerCase()) {
    case "clear": return "#fff9c4";
    case "clouds": return "#cfd8dc";
    case "rain": return "#b3e5fc";
    case "thunderstorm": return "#b39ddb";
    case "snow": return "#e1f5fe";
    case "mist": return "#eeeeee";
    default: return "#f0f0f0";
  }
}
