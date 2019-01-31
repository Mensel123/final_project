# Final project - Forest Growth
Minor Programming UvA  
Final project of Dataprocessing  
Mendel Engelaer 10996222

![alt text](https://github.com/Mensel123/final_project/blob/master/doc/screenshots/dataPage.png)
The goal of my website is to help people better understand the problem of deforestation. From 2001 to 2015 27% of the 
total forest loss was permanent. This means that this wood is not cut for nature preservation but for reasons like agriculture
and livestock. The loss of these trees have an effect on the local ecosystem since there are crucial in maintaining healty soil. 
Furthermore the cutting of trees works against global warming since trees are very important in decreasing the amount of 
carbodioxide in the air. All of the functions of my website are given in the README.md

## Visual Design
For most of the visual design I used Bootstrap. I customized some of the bootstrap settings like font-style and navbar settings
to fit my liking. I decided to make a sticky navbar with a function that keeps track of the users current location. 
I wanted to impress the user with my home page. I therefore looked for a nice picture and added a button that brings the user
down the page. The rest of the pages I wanted to keep as clean as possible, so no uncessary backgrounds or colors. I decided
to put all visualisations on one page. All of my graphs can interact with eachother and I wanted the user to experience this
without having to scroll. Later I found out that this has some implications when viewing the page on a different computer screen
but more on that later.  
I have made the colouring of the barchart and map green. I used this colour since it matches the theme of the page.  
I decided to make the lines in my linechart of single green colour. I though about making the line colour differ depedent on the countries amount of forest but this would make some lines barely visible and when comparing this could make some lines more clear making it an unfair comparison. 

## Technical Design
### HTML and Bootstrap
I started out with several html files, one for each page on my website. However when I started structuring my site further I
decided to make a scrollable website. Therefore I thought it would be most easy to make one html file. The size of my html
file was not that long and allowed me therefore to do that without making it a choatic file. The navbar will stick while scrolling
and show on which page the user is. I used the Bootstrap grid system to order and set margins for all my elements. This makes
the html more responsive to other screen sizes. I also used viewbox for the sizes of the elements so that the images would 
shrink when viewed on a smaller screen.  
The data page has three function tools. One slider to slide through all the years, a searchbar for looking up specific countries
and a compare checkbox that allows the user to compare countries. This last function allows the user to add lines to the 
linegraph. For a single line I have made a responsive x-axis. The differences between years for all countries is not that easy to 
see when viewed on a large scale. Therefore I made it adapt to each country. This would however not be fair when comparing. Therefore I have let the y-axis range go from 0 to 100% when comparing 
countries.  
All graphs have a tooltip. The tooltip in the barchart and map show the name of the country and its percentage of forest area
for that year. The tooltip for the linechart shows the country and the year if a user goes over a dot. I have long thought
about how to display the countries name to be able to make them distinctive when comparing countries. I have decided to let the user
to this by using the tooltip. All other options that I have considered would make the chart chaotic since many lines overlap 
or would not allow me to place the linechart on the same page as the map or barchart because of lack of space.  
I have not given the barchart a x-axis with the names of all the countries. This would be unreadible and the tooltip allows
the user to distinguish countries. 

### CSS
I have one css file that contains all my css. I tried to reuse my css for all my pages by using many classes and id's. It was
therefore to complicated to split it up in multiple files and therefore left it in one file.  
Some styles that change, like country or bar colour I have declared in the js files. This would make it easier to see for 
the reader which styles can update which are static. 

### JavaScript
I have split up my js files into five files. One for each graph and a helpers and init file named final.js. All these files
are loaded in the html file. 

#### final.js
This function loads all the graphs and there functions ones the data is loaded with the promise.all function which also cathes
errors.
It also contains the tooltip that it sends to all the graphs that use this tooltip. This prevents too many copies 
of the tooltip.

#### helpers.js
This file contains a gathering of collection of functions that together improve the functionality of the site.
The checkbox function creates the checkbox that allows comparison of countries in the linechart. It also keeps track
of the state of the checkbox with a small jQuery script. This also updates the data_list which is a global variable that 
contains all the countries present in the linegraph. Next to the checkbox is a small question mark that gives some more 
information. Since its in the same block as the checkbox I wanted it to be loaded at the same moment and therefore put it in 
this function.  
This file also contains the createCountryList function. I borrowed this function from w3 and allowed me to make an autofill 
searchbar. It also contains the getCountry function that searches the first country in the list of data_list so when the box is unchecked and data_list is empty,
there is still a country to be visualized in the graph, namely the first in data_list.  
The slider is also created in this file, I also made this with an example from W3. The slider function updates both the barchart and
map colours. 

#### barchart.js
This file creates an svg element and all the components it contains like axis and bars. It is split up in a initialisation function
and an update function. The barchart contains some click on and hover functions. When hovered over the bars are 
highlighted and the country is highlighted in the map with a red line to make it more distinguishable. When clicked on a bar
it sends the information of that country to the linechart update function that then updates to the selected country.  
The update function is activated when the slider is moved. On slider move the bars get transitioned to their new y and height and
change colour matching the data of the year. 

#### linechart.js
This file is also made up out of two functions, the init and update function. An svg is made with all the components like axis,
scaling and labels. A line function determines the position of the line and it is called when a line is drawn. Dots are also
added to the line with an on mousehover function that shows the tip and changes the color of the dots.  
The updateLineGraph function is made out of a checked and unchecked part. This first checks whether the compare box is checked
and then either changes the existing line or adds a new line.  
If the box is checked then it makes sure that a country cannot be added twice. The y-axis range is set to 0-100 and a new
line is added and the already existing one is updated with a transition. Because the dots are a made out of a set of dots I made
this in a loop where every set of dots are added one by one. The existing ones are changed with a transition. Add the end
the dots are given a mouseover function to show the tip and colour change when hovering over a dot.  
If the box is not checked a new scale is determined and the y-axis, dots and line are transitioned to the new data.

#### map.js
This file containes the map function. This function creates the map svg and functions to calculate the position of the 
paths on the map. All the countries get their own path and mousover function that highlights them in the map and barchart.
A on click function updates the linegraph like the barchart on click function. This file also contains the map update function
that only changes the color of the map when the slider is moved. The is done with a small transition.

### Data
When I started this project I wanted to use two datasets that consisted of a dataset about forestgrowth and a dataset about
forest cutting. In week 1 I found out that the existing datasets where incomplete and not suited for my ideas I discarded this idea. I then found a dataset that has these two datasets in one merged dataset namely the total forest area over the years. 
I merged this data with the topojson data to make sure that only countries were loaded in my dataset that were present in the
map. I used a python script named transform.py. This script loads both datasets and combines them through a pandas dataframe
into one json. This json is loaded when a user goes to my website and prevents the user to have to load all the datasets.  
I structured the json so that the forest area data of all years is ordered in one header named Years. In this way the json
is structered well and easy to use for the barchart, map and linegraph.

## Process and Development
### Challenges and changes to PROPOSAL
The first challenge that I encountered was that my dataset was incomplete and I had to find a new one. This drasticly changed 
the way I wanted to make my webpage. I could not make the toggle option to show the trees planted vs trees cut. Instead I came up with the idea to compare countries.  
Ordering my json was also one of the big challenges. I wanted to use one json for all my graphs and that meant that I had to
nest the data in the json. This was harder then I first thought and cost me quite a lot of time.  
The compare function that I wanted to make was also a bigger challenge then I estimated before I started. Because I wanted
smooth transitions between comparing and not comparing countries without making new graphs and without pages of code I had
to come up with a way to do this neatly. Most of the time I was busy trying to prevent it from breaking when users did unexpected things like pressing the same country twice or pressing multiple countries in a short period. Because of these challenges I was not able to add agricultural ground and decided to skip this option. But other then that I was able to include all the options that I listed in my proposal.

### Acquired Skills
The thing I learned early on is that formatting your dataset early on is really important. Adding or editing your dataset once you have begun is nearly impossible. In doing this early I learned a lot about how to neatly organize a valid json.  
Compared to my previous projects I used a lot more html and css options and learned a lot from this. I can now better organize a page and style it to my liking. For the linking of all three graphs I had to extent my d3 knowledge as I already estimated in my PROPOSAL. This is something I really enjoyed during this project. I found that I like to make smooth transitions and animations. This was the first time I made a linechart in D3 together with all its functionalities. Especially adding dots to the linechart and updating them at the same time with line proved to be a challenge but at the same time I learned about d3 while doing this.

### Defence
Changing datasets came out to be a good decision. I had already spent a lot of time finding datasets and finding new ones was nearly impossible for this theme. Although I was not able to do everything I wanted with this dataset it was really complete, well organized and easy to use. The use of percentages makes the graphs simple to read for the user and allows them to interpret the data easier.  
Placing all the graphs in one page might be seen as too much but it allows the user to see the interactions between the graphs better. It prevents that the user changes something in one graph and then has to scroll to see the result.  
I think the use of tints of green make it also easier for the user to see the change in result and interpret the data. The compare function is a usefull addition to my site. This is on itself a need interactive feature and may give a better answer to the question which countries do better in forest preservation then others.  
In a ideal world I would have like to added a lot more. I would have wanted to add other datasets that say something about the causes of deforestation like agriculture or livestock. I would also have like it to make the site more responsive and make it even usable on phones. When looking back on the assignment I might have wanted to focus more on the story itself. I however decided to spent this time in making better graphs and therefore I had let the focus on the story go for some part. 



