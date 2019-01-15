window.onload = function() {
  var format = d3.format(",");

  // Set tooltips
  var tip = d3.tip()
              .attr('class', 'd3-tip')
              .offset([-10, 0])
              .html(function(d) {
                return "<strong>Country: </strong><span class='details'>" + d["Country Name"] + "<br></span>" + "<strong>Population: </strong><span class='details'>" + format(d.Years[0].value) +"</span>";
              })



  var requests = [d3.json('scripts/new_json.json')];
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


      data = map(response);

      barchart(response)
      linechart(response)
      slider(data)
      // logscale()
      // draw_chart(properties);
    }).catch(function(e){
        throw(e);
    });
  function linechart(data){
    var barPadding = 45;
    var top = 20;
    var right = 50;
    var bottom = 50;
    var left = 50;

    // set barchart svg properties
    var properties = {
      width: 600 - left - right,
      height: 500 - top - bottom,
      padding: 0,
      left: left,
      right: right,
      top: top,
      bottom: bottom,
    }
    // create svg
    var svg = d3.select("#area2")
                .append("svg")
                .attr("class", "linechart")
                .attr("width", properties.width +
                      properties.left + properties.right)
                .attr("height", properties.height +
                      properties.top + properties.bottom)
                .append("g")
                .attr("transform", "translate(" + properties.left +
                      "," + properties.top + ")");

    var temp_list_1 = []
    data[0][4].Years.forEach(function(element){
      temp_list_1.push(element.year)
    })
    let min_1 = Math.min(...temp_list_1);
    let max_1 = Math.max(...temp_list_1);

    var xScale = d3.scaleTime()
      .domain([new Date(min_1.toString()),new Date(max_1.toString())])
      .range([0, properties.width])

    var temp_list = []
    data[0][4].Years.forEach(function(element){
      temp_list.push(element.value)
    })

    let min = Math.min(...temp_list);
    let max = Math.max(...temp_list);

    // scale.range aanpassen
    var yScale = d3.scaleLinear()
      .domain([min, max]).nice()
      .range([properties.height, 0]);

    var color = d3.scaleOrdinal(d3.schemeCategory10);

    /* Add Axis into SVG */
    var xAxis = d3.axisBottom(xScale)
                  .ticks(Object.keys(data[0][4].Years).length/2)
    var yAxis = d3.axisLeft(yScale)

    svg.append("g")
      .attr("class", "x_axis")
      .attr("transform", `translate(0, ${properties.height})`)
      .call(xAxis);

    svg.append("g")
      .attr("class", "y_axis")
      .call(yAxis)

    var line = d3.line()
      .x(function(d) {return xScale(new Date(d.year)); }) // set the x values for the line generator
      .y(function(d) { return yScale(d.value); }) // set the y values for the line generator
      .curve(d3.curveMonotoneX) // apply smoothing to the line

    svg.append("path")
        .datum(data[0][4].Years) // 10. Binds data to the line
        .attr("class", "line") // Assign a class for styling
        .attr("d", line) // 11. Calls the line generator
    svg.selectAll(".dot")
        .data(data[0][4].Years)
      .enter().append("circle") // Uses the enter().append() method
        .attr("class", "dot") // Assign a class for styling
        .attr("cx", function(d) { return xScale(new Date(d.year)) })
        .attr("cy", function(d) { return yScale(d.value) })
        .attr("r", 5)
          .on("mouseover", function(a, b, c) {
            d3.select(this)
            .style("fill", "#000000")
            console.log(a)
          })
          .on("mouseout", function() {
            d3.select(this)
            .style("fill", "#ffab00")
           })
          .on("click", function(d){
              d3.select(".slider")
                .transition()
                .duration(1000)
                .attr("value", d.year)
          })


  // var focus = svg.append("g")
  //     .attr("class", "focus")
  //     .style("display", "none");
  //
  // focus.append("circle")
  //     .attr("r", 4.5);
  }

  function updateLineGraph(data){

    var barPadding = 45;
    var top = 20;
    var right = 50;
    var bottom = 50;
    var left = 50;

    // set barchart svg properties
    var properties = {
      width: 600 - left - right,
      height: 500 - top - bottom,
      padding: 0,
      left: left,
      right: right,
      top: top,
      bottom: bottom,
    }
    var temp_list_1 = []
    data.Years.forEach(function(element){
      temp_list_1.push(element.year)
    })
    let min_1 = Math.min(...temp_list_1);
    let max_1 = Math.max(...temp_list_1);

    var xScale = d3.scaleTime()
      .domain([new Date(min_1.toString()),new Date(max_1.toString())])
      .range([0, properties.width])

    var temp_list = []
    data.Years.forEach(function(element){
      temp_list.push(element.value)
    })

    let min = Math.min(...temp_list);
    let max = Math.max(...temp_list);

    // scale.range aanpassen
    var yScale = d3.scaleLinear()
      .domain([min, max]).nice()
      .range([properties.height, 0]);

    d3.select(".y_axis")
     .transition()
     .duration(1000)
     .call(d3.axisLeft(yScale));

    var line = d3.line()
      .x(function(d) {return xScale(new Date(d.year)); }) // set the x values for the line generator
      .y(function(d) { return yScale(d.value); }) // set the y values for the line generator
      .curve(d3.curveMonotoneX) // apply smoothing to the line

    d3.select(".line")
      .datum(data.Years)
      .transition()
      .duration(1000)
      // .attr("class", "line")
      .attr("d", line)

    d3.selectAll(".dot")
      .data(data.Years)
      .transition()
      .duration(1000)
      .attr("cx", function(d) { return xScale(new Date(d.year)) })
      .attr("cy", function(d) { return yScale(d.value) })




        // svg.append("path")
        //     .datum(data[0][4].Years) // 10. Binds data to the line
        //     .attr("class", "line") // Assign a class for styling
        //     .attr("d", line) // 11. Calls the line generator
  }

  function barchart(data){

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

    // set bar colours
    // var color = d3.scaleOrdinal()
    //               .range(["#4061bd" , "#b156b7", "#ff6e54"])
    //               .domain(["Average Life Expectancy",
    //               "Inequality-Adjusted Life Expectancy", "Happy Life Years"])

    // var colors= Object.keys(data.Afghanistan);
    // console.log(data[0]);
    // console.log(data[0][0].Years[0].value);
    // create bars
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

                activeCountry = d["Country Name"]
                d3.select(".countries").selectAll("path")
                  .classed("barLight", function(d) {
                    if ( d["Country Name"] == activeCountry) {
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
                  activeCountry = d["Country Name"]
                  d3.select(".countries").selectAll("path")
                    .classed("barLight", function(d) {
                      if ( d["Country Name"] == activeCountry) {
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
        // console.log(d);
        // console.log(color(year));
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
           // console.log(color(year));
           var new_height
           d.Years.forEach(function(element){
             if(element.year === year){
              new_height =  properties.height - yScale(element.value);
             }
           })
           return new_height
          })


  }
  function map(data) {
    var margin = {top: 0, right: 0, bottom: -100, left: 0},
                width = 960 - margin.left - margin.right,
                height = 500 - margin.top - margin.bottom;

    // scale green to amount of trees, but how?
    var color = d3.scaleThreshold()
        .domain([0,10,20,30,40,50,60,70,80,90,100])
        .range(["#ebfaeb", "#d6f5d6", "#adebad", "#85e085", "#5cd65c", "#33cc33","#29a329","#1f7a1f","#145214","#0a290a", "#051405"]);

    var path = d3.geoPath();

    var svg = d3.select("#area1")
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

          return color(d.Years[0].value);
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

          activeCountry = d["Country Name"]
          d3.select(".barchart").selectAll(".bar")
            .classed("barLight", function(d) {
              if ( d["Country Name"] == activeCountry) {
                d3.select(this)
                  .style("opacity", 0.6)
                  .style('fill', "#ff0000")
                  .style("stroke","white")
                  .style("stroke-width",2);

                  return true
              }
              else return false;
            });
          })
          .on('mouseout', function(d){
            tip.hide(d);

            d3.select(this)
              .style("opacity", 0.8)
              .style("stroke","white")
              .style("stroke-width",0.3);

            activeCountry = d["Country Name"]
            d3.select(".barchart").selectAll(".bar")
              .classed("barLight", function(d) {
                if ( d["Country Name"] == activeCountry) {
                  d3.select(this)
                    .style("opacity", 1)
                    .style('fill', "#000000")
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
                             // console.log(color(year));
                             var new_color
                             d.Years.forEach(function(element){
                               if(element.year === year){

                                new_color =  color(element.value);
                               }
                             })
                             return new_color
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
      updateBar(data, output.innerHTML)
    }
  }
}
