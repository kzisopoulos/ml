// const days = [
//   "Sun",
//   "Mon",
//   "Tue",
//   "Wed",
//   "Thu",
//   "Fri",
//   "Sat",
// ];
// const getWeatherForecast = async () => {
//   const res = await fetch(
//     "http://dataservice.accuweather.com/forecasts/v1/daily/5day/1274325?apikey=vgLCbl59aadsJLm3WuhR2tEuKASAW8GL&metric=true"
//   );
//   const forecastData = await res.json();
//   const { DailyForecasts } = forecastData;
//   const extractedData = DailyForecasts.map((day) => {
//     return {
//       date: {
//         dayName: days[new Date(day.Date).getDay()],
//         dayAbbr: `${new Date(day.Date).getDate()}/${
//           new Date(day.Date).getMonth() + 1
//         }`,
//       },
//       dayData: {
//         iconNumber: day.Day.Icon,
//         iconPhrase: day.Day.IconPhrase,
//       },
//       nightData: {
//         iconNumber: day.Night.Icon,
//         iconPhrase: day.Night.IconPhrase,
//       },
//       temperature: {
//         min: day.Temperature.Minimum.Value,
//         max: day.Temperature.Maximum.Value,
//       },
//     };
//   });
//   //   console.log(extractedData);
//   return extractedData;
// };

// const data = await getWeatherForecast();
// console.log(data);