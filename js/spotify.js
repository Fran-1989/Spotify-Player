var artistVal;
var album;
var songsSaved = [];
var getSongs = [];


$('#search').keypress(function(e){
	var key = e.which;
	if(key === 13) {
		artistVal = $('#search').val();
		$('#albumsSearch').empty();
		requestArtist();
		return false;
	}	
})


function requestArtist(){
$.ajax ({
	url: "https://api.spotify.com/v1/search?type=artist&query=" + artistVal,
	data:'',
	dataType: 'json',
	success: showArtist,
	error: function(e){
			console.log(e.message);
		}
	})
}


function showArtist (response){
	response.artists.items.forEach(function(item){
		var ahref = '<a href="#" class="collection-item" id="'+item.id+'">' + 
					'<h4>'+item.name+'</h4>' + 
					'<img src="'+item.images[0].url+'" class="card-content valign center-block" width="150">' + '</a>';	
		$('#albumsSearch').append(ahref);	
		$("#albumsSearch a").unbind("click").click(function (){
			var id = $(this).attr("id");
			requestArtistAlbums(id);
		});	
	})
}


function requestArtistAlbums(idArtist){
$.ajax ({
	url: "https://api.spotify.com/v1/artists/" + idArtist + "/albums?market=ES",
	data:'',
	dataType: 'json',
	success: showArtistAlbums,
	error: function(e){
			console.log(e.message);
		}
	})
}


function showArtistAlbums(response) {
	$("#modalArtist").empty();
    response.items.forEach(function(item) {
	    var albums = '<div class="album" id="'+item.id+'">' + '<h4 class="album-name">'+item.name+'</h4>' + 
	        		'<img class="album-art" src="'+item.images[0].url+'" width="150">' + 
	        		'<div class="album-tracks"></div>' + '</div>';	
	        		$('#modalArtist').append(albums);

	    $(".album-art").unbind("click").click(function (){
			var idTracks = $(this).parent().attr("id");
			album = idTracks;
			requestAlbumsTracks(idTracks);

  });
    $('#modal1').openModal();
    });
 }     
   
function requestAlbumsTracks(idTracks){
$.ajax ({
	url: "https://api.spotify.com/v1/albums/" + idTracks + "/tracks",
	data:'',
	dataType: 'json',
	success: showAlbumsTracks,
	error: function(e){
			console.log(e.message);
		}
	})
}
   

function showAlbumsTracks (response) {
	response.items.forEach(function(item){  
		var tracks = '<p class="track">' + item.track_number + 
					 ' - ' +  item.name + '</p>' +  '<audio id="sonido" src="'+item.preview_url+'" controls> </audio>' +
					 '<button id="'+item.id+'" class="btn-floating waves-light" type="button" name="action">★</button>';
		$("#"+ album + " .album-tracks").append(tracks);
	})
	$('button').click(function(){
		var id = $(this).attr('id');
		alert("You have sent to favourites this song.")
		songsSaved.push(id);
		window.localStorage.setItem("songs", JSON.stringify(songsSaved));
		getFavouriteSongs();	
	})
}

function getFavouriteSongs(){
	$('#listSpotify').empty();
	getSongs = JSON.parse(window.localStorage.getItem("songs"));
	getSongs.forEach(function(item){
		requestTracks(item);	
	})
}

function requestTracks(songs){
$.ajax ({
	url: "https://api.spotify.com/v1/tracks/" + songs,
	data:'',
	dataType: 'json',
	success: songsFavourite,
	error: function(e){
			console.log(e.message);
		}
	})
}

function songsFavourite(response){
		var htmlList = '<li class="collection-item">' + response.track_number + ' - ' +  response.name + '<audio id="sonido" src="'+response.preview_url+'" controls> </audio>' + '</li>';
		$('#listSpotify').append(htmlList);
}



	