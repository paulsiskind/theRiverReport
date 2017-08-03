var http = require('http');
var BigNumber = require('bignumber.js');
var request = require('request');


var app = {
	users:[],
	favorites:[],
	done: false,
	riverData:[],
	msgIdeal:[],
	flag:false,
  



	getUsers: function(){
		var options = {
    host: 'localhost',
    port: 3000,
    path: '/allUsersData',
    method: 'GET',
    headers: {
        accept: 'application/json'
	    }
		};

		console.log("Start");
		var x = http.request(options,function(res){
		  console.log("Connected");
		  res.on('data',function(data){
		    
		    app.users = JSON.parse(data)
		    app.getFavorites()
		    console.log(app.users)
		  });
		});

		x.end();


	},

	getFavorites: function(){
    console.log('Heeeelo')
		var options = {
    host: 'localhost',
    port: 3000,
    path: '/allUsersFavorites/',
    method: 'GET',
    // 'req.user.facebookid': users[0].facebookid,
	    headers: {
	        accept: 'application/json',       
		  }
		};

		console.log("Start");
		var x = http.request(options,function(res){
		  console.log("Connected Bitches");
		  res.on('data',function(data){
		    
		    app.favorites = JSON.parse(data)
		    app.insertFavorites()
		  });
		});

		x.end();

	},

	insertFavorites: function(){
  
  	for(var x=0;x<app.users.length;x++){
  		app.users[x].favorites=[];
  	}


		console.log('tacos Trucks', app.favorites.length)
		for ( var i = 0; i < app.users.length; i++ ) {
      for ( var e = 0; e < app.favorites.length; e++ ) {
      	// console.log(i, e)
      	var ab = app.users[i].facebookid.slice(1,10)
      	var ba = app.favorites[e].facebook_id.slice(1,10)
      	// console.log(parseInt(new BigNumber(parseInt(app.users[i].facebookId)), new BigNumber(parseInt(app.favorites[e].facebook_id))))
        if(ab === ba ){
        	
          app.users[i].favorites.push(app.favorites[e]);
        }
      }
    // console.log(app.users)
    }
    var userFav = []
    for ( var i = 0; i < app.users.length; i++ ) {
      for(var y=0;y<app.users[i].favorites.length; y++){
      	for(var p =0; p<app.riverData.length;p++){
      		var urid = app.users[i].favorites[y].riverid
      		var rdid = app.riverData[p].id
      		// console.log(urid, rdid, 'beasters')
      		if(urid === rdid){
      			
      			app.users[i].favorites[y]['riverInfo'] = (app.riverData[p])
      			// console.log(app.users[i].favorites[y],'Osso dog')
      		}
      	}
      }
    }
    app.getRiverLevels()

	},

	getRiverData:function(){

		var options = {
    host: 'localhost',
    port: 3000,
    path: '/api/v1/coData',
    method: 'GET',
    headers: {
        accept: 'application/json'
	    }
		};

		console.log("Start");
		var x = http.request(options,function(res){
		  // console.log("Connected");
		  res.on('data',function(data){
		    
		    app.riverData = JSON.parse(data)
		    // console.log(app.riverData)
		  });
		});

		x.end();



	},

	getRiverLevels:function(){
	
    var promises = []

      // start map
    app.users.map(function(favs){
    	console.log(favs)
      favs.favorites.map(function(river){
		    var p = 
		    request
		    	.get('https://waterservices.usgs.gov/nwis/iv/?format=json&indent=on&sites='+ river.riverInfo.USGSid +'&parameterCd=00060,00065', function (error, response, body) {
				  // console.log('error:', error); // Print the error if one occurred 
				  // console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received 
				  var tacoTruck = JSON.parse(body)
				  var riverLevel = tacoTruck.value.timeSeries[0].values[0].value[0].value
				  var ideal = river.riverlevel
				  // console.log(riverLevel, ideal);

				  if(ideal !== null){
				  	if(riverLevel >= ideal){
				  	  // console.log(favs)
				  	  app.msgIdeal.push(favs)
				  	  app.msgIdeal.good.push(river)
				  	  app.text()
				  	};
				  };
				});
      })
    })
	},

	text:function(){
		console.log('Texting Happens Here', app.msgIdeal)

	},

	run: function(){
    app.getRiverData()
		app.getUsers()

	}


}

app.run()



