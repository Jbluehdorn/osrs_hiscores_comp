const express = require('express')
const app = express()
const port = 8000

const {constants, hiscores} = require('osrs-api')
const path = require('path')
const mapper = require('./app/SkillMap')

app.use(express.static('dist'))

app.get('/api/images/:name', (req, res) => {
    res.sendFile(path.join(`${__dirname}/resources/images/${req.params.name}`))
})

app.get('/api/user/:type/:name', async (req, res) => {
    let user = await hiscores.getPlayer({name: req.params.name, type: constants.playerTypes.normal})

    mapper.map(user)

    res.setHeader('Cotnent-Type', 'application/json')
    res.send(JSON.stringify(user))
})

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/index.html'))
})

app.listen(port, () => console.log(`App listening on port ${port}`))