window.onload = function() {
  var format = d3.format(",");

  // set tooltip for map and barchart
  var tip = d3.tip()
              .attr('class', 'd3-tip')
              // .style('top', d3.event.x)
              // .style('left', d3.event.y)
              .offset([-10, 0])
              .html(function(d) {
                return "<strong>Country: </strong><span class='details'>" +
                d["Country Name"] + "<br></span>" +
                "<strong>Forest area(%): </strong><span class='details'>" +
                format(d.Years[0].value) +"</span>";
              })

  var requests = [d3.json('././Data/new_json.json')];

  // if all requests are fulfilled, run code inside function
  Promise.all(requests).then(function(response) {
    globalData = response

    // load all graphs and functionalitys of these graphs
    checkbox(response)
    linechart(response)
    slider(response)
    createCountryList(response)
    barchart(response, tip)
    map(response, tip)
  }).catch(function(e){
      throw(e);
  });
}
