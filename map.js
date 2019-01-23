function map(data, tip) {
  var margin = {top: 0, right: 0, bottom: -100, left: 0},
              width = 960 - margin.left - margin.right,
              height = 500 - margin.top - margin.bottom;

  // scale green to amount of trees, but how?
  var color = d3.scaleThreshold()
      .domain([0,10,20,30,40,50,60,70,80,90,100])
      .range(["#ebfaeb", "#d6f5d6", "#adebad", "#85e085", "#5cd65c",
              "#33cc33","#29a329","#1f7a1f","#145214","#0a290a", "#051405"]);

  var path = d3.geoPath();

  var svg = d3.select("#area1")
              .append("svg")
              .attr("width", width)
              .attr("height", height)
              .append('g')
              .attr('class', 'map')
              .attr("id", 'map_id')

  var projection = d3.geoMercator()
                     .scale(130)
                     .translate( [width / 2, height / 1.5]);

  var path = d3.geoPath().projection(projection);

  svg.call(tip);

//   document.getElementById("map_id").addEventListener("mousemove", myFunction);
//
// function myFunction() {
//   document.getElementById("demo").innerHTML = Math.random();
// }
 var n = 0;
  svg.append("g")
     .attr("class", "countries")
     .selectAll("path")
     .data(data[0])
     .enter().append("path")
      .attr("d", path)
      .style("fill", function(d) { return color(d.Years[0].value);})
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
                updateLineGraph(d)
                // d3.selectAll('path').on('click', null)
                // d3.selectAll('path').on('click', )
              })
        // .on('click', function(d){
        //         updateLineGraph(d)
        //         // d3.selectAll('path').on('click', null)


        // })
        // d3.selectAll('path').on('click', [])
       // .each(function() { // I believe you could do this with .on('start', cb) but I haven't tested it
       //     n++;
       // })
       // .transition()
       // .on('end', function() { // use to be .each('end', function(){})
       //     n--;
       //     if (!n) {
       //         console.log("einde");
       //     }
       // })
        // .on("click", function(d) {
        //   updateLineGraph(d);
        //   noClick();
        // });
        // // .on("start", console.log("start"))
        //
        // function noClick(){
        //   d3.event.preventDefault();
        // }





}

function updateMap(data, year){

  var color = d3.scaleThreshold()
                .domain([0,10,20,30,40,50,60,70,80,90,100])
                .range(["#ebfaeb", "#d6f5d6", "#adebad", "#85e085", "#5cd65c",
                 "#33cc33","#29a329","#1f7a1f","#145214","#0a290a", "#051405"]);

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
