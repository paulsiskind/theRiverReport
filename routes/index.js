var express = require('express');
var router = express.Router();
var db = require('monk')(process.env.MONGOLAB_URI || 'localhost/theRiverReport');
var river = db.get('theRiverReport');
var coData = require('../coData.json')
var caData = require('../caData.json')
var akData = require('../akData.json')
var http = require('request-promise-json');


router.get('/api/v1/coData', function(req, res, next) {
  res.json(coData)
});

router.get('/api/v1/caData', function(req, res, next){
  res.json(caData)
});

router.get('/api/v1/akData', function(req, res, next){
  res.json(akData)
});

router.post('/api/v1/api-proxy/flows', function(req, res, next){
  var url = req.body.apiurl;
  var result = {};
  var promises = [];

  url.map(function(uri){

    promises.push(
      
      http.get(uri).then(function(body){
      
        if(typeof body.value === 'object' && typeof body.value.timeSeries[0] === 'object'){
          var siteCode = body.value.timeSeries[0].sourceInfo.siteCode[0].value;
          var flow = body.value.timeSeries[0].values[0].value[0].value;
          return result[siteCode] = flow;
        }

      })

    )

  })

  Promise.all(promises).then(function(){
    res.json(result)

  });

})


// router.post('/rivers', function(req, res, next){
//   river.insert({riverId: req.body.river,
//                riverFlow: req.body.riverFlow});
//   res.redirect('/');
// });

router.get('*', function(req, res, next) {
  res.sendFile('index.html', {
    root: __dirname + '/../public/'
  })
});

module.exports = router;
