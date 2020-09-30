const express = require('express')
const app = express()
const cors = require('cors')
const port = 3000

app.use(cors())

app.get('/a', (req, res) => {
  res.send('Hello World!')
})

app.post('/a', (req, res) => {
    res.send('200')
  })

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})