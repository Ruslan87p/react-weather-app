
const WEATHER_API_KEY = '2c3dc0aafb93f0b7b3cdfe15bcb7e574';
const GEO_URL = 'https://geolocation-db.com/json';
const GEO_API_KEY = '1a811210-241d-11eb-b7a9-293dae7a95e1';

export default class WeatherService {

    getWeather = async (city) => {
        const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${WEATHER_API_KEY}`, {
        });
        if (!res.ok) {
           console.log('ERROR');
        }
        const resp = await res.json();
        return resp;
      };


}




const getCountry = async () => {
  const res = await fetch(`${GEO_URL}/${GEO_API_KEY}`, {
    method: 'GET'
  })
  if (!res.ok) {
      console.log('ERROR');
  }
  const resp = await res.json();
  return resp;
}


export {
  getCountry
}