
/* this function creates a barchart*/
function barchart(data, tip){

  // set padding
  var barPadding = 45;
  var top = 20;
  var right = 50;
  var bottom = 50;
  var left = 50;

  // set barchart svg properties
  var properties = {
    width: 1400 - left - right,
    height: 300 - top - bottom,
    padding: 18,
    left: left,
    right: right,
    top: top,
    bottom: bottom,
  }

  // determine color scale
  var color = d3.scaleThreshold()
      .domain([0,10,20,30,40,50,60,70,80,90,100])
      .range(["#ebfaeb", "#d6f5d6", "#adebad", "#85e085", "#5cd65c",
              "#33cc33","#29a329","#1f7a1f","#145214","#0a290a", "#051405"]);

  // create svg
  var svg = d3.select("#area3").append("svg")
              .attr("class", "barchart")
              .attr("viewBox", [0, 0, (properties.width + properties.right
                                      + properties.left),
                                  (properties.height + properties.top
                                  + properties.bottom)].join(' '))
              .append("g")
              .attr("transform", "translate(" + properties.left +
                    "," + properties.top + ")");

  // make x and y scales
  var yScale = d3.scaleLinear()
                 .domain([0,100])
                 .range([properties.height,0]);
  var xScale = d3.scaleBand()
                 .domain(data[0].length)
                 .range([0, properties.width])

  // make axis
  var xAxis = d3.axisBottom()
                .scale(xScale)
                .ticks(data[0].length)
  var yAxis = d3.axisLeft()
                .scale(yScale)

  svg.append("g")
     .attr("class", "y axis")
     .call(yAxis);

  svg.append("g")
     .attr("class", "x axis")
     .attr("transform", "translate(0," + properties.height + ")")
     .call(xAxis)
     .selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", ".15em")
        .attr("transform", "rotate(-20)")

  // create bars
  rects = svg.selectAll("rect")
             .data(data[0])
             .enter()
             .append("rect")
             .attr("class", "bar")

             // determine x and y value for bar d
             .attr("x", function(d, i) {
              return (i * (properties.width /
                data[0].length));
             })
             .attr("y", function(d) {
        	   	return yScale(d.Years[0].value);
        	   })

             // determine height, width and color of bars
             .attr("height", function(d){
               return(properties.height - yScale(d.Years[0].value))
             })
             .attr("width", properties.width/data[0].length)
             .style("fill", function(d) { return color(d.Years[0].value);})
             .style('fill', "#00000")

             // show tip when mouse hovers over bar and highlight bar
             .on('mouseover',function(d){
              tip.show(d)
              d3.select(this)
                .style("opacity", 0.6)
                .style("stroke","white")
                .style("stroke-width",3);

              // highlight bar in map
              activeCountry = d["Country Name"].split(' ').join('')
              d3.select(".countries").selectAll("path")
                .classed("barLight", function(d) {
                  if ( d["Country Name"].split(' ').join('') == activeCountry) {
                    d3.select(this)
                      .style("opacity", 0.6)
                      .style("stroke","ff0000")
                      .style("stroke-width",2);
                      return true
                  }
                  else return false;
                });
              })

              .on('mouseout', function(d){
                tip.hide(d);
                d3.select(this)
                 .style("opacity", 1)
                 .style("stroke","white")
                 .style("stroke-width",0);
                activeCountry = d["Country Name"].split(' ').join('')
                d3.select(".countries").selectAll("path")
                  .classed("barLight", function(d) {
                    if ( d["Country Name"].split(' ').join('') == activeCountry) {
                      d3.select(this)
                        .style("opacity", 1)
                        .style("stroke","white")
                        .style("stroke-width",0.3);
                      return true
                    }
                    else return false;
                  });
                })

              // when clicked on bar, show country in linegraph
              .on('click', function(d){
                updateLineGraph(d)
              })

  // add x-axis label
  svg.append("text")
      .attr("transform",
            "translate(" + (properties.width/2) + " ," +
                           (properties.height + properties.top + 10) + ")")
    .style("text-anchor", "middle")
    .text("Countries");

    // add y-axis label
  svg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - properties.left)
      .attr("x",0 - (properties.height / 2))
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text("Forest area (% of land area)");
}

/* this function updates the bargraph when the slider is moved*/
function updateBar(data, year){

  // determine padding
  var barPadding = 45;
  var top = 20;
  var right = 50;
  var bottom = 50;
  var left = 50;

  // set barchart svg properties
  var properties = {
    width: 1400 - left - right,
    height: 300 - top - bottom,
    padding: 18,
    left: left,
    right: right,
    top: top,
    bottom: bottom,
  }

  // determine color scale
  var color = d3.scaleThreshold()
                .domain([0,10,20,30,40,50,60,70,80,90,100])
                .range(["#ebfaeb", "#d6f5d6", "#adebad", "#85e085", "#5cd65c",
                 "#33cc33","#29a329","#1f7a1f","#145214","#0a290a", "#051405"]);

  // determine y-scale
  var yScale = d3.scaleLinear()
                 .domain([0,100])
                 .range([properties.height,0]);

  // update bars
  d3.select(".barchart").selectAll(".bar")
    .transition()
    .ease(d3.easeExp)
    .duration(1000)
    .attr("y", function(d) {
      var new_y
      d.Years.forEach(function(element){
        if(element.year === year){
         new_y =  yScale(element.value);
        }
      })
      return new_y
    })

    // determine height, width and color
    .attr("height", function(d){
      var new_height
      d.Years.forEach(function(element){
        if(element.year === year){
          new_height =  properties.height - yScale(element.value);
        }
      })
       return new_height
      })
    .style("fill", function(d) {
     var new_color
     d.Years.forEach(function(element){
       if(element.year === year){

        new_color =  color(element.value);
       }
     })
     return new_color
    })
}
