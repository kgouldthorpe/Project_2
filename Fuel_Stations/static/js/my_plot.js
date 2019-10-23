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

    d3.json("/buildPlot/"+selectedstate).then(function(response)  {
      var geourl = "https://developer.nrel.gov/api/alt-fuel-stations/v1.json?fuel_type=ELEC&state="+response.state_abv+"&api_key=ePJR3i7vRMUHuW4fGrtKVLhgjIk2DHosX4AVbBl3&format=JSON";

        d3.json(geourl).then(function(response_nrel) {
         // variable for x and y for 1st display
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
          var trace1 = {
            type: "bar",
            x: x,
            y: y,
            bar: {
              color: "#2ECC71"
            }
          };

          var data1 = [trace1];
        
          //set layout
          var layout = {
            title: "Breakdown of Charging Station by Company in " +response.state_name,
            xaxis: {
              title: "Charging Station Companies",
              tickangle: 21
            },
            yaxis: {
              title: "Count of Locations"
            }
          };

          Plotly.newPlot("plot", data1, layout);
          
          // variable for x and y for 2nd display
          var plotly_pie = response_nrel.fuel_stations.map(data => data.access_code)
          console.log(plotly_pie);
          const breakdown = Object.create(null);
          plotly_pie.forEach(x => {
            breakdown[x] = breakdown[x] ? breakdown[x] + 1 : 1;
          });
          console.log(breakdown);
       
          function returnPie(){
            return Object.values(breakdown);
          };
       
          var x2 = [...new Set(plotly_pie)];
          var y2 = returnPie(breakdown);

          // create trace for plotly
          var trace2 = {
            type: "pie",
            labels: x2,
            values: y2
          };

          var data2 = [trace2];
        
          //set layout
          var layout2 = {
            title: "Public vs Private Charging Stations in " +response.state_name,
            }
          Plotly.newPlot("pie", data2, layout2);  
      });
  });  

}    
buildPlot();

