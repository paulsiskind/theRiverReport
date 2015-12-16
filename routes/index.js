var express = require('express');
var router = express.Router();
var coData = require('../coData.json')
var caData = require('../caData.json')
var akData = require('../akData.json')

router.get('/api/v1/coData', function(req, res, next) {
  res.json(coData)
});

router.get('/api/v1/caData', function(req, res, next){
  res.json(caData)
});

router.get('/api/v1/akData', function(req, res, next){
  res.json(akData)
});

router.get('*', function(req, res, next) {
  res.sendFile('index.html', {
    root: __dirname + '/../public/'
  })
});

module.exports = router;
