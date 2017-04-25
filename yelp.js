
var map;
var bounds;
var marker;
var amarkers = [];

function initialize () {

	var def = {lat:32.75 , lng:-97.13};
    map = new google.maps.Map(document.getElementById('map'), {
    center: def,
    zoom: 16
    });
	google.maps.event.addListener(map, 'bounds_changed', function() 
	{
        bounds =  map.getBounds();
		console.log(bounds);
        //do whatever you want with those bounds
    });
}



function sendRequest () {
   var xhr = new XMLHttpRequest();
   for(i=0; i<amarkers.length; i++){
        amarkers[i].setMap(null);
    }
   //xhr.open("GET", "proxy.php?term=indian+restaurant&location=Arlington+Texas&limit=5", true);bounds.f.f,bounds.b.b|bounds.f.b,bounds.b.f
   var query = encodeURI(document.getElementById("search").value);
   xhr.open("GET", "proxy.php?term="+query+"&bounds="+bounds.f.f+","+bounds.b.b+"|"+bounds.f.b+","+bounds.b.f+"&limit=10",true);
   xhr.setRequestHeader("Accept","application/json");
   xhr.onreadystatechange = function () {
       if (this.readyState == 4 && this.status == 200) {
          var json = JSON.parse(this.responseText);
		  console.log(typeof(marker));
          //var str = JSON.stringify(json,undefined,2);
		  var scrpt = document.getElementById("map");
		  var div="";
		  document.getElementById("t1").innerHTML = "";
		  for (i in json.businesses)
		  {
			var coord = json.businesses[i].location.coordinate;
			initMap(Number(coord.latitude),Number(coord.longitude),json.businesses[i].name);
			//console.log(coord.latitude);
			div += "<tr><td colspan='1'><img src= '"+json.businesses[i].image_url+"' alt= 'Restaurant_IMG'></td>";
			div += "<td><A HREF= '"+json.businesses[i].url+"' target='_blank'>"+json.businesses[i].name+"</A>";
			div += "</br><b>Rating:</b> <img src= '"+json.businesses[i].rating_img_url+"' alt= 'Rating_IMG'>"
			div += "</br><b>Review:</b> "+json.businesses[i].snippet_text+"</td></tr>";
			document.getElementById("t1").innerHTML = div;
		  }
		  
       }
   };
   xhr.send(null);
}


function initMap(lati,longi,rname) {
	
	if(lati !== undefined && longi !== undefined)
	{
		//console.log(lati+"  "+longi);
		var myLatlng = new google.maps.LatLng(lati,longi);
		marker = new google.maps.Marker({
		position: myLatlng,
		map: map,
		title: rname
		});
		amarkers.push(marker);
	}
}

