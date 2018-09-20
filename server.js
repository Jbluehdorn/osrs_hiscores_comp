const express = require('express')
const app = express()
const port = 8000

const path = require('path')

app.use(express.static('dist'))

app.get('/api/images/:name', (req, res) => {
    res.sendFile(path.join(`${__dirname}/resources/images/${req.params.name}`))
})

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/index.html'))
})

app.listen(port, () => console.log(`App listening on port ${port}`))