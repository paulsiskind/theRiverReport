require('dotenv').load()
var http = require('http');
var BigNumber = require('bignumber.js');
var request = require('request');
var client = require('twilio')(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);




var app = {

	users:[],
	favorites:[],
	done: false,
	riverData:[],
	msgIdeal:[],
	flag:false,
	counter:0,
	ghost:[],
  
  everyThingIsDone: function(){
		
		
	if(app.counter === app.users.length){
			app.result = true;
		}
		 return app.result
	},
	checkIfComplete: function(){
		if(app.result == true){
			app.text()
     
		}else{
			setTimeout(function(){app.checkIfComplete()}, 1000);		
		}
	},


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
	  app.msgIdeal['Current']=[];

      // start map
    app.users.map(function(favs){
    	app.counter++
    	console.log(app.counter, app.users.length)
      favs.favorites.map(function(river){

		    request
		    	.get('https://waterservices.usgs.gov/nwis/iv/?format=json&indent=on&sites='+ river.riverInfo.USGSid +'&parameterCd=00060,00065', function (error, response, body) {
				  // console.log('error:', error); // Print the error if one occurred 
				  // console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received 
				  var tacoTruck = JSON.parse(body)
				  var riverLevel = tacoTruck.value.timeSeries[0].values[0].value[0].value
				  var ideal = river.riverlevel
				 // console.log(riverLevel, ideal);

				  if(ideal !== null){
				  	 // 	app.msgIdeal.push(favs)

				  	if(riverLevel >= ideal){
				  	//  console.log(riverLevel)
				  	  app.msgIdeal.push(river)
				  	  app.msgIdeal['Current'].push(riverLevel)
				  	};
				  };
				  app.everyThingIsDone()
				});
      })
    })
             // app.text();
	},

	text:function(){
    
    for(var x=0;x<app.users.length;x++){
  		app.users[x].ideal=[];
  	}

		console.log('Texting Happens Here:')

		for ( var i = 0; i < app.users.length; i++ ) {
      for ( var e = 0; e < app.msgIdeal.length; e++ ) {
      	// console.log(i, e)
      	var ab = app.users[i].facebookid.slice(1,10)
      	var ba = app.msgIdeal[e].facebook_id.slice(1,10)
      	// console.log(parseInt(new BigNumber(parseInt(app.users[i].facebookId)), new BigNumber(parseInt(app.favorites[e].facebook_id))))
        if(ab === ba ){
        	
          app.users[i].ideal.push(app.favorites[e]);
        }
        if(e===app.msgIdeal.length){
        }
      }
    // console.log(app.users)
    }
        	app.twil()
	},

	twil:function(){
		console.log("I'm Last!")
    for(var i=0; i<app.users.length;i++){
    	//console.log(app.users[i].ideal)
    	app.ghost = app.users[i].ideal;
     // if(app.users.hasOwnProperty('ideal')){
      	console.log('sending msg to:', app.users[i].userphone)
				client.messages.create({
				    to: app.users[i].userphone,
				    from:"+19707103177",
				    body: 'Tacos love Gore Canyon',
				}, function(error, message) {
				    if (error) {
				        console.log(error.message);
				    }
				  });
		//	}
		}

	},



	run: function(){
		app.checkIfComplete()
    app.getRiverData()
		app.getUsers()

	}


}

app.run()



