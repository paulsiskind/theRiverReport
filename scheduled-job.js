require('dotenv').load()
var request = require('request');
var client = require('twilio')(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);

var app = {

	users:[],
	favorites:[],
	riverData:[],
	counter:0,
  
  everyThingIsDone: function(){		
		if(app.counter === app.users.length){
				app.result = true;
		}
		return app.result
	},
	checkIfComplete: function(){
		if(app.result == true){
			app.twil()
     
		}else{
			setTimeout(function(){app.checkIfComplete()}, 600);		
		}
	},

	getUsers: function(){

    request
    	.get('http://theriverreport.herokuapp.com/allUsersData', function(error, response, body){
		    app.users = JSON.parse(body)
		    console.log(app.users)
		    app.getFavorites()   		
    	})
	},
	getFavorites: function(){

		request
			.get('http://theriverreport.herokuapp.com/allUsersFavorites', function(error, response, body){
				app.favorites = JSON.parse(body)
		    app.addToObj()
		    app.insertFavorites()
			})
	},

	addToObj: function(){

		for(var i=0;i<app.favorites.length; i++){
			app.favorites[i]['Current'] = 0;
			app.favorites[i]['in'] = false;
		}
  	for(var x=0;x<app.users.length;x++){
  		app.users[x].favorites=[];
  	}		
	},

	insertFavorites: function(){
  
		for ( var i = 0; i < app.users.length; i++ ) {
      for ( var e = 0; e < app.favorites.length; e++ ) {
      	var ab = app.users[i].facebookid.slice(1,10)
      	var ba = app.favorites[e].facebook_id.slice(1,10)
        if(ab === ba ){ 	
          app.users[i].favorites.push(app.favorites[e]);
        }
      }
    }
    var userFav = []
    for ( var i = 0; i < app.users.length; i++ ) {
      for(var y=0;y<app.users[i].favorites.length; y++){
      	for(var p =0; p<app.riverData.length;p++){
      		var urid = app.users[i].favorites[y].riverid
      		var rdid = app.riverData[p].id

      		if(urid === rdid){     			
      			app.users[i].favorites[y]['riverInfo'] = (app.riverData[p])

      		}
      	}
      }
    }
    app.getRiverLevels()

	},

	getRiverData:function(){
 
    request
			.get('http://theriverreport.herokuapp.com/api/v1/coData', function(error, response, body){
					app.riverData = JSON.parse(body)
			})
	},

	getRiverLevels:function(){
	 
      // start map
    app.users.map(function(favs){
    	var promises = []
    	app.counter++
    	console.log(app.counter, app.users.length)

      favs.favorites.map(function(river){
      var p =
		    request
		    	.get('https://waterservices.usgs.gov/nwis/iv/?format=json&indent=on&sites='+ river.riverInfo.USGSid +'&parameterCd=00060,00065', function (error, response, body) {
				  // console.log('error:', error); // Print the error if one occurred 
				  // console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received 
				  var tacoTruck = JSON.parse(body)
				  var riverLevel = tacoTruck.value.timeSeries[0].values[0].value[0].value
				  var ideal = river.riverlevel
	        console.log(riverLevel)
				  if(ideal !== null){
				  	if(riverLevel >= ideal){
				  	  river.Current = riverLevel
				  	  river.in = true;
				  	};
				  };
				});
		    	promises.push(p)
				//  app.everyThingIsDone()
      })
    })
	},

	twil:function(){
		console.log("I'm Last!")
		var user = app.users
		var num = 1;
		
    for(var i=0; i<user.length;i++){	
    	var msg = []
    	var sendMsg = [];
			var flag = false
    	for(var j=0; j<user[i].favorites.length; j++){
    		if(user[i].favorites[j].in === true){
    			console.log(user[i].firstname, num++, user[i].favorites[j].Current, user[i].favorites[j].riverlevel, user[i].favorites[j].riverInfo.name)
          msg.push(user[i].favorites[j].riverInfo.name + ' is in! ' 
                              + 'The Current flow is: '+ user[i].favorites[j].Current + '. Your recommended level is: ' + user[i].favorites[j].riverlevel + '.' + '\n')
         
    		};
    	};
    	var greeting = '\n' + 'Thank you for using theRiverReport'
	
    	console.log('sending msg to:', user[i].userphone, msg.join(' '))
	     	if(msg.length>0){
					client.messages.create({
					    to: user[i].userphone, 
					    from:"+19707103508",
					    body: msg.join(' ') + greeting,
					}, function(error, message) {
					    if (error) {
					        console.log(error.message);
					    }
					  });
				}
			}
	},

	run: function(){
		app.checkIfComplete()
    app.getRiverData()
		app.getUsers()
	}
}

app.run()