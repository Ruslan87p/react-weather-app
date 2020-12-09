import React from 'react';
import {WeatherServiceConsumer} from './../../service/weather-service-context';
import './../weather-component/weather-component.css';

import forest  from './../../images/mountain.svg';


const DateToday = () => {
    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    for (let i = 0; i < days.length; i++) {
     
      let today = new Date();
      let dd = String(today.getDate()).padStart(2, '0');
      let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
      let yyyy = today.getFullYear();

      let d = new Date();
      let dayName = d.toString().split(' ')[0];
      const element = days[i].substring(0,3);

      if (element === dayName) {
        today = days[i] + ' - ' + mm + '.' + dd + '.' + yyyy;
        return today;
      }

    }
  }




const Weather = () => {
    return(
        <WeatherServiceConsumer>
            {
                ({city, celsius, description, temp_max, temp_min, icon}) => {
                    return(
                        <div className="container">
                            <div className="row">
                                <div className="col-md-12 m-0 overflow-x-hidden">

                                <img className="mountain" src={forest} />

                                    <div className="card wrapper">
                                    
                                    <span><DateToday /></span>
                                        <div className="text-center forest-bg">
                                            <h1 className="city">{city.toUpperCase()}</h1>
                                            <span className="p-2 text-center celsius">{celsius}&deg;</span>
                                                <div className="p-4">
                                                    <img className="icon" src={icon}/>
                                                    <footer className="d-flex flex-row justify-content-center align-items-center mt-4">
                                                        <span className="blockquote-footer p-3"></span>
                                                            <h3 className="text-center p-0 mt-0 description">{description}</h3>
                                                        <span className="blockquote-footer p-3"> </span>
                                                    </footer>
                                                </div>
                                        </div>
                                        <div className="card-body">
                                            <blockquote className="blockquote mb-0">
                                                <span> {minMaxTemp(temp_min, temp_max)}</span>
                                            </blockquote>
                                        </div>
                                    </div>
        
                                </div>
                            </div>
                        </div>
                    )
                }
            }
        </ WeatherServiceConsumer>
    )
}




const minMaxTemp = (min, max) => {
    return(
        <div className="d-flex justify-content-around">
            <span className="d-flex justify-content-center align-items-center"> 
                <h4 className="d-flex flex-column align-items-center"><small>Minimal Temperature </small>{min}&deg; </h4>
            </span>
            <span className="d-flex justify-content-center align-items-center">
                <h4 className="d-flex flex-column align-items-center"><small>Maximal Temperature </small>{max}&deg; </h4>
            </span>
        </div>
    )
}

export {
    Weather
}