const path = require('path');
const express = require('express');
const hbs = require('hbs');
const forecast = require('./utils/forecast');
const geoCode = require('./utils/geoCode');
require('dotenv').config();
const port = process.env.PORT || 3000;

//Paths
const publicDir = path.join(__dirname, '../public');
const viewDir = path.join(__dirname, '../templates/views');
const partialsDir = path.join(__dirname, '../templates/partials');

//Express setup
const app = express();
app.use(express.static(publicDir));


//hbs setup
app.set('view engine', 'hbs');
app.set('views', viewDir);
hbs.registerPartials(partialsDir);

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        heading: 'Welcome to Weather App! 😃',
        author: 'Milind'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Us',
        heading: 'About Page 🤔',
        author: 'Milind',
        vision: 'For providing most accurate weather for your place'
    });
});

app.get('/weather', (req, res) => {
    const query = req.query.address;
    if (!query) {
        return res.send("Please provide a valid address");
    }

    geoCode(query, (error, {
        latitude,
        longitude,
        location
    } = {}) => {
        if (error) {
            return res.send({
                error
            });
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error){
                return res.send({
                    error
                });
            }
            const sendData = `The current weather is ${forecastData.desc}. It is ${forecastData.temperature}℃. But it feels like ${forecastData.feel_like}℃.`
            res.send({
                sendData,
                location: location,
                src : forecastData.src
            });
        })
    })

})
app.get('/help/*', (req, res) => {
    res.render('error', {
        title: '404 Error',
        heading: '404 Error',
        author: 'Milind',
        message: 'Help article not found'
    })
});
app.get('*', (req, res) => {
    res.render('error', {
        title: '404 Error',
        heading: '404 Error',
        author: 'Milind',
        message: 'Could not find the page'
    })
});
app.listen(port, () => {
    console.log("Listening at port:3000");
});