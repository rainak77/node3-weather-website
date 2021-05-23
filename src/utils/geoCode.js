const request = require('request');


const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoicmFpbmFrNzciLCJhIjoiY2tvMTlmNGZxMDZmdjMyb2VlazE2bDRxZSJ9.BXDnKI-YHrPi5zmDv7MRWw`;

    request({ url, json: true }, (error, response) => {
        if (error) { // low level connection problem will show
            callback('Unable to connect');
        } else if (response.body.error) {  //if the appropriate data did not found error will be with response body
            callback('unable to find loction');
        } else if (response.body.features.length === 0) {
            callback('city not found');
        } else {

            const lng = response.body.features[0].center[0];
            const lat = response.body.features[0].center[1];
            const loc = response.body.features[0].place_name;
            callback(undefined, { lng, lat, loc });
        }
    });
};

module.exports = geocode;