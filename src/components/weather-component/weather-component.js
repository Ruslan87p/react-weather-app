import React from 'react';
import {WeatherServiceConsumer} from './../../service/weather-service-context';
import './../weather-component/weather-component.css';
import forest from './../../images/mountain.svg';
import compass from './../../images/compass.svg';



const ErrorView = () => {
    return(
        <div className="row">
            <div className="col-md-12 m-0 overflow-x-hidden">
                <img className="mountain" src={forest} />
                <div className="card wrapper">
            
                    <div className="text-center forest-bg">
                        <h1 className="city">{'.......'.toUpperCase()}</h1>
                        <h4 className="p-2 text-center"> Looks like you are lost </h4>
                            <div className="p-0">
                                <img className="icon p-4" src={compass}/>

                                <footer className="d-flex flex-row justify-content-center align-items-center mt-4">
                                    <span className="blockquote-footer p-3"></span>
                                        <h3 className="text-center p-0 mt-0 description">The city doesn't found</h3>
                                    <span className="blockquote-footer p-3"> </span>
                                </footer>
                            </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

const defaultView = (data) => {
    const {city, celsius, description, temp_max, temp_min, icon, error} = data;
    return(
        <div className="row">
            <div className="col-md-12 m-0 overflow-x-hidden">
                <img className="mountain" src={forest} />
                <div className="card wrapper">
        
                    <div className="text-center forest-bg">
                        <h1 className="city">{city.toUpperCase()}</h1>
                        <span className="p-2 text-center celsius">{celsius}&deg;</span>
                            <div className="p-0">
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
    )
}

const Weather = () => {
    return(
        <WeatherServiceConsumer>
            {
                ({city, celsius, description, temp_max, temp_min, icon, error}) => {
                    const data = {city, celsius, description, temp_max, temp_min, icon, error};

                    if (error) {
                        return ErrorView()
                    }

                    return(
                        <div className="container">
                            {defaultView(data)}
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
                <p className="d-flex flex-column align-items-center"><small>Minimal </small>{min}&deg; </p>
            </span>
            <span className="d-flex justify-content-center align-items-center">
                <p className="d-flex flex-column align-items-center"><small>Maximal </small>{max}&deg; </p>
            </span>
        </div>
    )
}

export {
    Weather
}