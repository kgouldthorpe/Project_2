function buildPlot() {
    /* data route */
  var url = "/state_breakdown";
  d3.json(url).then(function(response) {

    console.log(response);

    var data = [response];

    var layout = {
      title: "Breakdown of Charging Station by Company",
      xaxis: {
        title: "Charging Station Companies"
      },
      yaxis: {
        title: "Count of Locations"
      }
    };

    Plotly.newPlot("plot", data, layout);
  });
}

buildPlot();
