import React from 'react';

// может принимать опциональный аргумент - это значение по умолчанию.
// если Consumer не сможет найти никакого провайдера то будет использовать значение что мы сюда передадим
const {
    Provider: WeatherServiceProvider,
    Consumer: WeatherServiceConsumer
} = React.createContext();

export {
    WeatherServiceConsumer,
    WeatherServiceProvider
}