# day 2
In my proposal I linked to a dataset from the globalforestwatch. This dataset
was almost complete but lacked a crucial element, namely the growth of trees
overtime, it only showed the decrease overtime. Therefore I decided to search
for a new dataset. I found this on the World Bank site. This dataset is however
less detailed in that it only shows change overtime and says nothing about
cutting or planting trees. It does however show the change overtime which is
crucial for answering my question.  

Furthermore I decided to work with one json file. So I merged the csv and tsv
file into one json. Dit leek mij handiger omdat ik hierdoor geen landen in mijn
dataset die niet in de kaart stonden. En ik kan nu heel makkelijk de data
doorsturen naar mijn lijngrafiek en barchart.
Ik heb hem eerst in een pandas dataframe gezet om overzicht te krijgen:  
![alt text](https://github.com/Mensel123/final_project/blob/master/doc/pandas_dataframe.png)  

Hierna heb ik dit dataframe in een json gezet:  
![alt text](https://github.com/Mensel123/final_project/blob/master/doc/json.png)  
