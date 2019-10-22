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

function buildPlot() {
  var selectedstate = d3.select("#ddlStates").property("value");

  d3.json("/getMapData/"+selectedstate).then(function(response) {
      var geourl = "https://developer.nrel.gov/api/alt-fuel-stations/v1.json?fuel_type=ELEC&state="+response.state_abv+"&api_key=ePJR3i7vRMUHuW4fGrtKVLhgjIk2DHosX4AVbBl3&format=JSON";

      d3.json(geourl).then(function(response_nrel) {
        // variable for x and y
        var plotly_data = response_nrel.fuel_stations.map(data => data.ev_network)
        console.log(plotly_data);
        const counts = Object.create(null);
        plotly_data.forEach(x => {
          counts[x] = counts[x] ? counts[x] + 1 : 1;
        });
       console.log(counts);
       
        function returnValues(){
          return Object.values(counts);
        };
       
        var x = [...new Set(plotly_data)];
        var y = returnValues(counts);

        // create trace for plotly
        var trace = {
          type: "bar",
          x: x,
          y: y,
          bar: {
            color: "#2ECC71"
          }
        };

        var data = [trace];
        
        //set layout
        var layout = {
          title: "Breakdown of Charging Station by Company",
          xaxis: {
            title: "Charging Station Companies",
            tickangle: 21
          },
          yaxis: {
            title: "Count of Locations"
          }
        };

        Plotly.newPlot("plot", data, layout);
      });
    });    
}
buildPlot();