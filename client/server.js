const express = require('express')

const dotenv = require('dotenv')
dotenv.config()

path = require('path')
const PORT = process.env.PORT || 9090
const app = express()

app.use(express.static(__dirname + '/build'))

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'src', 'app.jsx'))
})

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`)
})

