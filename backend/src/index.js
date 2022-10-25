const express = require('express');
const gamesController = require('./controllers/gamesController');
const adsController = require('./controllers/adsController')
const cors = require('cors');

const app = express();


app.use(express.json());
app.use(cors('*'))

app.get('/games', (req, res) => {
    gamesController.getGames(req, res)
})

app.get('/games/:id/ads', (req, res) => {
    gamesController.getGameID(req, res)
})


app.get('/ads', (req, res) => {
    adsController.getAds(req, res)
})

app.get('/ads/:id/discord', (req, res) => {
    adsController.getAdsDiscord(req, res)
})

app.post('/ads/insert', (req, res) => {
    adsController.postAds(req, res)
}) 

app.listen(3000)