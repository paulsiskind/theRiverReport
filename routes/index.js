var express = require('express');
var router = express.Router();
var pg = require('pg');
var conString = process.env.DATABASE_URL || "postgres://@localhost/theriverreport";
var coData = require('../coData.json')
var newsFeed = require('../newFeed.json')
var events = require('../events.json')
var anouncements = require('../anouncements.json')
// var db = require('../queries');




router.get('/_=_', function(req, res, next) {
 
  res.json(req.user)
});

router.get('/api/v1/coData', function(req, res, next) {
  res.json(coData)
});

router.get('/api/v1/newFeed', function(req, res, next){
  console.log('heeeeeeelo')
  res.json(newsFeed)
});

router.get('/api/v1/events', function(req, res, next){
  console.log('Goododododododo')
  res.json(events)
});

router.get('/api/v1/anouncements', function(req, res, next){
  console.log('Goododododododo')
  res.json(anouncements)
});



router.post('/deleteFav', function(req, res, next){
  pg.connect(conString, function(err, client, done) {

    if (err) {
      return console.error('error fetching client from pool', err);
    }
    
    client.query('DELETE FROM favorites where facebook_id = $1 and riverId = $2;',[req.user.facebookId, req.body.riverId], function(err, result) {
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
    
    client.query('UPDATE users set userphone = $1, email = $2 where facebookid = $3',[req.body.phone, req.body.email, req.user.facebookId], function(err, result) {
      done();
      res.redirect('/favorites')
      if (err) {
        return console.error('error running query', err);
      }
    });
  });
})

router.post('/textAlert', function(req, res, next){
  pg.connect(conString, function(err, client, done) {

    if (err) {
      return console.error('error fetching client from pool', err);
    }
    
    client.query('UPDATE users set textAlert = $1 where facebookid = $2',[req.body.textAlert, req.user.facebookId], function(err, result) {
      console.log(req.body.textAlert, req.user.facebookId, 'bees')
      done();

      res.redirect('/favorites')
      if (err) {
        return console.error('error running query', err);
      }
    });
  });
})

router.post('/emailAlert', function(req, res, next){
  pg.connect(conString, function(err, client, done) {

    if (err) {
      return console.error('error fetching client from pool', err);
    }
    
    client.query('UPDATE users set emailAlert = $1 where facebookid = $2',[req.body.emailAlert, req.user.facebookId], function(err, result) {
      console.log(req.body.emailAlert, req.user.facebookId, 'tacos')
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
    client.query('INSERT INTO favorites(facebook_id, riverId) VALUES($1, $2) returning id;',[req.user.facebookId, req.body.riverId], function(err, result) {
      done();
      res.redirect('/' + req.body.riverId)
      if (err) {
        return console.error('error running query', err);
      }
    });
  });
})

router.post('/addFavRiver', function(req, res, next){
  pg.connect(conString, function(err, client, done) {

    if (err) {
      return console.error('error fetching client from pool', err);
    }
    client.query('INSERT INTO favorites(facebook_id, riverId) VALUES($1, $2) returning id;',[req.user.facebookId, req.body.riverId], function(err, result) {
      done();
      res.redirect('/rivers')
      if (err) {
        return console.error('error running query', err);
      }
    });
  });
})

router.post('/addLevel', function(req, res, next){
  pg.connect(conString, function(err, client, done) {

    if (err) {
      return console.error('error fetching client from pool', err);
    }
    
    client.query('UPDATE favorites set riverLevel = $1 where riverId = $2',[req.body.riverLevel ,req.body.riverId], function(err, result) {
      done();
      res.redirect('/favorites')
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
//     client.query('SELECT * FROM favorites WHERE (facebook_id = $1 and riverId = $2);',[req.user.facebookId, req.params.id], function(err, result) {
//       done();


//       if (err) {
//         return console.error('error running query', err);
//       }
//     });
//   });
// })

router.get('/userFavorites', function(req, res, next) {
      app()
  pg.connect(conString, function(err, client, done) {
    //console.log(client)
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

router.get('/usersData', function(req, res, next) {
  pg.connect(conString, function(err, client, done) {
    if (err) {
      return console.error('error fetching client from pool', err);
    }
    client.query('SELECT * FROM users WHERE (facebookId = $1);',[req.user.facebookId], function(err, result) {
      done();
      
      if (err) {
        return console.error('error running query', err);
      }
      res.json(result.rows)
    })
  }) 
});

router.get('/allUsersData', function(req, res, next) {
  app()
  pg.connect(conString, function(err, client, done) {
    if (err) {
      return console.error('error fetching client from pool', err);
    }
    client.query('SELECT * FROM users;', function(err, result) {
      done();
      
      if (err) {
        return console.error('error running query', err);
      }
      res.json(result.rows)
    })
  }) 
});

router.get('/allUsersFavorites', function(req, res, next) {
  app()
  pg.connect(conString, function(err, client, done) {
    if (err) {
      return console.error('error fetching client from pool', err);
    }
    client.query('SELECT * FROM favorites;', function(err, result) {
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

app = function(){
  console.log('Cheese Please')
}


module.exports = router;
