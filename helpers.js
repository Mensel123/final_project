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

function slider(data){
    // add slidebar
  d3.select("#sliderBar").append("div")
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
                  .attr("class", "showYear")
                  .style("display", "inline-block")

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
