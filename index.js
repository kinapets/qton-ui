const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const request = require("request");

app.use(bodyParser.json());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const defaultOptions = {
  method: 'POST',
  qs: { 'api-version': '2.0', format: 'swagger' },
  headers:
    {
      'cache-control': 'no-cache',
      'content-type': 'application/json',
      // TODO maybe for different endpoint there will be different API KEY
      authorization: 'Bearer eSW8EOx29rROpwcBa9CRjaCho33gkxyKgUiRxrgZ0pJdMwcrBLbYJz/7+WstUWbMJB0tqMkbhTGzjRFKLZySlA=='
    },
  json: true
};

app.post('/sofa', function (req, res) {
  const customOptions = {
    url: 'https://ussouthcentral.services.azureml.net/workspaces/c303c51978ec47539ea201a965b485f1/services/3a723bedb34c411d9574a17865c61d30/execute',
    body: req.body
  };

  request(Object.assign(defaultOptions, customOptions, {}), function (error, response, body) {
    if (error) throw new Error(error);

    res.json(body);
  });
});

app.listen(4000, () => console.log('Example app listening on port 4000!'));