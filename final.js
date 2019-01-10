window.onload = function() {
  var format = d3.format(",");

  // Set tooltips
  var tip = d3.tip()
              .attr('class', 'd3-tip')
              .offset([-10, 0])
              .html(function(d) {
                return "<strong>Country: </strong><span class='details'>" + d["Country Name"] + "<br></span>" + "<strong>Population: </strong><span class='details'>" + format(d['1990']) +"</span>";
              })



  var requests = [d3.json('new_json.json')];
    // if all requests are fulfilled, run code inside function
    Promise.all(requests).then(function(response) {
      // var barPadding = 45;
      // var top = 200;
      // var right = 50;
      // var bottom = 100;
      // var left = 120;
      //
      // // set barchart svg properties
      // var properties = {
      //   width: 500 - left - right,
      //   height: 700 - top - bottom,
      //   padding: 18,
      //   left: left,
      //   right: right,
      //   top: top,
      //   bottom: bottom,
      // }

      // draw map and barchart

      data = map(response);
      slider(data)
      // barchart(response)
      // logscale()
      // draw_chart(properties);
    }).catch(function(e){
        throw(e);
    });

  function barchart(data){

    var barPadding = 45;
    var top = 200;
    var right = 50;
    var bottom = 100;
    var left = 120;

    // set barchart svg properties
    var properties = {
      width: 1000 - left - right,
      height: 700 - top - bottom,
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
                   .domain([0,50000000])
                   .range([properties.height, 0]);
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

    // set bar colours
    // var color = d3.scaleOrdinal()
    //               .range(["#4061bd" , "#b156b7", "#ff6e54"])
    //               .domain(["Average Life Expectancy",
    //               "Inequality-Adjusted Life Expectancy", "Happy Life Years"])

    // var colors= Object.keys(data.Afghanistan);

    // create bars
    rects = svg.selectAll("rect")
               .data(data[0])
               .enter()
               .append("rect")
               .attr("class", "bar")

               // determine x and y value for bar d
               .attr("x", function(d, i) {

                return (i * (properties.width /
                  data[0].length)) + properties.padding;
               })
               .attr("y", function(d) {
          	   	return yScale(0);
          	   })

               // determine height, width and color
               .attr("height", -50)
               .attr("width", properties.width/data[0].length)
               .style('fill', "#00000")

               // show tip when mouse hovers over bar
               .on('mouseover',function(d){
                 tip.show(d);
                d3.select(this)
                  .style("opacity", 0.6)
                  .style("stroke","white")
                  .style("stroke-width",3);
                })
               .on('mouseout', function(d){
                 tip.hide(d);
                 d3.select(this)
                   .style("opacity", 1)
                   .style("stroke","white")
                   .style("stroke-width",0.3);
                 })

    /* made legend with help of:
    Source: https://bl.ocks.org/Jverma/076377dd0125b1a508621441752735fc */

    //create legend element
    var legend = svg.selectAll('legend')
              			.data(colors)
              			.enter().append('g')
              			.attr('class', 'legend')
              			.attr('transform', function(d,i)
                      {
                        return 'translate(0,' + i * 20 + ')';
                      });

    // add coloured rectangles after the country name to the legend
  	legend.append('rect')
    			.attr('x', properties.width + 35)
          .attr('y', -72)
    			.attr('width', 18)
    			.attr('height', 18)
    			.style('fill', '#000000');

  	// add names of each country to the legend
  	legend.append('text')
    			.attr('x', properties.width + 30)
    			.attr('y', -65)
    			.attr('dy', '.35em')
    			.style('text-anchor', 'end')
    			.text(function(d){ return d; });

    // add y-label
    svg.append('text')
       .attr("class", "yLabel")
       .attr('x', -200)
       .attr('y', -40)
       .attr('transform', 'rotate(-90)')
       .attr('text-anchor', 'middle')
       .text("Years")

    // add error message when no data is available
    svg.append('text')
      .style("opacity", 0)
      .attr("class", "error_message")
      .attr('x', 200)
      .attr('y', 150)
      .attr('text-anchor', 'middle')
      .text("No Data Available")


  }

  function map(data) {
    var margin = {top: 0, right: 0, bottom: 0, left: 0},
                width = 960 - margin.left - margin.right,
                height = 500 - margin.top - margin.bottom;

    // scale green to amount of trees, but how?
    var color = d3.scaleThreshold()
        .domain([0,10,20,30,40,50,60,70,80,90,100])
        .range(["#ebfaeb", "#d6f5d6", "#adebad", "#85e085", "#5cd65c", "#33cc33","#29a329","#1f7a1f","#145214","#0a290a", "#051405"]);

    var path = d3.geoPath();

    var svg = d3.select("body")
                .append("svg")
                .attr("width", width)
                .attr("height", height)
                .append('g')
                .attr('class', 'map');

    var projection = d3.geoMercator()
                       .scale(130)
                      .translate( [width / 2, height / 1.5]);

    var path = d3.geoPath().projection(projection);

    svg.call(tip);

    svg.append("g")
        .attr("class", "countries")
        .selectAll("path")
        .data(data[0])
        .enter().append("path")
        .attr("d", path)
        .style("fill", function(d) {

          // console.log(data[0][d]['1990']);

          return color(d['1990']);
         })
        .style('stroke', 'white')
        .style('stroke-width', 1.5)
        .style("opacity",0.8)
        // tooltips
          .style("stroke","white")
          .style('stroke-width', 0.3)
          .on('mouseover',function(d){
            tip.show(d);

            d3.select(this)
              .style("opacity", 1)
              .style("stroke","white")
              .style("stroke-width",3);
          })
          .on('mouseout', function(d){
            tip.hide(d);

            d3.select(this)
              .style("opacity", 0.8)
              .style("stroke","white")
              .style("stroke-width",0.3);
          });

    // add slidebar
  d3.select("body").append("div")
    .attr("class", "slidecontainer")
    .append("input")
      .attr("type", "range")
      .attr("min", "1990")
      .attr("max", "2015")
      .attr("value", "1990")
      .attr("class", "slider")
      .attr("id", "myRange")

  // add 'p' element to show the current year of the slidebar
  d3.select(".slidecontainer").append("p")
                  .text("Year:")
                  .append("span")
                    .attr("id", "demo")
                    .style("font-weight","bold")

  }
  function updateMap(data, year){

    var color = d3.scaleThreshold()
        .domain([0,10,20,30,40,50,60,70,80,90,100])
        .range(["#ebfaeb", "#d6f5d6", "#adebad", "#85e085", "#5cd65c", "#33cc33","#29a329","#1f7a1f","#145214","#0a290a", "#051405"]);

    d3.select(".countries").selectAll("path")
                           .transition(100)
                           .style("fill", function(d) {

                             // console.log((d[year]));
                             // console.log(color(year));
                             return color(d[year]);
                            })
  }
    /* this function adds functionality to the sliderbar
  source: https://www.w3schools.com/howto/howto_js_rangeslider.asp */
  function slider(data){

    // get slider and output element
    var slider = document.getElementById("myRange");
    var output = document.getElementById("demo");

    /* output element shows the current value (2007) of the slider when page is
    loaded */
    output.innerHTML = slider.value;

    /* when slider is moved, update value shown beneath slidebar, update graph
    with data of required year*/
    slider.oninput = function() {

      output.innerHTML = this.value;

      // list = combineData(data, output.innerHTML)
      updateMap(data, output.innerHTML)
    }
  }
}
