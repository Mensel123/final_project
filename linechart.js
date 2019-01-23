function linechart(data){
  data_list = []

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
  currentData = data[0][4]

  // create svg
  var svg = d3.select("#area2").append("svg")
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

  var lines = svg.append('g')
                 .attr('class', 'lines')
                 .datum(data[0][4].Years) // 10. Binds data to the line
                   .append('g')
                   .attr('class', 'line-group')
                     .append('path')
                     .attr('class', 'line')
                     .attr("id", data[0][4]["Country Name"].split(' ').join(''))
                     .attr("d", line) // 11. Calls the line generator

  svg.select(".lines").append('g')
       .attr("class", "circle-group")
       .selectAll(".dot")
       .data(data[0][4].Years)
          .enter().append("circle") // Uses the enter().append() method
          .attr("class", "dot") // Assign a class for styling
          .attr("id", data[0][4]["Country Name"].split(' ').join(''))
          .attr("cx", function(d) {
            return xScale(new Date(d.year)) })
           .attr("cy", function(d) { return yScale(d.value) })
           .attr("r", 5)
           .on("mouseover", function(a, b, c) {
             d3.select(this)
             .style("fill", "#000000")
           })
          .on("mouseout", function() {
            d3.select(this)
            .style("fill", "#ffab00")
          })
  svg.append('text')
  .style("opacity", 0.8)
  .attr("class", "error_message")
  .attr('x', 200)
  .attr('y', 150)
  .attr('text-anchor', 'middle')
  .text("No Data Available")
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

  if($('input[type="checkbox"]').is(":checked")){
    console.log("inside checked");

    var compare = false
    var temp_list_1 = []
    data_list.forEach(function(d){
      if(d["Country Name"].split(' ').join('') === data["Country Name"].split(' ').join('')){
        compare = true
      }
    })
    if(compare === false){
      data.Years.forEach(function(element){
        temp_list_1.push(element.year)
      })

      let min_1 = Math.min(...temp_list_1);
      let max_1 = Math.max(...temp_list_1);

      var xScale = d3.scaleTime()
                     .domain([new Date(min_1.toString()),
                       new Date(max_1.toString())])
                     .range([0, properties.width])

      var yScale = d3.scaleLinear()
                     .domain([0, 100]).nice()
                     .range([properties.height, 0]);

      d3.select(".y_axis")
        .transition()
        .duration(1000)
        .call(d3.axisLeft(yScale));

      var line = d3.line()
                   .x(function(d) {
                    // console.log(d);
                      return xScale(new Date(d.year)); }) // set the x values for the line generator
                    .y(function(d) { return yScale(d.value); }) // set the y values for the line generator
                    .curve(d3.curveMonotoneX) // apply smoothing to the line

      data_list.push(data)
      var lines_list = []
      data_list.forEach(function(d){
        lines_list.push(d.Years)
      })

      let lines = d3.selectAll(".line-group").selectAll("path").data(lines_list)

      lines.enter().append("path")
           .transition()
           .delay(850)
           .duration(1000)
           .attr('class', 'line')
           .attr('id', data["Country Name"].split(' ').join(''))
           .attr("d", line)

      lines.transition()
           .duration(1000)
           .attr('class', 'line')
           .attr("d", line)

      for(var i = 0; i < data_list.length; i++){

        var circles = d3.select(".circle-group")
                        .selectAll(("#" + data_list[i]["Country Name"]).split(' ').join(''))
                        .data(data_list[i].Years)

        circles.enter().append("circle")
               .attr("id", data_list[i]["Country Name"].split(' ').join(''))
               .transition()
               .duration(1000)
               .attr('class', 'dot')
               .attr("cx", function(d) {
                 return xScale(new Date(d.year)) })
               .attr("cy", function(d) { return yScale(d.value) })
               .attr("r", 5)


        circles.transition()
               .duration(1000)
               .attr("cx", function(d) { return xScale(new Date(d.year)) })
               .attr("cy", function(d) { return yScale(d.value) })

      }
      d3.selectAll("circle")
        .on("mouseover", function(a, b, c) {
          d3.select(this)
            .style("fill", "#000000")
        })
        .on("mouseout", function() {
          d3.select(this)
            .style("fill", "#ffab00")
         })
        .on("click", function(d){
          country = this.id
          data_list.forEach(function(d, index, object){
            if(d["Country Name"].split(' ').join('') === country){
              object.splice(index, 1);
              d3.selectAll("#"+country)
                .remove()
            }
          })
        })
    }
  }
  else if($('input[type="checkbox"]').is(":not(:checked)")){

      console.log("inside not checked");

      currentData = data
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
        .attr('id', data["Country Name"].split(' ').join(''))
        .datum(data.Years)
        .transition()
        .duration(1000)
        .attr("d", line)

      d3.selectAll(".dot")
        .attr('id', data["Country Name"].split(' ').join(''))
        .data(data.Years)
        .transition()
        .duration(1000)
        .attr("cx", function(d) { return xScale(new Date(d.year)) })
        .attr("cy", function(d) { return yScale(d.value) })
    }
}
