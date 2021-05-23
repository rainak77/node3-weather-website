const request = require('request');


const forecast = (lng, lat, forecastCallback) => {

    const url = 'http://api.weatherstack.com/current?access_key=0169fd2eb969fc509c4b6567a8ab58ea&query=' + lat + ' , ' + lng;
    request({ url: url, json: true }, (error, response) => {
        if (error) {
            forecastCallback('Unable to connect', undefined);
        }
        else {
            const realtemp = response.body.current.temperature;
            const feelsLike = response.body.current.feelslike;
            forecastCallback(undefined, `${response.body.current.weather_descriptions}. It is currently ${realtemp} degress out. It feels like ${feelsLike} degress out`);
        }
    });

};

module.exports = forecast;