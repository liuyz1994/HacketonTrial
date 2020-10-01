const express = require('express');
const cors = require('cors');
const database = require('./db-service.js');
const bodyParser = require('body-parser')
const utilModule = require('./util.js');

const app = express()
const port = 3000;
const db = new database;
const util = new utilModule;
app.use(cors())
app.use(bodyParser.json())


app.get('/mocks', (req, res) => {
  var db = new Database;
  var result = db.getMock('POST', '/testurl/getData');
  res.setHeader('content-type', 'application/json; charset=utf-8');
  res.send(result)
})

app.post('/upsertmock', (req, res) => {
  var fixedURL = util.fixURLParameter(req.body.url);
  db.upsertMock(req.body.method, fixedURL, req.body.value);
  res.sendStatus(200);
})

app.delete('/removemock', (req, res) => {
  var fixedURL = util.fixURLParameter(req.body.url);
  db.removeMock(req.body.method, fixedURL);
  res.sendStatus(200)
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

