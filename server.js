const express = require('express')
const app = express()
const port = 8000

const path = require('path')
const OSRSController = require('./app/Controllers/OSRSController')

app.use(express.static('dist'))

/**
 * API ROUTES
 */
app.get('/api/images/:name', (req, res) => {
    res.sendFile(path.join(`${__dirname}/resources/images/${req.params.name}`))
})

app.get('/api/user/:type/:name', async (req, res) => {
    res.setHeader('Content-Type', 'application/json')

    try {
        let user = await OSRSController.getUser(req.params.type, req.params.name)

        res.send(JSON.stringify(user))
    } catch(ex) {
        console.log(`${req.params.type} ${req.params.name} was not found`)
        res.statusMessage = `${req.params.name} was not found`
        res.status(404).send()
    }
})

app.get('/api/slayer_masters', (req, res) => {
    res.setHeader('Content-Type', 'application/json')
    res.send(JSON.stringify(require('./app/SlayerMasters.js')))
})

app.get('/api/ensouled_heads', (req, res) => {
    res.setHeader('Content-Type', 'application/json')
    res.send(JSON.stringify(require('./app/EnsouledHeads.js')))
})

/**
 * STATIC ROUTES
 */
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/index.html'))
})

app.listen(port, () => console.log(`App listening on port ${port}`))