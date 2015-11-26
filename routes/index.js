var express = require('express');
var router = express.Router();
var coData = require('../coData.json')

router.get('/api/v1/coData', function(req, res, next) {
  res.json(coData)
});

router.get('*', function(req, res, next) {
  res.sendFile('index.html', {
    root: __dirname + '/../public/'
  })
});

module.exports = router;
