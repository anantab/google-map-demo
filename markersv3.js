// JavaScript Document
var map;
var infowindow=new google.maps.InfoWindow();
var lat;
var lng;
var full_address; 

function init_locator()
 {
	var centerLatitude = -25.48295117535531;
	var centerLongitude =133.9453125;
	var startZoom = 3;
	var myLatlng = new google.maps.LatLng(centerLatitude,centerLongitude);
	var myOptions = {
  	zoom: startZoom,
  	center: myLatlng,
  	mapTypeId: google.maps.MapTypeId.ROADMAP
}
   map = new google.maps.Map(document.getElementById("map"), myOptions);
   getLocationonMapclick();
   
}
 
function codeAddress(address) {
   var  geocoder = new google.maps.Geocoder();
     geocoder.geocode({'address': address}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
	
	 lat=results[0].geometry.location.lat();
	  lng=results[0].geometry.location.lng();
	  full_address=results[0].formatted_address;
	    map.setCenter(results[0].geometry.location);
         var marker = new google.maps.Marker({
           map: map, 
           position: results[0].geometry.location
        });
	 map.setZoom(18);
	 var InfoContent=address+'<br />(Latitude:'+lat+', Longitude:'+lng+')<br /><br /><input type="button" id="copylatlng" value="Copy Latitude and Longitude" class="button"/>';
	 
	 infowindow.setContent(InfoContent);
     infowindow.open(map,marker); 
	
		google.maps.event.addListener(marker, 'click', function() {
		 infowindow.setContent(InfoContent);
		infowindow.open(map,marker);
  });
	      } else {
        alert("Geocode was not successful for the following reason: " + status);
      }
    });
 }


function getLocationonMapclick()//reverse geocoding
{ 
  var  geocoder = new google.maps.Geocoder();
   google.maps.event.addListener(map, 'click', function(event) {
  	geocoder.geocode({'latLng': event.latLng}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
       
	   var marker = new google.maps.Marker({
              position: event.latLng, 
              map: map
          }); 
		  marker.setMap(null);
		  lat=event.latLng.lat();
		  lng=event.latLng.lng();
		   full_address=results[0].formatted_address;
	  var InfoContent=results[0].formatted_address+'<br />(Latitude:'+ lat +', Longitude:'+ lng+')<br /><br /><input type="button" id="copylatlng" value="Copy Latitude and Longitude" class="button"/>';
		
		infowindow.setContent(InfoContent);
          infowindow.open(map,marker);
	
      } else {
        alert("Geocoder failed due to: " + status);
      }
    });
 		 
  });
														
}

$(document).ready(function(){
	$("#copylatlng").live('click',function(){
			$("#lat").val(lat);	
			$("#lng").val(lng);
			$("#full_address").val(full_address);
    });					   
						   
});
