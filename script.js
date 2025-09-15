const apiKey = 	"07be4f97b09e8b4fa33fc150e97be42f"; 
const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");
const cityName = document.getElementById("cityName");
const temperature = document.getElementById("temperature");
const description = document.getElementById("description");
const icon = document.getElementById("icon");

searchBtn.addEventListener("click", () => {
  const city = cityInput.value.trim();
  if (city !== "") {
    getWeather(city);
  }
});

async function getWeather(city) {
  try {
    const url = 
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&lang=es&units=metric`;

    const response = await fetch(url);
    if (!response.ok) throw new Error("Ciudad no encontrada");
    
    const data = await response.json();
    
    cityName.textContent = data.name + ", " + data.sys.country;
    temperature.textContent = ` ${data.main.temp} °C`;
    description.textContent = data.weather[0].description;
    icon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    icon.style.display = "block"; // mostrar solo cuando hay clima


  } catch (error) {
    cityName.textContent = "error";
    temperature.textContent = "";
    description.textContent = "no se pudo obtener el clima";
    icon.src = "";
  }
}
