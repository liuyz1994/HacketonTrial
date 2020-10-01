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
  res.setHeader('content-type', 'application/json; charset=utf-8');
  res.send(result)
})

app.post('/mocks', (req, res) => {
  var fixedURL = util.fixURLParameter(req.body.url);
  db.upsertMock(req.body.method, fixedURL, req.body.value);
  res.sendStatus(200);
})

app.delete('/mocks', (req, res) => {
  var fixedURL = util.fixURLParameter(req.body.url);
  db.removeMock(req.body.method, fixedURL);
  res.sendStatus(200)
});

app.get('/logs', (req, res) => {
  var logs = db.getLogs();
  res.send(logs);
});

var responseWithMock = function (req, res) {
  var requestedURL = util.removeMockPartFromPath(req.url);
  try {
    var body = db.getMockByMethodAndURL(requestedURL, req.method);
    db.addLog(req.method, requestedURL, req.body, body, req.get('host'));
    res.setHeader("Content-Type", "application/json");
    res.send(body);
  } catch (err) {
    if (err.code === 'ENOENT') {
      console.log('File not found!');
      res.sendStatus(404)
    } else {
      throw err;
    }
  }
}

app.route('/mock/*')
  .get(function (req, res) {
    responseWithMock(req, res);
  })
  .post(function (req, res) {
    responseWithMock(req, res);
  })
  .put(function (req, res) {
    responseWithMock(req, res);
  })
  .delete(function (req, res) {
    responseWithMock(req, res);
  });



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

