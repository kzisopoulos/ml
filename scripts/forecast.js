const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const getWeatherForecast = async () => {
  const res = await fetch(
    "http://dataservice.accuweather.com/forecasts/v1/daily/5day/1274325?apikey=vgLCbl59aadsJLm3WuhR2tEuKASAW8GL&metric=true"
  );
  const forecastData = await res.json();
  const { DailyForecasts } = forecastData;
  const extractedData = DailyForecasts.map((day) => {
    return {
      date: {
        dayName: days[new Date(day.Date).getDay()],
        dayAbbr: `${new Date(day.Date).getDate()}/${
          new Date(day.Date).getMonth() + 1
        }`,
      },
      dayData: {
        iconNumber: day.Day.Icon,
        iconPhrase: day.Day.IconPhrase,
      },
      nightData: {
        iconNumber: day.Night.Icon,
        iconPhrase: day.Night.IconPhrase,
      },
      temperature: {
        min: day.Temperature.Minimum.Value,
        max: day.Temperature.Maximum.Value,
      },
    };
  });
  //   console.log(extractedData);
  return extractedData;
};

const getCurrentWeather = async () => {
  const current = await fetch(
    "http://dataservice.accuweather.com/currentconditions/v1/1274325?apikey=vgLCbl59aadsJLm3WuhR2tEuKASAW8GL"
  );
  const currentWeather = await current.json();
  const { WeatherText, WeatherIcon } = currentWeather[0];
  const Temperature = currentWeather[0].Temperature.Metric.Value;

  return {
    desc: WeatherText,
    icon: WeatherIcon,
    temp: Temperature,
  };
};

const data = await getWeatherForecast();
const current = await getCurrentWeather();

const hours = new Date().getHours();
const isDay = hours > 6 && hours < 20;

const weatherGrid = document.querySelector(".weather");
data.forEach((item) => {
  const weatherDiv = document.createElement("div");
  weatherDiv.className = "weather__card";
  weatherDiv.innerHTML = `
        <span class="title">${item.date.dayName}</span>
        <span class="sub">${item.date.dayAbbr}</span>
        ${
          isDay
            ? `<div class="icon__wrapper">
                    <img src="../assets/icons/${item.dayData.iconNumber}.svg" alt="" class="weather__icon" />
               </div>`
            : `<div class="icon__wrapper">
                    <img src="../assets/icons/${item.nightData.iconNumber}.svg" alt="" class="weather__icon" />
               </div>`
        }
        ${
          isDay
            ? `<span class="sub">${item.dayData.iconPhrase}</span>`
            : `<span class="sub">${item.nightData.iconPhrase}</span>`
        }
        <div class="weather__temps">
            <p class="max">${item.temperature.max}&deg;C</p>
            <p class="min">${item.temperature.min}&deg;C</p>
        </div>
    `;
  weatherGrid.appendChild(weatherDiv);
});

const currentWeatherSection = document.querySelector(".current__weather");
currentWeatherSection.innerHTML = `
          <div class="location">
            <p class="location__title">Nea Filadelfeia</p>
            <p class="location__subtitle">Weather</p>
          </div>
          <div class="icon__wrapper">
            <img
              src="./assets/icons/${current.icon}.svg"
              alt="Icon"
              class="current__weather-icon"
            />
          </div>
          <div class="temperature">
            <p class="temperature__title">${current.temp}&deg;C</p>
            <p class="temperature__subtitle">${current.desc}</p>
          </div>

`;
