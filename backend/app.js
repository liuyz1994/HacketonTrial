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
  var result = db.getMocks();
  // res.setHeader('content-type', 'application/json; charset=utf-8');
  res.send(result)
})

app.post('/mocks', (req, res) => {
  console.log('req', req);
  var fixedURL = util.fixURLParameter(req.body.url);
  db.upsertMock(req.body.method, fixedURL, req.body.value);
  res.sendStatus(200);
})

app.post('/mocks/delete', (req, res) => {
  var fixedURL = util.fixURLParameter(req.body.url);
  db.removeMock(req.body.method, fixedURL);
  res.sendStatus(200)
});

app.route('/mock/*')
  .get(function (req, res) {
    var requestedURL = util.removeMockPartFromPath(req.url);
    var body = db.getMockByMethodAndURL(requestedURL, 'GET');
    res.send(body);
  })
  .post(function (req, res) {
    var requestedURL = util.removeMockPartFromPath(req.url);
    var body = db.getMockByMethodAndURL(requestedURL, 'POST');
    res.send(body);
  })
  .put(function (req, res) {
    var requestedURL = util.removeMockPartFromPath(req.url);
    var body = db.getMockByMethodAndURL(requestedURL, 'PUT');
    res.send(body);
  })
  .delete(function (req, res) {
    var requestedURL = util.removeMockPartFromPath(req.url);
    var body = db.getMockByMethodAndURL(requestedURL, 'DELETE');
    res.send(body);
  });



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

