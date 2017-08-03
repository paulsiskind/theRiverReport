var http = require('http');
var BigNumber = require('bignumber.js');
var request = require('request');


var app = {
	users:[],
	favorites:[],
	done: false,
	riverData:[],


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
		    console.log(app.favorites)
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
      	console.log(ab, ba)
      	// console.log(parseInt(new BigNumber(parseInt(app.users[i].facebookId)), new BigNumber(parseInt(app.favorites[e].facebook_id))))
        if(ab === ba ){
        	console.log("Hello")
          app.users[i].favorites.push(app.favorites[e]);
        }
      }
    console.log(app.users)
    }
    for ( var i = 0; i < app.users.length; i++ ) {
      for(var y=0;y<app.users[i].favorites.length; y++){
      		console.log('brent>>>>>>>>>>>>')

      	for(var p =0; p<app.riverData.length;p++){
      		var urid = app.users[i].favorites[y].riverId;
      		var rdid = app.riverData[p].USGSid
      		console.log(urid, rdid, 'beasters')
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
		  console.log("Connected");
		  res.on('data',function(data){
		    
		    app.riverData = JSON.parse(data)
		    console.log(app.riverData)
		  });
		});

		x.end();



	},

	getRiverLevels:function(){
	
    for(var i=0; i<app.users.length; i++){

    }
    //path: 'https://waterservices.usgs.gov/nwis/iv/?format=json&indent=on&sites=09070500&parameterCd=00060,00065',
    request
    	.get('https://waterservices.usgs.gov/nwis/iv/?format=json&indent=on&sites=09070500&parameterCd=00060,00065', function (error, response, body) {
		  console.log('error:', error); // Print the error if one occurred 
		  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received 
		  var tacoTruck = JSON.parse(body)
		  console.log('body:', tacoTruck.value.timeSeries[0].values[0].value[0].value); // Print the HTML for the Google homepage. 
		});
	},

	run: function(){
    app.getRiverData()
		app.getUsers()

	}


}

app.run()



