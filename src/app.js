const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express()

// Declaring paths for configuring handlebars
const PUBLIC_DIR = path.join(__dirname, '../public')
const VIEWS_DIR = path.join(__dirname, '../templates/views')
const PARTIALS_DIR = path.join(__dirname, '../templates/partials')
const PORT = 3000

// Setting the handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', VIEWS_DIR)
hbs.registerPartials(PARTIALS_DIR)

// Setting the static dir to serve
app.use(express.static(PUBLIC_DIR))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather Forecast',
        name: 'Bhavik'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Us',
        name: 'Bhavik'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        helpMsg: 'Visit XYZ for further help',
        name: 'Bhavik'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'Provide an address'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error) {
            return res.send({
                error
            })
        } 
        forecast(latitude, longitude, (error, forecastData) => {
            if(error) {
                return res.send({
                    error
                })
            }
            return res.send({
                location,
                forecast: forecastData
            })
        })
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: 'Not Found',
        errorMsg: 'Page not found',
        name: 'Bhavik'
    })
})

app.listen(PORT, () => {
    console.log('Server running!!')
})