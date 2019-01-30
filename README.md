# Final project - Forest Growth
Minor Programming UvA  
Final project of Dataprocessing  
Mendel Engelaer 10996222  
mendelengelaer@hotmail.com  

## Problem statement
Trees are essential for the existence of human beings. Without them we would
simply not be able to breath. According to Bradford et al. (2015) 15 billion
trees are cut each year. But where do all these threes come from? And which
countries produce the most trees? Can we create more awareness, among people that
do not live in countries where forests are cut every day, for the cutting of
forests by making an interactive visualisation?

https://www.nature.com/articles/nature14967.epdf?referrer_access_token=GHIjjPPky_AfrHv0IIWM69RgN0jAjWel9jnR3ZoTv0PkYJmQ6VQcpxIB4Tt0SaQy_TViN9dLBJXbXpFkkWGX7RsUA_8a8_uEeuFNil0kTIiDDSPq7px4H3IiRCoW6JEZfZ2TCGutz3VPgv3j19khbrXjkAnHGD8Lk7FZRPgI7rHk8WPbN2eaj3NwQoI9l4F40yXkDjz_RSSZBk7IQBLY7Q%3D%3D&tracking_referrer=time.com

## Solution
I have created an interactive website that visualizes the forest area change from 1990 up to 2015.

## Walkthrough
### Mainpage
This is de main page of my website. This page has not so much a function by itself but hopefully impresses the visitor. 
![alt text](https://github.com/Mensel123/final_project/blob/master/doc/screenshots/mainPage.png)


### Story
This page gives the visitor a brief introduction to the problem. Using several sources the problem, main causes and a solution are described. The images are there to underline the seriousness of the problem. 
![alt text](https://github.com/Mensel123/final_project/blob/master/doc/screenshots/storyPage.png)

### Data
This page shows all the visualizations. The top of the page starts with a toolbar. In the left top corner a world map is shown, to the right of this is a linechart. Beneath the map and linechart there is a barchart.   
In the toolbar the user can see some of the functionalisaties of the graphs. The user can slide through all the years, then the map and bargraph will adapt to the selected year. Furthermore the user can search countries to visualize in the linegraph and the user can choose to use the compare function. This function allows the user to add multiple graphs to the linechart to compare the lines.  
Next to the toolbar is a question mark and when the user hoovers over it, it gives a brief explanation of the functions in the toolbar. All graphs in this image have a tooltip that show additional information about the graph.
![alt text](https://github.com/Mensel123/final_project/blob/master/doc/screenshots/dataPage.png)

### Contact
This page allows the user to contact me for questions.
![alt text](https://github.com/Mensel123/final_project/blob/master/doc/screenshots/contactPage.png)

## Data sources:
https://data.worldbank.org/indicator/AG.LND.FRST.ZS
This dataset contains forest area of % land area for many countries. I have used this dataset to create my visualisations.

## External components:
**D3 library** License: BSD 3-Clause "New" or "Revised" License Source: https://github.com/d3/d3  
**Pandas**  License: BSD 3-Clause "New" or "Revised" License Source: https://github.com/pandas-dev/pandas  
**jQuery** License: MIT License Source: https://github.com/jquery/jquery  
**Bootstrap** License: MIT license Source: https://getbootstrap.com  

## Image sources:
forest.jpg Source: https://www.pexels.com/photo/conifer-daylight-evergreen-forest-572937/  
10094847976_55ba5907cd_o.jpg Source: https://www.flickr.com/photos/crustmania/10094847976  
An_example_of_slash_and_burn_agriculture_practice_Thailand.jpg source: https://www.flickr.com/photos/7389415@N06/3420536970

*This project is licensed under the terms of the MIT license.
Rebecca Davidsson, 2019*

