const request = require('request');
const geoCode = (address, callback) => {
    const geocageAPI = process.env.GEO_KEY;
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(address)}&key=${geocageAPI}`;
    request({url,json: true},(error, {body}) => {
        if (error) {
            callback('Unable to connect to the API service', undefined);
        } else if(body.results.length===0) {
            callback('No Sucg place found,Sorry😥', undefined);
        } else {    
            const latitude = body.results[0].geometry.lat ;
            const longitude = body.results[0].geometry.lng;
            const location = body.results[0].formatted;
            callback(undefined, {
                latitude,
                longitude,
                location
            });
        }
    });
}
module.exports = geoCode;