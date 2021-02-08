const weatherForm = document.querySelector('form')
const searchQuery = document.querySelector('input')

const error = document.querySelector('#error')
const weatherForecast = document.querySelector('#forecast')

//setting this css style solving problem with new line in textContent
weatherForecast.setAttribute('style', 'white-space: pre;');


weatherForm.addEventListener('submit', (event) => {
    event.preventDefault()

    error.textContent = "Loading...."
    weatherForecast.textContent = ""

    const location = searchQuery.value

    fetch('/weather?address='+location).then((response) => {
        response.json().then((data) => {
            if(data.error){
                error.textContent = 'Error: ' + data.error
                weatherForecast.textContent = ""
            }
            else{
                error.textContent = ""
                weatherForecast.textContent = 'Location: ' + data.location + '\r\n'
                weatherForecast.textContent += 'Forecast: ' + data.forecast
            }

        })
    })
})