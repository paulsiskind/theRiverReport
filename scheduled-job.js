var http = require('http');


var app = {
	users:[],
	done: false,

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
		    app.getFavorites(app.users)
		    // console.log(users)
		  });
		});

		x.end();


	},

	getFavorites: function(users){
    console.log('Heeeelo', users[0].facebookid)
		var options = {
    host: 'localhost',
    port: 3000,
    path: '/userFavorites/',
    method: 'GET',
    'req.user.facebookid': users[0].facebookid,
    headers: {
        accept: 'application/json',
        
	    }
		};

		console.log("Start");
		var x = http.request(options,function(res){
		  console.log("Connected Bitches");
		  res.on('data',function(data){
		    
		    users = JSON.parse(data)
		    // console.log(users)
		  });
		});

		x.end();

	},

	run: function(){
		app.getUsers()

	}


}

app.run()


// var options = {
//     host: 'localhost',
//     port: 3000,
//     path: '/allUsersData',
//     method: 'GET',
//     headers: {
//         accept: 'application/json'
//     }
// };

// console.log("Start");
// var x = http.request(options,function(res){
//   console.log("Connected");
//   res.on('data',function(data){
    
//     users = JSON.parse(data)
//     console.log(users)
//   });
// });

// x.end();
