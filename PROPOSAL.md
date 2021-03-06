# final_project
Final project of Dataprocessing
Mendel Engelaer 10996222

## Problem statement
Trees are essential for the existence of human beings. Without them we would
simply not be able to breath. According to Bradford et al. (2015) 15 billion
trees are cut each year. But where do all these threes come from? And which
countries produce the most trees? Can we create more awareness, among people that
do not live in countries where forests are cut every day, for the cutting of
forests by making an interactive visualisation?

https://www.nature.com/articles/nature14967.epdf?referrer_access_token=GHIjjPPky_AfrHv0IIWM69RgN0jAjWel9jnR3ZoTv0PkYJmQ6VQcpxIB4Tt0SaQy_TViN9dLBJXbXpFkkWGX7RsUA_8a8_uEeuFNil0kTIiDDSPq7px4H3IiRCoW6JEZfZ2TCGutz3VPgv3j19khbrXjkAnHGD8Lk7FZRPgI7rHk8WPbN2eaj3NwQoI9l4F40yXkDjz_RSSZBk7IQBLY7Q%3D%3D&tracking_referrer=time.com

## Solution
I would like to create an interactive map that visualizes the amount of wood
that is being cut per country over the years.

### Visualisation
![alt text](https://github.com/Mensel123/final_project/blob/master/doc/readme/voorbeeld.png)
### Main features
MVP:
* Interactive world map, clicking on the map shows additional information,
hovering highlights the results in the bar chart  
http://datamaps.github.io
* Line chart that shows forest area in a particular country
* Bar chart that shows the forest area for one year,
hovering highlights the country in the map
* clicking the bar chart or map gives additional information about that country
over the years
* Interactive world map with slidebar to show change over years that also changes
  the bargraph
* Toggle option to show trees planted over the years (not possible with current
  dataset)
* Introduction page to present story with some facts about current status

Optional:  
* Adding charts to show trees planted vs trees cut over years(not possible since
  data is missing for this graph)
* Adding a toggle option to show aggricultural land over time. Aggriculture is
  one of the main causes for deforestation and might therefore be interesting to
  show as additional data.

## Prerequisites
### Data sources:
http://archive.worldmapper.org/display.php?selected=314  
This dataset contains some missing data that need to be removed but overall
it is well organized.

http://www.globalforestwatch.org/dashboards/global
This dataset is far more complete. It gives data across a large timeline and
it includes many countries. This will most likely be the data I will use.

https://data.worldbank.org/indicator/AG.LND.FRST.ZS?end=2015&locations=AT-AL&start=2015&view=map&year=2003  
This dataset is most complete for forest coverage and I will use this dataset.

https://data.worldbank.org/indicator/AG.LND.AGRI.ZS?end=2015&locations=BF&start=1961&view=chart&year=2015  
This dataset shows the amount of agricultural land per country.

### External components:
D3 library  
Maybe Pandas in order to structure the Data
Other libraries will probably still need to be discussed in the course

### Similar visualisation:
https://jaspernaberman.github.io/Programming-Project/Scripts/HTML/visualizations.html
I think this visualization matches the visualization I would like to create.
It includes a map that informs the user about the global situation. Its also
possible in this graph to see detailed information per country. This
visualization does not have a future to show changes in time, I would like to
add this to my visualization.

### Hardest parts:
Most of the functionality discussed in this proposal still need to be discussed
in the course. Therefore, it is difficult to estimate the hardest parts.
But my estimation is that linking all the charts together will be the hardest
technical problem.  
I have not yet analysed all the available data on the cutting of forests.
Therefore, there might be too few data too show the cutting history for all
countries.
