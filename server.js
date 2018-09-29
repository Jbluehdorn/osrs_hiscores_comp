const express = require('express')
const app = express()
const port = 8000

const {constants, hiscores} = require('osrs-api')
const path = require('path')
const mapper = require('./app/SkillMap')

app.use(express.static('dist'))

/**
 * API ROUTES
 */
app.get('/api/images/:name', (req, res) => {
    res.sendFile(path.join(`${__dirname}/resources/images/${req.params.name}`))
})

app.get('/api/user/:type/:name', async (req, res) => {
    let type, user;

    switch(req.params.type) {
        case 'norm':
            type = constants.playerTypes.normal
            break
        case 'im':
            type = constants.playerTypes.ironman
            break
        case 'hcim':
            type = constants.playerTypes.hardcoreIronman
            break
        case 'uim':
            type = constants.playerTypes.ultimateIronman
            break
        default:
            type = constants.playerTypes.normal
            console.error(`Type "${req.params.type}" was not recognized`)
            break
    }

    try {
        user = await hiscores.getPlayer({name: req.params.name, type: type})
    } catch(ex) {
        console.log(`${req.params.name} ${req.params.name} was not found`)
        res.setHeader('Content-Type', 'application/json')
        res.statusMessage = `${req.params.name} was not found`
        res.status(404).send()
        return
    }

    mapper.map(user)

    res.setHeader('Content-Type', 'application/json')
    res.send(JSON.stringify(user))
})

app.get('/api/slayer_masters', (req, res) => {
    res.setHeader('Content-Type', 'application/json')
    res.send(JSON.stringify(require('./app/SlayerMasters.js')))
})

/**
 * STATIC ROUTES
 */
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/index.html'))
})

app.listen(port, () => console.log(`App listening on port ${port}`))