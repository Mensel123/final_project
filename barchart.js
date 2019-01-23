function barchart(data, tip){

  var barPadding = 45;
  var top = 20;
  var right = 50;
  var bottom = 100;
  var left = 120;

  // set barchart svg properties
  var properties = {
    width: 1400 - left - right,
    height: 500 - top - bottom,
    padding: 18,
    left: left,
    right: right,
    top: top,
    bottom: bottom,
  }
  // create svg
  var svg = d3.select("body")
              .append("svg")
              .attr("class", "barchart")
              .attr("width", properties.width +
                    properties.left + properties.right)
              .attr("height", properties.height +
                    properties.top + properties.bottom)
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

  rects = svg.selectAll("rect")
             .data(data[0])
             .enter()
             .append("rect")
             .attr("class", "bar")

             // determine x and y value for bar d
             .attr("x", function(d, i) {
               // console.log(d);
               // console.log(yScale(d['1990']));
              return (i * (properties.width /
                data[0].length));
             })
             .attr("y", function(d) {
        	   	return yScale(d.Years[0].value);
        	   })

             // determine height, width and color
             .attr("height", function(d){
               // console.log(properties.height - yScale(d['1990']));
               return(properties.height - yScale(d.Years[0].value))
             })
             .attr("width", properties.width/data[0].length)
             .style('fill', "#00000")

             // show tip when mouse hovers over bar
             .on('mouseover',function(d){

              tip.show(d)
              d3.select(this)
                .style("opacity", 0.6)
                .style("stroke","white")
                .style("stroke-width",3);

              activeCountry = d["Country Name"].split(' ').join('')
              d3.select(".countries").selectAll("path")
                .classed("barLight", function(d) {
                  if ( d["Country Name"].split(' ').join('') == activeCountry) {
                    d3.select(this)
                      .style("opacity", 0.6)
                      .style("stroke","white")
                      .style("stroke-width",3);
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
                 .style("stroke-width",0.3);
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
              .on('click', function(d){
                updateLineGraph(d)
              })

  /* made legend with help of:
  Source: https://bl.ocks.org/Jverma/076377dd0125b1a508621441752735fc */

  //create legend element
  // var legend = svg.selectAll('legend')
  //           			.data(colors)
  //           			.enter().append('g')
  //           			.attr('class', 'legend')
  //           			.attr('transform', function(d,i)
  //                   {
  //                     return 'translate(0,' + i * 20 + ')';
  //                   });
  //
  // // add coloured rectangles after the country name to the legend
	// legend.append('rect')
  // 			.attr('x', properties.width + 35)
  //       .attr('y', -72)
  // 			.attr('width', 18)
  // 			.attr('height', 18)
  // 			.style('fill', '#000000');
  //
	// // add names of each country to the legend
	// legend.append('text')
  // 			.attr('x', properties.width + 30)
  // 			.attr('y', -65)
  // 			.attr('dy', '.35em')
  // 			.style('text-anchor', 'end')
  // 			.text(function(d){ return d; });
  //
  // // add y-label
  // svg.append('text')
  //    .attr("class", "yLabel")
  //    .attr('x', -200)
  //    .attr('y', -40)
  //    .attr('transform', 'rotate(-90)')
  //    .attr('text-anchor', 'middle')
  //    .text("Years")
  //
  // // add error message when no data is available
  // svg.append('text')
  //   .style("opacity", 0)
  //   .attr("class", "error_message")
  //   .attr('x', 200)
  //   .attr('y', 150)
  //   .attr('text-anchor', 'middle')
  //   .text("No Data Available")


}
function updateBar(data, year){
  var barPadding = 45;
  var top = 20;
  var right = 50;
  var bottom = 100;
  var left = 120;

  // set barchart svg properties
  var properties = {
    width: 1000 - left - right,
    height: 500 - top - bottom,
    padding: 18,
    left: left,
    right: right,
    top: top,
    bottom: bottom,
  }
  var yScale = d3.scaleLinear()
                 .domain([0,100])
                 .range([properties.height,0]);

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
}
