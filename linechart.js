var format = d3.format(",");

// Set tooltips
var tip_2 = d3.tip()
            .attr('class', 'd3-tip')
            .offset([-10, 0])
            .html(function(d) {
              // console.log("----");
              // console.log(d);
              return "<strong>Country: </strong><span class='details'>" + d[0] + "<br></span>" + "<strong>Year: </strong><span class='details'>" + (d[1]) +"</span>";
            })


function linechart(data){
  data_list = []

  var barPadding = 0;
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
  currentData = data[0][4]

  // create svg
  var svg = d3.select("#area2").append("svg")
              .attr("class", "linechart")
              .attr("viewBox", [0, 0, (properties.width + properties.right + properties.left),
                                  (properties.height + properties.top + properties.bottom)].join(' '))
              .append("g")
              .attr("transform", "translate(" + properties.left +
                    "," + properties.top + ")");
  svg.call(tip_2);
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
  svg.append('text')
  .style("opacity", 0.4)
  .attr("class", "error_message")
  .attr('x', "40%")
  .attr('y', "40%")
  .attr('text-anchor', 'middle')
  .attr("z-index", -1)
  .text(data[0][4]["Country Name"])
  svg.append("g")
     .attr("class", "x_axis")
     .attr("transform", `translate(0, ${properties.height})`)
     .call(xAxis);

  svg.append("g")
     .attr("class", "y_axis")
     .call(yAxis)

  svg.append("text")
      .attr("transform",
            "translate(" + (properties.width/2) + " ," +
                           (properties.height + properties.top + 20) + ")")
    .style("text-anchor", "middle")
    .text("Years");

    // text label for the y axis
  svg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", -5 - properties.left)
      .attr("x",0 - (properties.height / 2))
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text("Forest area (% of land area)");

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
function updateLineGraph(data){
  console.log("hoi");

  var barPadding = 0;
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

      let lines = d3.select(".line-group").selectAll("path").data(lines_list)
      var n = 0;
      lines.enter().append("path")
           .transition()
           .delay(850)
           // .duration(500)
           .attr('class', 'line')
           .attr('id', data["Country Name"].split(' ').join(''))
           .attr("d", line)


           .each(function() { // I believe you could do this with .on('start', cb) but I haven't tested it
               n++;
               console.log("begin");
               d3.selectAll('path').on('click', null)
           })
           .transition()
           .on('end', function() { // use to be .each('end', function(){})
               n--;

               if (!n) {
                   console.log("einde");
                   d3.selectAll('path').on('click', function(d){
                                 updateLineGraph(d)
                               })
               }
           })
          // .each(function() { // I believe you could do this with .on('start', cb) but I haven't tested it
          //     n++;
          // })
          // .transition()




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

      d3.selectAll("circle")
        .on("mouseover", function(a, b, c) {
          d3.select(this)
          .style("fill", "#000000")
          d3.selectAll(".line")
            .style("opacity", 0.3)
          d3.selectAll(".dot")
            .style("opacity", 0.3)
          d3.selectAll("#" + this["id"])
            .style("opacity", 1)
          tip_2.show([this['id'],a.year])
        })
        .on("mouseout", function() {
          d3.select(this)
          .style("fill", "#1f7a1f")
          d3.selectAll(".line")
            .style("opacity", 1)
          d3.selectAll(".dot")
            .style("opacity", 1)
          tip_2.hide()
         })
      d3.select(".line-group").selectAll("path")
        .on("mouseover", function(d){
          d3.selectAll(".line")
            .style("opacity", 0.3)
          d3.selectAll(".dot")
            .style("opacity", 0.3)
          d3.selectAll("#" + this["id"])
            .style("opacity", 1)
        })
        .on("mouseout", function(d){
          d3.selectAll(".line")
            .style("opacity", 1)
          d3.selectAll(".dot")
            .style("opacity", 1)
        })
      }

    d3.select(".error_message")
      .transition()
        .duration(300)
        .style("opacity", 0)

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

      d3.select(".error_message")
        .transition()
          .duration(300)
          .style("opacity", 0)
          .delay(300)
          .transition()
          .duration(500)
          .text(data["Country Name"])
          .style("opacity", 0.4)



            // d3.select(".linechart").append("error_message")
            //     .style("opacity", 0)
            //     .text(data["Country Name"])
            //   .transition(t)
            //     .style("opacity", 1)
            //   .transition()
            //     .delay(1500)
            //     .on("start", repeat);
    // });



    }
}
