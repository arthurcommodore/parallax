const express = require('express')
const bodyParser = require('body-parser')
const app = express()

app.use(bodyParser.urlencoded({urlencoded: true}))
app.use('/', express.static('./'))
app.use('/', express.static('./html'))

app.listen(8080, () => console.log('work'))
