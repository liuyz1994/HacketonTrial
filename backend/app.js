const express = require('express')
const app = express()
const cors = require('cors')
const port = 3000;

var database = require('./db-service.js');
const Database = require('./db-service.js');

app.use(cors())

app.get('/a', (req, res) => {
  var db = new Database;
  var result = db.getMock('POST', '/testurl/getData');
  res.setHeader('content-type', 'application/json; charset=utf-8');
  res.send(result)
})

app.post('/a', (req, res) => {
  var db = new Database;
  db.upsertMock('POST', '/testurl/getData', { 'test': 1 });
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})