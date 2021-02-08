const request = require('request')

const geocode = (location, callback) => {
    
    const API_KEY = "pk.eyJ1IjoidGVzdDcxOCIsImEiOiJja2twOWVvcXgwN21hMnFxbjkxNDU5d2VjIn0.-rrPlE-5zPwGCSQffT16Qg"
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json?access_token=${API_KEY}`

    request({url, json: true}, (error, { body }) => {

        if(error){
            callback('Unable to connect to the service...', undefined)
        } else if(body.features.length === 0) {
            callback('No locations found. Please try some other location...', undefined)
        } else {
            
            const {center: coords, place_name: location} = body.features[0]
            callback(undefined, {
                latitude: coords[1],
                longitude: coords[0],
                location
            })
        }
    })

}

module.exports = geocode