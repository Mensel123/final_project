
/* this function creates a world map
edited from: http://bl.ocks.org/micahstubbs/8e15870eb432a21f0bc4d3d527b2d14f*/
function map(data, tip) {

  // set margins for svg
  var margin = {top: 0, right: 0, bottom: 50, left: 0},
              width = 850 - margin.left - margin.right,
              height = 450 - margin.top - margin.bottom;

  // scale amount of trees to colour green
  var color = d3.scaleThreshold()
      .domain([0,10,20,30,40,50,60,70,80,90,100])
      .range(["#ebfaeb", "#d6f5d6", "#adebad", "#85e085", "#5cd65c",
              "#33cc33","#29a329","#1f7a1f","#145214","#0a290a", "#051405"]);

  var path = d3.geoPath();

  // create svg
  var svg = d3.select('#area1').append("svg")
    .attr("viewBox", [0, 0, (width + margin.right + margin.left),
                        (height + margin.top + margin.bottom)].join(' '))
    .attr('class', 'map')
    .attr("id", 'map_id')

  // determine position of countries path
  var projection = d3.geoMercator()
                     .scale(130)
                     .translate( [width / 2, height / 1.5]);

  // determine path of countries
  var path = d3.geoPath().projection(projection);

  // create tip to show country name and forest area
  svg.call(tip);

  // create countries
  svg.append("g")
     .attr("class", "countries")
     .selectAll("path")
     .data(data[0])
     .enter().append("path")
      .attr("d", path)

      // color countries
      .style("fill", function(d) { return color(d.Years[0].value);})
      .style('stroke', 'white')
      .style('stroke-width', 1.5)
      .style("opacity",0.8)
      .style("stroke","white")
      .style('stroke-width', 0.3)

      // on mouseover show tip, highlight country and show in bargraph in red
      .on('mouseover',function(d){
        tip.show(d);

        // highlight country in map
        d3.select(this)
          .style("opacity", 1)
          .style("stroke","white")
          .style("stroke-width",3);

        // show red alligned in barchart
        activeCountry = d["Country Name"].split(' ').join('')
        d3.select(".barchart").selectAll(".bar")
          .classed("barLight", function(d) {
            if ( d["Country Name"].split(' ').join('') == activeCountry) {
              d3.select(this)
                .style("opacity", 0.6)
                .style("stroke","FF0000")
                .style("strokeStyle", "FF0000")
                .style("stroke-width",2);
                return true
            }
            else return false;
          });
      })

      // on mouseout reset all styling
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
                .style("stroke","white")
                .style("stroke-width",0);
                return true
            }
            else return false;
          });
      })

      // when clicked on country show in linegraph
      .on('click', function(d){
        updateLineGraph(d)
      })
}

/* update map when slider is moved*/
function updateMap(data, year){

  // determine color scale
  var color = d3.scaleThreshold()
                .domain([0,10,20,30,40,50,60,70,80,90,100])
                .range(["#ebfaeb", "#d6f5d6", "#adebad", "#85e085", "#5cd65c",
                 "#33cc33","#29a329","#1f7a1f","#145214","#0a290a", "#051405"]);

  // transition new color when slider is moved to new year
  d3.select(".countries").selectAll("path")
                         .transition(100)
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
