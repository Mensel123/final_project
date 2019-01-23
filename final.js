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

      globalData = response
      data = map(response);

      barchart(response, tip)
      checkbox(response)
      linechart(response)
      slider(data)
      createCountryList(response)
      // logscale()
      // draw_chart(properties);
    }).catch(function(e){
        throw(e);
    });
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


    // console.log(data[0][4]);
    // lines.selectAll('.line-group')
    // svg.append("path")
    var lines = svg.append('g')
        .attr('class', 'lines')
        .datum(data[0][4].Years) // 10. Binds data to the line
        .append('g')
        .attr('class', 'line-group')
        // .append("g")
        // .attr("id", data[0][4]["Country Name"].split(' ').join(''))
        // .attr("clip-path", "url(#clip)")
        .append('path')
        .attr('class', 'line')
        .attr("id", data[0][4]["Country Name"].split(' ').join(''))
        // .attr('id', data[0][4]["Country Name"])
        .attr("d", line) // 11. Calls the line generator

    // lines.selectAll("circle-group")
    // lines.selectAll(".dot")
    svg.select(".lines")
    .append('g')
    .attr("class", "circle-group")
    // .append("g")
    // .attr("id", data[0][4]["Country Name"])
    // .attr("clip-path", "url(#clip)")
      .selectAll(".dot")
      .data(data[0][4].Years)

      .enter().append("circle") // Uses the enter().append() method
        .attr("class", "dot") // Assign a class for styling
        .attr("id", data[0][4]["Country Name"].split(' ').join(''))
        .attr("cx", function(d) {
          // console.log(d);
          return xScale(new Date(d.year)) })
        .attr("cy", function(d) { return yScale(d.value) })
        .attr("r", 5)
          .on("mouseover", function(a, b, c) {
            d3.select(this)
            .style("fill", "#000000")
            // console.log(a)
          })
          .on("mouseout", function() {
            d3.select(this)
            .style("fill", "#ffab00")
           })
  }

  function updateLineGraph(data){
    // console.log(data);
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
      // console.log(data_list);
      var compare = false
      var temp_list_1 = []
      data_list.forEach(function(d){

        // console.log(d["Country Name"]);
        // console.log(data["Country Name"]);
        if(d["Country Name"].split(' ').join('') === data["Country Name"].split(' ').join('')){
          compare = true
          // console.log("land heb je al toegevoegd");
        }
      })
      // console.log(compare);
      if(compare === false){
        data.Years.forEach(function(element){
          temp_list_1.push(element.year)
        })

        let min_1 = Math.min(...temp_list_1);
        let max_1 = Math.max(...temp_list_1);

        var xScale = d3.scaleTime()
          .domain([new Date(min_1.toString()),new Date(max_1.toString())])
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
        // console.log(data_list);
        var lines_list = []
        data_list.forEach(function(d){
          lines_list.push(d.Years)
        })
        console.log(data_list);
        console.log(lines_list);


        let lines = d3.selectAll(".line-group").selectAll("path").data(lines_list)
        //
        // lines.exit()
        //     .remove()

        lines.enter()
            .append("path")
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


            // console.log(data_list);

        for(var i = 0; i < data_list.length; i++){

          var circles = d3.select(".circle-group").selectAll(("#" + data_list[i]["Country Name"]).split(' ').join('')).data(data_list[i].Years)
          // console.log(i);
          // console.log(data_list[i].Years);

          // console.log(circles);
          // console.log(data_list[i]["Country Name"]);

          // circles.exit()
          //        .remove()

          circles.enter()
              .append("circle")
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
                    // console.log(a)
                  })
                  .on("mouseout", function() {
                    d3.select(this)
                    .style("fill", "#ffab00")
                   })
                  .on("click", function(d){
                    country = this.id
                    // console.log(data_list);
                    data_list.forEach(function(d, index, object){

                      if(d["Country Name"].split(' ').join('') === country){
                        object.splice(index, 1);
                        d3.selectAll("#"+country)
                          .remove()
                      }
                    })
                  })
        // console.log(data_list);
      }
    }
    else if($('input[type="checkbox"]').is(":not(:checked)")){
      // console.log("hoi");
        console.log("inside not checked");
        console.log(data_list);

        currentData = data
        // console.log(data);
        var temp_list_1 = []
        data.Years.forEach(function(element){
          temp_list_1.push(element.year)
          // console.log(temp_list_1);
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

        // console.log(data["Country Name"].split(' ').join(''));
        d3.select(".line")
          .attr('id', data["Country Name"].split(' ').join(''))
          .datum(data.Years)
          .transition()
          .duration(1000)
          // .attr("class", "line")
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

  function checkbox(data){

    d3.select("#area2").select("#row_1")
      .attr("class", "form-check")

      .append("input")
      .attr("class", "form-check-input")
      .attr("id", "myCheckBox")
      .attr("type", "checkbox")

      .attr("value", "checked")
      .attr("id", "defaultCheck1")
    d3.select(".form-check")
      .append("label")
      .attr("class","form-check-label")
      .attr("for", "defaultCheck1")
      .html("Compare Countries")

    $(document).ready(function(){
        $('input[type="checkbox"]').click(function(){
            if($(this).is(":checked")){
              console.log("checked");
              if(data_list.length < 1){
                data_list.push(currentData)
              }

              console.log(data_list);
            }
            else if($(this).is(":not(:checked)")){
              console.log("not checked");
              console.log("DOI");
              // refreshLineGraph()
              console.log(data_list);
              if(data_list.length > 1){
                // console.log(data_list.length);
                // var listLength = data_list.length
                for(var i = 1; i < data_list.length; i++){
                  // console.log("-----");

                  console.log("remooveeeeee");
                  console.log(i);
                  console.log(data_list[i]);

                  d3.selectAll("#"+data_list[i]["Country Name"].split(' ').join(''))
                    .remove()
                  // data_list.splice(i,1)
                  // console.log(data_list);
                }
                console.log("----");
                console.log(data_list);
                // console.log(data_list.length);
                data_list.splice(1, data_list.length-1)
                console.log(data_list);
              }
              // console.log("hierzo");
              // console.log(data_list);
              // save_data = data_list[0]
              // data_list = []
              // data_list.push(save_data)
              // console.log(data_list);
              // console.log("----");
              // console.log(save_data);
              // console.log(data_list);
              updateLineGraph(data_list[0])

              // emptyGraph()


            }
        });
    });

}

  function slider(data){
      // add slidebar
    d3.select("#slider").append("div")
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

          activeCountry = d["Country Name"].split(' ').join('')
          d3.select(".barchart").selectAll(".bar")
            .classed("barLight", function(d) {
              if ( d["Country Name"].split(' ').join('') == activeCountry) {
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

            activeCountry = d["Country Name"].split(' ').join('')
            d3.select(".barchart").selectAll(".bar")
              .classed("barLight", function(d) {
                if ( d["Country Name"].split(' ').join('') == activeCountry) {
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
            // $(document).ready(function(){
              // $().click(function(){
                // console.log(d);
                  updateLineGraph(d)
                })
  }
  function emptyGraph(data){
    console.log(currentData);

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
    // console.log(d3.select(".line")["_groups"][0]);
    // data[0].forEach(function(element){
    //   console.log(element["Country Name"]);
    // })
    // scale.range aanpassen
    // var yScale = d3.scaleLinear()
    //   .domain([0, 100])
    //   .range([properties.height, 0]);
    //
    // var yAxis = d3.axisLeft(yScale)
    //
    // d3.select(".y_axis")
    //  .transition()
    //  .duration(1000)
    //  .call(d3.axisLeft(yScale));
    //
    // var line = d3.line()
    //   .x(function(d) {return xScale(new Date(d.year)); }) // set the x values for the line generator
    //   .y(function(d) { return yScale(d.value); }) // set the y values for the line generator
    //   .curve(d3.curveMonotoneX) // apply smoothing to the line
    //
    // d3.select(".line")
    //   .datum(data.Years)
    //   .transition()
    //   .duration(1000)
    //   // .attr("class", "line")
    //   .attr("d", line)
    //
    // d3.selectAll(".dot")
    //   .data(data.Years)
    //   .transition()
    //   .duration(1000)
    //   .attr("cx", function(d) { return xScale(new Date(d.year)) })
    //   .attr("cy", function(d) { return yScale(d.value) })


  }
  function addLine(data){
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
          .domain([0, 100])
          .range([properties.height, 0]);

        var color = d3.scaleOrdinal(d3.schemeCategory10);

        /* Add Axis into SVG */
        var xAxis = d3.axisBottom(xScale)
                      .ticks(Object.keys(data.Years).length/2)
        var yAxis = d3.axisLeft(yScale)

        d3.select(".y_axis")
         .transition()
         .duration(1000)
         .call(d3.axisLeft(yScale));

        // svg.append("g")
        //   .attr("class", "x_axis")
        //   .attr("transform", `translate(0, ${properties.height})`)
        //   .call(xAxis);

        // svg.append("g")
        //   .attr("class", "y_axis")
        //   .call(yAxis)

        var line = d3.line()
          .x(function(d) {return xScale(new Date(d.year)); }) // set the x values for the line generator
          .y(function(d) { return yScale(d.value); }) // set the y values for the line generator
          .curve(d3.curveMonotoneX) // apply smoothing to the line

    // var lines = svg.append('g')
    //     .attr('class', 'lines')
    //     .datum(data[0][4].Years) // 10. Binds data to the line
    //     .append('g')
    //     .attr('class', 'line-group')
    //     .append('path')
    //     .attr('class', 'line')
    //     .attr("d", line) // 11. Calls the line generator

        var svg = d3.select(".lines")
        // svg.append("path")
            .datum(data.Years) // 10. Binds data to the line
            .append('g')
            .attr('class', 'line-group')
            .append('path')
            .attr("class", "line") // Assign a class for styling
            .attr("d", line) // 11. Calls the line generator

// svg.select(".line-group")
//   .selectAll(".dot")
//   .data(data[0][4].Years)
//   .enter().append("circle") // Uses the enter().append() method
//     .attr("class", "dot") // Assign a class for styling
//     .attr("cx", function(d) { return xScale(new Date(d.year)) })
//     .attr("cy", function(d) { return yScale(d.value) })
//     .attr("r", 5)

    // svg.select(".lines")
    // .append('g')
    // .attr("class", "circle-group")
    //   .selectAll(".dot")
    //   .data(data[0][4].Years)
    //
    //   .enter().append("circle") // Uses the enter().append() method
    //     .attr("class", "dot") // Assign a class for styling
    //     .attr("cx", function(d) { return xScale(new Date(d.year)) })
    //     .attr("cy", function(d) { return yScale(d.value) })
    //     .attr("r", 5)

        d3.select(".lines")
        .append('g')
        .attr("class", "circle-group")
        .selectAll(".dot")
            .data(data.Years)
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
                    // .update()
                    // .duration(1000)
                    .attr("value", d.year.toString())
              })

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

function createCountryList(data) {

  countriesList = [];
  // console.log(data);
  data[0].forEach(function(country) {
    // console.log(country);
    countriesList.push(country["Country Name"])
  });
  // console.log(countriesList);

  autocomplete(document.getElementById("myInput"), countriesList);
}
function autocomplete(inp, arr) {
  /*the autocomplete function takes two arguments,
  the text field element and an array of possible autocompleted values:*/
  var currentFocus;
  /*execute a function when someone writes in the text field:*/
  inp.addEventListener("input", function(e) {
      var a, b, i, val = this.value;
      /*close any already open lists of autocompleted values*/
      closeAllLists();
      if (!val) { return false;}
      currentFocus = -1;
      /*create a DIV element that will contain the items (values):*/
      a = document.createElement("DIV");
      a.setAttribute("id", this.id + "autocomplete-list");
      a.setAttribute("class", "autocomplete-items");
      /*append the DIV element as a child of the autocomplete container:*/
      this.parentNode.appendChild(a);
      /*for each item in the array...*/
      for (i = 0; i < arr.length; i++) {
        /*check if the item starts with the same letters as the text field value:*/
        if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
          /*create a DIV element for each matching element:*/
          b = document.createElement("DIV");
          /*make the matching letters bold:*/
          b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
          b.innerHTML += arr[i].substr(val.length);
          /*insert a input field that will hold the current array item's value:*/
          b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
          /*execute a function when someone clicks on the item value (DIV element):*/
              b.addEventListener("click", function(e) {
              /*insert the value for the autocomplete text field:*/
              inp.value = this.getElementsByTagName("input")[0].value;
              getCountry(inp.value)
              /*close the list of autocompleted values,
              (or any other open lists of autocompleted values:*/
              closeAllLists();
          });
          a.appendChild(b);
        }
      }
  });
  /*execute a function presses a key on the keyboard:*/
  inp.addEventListener("keydown", function(e) {
      var x = document.getElementById(this.id + "autocomplete-list");
      if (x) x = x.getElementsByTagName("div");
      if (e.keyCode == 40) {
        /*If the arrow DOWN key is pressed,
        increase the currentFocus variable:*/
        currentFocus++;
        /*and and make the current item more visible:*/
        addActive(x);
      } else if (e.keyCode == 38) { //up
        /*If the arrow UP key is pressed,
        decrease the currentFocus variable:*/
        currentFocus--;
        /*and and make the current item more visible:*/
        addActive(x);
      } else if (e.keyCode == 13) {
        /*If the ENTER key is pressed, prevent the form from being submitted,*/
        e.preventDefault();
        if (currentFocus > -1) {
          /*and simulate a click on the "active" item:*/
          if (x) x[currentFocus].click();
        }
      }
  });
  function addActive(x) {
    /*a function to classify an item as "active":*/
    if (!x) return false;
    /*start by removing the "active" class on all items:*/
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = (x.length - 1);
    /*add class "autocomplete-active":*/
    x[currentFocus].classList.add("autocomplete-active");
  }
  function removeActive(x) {
    /*a function to remove the "active" class from all autocomplete items:*/
    for (var i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }
  function closeAllLists(elmnt) {
    /*close all autocomplete lists in the document,
    except the one passed as an argument:*/
    var x = document.getElementsByClassName("autocomplete-items");
    for (var i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }
  /*execute a function when someone clicks in the document:*/
  document.addEventListener("click", function (e) {
    closeAllLists(e.target);
  });
}
function getCountry(input){
  globalData[0].forEach(function(country) {
    // console.log(country);
    if(country["Country Name"] === input){
      updateLineGraph(country)
    }
  });
  console.log(input);
}

}
