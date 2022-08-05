const request = require('request');
const forecast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=${process.env.API_KEY}&query=${latitude},${longitude}`;
    request({
        url,
        json: true
    }, (error, {
        body
    }) => {
        if (error) {
            callback('Unable to connect to the API service', undefined);
        } else if (body.error) {
            callback('No such Location  TRY AGAIN!', undefined);
        } else {
            callback(undefined, {
                desc:body.current.weather_descriptions,
                temperature:body.current.temperature,
                feel_like:body.current.feelslike,
                src:body.current.weather_icons
            });
        }
    });
}
module.exports = forecast;
{
    
}