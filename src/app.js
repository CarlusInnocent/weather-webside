import path from 'path'
import express from 'express';
import hbs from 'hbs'
import { geocode } from './utils/geocode.js';
import { weatherData } from './utils/weatherData.js';

const app = express()
const PORT = 3000
const __dirname = import.meta.dirname;
 
// define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsDirectoryPath = path.join(__dirname, '../templates/views')
const partialsDirectoryPath = path.join(__dirname, '../templates/partials')

// setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsDirectoryPath)
hbs.registerPartials(partialsDirectoryPath)

// setting up static directory to serve
app.use(express.static(publicDirectoryPath))


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Carlus Innocent'
    })
})

app.get('/weather', async (req, res) => {
    const location = req.query.address

    if(!location){
        return res.send({error: 'You must provide a search item'})
    }

    try {
        const data = await geocode(location)
        const wData = await weatherData(data.latitude, data.longitude)

        return res.send({
            location,
            Logitude: data.longitude,
            Latitude: data.latitude,
            weather_data: wData
        })
    } catch (error) {
        return res.send({error: error.message})
    }
})

app.get('/about', (req, res) => {
    res.render('about', {
        name: 'Carlus Innocent',
        title: 'About'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        name: 'Carlus Innocent',
        title: 'Help'
    })
})

app.get('/help/*', (req, res) => {
    res.render('page404', {
        name: 'Carlus Innocent',
        title: 'Weather App',
        errorType: 'Help Article not found'
    })
})

app.get('*', (req, res) => {
    res.render('page404', {
        name: 'Carlus Innocent',
        title: 'Weather App',
        errorType: 'PAGE NOT FOUND'
    })
})



app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})