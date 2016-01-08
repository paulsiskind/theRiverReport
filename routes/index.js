var express = require('express');
var router = express.Router();
var pg = require('pg');
var conString = process.env.DATABASE_URL || "postgres://@localhost/theriverreport";
var coData = require('../coData.json')
var caData = require('../caData.json')


router.get('/_=_', function(req, res, next) {
 
  res.json(req.user)
});

router.get('/api/v1/coData', function(req, res, next) {
  res.json(coData)
});

router.get('/api/v1/caData', function(req, res, next){
  res.json(caData)
});



router.post('/deleteFav', function(req, res, next){
  pg.connect(conString, function(err, client, done) {

    if (err) {
      return console.error('error fetching client from pool', err);
    }
    console.log(req.user.facebookId, req.body.riverId, '<<<<<<>>>>>>>LLLLL')
    client.query('DELETE FROM favorites where facebook_id = $1 and river_id = $2;',[req.user.facebookId, req.body.riverId], function(err, result) {
      done();
      res.redirect('/favorites')
      if (err) {
        return console.error('error running query', err);
      }
    });
  });
})

router.post('/addPhone', function(req, res, next){
  pg.connect(conString, function(err, client, done) {

    if (err) {
      return console.error('error fetching client from pool', err);
    }
    console.log("I'm running!!!!!!!!!!!!!!!!!!!", req.body.phone ,req.user.facebookId )
    client.query('UPDATE users set userphone = $1 where facebookid = $2',[req.body.phone ,req.user.facebookId], function(err, result) {
      done();
      res.redirect('/favorites')
      if (err) {
        return console.error('error running query', err);
      }
    });
  });
})

// update users set userphone=5303860690 where facebookid = '10153566999344667';

router.post('/addFav', function(req, res, next){
  pg.connect(conString, function(err, client, done) {

    if (err) {
      return console.error('error fetching client from pool', err);
    }
    client.query('INSERT INTO favorites(facebook_id, river_id) VALUES($1, $2) returning id;',[req.user.facebookId, req.body.riverId], function(err, result) {
      done();
      res.redirect('/' + req.body.riverId)
      if (err) {
        return console.error('error running query', err);
      }
    });
  });
})

// router.get('/isFav/:id', function(req, res, next){
  
//   pg.connect(conString, function(err, client, done) {
//     if (err) {
//       return console.error('error fetching client from pool', err);
//     }
//     client.query('SELECT * FROM favorites WHERE (facebook_id = $1 and river_id = $2);',[req.user.facebookId, req.params.id], function(err, result) {
//       done();


//       if (err) {
//         return console.error('error running query', err);
//       }
//     });
//   });
// })

router.get('/userFavorites', function(req, res, next) {
  pg.connect(conString, function(err, client, done) {
    if (err) {
      return console.error('error fetching client from pool', err);
    }
    client.query('SELECT * FROM favorites WHERE (facebook_id = $1);',[req.user.facebookId], function(err, result) {
      done();
      
      if (err) {
        return console.error('error running query', err);
      }
      res.json(result.rows)
    })
  }) 
});




router.get('*', function(req, res, next) {
  res.sendFile('index.html', {
    root: __dirname + '/../public/'
  })
});

module.exports = router;
