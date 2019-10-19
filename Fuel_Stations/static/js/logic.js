// Creating map object
//var myMap = L.map("map", {
//  center: [39, -98], // City coordinates will come here
//  zoom:5
//});
//
//// Adding tile layer to the map
//L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
//  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
//  maxZoom: 18,
//  id: "mapbox.streets",
//  accessToken: API_KEY
//}).addTo(myMap);
//ORIGINAL CODE DELETE LATER
// Store API query variables
//var baseURL = "https://data.cityofnewyork.us/resource/fhrw-4uyv.json?";
//var date = "$where=created_date between'2016-01-10T12:00:00' and '2017-01-01T14:00:00'";
//var complaint = "&complaint_type=Rodent";
//var limit = "&$limit=10000";

// Assemble API query URL
//var url = baseURL + date + complaint + limit;
//ORIGINAL CODE COMPLETE

//DUMMY CODE
// var geourl = response[0].outputurl;

//geourl = "http://devapi.mygasfeed.com/stations/radius/34/-84/5/reg/price/rfej9napna.json"
//var geourl = 'http://curran.github.io/data/uci_ml/iris/iris.js';
//var geourl = "https://developer.nrel.gov/api/alt-fuel-stations/v1.json?fuel_type=ELEC&state=CA&api_key=ePJR3i7vRMUHuW4fGrtKVLhgjIk2DHosX4AVbBl3&format=JSON"
//var geourl = 'https://api.eia.gov/series/?api_key=cc4be09c62305e0fbedc01847018632c&series_id=TOTAL.RUUCUUS.M';

// Grab the data with d3
//d3.json(geourl).then(function(response) {
////$.getJSON(geourl, function(response) {
//  // Create a new marker cluster group
//var myMap = L.map("map", {
//  center: [39, -98], // City coordinates will come here
//  zoom:5
//});
//
//// Adding tile layer to the map
//L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
//  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
//  maxZoom: 18,
//  id: "mapbox.streets",
//  accessToken: API_KEY
//}).addTo(myMap);
//
//
//  var markers = L.markerClusterGroup();
//
//  // Loop through data
//  for (var i = 0; i < response.fuel_stations.length; i++) {
//
//    // Set the data location property to a variable
////    var location = response[i].location;
//      var station = response.fuel_stations[i]
//    // Check for location property
//    if (station) {
//
//      // Add a new marker to the cluster group and bind a pop-up
//      markers.addLayer(L.marker([station.latitude, station.longitude])
//        .bindPopup(station.ev_network));
//    }
//
//  }
//
//  // Add our marker cluster layer to the map
//  myMap.addLayer(markers);
//
//});

d3.json("/getstates").then(function(response) {
    var stateslist = response.name;
    var str = "";
    for(i=0; i< stateslist.length; i++)
    {
        str = str+"<option value='"+ stateslist[i]+"'>"+stateslist[i]+"</option>";
    }
    //alert(str);
    d3.select("#ddlStates").html(str);


});

function getMapData()
{
    var selectedstate = d3.select("#ddlStates").property("value")
    d3.json("/getMapData/"+selectedstate).then(function(response) {
        var geourl = "https://developer.nrel.gov/api/alt-fuel-stations/v1.json?fuel_type=ELEC&state="+response.state_abv+"&api_key=ePJR3i7vRMUHuW4fGrtKVLhgjIk2DHosX4AVbBl3&format=JSON";

        d3.json(geourl).then(function(response_nrel) {
        //$.getJSON(geourl, function(response) {
          // Create a new marker cluster group
        var myMap = L.map("map", {
          center: [parseFloat(response.state_lat), parseFloat(response.state_lon)], // City coordinates will come here
          zoom:7
        });

        // Adding tile layer to the map
        L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
          attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
          maxZoom: 18,
          id: "mapbox.streets",
          accessToken: API_KEY
        }).addTo(myMap);


          var markers = L.markerClusterGroup();

          // Loop through data
          for (var i = 0; i < response_nrel.fuel_stations.length; i++) {

            // Set the data location property to a variable
        //    var location = response[i].location;
              var station = response_nrel.fuel_stations[i]
            // Check for location property
            if (station) {

              // Add a new marker to the cluster group and bind a pop-up
              markers.addLayer(L.marker([station.latitude, station.longitude])
                .bindPopup(station.ev_network));
            }

          }

          // Add our marker cluster layer to the map
          myMap.addLayer(markers);

        });
    });
}

