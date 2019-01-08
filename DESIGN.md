# Design Document
Final project of Dataprocessing
Mendel Engelaer 10996222

## List of datasets:
Dataset with all the countries present in the map im gonna use. I will extract
data from the other dataset to match the countries in this dataset.  
http://bl.ocks.org/micahstubbs/8e15870eb432a21f0bc4d3d527b2d14f

Dataset thats shows forest area(sq.km). It contains for most countries
data about the forest area from 1990 up to 2015.  
https://data.worldbank.org/indicator/AG.LND.FRST.K2?end=2015&start=2015&view=map  

Datasset that shows the agricultural land for most countries. Not sure if im gonna
use this but the data matches that of the forest area so I could show a
correlation if there is one.  
https://data.worldbank.org/indicator/AG.LND.AGRI.ZS?end=2015&locations=BF&start=1961&view=chart&year=2015

## Diagram:
![alt text](https://github.com/Mensel123/final_project/blob/master/doc/diagram.jpg)

## Components:
MVP:
* Interactive world map, clicking on the map shows additional information,
hovering highlights the results in the bar chart (d3 v4)
http://datamaps.github.io
* Line chart that shows forest area in a particular country for all years (d3)
* Bar chart that shows the forest area for one year,
hovering highlights the country in the map (d3, tooltip can be used from world map)
* clicking the bar chart or map gives additional information about that country
over the years in a line chart (d3)
* Interactive world map with slidebar to show change over years that also changes
  the bargraph (d3, already made in linked views)
* Introduction page to present story with some facts about current status (html)

Optional:  
* Adding a toggle option to show aggricultural land over time. Aggriculture is
  one of the main causes for deforestation and might therefore be interesting to
  show as additional data. (d3)

## Plugins:
* d3-tip.js
* https://d3js.org/d3.v5.min.js
* Worldmap: http://d3js.org/topojson.v1.min.js"
