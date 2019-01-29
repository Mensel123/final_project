window.onload = function() {
  var format = d3.format(",");

  // Set tooltips
  var tip = d3.tip()
              .attr('class', 'd3-tip')
              // .style('top', d3.event.x)
              // .style('left', d3.event.y)
              .offset([-10, 0])
              .html(function(d) {
                return "<strong>Country: </strong><span class='details'>" + d["Country Name"] + "<br></span>" + "<strong>Population: </strong><span class='details'>" + format(d.Years[0].value) +"</span>";
              })

  var requests = [d3.json('scripts/new_json.json')];

    // if all requests are fulfilled, run code inside function
    Promise.all(requests).then(function(response) {
      globalData = response

      checkbox(response)
      linechart(response)
      slider(response)
      createCountryList(response)
      barchart(response, tip)
      map(response, tip)



    }).catch(function(e){
        throw(e);
    });

  function checkbox(data){

    d3.select("#compareCountry")
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
            }
            else if($(this).is(":not(:checked)")){
              console.log("not checked");
              if(data_list.length > 1){
                for(var i = 1; i < data_list.length; i++){
                  d3.selectAll("#"+data_list[i]["Country Name"].split(' ').join(''))
                    .remove()
                }
                currentData = data_list[0]
              }
              data_list = []
              updateLineGraph(currentData)
            }
        });
    });
  }
}
