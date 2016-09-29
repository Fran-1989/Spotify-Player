$(document).on('click', '#btnLogin', login);


function login() {
	var url = 'js/login.jsonp';
	var user = $('#user').val();
	var pass = $('#pass').val();

	$.ajax ({
		type: 'GET',
		url: url,
		crossDomain: true,
		jsonpCallback: 'getUsersAndPass',
		contentType: "application/jsonp",
		dataType: 'jsonp',
		success: function(jsonp) {
			var validate = 0;
			for (var i = 0; i < jsonp.users.length; i++) {
				if(jsonp.users[i].user === user && jsonp.users[i].pass === pass) {
					validate = 1;
				}
			}
			if (validate === 1) {
				console.log ("User and pass are right.");
				window.location.href="spotifylist.html";
				var myId = {
					user: user,
					pass: pass
				};
				window.sessionStorage.setItem('user', JSON.stringify(myId));
			} else {
				console.log ("User and pass are wrong. Type again.")
			}
		},
		error: function(e){
			console.log(e.message);
		}
	})
}