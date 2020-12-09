import React from 'react';
import './App.css';
import WeatherService, { getCountry } from './service/weather-service';
import {Weather} from './components/weather-component/weather-component';
import {WeatherServiceProvider} from './service/weather-service-context';
import {Form} from './components/form-component/form-component';
import mapboxgl from 'mapbox-gl';

// icons
import thunderstorm  from './images/wi-thunderstorm.svg';
import stormShowers  from './images/wi-storm-showers.svg';
import snow  from './images/wi-snow.svg';
import sleet  from './images/wi-sleet.svg';
import fog  from './images/wi-fog.svg';
import daySunny  from './images/wi-day-sunny.svg';
import dayFog  from './images/wi-day-fog.svg';




mapboxgl.accessToken = 'pk.eyJ1IjoicGxvdGtpbjEwMDAiLCJhIjoiY2tpZXlteDJlMDloYzJ1cWt2OThmZ3V0eCJ9.rJms3W5-FJhgFSi1YA7KTA';

export default class App extends React.Component {


    state = {
        city: null,
        icon: null,
        main: null,
        celsius: null,
        temp_max: null,
        temp_min: null,
        description: null,
        error: false,
        loading: true,
        latitude: null,
        longitude: null
    };

    weatherIcon = {
      Thunderstorm: thunderstorm,
      Drizzle: sleet,
      Rain: stormShowers,
      Snow: snow,
      Atmosphere: fog,
      Clear: daySunny,
      Clouds: dayFog
    }

    weatherSvc = new WeatherService();


    calCelsius = (temperature) => {
      let cell = Math.floor(temperature - 273.15);
      return cell;
    }

    



    getWeatherIcon (weatherIcon, rangeId) {
      switch (true) {
        case rangeId >= 200 && rangeId <= 232:
            this.setState({icon: weatherIcon.Thunderstorm});
          break;
        case rangeId >= 300 && rangeId <= 221:
            this.setState({icon: weatherIcon.Drizzle});
          break;
        case rangeId >= 500 && rangeId <= 311:
            this.setState({icon: weatherIcon.Rain});
          break;
        case rangeId >= 600 && rangeId <= 622:
            this.setState({icon: weatherIcon.Snow});
          break;
        case rangeId >= 701 && rangeId <= 781:
            this.setState({icon: weatherIcon.Atmosphere});
          break;
        case rangeId === 800:
            this.setState({icon: weatherIcon.Clear});
          break;
        case rangeId >= 801 && rangeId <= 804:
            this.setState({icon: weatherIcon.Clouds});
          break;
        default:
          this.setState({icon: weatherIcon.Clouds});
      }
    }



    

    buildData = (city) => {    
  
      return this.weatherSvc.getWeather(city)
      .then(data => {
        if (data) {
          this.setState({
            city: city,
            celsius: this.calCelsius(data.main.temp),
            temp_max: this.calCelsius(data.main.temp_max),
            temp_min: this.calCelsius(data.main.temp_min),
            description: data.weather[0].description,
            error: false,
            loading: false,
            latitude: data.coord.lat,
            longitude: data.coord.lon,
          })
          this.getWeatherIcon(this.weatherIcon, data.weather[0].id);
        }
      })
    }



    componentDidMount() {



  
    


      getCountry()
      .then(data => {
        if (data) {
          this.weatherSvc.getWeather(data.country_name);
          this.setState({
            city: data.country_name,
            latitude: data.latitude,
            longitude: data.longitude,
            loading: false,
          });
          this.buildData(data.country_name);
        }
      })
      
    }




    getData = (e) => {
        e.preventDefault();
        const city = e.target.elements.city.value;
        this.buildData(city);
      }


      mapView = (mapContainer) => {

         const map = new mapboxgl.Map({
          container: mapContainer,
          style: 'mapbox://styles/plotkin1000/ckifs9oxj2zb119quusdisywf', // stylesheet location
          center: [this.state.longitude, this.state.latitude], // starting position [lng, lat]
          zoom: 9, // starting zoom
          attributionControl: false // hide watermarks
          });

          new mapboxgl.Marker()
          .setLngLat([this.state.longitude, this.state.latitude])
          .addTo(map);
    }

    
    render() {

      if (this.state.loading) {
        return(
          <h1 className="font-weight-bold">Loading...</h1>
        )
      }


      
      const map = document.querySelector('.map');
      if (map) {
        this.mapView(map);  
      }

        return(
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <h1 className="date">
                  Today's weather
                </h1>
                <WeatherServiceProvider value={this.state} >
                  <Form loadWeather={this.getData} />
                  <Weather />
                </ WeatherServiceProvider>
              </div>
            </div>

            <div className="col-lg-12">
              <div className="map"></div>
            </div>

          </div>
            
        )
    }
}


