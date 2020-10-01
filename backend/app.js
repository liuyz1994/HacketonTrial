const express = require('express')
const app = express()
const cors = require('cors')
const port = 3000;

var database = require('./db-service.js');
var db = new database;

app.use(cors())

app.get('/a', (req, res) => {
  db.upsertMock('POST', '/testurl/getData', {'test' : 1});
  res.send('Hello World!')
})

app.post('/a', (req, res) => {
  db.upsertMock('POST', '/testurl/getData', {'test' : 1});
})


app.delete('/removeMock', (req, res) => {
  db.removeMock('POST', '/testurl/getData');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})