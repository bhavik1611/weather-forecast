const request = require('request')

const forecast = (lat, long, callback) => {
    
    const API_KEY = "76a5e47f8236a7269e5347c935c18c51"
    const url = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=${API_KEY}`

    request({url, json: true}, (error, { body }) => {

        if(error){
            callback('Unable to connect to the service...', undefined)
        } else if(body.error) {
            callback('Weather data not found for the given location. Please try some other location...', undefined)
        } else {

            const {name: Address, main: {temp: Temperature, humidity: Humidity}} = body
            callback(undefined, `It's ${Temperature} degrees in ${Address}. There is a ${Humidity}% humidity.`)
        }
    })

}

module.exports = forecast