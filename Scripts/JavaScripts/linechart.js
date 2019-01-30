var format = d3.format(",");

// set tooltip for linechart
var tip_2 = d3.tip()
            .attr('class', 'd3-tip')
            .offset([-10, 0])
            .html(function(d) {
              return "<strong>Country: </strong><span class='details'>" + d[0] + "<br></span>" + "<strong>Year: </strong><span class='details'>" + (d[1]) +"</span>";
            })


// this function draws the linegraph when the page is loaded
function linechart(data){
  data_list = []

  // set padding
  var top = 20;
  var right = 10;
  var bottom = 50;
  var left = 85;

  // set barchart svg properties
  var properties = {
    width: 700 - left - right,
    height: 500 - top - bottom,
    padding: 0,
    left: left,
    right: right,
    top: top,
    bottom: bottom,
  }

  /* currentData tracks which country is present in the graph when compare is
  not checked*/
  currentData = data[0][4]

  // create svg
  var svg = d3.select("#area2").append("svg")
              .attr("class", "linechart")
              .attr("viewBox", [0, 0, (properties.width + properties.right + properties.left),
                                  (properties.height + properties.top + properties.bottom)].join(' '))
              .append("g")
              .attr("transform", "translate(" + properties.left +
                    "," + properties.top + ")");

  // call tip showing country name and year
  svg.call(tip_2);

  /* data[0][4] is Armenia as default, collect x-data of all years in put it in
  temp list*/
  var temp_list_1 = []
  data[0][4].Years.forEach(function(element){
    temp_list_1.push(element.year)
  })

  // calculate min and max values off all years to determine x-axis range
  let min_1 = Math.min(...temp_list_1);
  let max_1 = Math.max(...temp_list_1);

  // make x-scale
  var xScale = d3.scaleTime()
                 .domain([new Date(min_1.toString()),new Date(max_1.toString())])
                 .range([0, properties.width])

  /* data[0][4] is Armenia as default, collect y-data of all years in put it in
  temp list*/
  var temp_list = []
  data[0][4].Years.forEach(function(element){
    temp_list.push(element.value)
  })

  // calculate min and max values off all years to determine y-axis range
  let min = Math.min(...temp_list);
  let max = Math.max(...temp_list);

  // make y-scale
  var yScale = d3.scaleLinear()
                 .domain([min, max]).nice()
                 .range([properties.height, 0]);

  // add x and y-axis
  var xAxis = d3.axisBottom(xScale)
                .ticks(Object.keys(data[0][4].Years).length/2)
  var yAxis = d3.axisLeft(yScale)

  // add text showing which country is selected
  svg.append('text')
  .style("opacity", 0.4)
  .attr("class", "countryName")
  .attr('x', "40%")
  .attr('y', "40%")
  .attr('text-anchor', 'middle')
  .attr("z-index", -1)
  .text(data[0][4]["Country Name"])

  // add x-axis to svg
  svg.append("g")
     .attr("class", "x_axis")
     .attr("transform", `translate(0, ${properties.height})`)
     .call(xAxis);

  // add y-axis to svg
  svg.append("g")
     .attr("class", "y_axis")
     .call(yAxis)

  // add x-axis label
  svg.append("text")
      .attr("transform",
            "translate(" + (properties.width/2) + " ," +
                           (properties.height + properties.top + 20) + ")")
    .style("text-anchor", "middle")
    .text("Years");

    // add y-axis label
  svg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", -5 - properties.left)
      .attr("x",0 - (properties.height / 2))
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text("Forest area (% of land area)");

  /* call line function that determines x and y value of every datapoint, also
  add a curve to connect datapoints*/
  var line = d3.line()
               .x(function(d) {return xScale(new Date(d.year)); })
               .y(function(d) { return yScale(d.value); })
               .curve(d3.curveMonotoneX)

  // add lines to svg
  var lines = svg.append('g')
                 .attr('class', 'lines')
                 .datum(data[0][4].Years) // 10. Binds data to the line
                   .append('g')
                   .attr('class', 'line-group')
                     .append('path')
                     .attr('class', 'line')
                     .attr("id", data[0][4]["Country Name"].split(' ').join(''))
                     .attr("d", line) // 11. Calls the line generator

  // add dots to line
  svg.select(".lines").append('g')
       .attr("class", "circle-group")
       .selectAll(".dot")
       .data(data[0][4].Years)
          .enter().append("circle")
          .attr("class", "dot")
          .attr("id", data[0][4]["Country Name"].split(' ').join(''))
          .attr("cx", function(d) {
            return xScale(new Date(d.year)) })
           .attr("cy", function(d) { return yScale(d.value) })
           .attr("r", 5)

           // on mouseover make dot black and show tip
           .on("mouseover", function(d) {
             d3.select(this)
             .style("fill", "#000000")
             tip_2.show([this['id'],d.year])
           })
           .on("mouseout", function() {
              d3.select(this)
              .style("fill", "#1f7a1f")
              tip_2.hide()
           })


}

/* this function updates the linegraph with a new country or adds lines when
the compare function is checked*/
function updateLineGraph(data){

  // set padding
  var top = 20;
  var right = 10;
  var bottom = 50;
  var left = 85;

  // set barchart svg properties
  var properties = {
    width: 700 - left - right,
    height: 500 - top - bottom,
    padding: 0,
    left: left,
    right: right,
    top: top,
    bottom: bottom,
  }

  // when compare is checked, add lines to the graph
  if($('input[type="checkbox"]').is(":checked")){


    var temp_list_1 = []
    var compare = false
    /* check whether the country is already added to graph, if not add it to
    data_list which is list of all lines present in the linegraph*/
    data_list.forEach(function(d){
      if(d["Country Name"].split(' ').join('') === data["Country Name"].split(' ').join('')){
        compare = true
      }
    })

    // if not yet present in the linegraph, add country to graph
    if(compare === false){

      // determine x-scale range
      data.Years.forEach(function(element){
        temp_list_1.push(element.year)
      })
      let min_1 = Math.min(...temp_list_1);
      let max_1 = Math.max(...temp_list_1);

      // make x-scale
      var xScale = d3.scaleTime()
                     .domain([new Date(min_1.toString()),
                       new Date(max_1.toString())])
                     .range([0, properties.width])

      // make y-scale, set y-axis from 0-100 to allow honest comparisson
      var yScale = d3.scaleLinear()
                     .domain([0, 100]).nice()
                     .range([properties.height, 0]);

      // make y-axis
      d3.select(".y_axis")
        .transition()
        .duration(1000)
        .call(d3.axisLeft(yScale));

      /* call line function that determines x and y value of every datapoint, also
      add a curve to connect datapoints*/
      var line = d3.line()
                   .x(function(d) {
                      return xScale(new Date(d.year)); })
                    .y(function(d) { return yScale(d.value); })
                    .curve(d3.curveMonotoneX)

      // add country to list of all countries present in linegraph
      data_list.push(data)

      // determine datapoints for new line
      var lines_list = []
      data_list.forEach(function(d){
        lines_list.push(d.Years)
      })

      // add new line to svg
      let lines = d3.select(".line-group").selectAll("path").data(lines_list)
      var n = 0;
      lines.enter().append("path")
           .transition()
           .delay(850) // delay so dots are present before line appears
           .attr('class', 'line')
           .attr('id', data["Country Name"].split(' ').join(''))
           .attr("d", line)

           /* make sure the transition of lines entering the graph is finished
           before new lines can be added to the graph. This is necessary to
           prevent bugs while adding lines*/
           .each(function() {
               n++;
               d3.selectAll('path').on('click', null)
           })
           .transition()
           .on('end', function() {
              n--;

              // when no transition is going, allow adding lines
              if (!n) {
                d3.selectAll('path').on('click', function(d){
                  updateLineGraph(d)
                })
              }
           })

      /* change the line that is already present when the compare function is
      checked*/
      lines.transition()
           .duration(1000)
           .attr('class', 'line')
           .attr("d", line)

      // add new dots to lines
      for(var i = 0; i < data_list.length; i++){
        var circles = d3.select(".circle-group")
                        .selectAll(("#" + data_list[i]["Country Name"]).split(' ').join(''))
                        .data(data_list[i].Years)

        // append new dots
        circles.enter().append("circle")
               .attr("id", data_list[i]["Country Name"].split(' ').join(''))
               .transition()
               .duration(1000)
               .attr('class', 'dot')
               .attr("cx", function(d) {
                 return xScale(new Date(d.year)) })
               .attr("cy", function(d) { return yScale(d.value) })
               .attr("r", 5)

        // transition already existing dots to new axis
        circles.transition()
               .duration(1000)
               .attr("cx", function(d) { return xScale(new Date(d.year)) })
               .attr("cy", function(d) { return yScale(d.value) })

      // change colour and show tip on hovering over dot
      d3.selectAll("circle")
        .on("mouseover", function(a, b, c) {
          d3.select(this)
          .style("fill", "#000000")
          tip_2.show([this['id'],a.year])
        })
        .on("mouseout", function() {
          d3.select(this)
          .style("fill", "#1f7a1f")
          tip_2.hide()
         })
      }

    // show country name in graph
    d3.select(".countryName")
      .transition()
        .duration(300)
        .style("opacity", 0)

    }
  }

  /* when compare is not checked, transition line to new selected country*/
  else if($('input[type="checkbox"]').is(":not(:checked)")){

    // update currentData to register which country is present in graph
    currentData = data

    // determine x-scale range
    var temp_list_1 = []
    data.Years.forEach(function(element){
      temp_list_1.push(element.year)
    })
    let min_1 = Math.min(...temp_list_1);
    let max_1 = Math.max(...temp_list_1);

    // determine x-scale
    var xScale = d3.scaleTime()
                   .domain([new Date(min_1.toString()),new Date(max_1.toString())])
                  .range([0, properties.width])

    // determine y-scale
    var temp_list = []
    data.Years.forEach(function(element){
      temp_list.push(element.value)
    })

    let min = Math.min(...temp_list);
    let max = Math.max(...temp_list);

    // make y-scale
    var yScale = d3.scaleLinear()
                   .domain([min, max]).nice()
                   .range([properties.height, 0]);

    // transition y-scale to new range
    d3.select(".y_axis")
      .transition()
      .duration(1000)
      .call(d3.axisLeft(yScale));

    /* call line function that determines x and y value of every datapoint, also
    add a curve to connect datapoints*/
    var line = d3.line()
                 .x(function(d) {return xScale(new Date(d.year)); })
                 .y(function(d) { return yScale(d.value); })
                 .curve(d3.curveMonotoneX)

    // transition line to new data
    d3.select(".line")
      .attr('id', data["Country Name"].split(' ').join(''))
      .datum(data.Years)
      .transition()
      .duration(1000)
      .attr("d", line)

    // transition dots to new data
    d3.selectAll(".dot")
      .attr('id', data["Country Name"].split(' ').join(''))
      .data(data.Years)
      .transition()
      .duration(1000)
      .attr("cx", function(d) { return xScale(new Date(d.year)) })
      .attr("cy", function(d) { return yScale(d.value) })

    // update country name text in line
    d3.select(".countryName")
      .transition()
      .duration(300)
      .style("opacity", 0)
      .delay(300)
      .transition()
      .duration(500)
      .text(data["Country Name"])
      .style("opacity", 0.4)
  }
}
