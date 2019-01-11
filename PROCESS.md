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

# day 3
Vandaag lang bezig geweest met het goed ordenen van mijn json. Maar ik vond dit
de moeite waard want nu heb ik een json met alle data die makkelijk naar alle
grafieken kan sturen en ze daarmee maken.

# day 4
Vandaag indeling gemaakt van mijn site. Bootstrap ga ik gebruiken voor de
vormgeving. Dit is makkelijk te implementeren, er zijn veel tutorials van
en ik vind de layout mooi. Verder ga ik proberen een logaritmische kleuren schaal
te maken voor mijn kaart. De data ligt heel ver uit elkaar waardoor sommige landen
altijd heel donker gekleurd zijn en andere heel licht. Als je dan verschuift
over de jaren dan zie je bijna geen verandering. Ik hoop dit met een logaritmische
schaal op te lossen.
logaritmische schaal heeft niet geholpen, heb een andere dataset van dezelfde
bron met dezelfde opzet gevonden die het uitdrukt in hoeveelheid bos per
hoeveelheid totale land oppervlakte.

# day 5
Ik wil twee pie charts toevoegen die top 10 beste en slechtste landen laat zien. Dus
de landen die de meeste postitieve en landen met de meeste negatieve groei hebben.
Maar dit zal pas later gebeuren. Het lijkt me ook leuk om als de lijngrafiek af
is een optie te maken dat je landen kan toevoegen aan dezelfde grafiek, dat er
dus nieuwe lijnen bijkomen.
Vandaag vooral bezig geweest met de koppeling afmaken tussen mijn barchart en
kaart. Verder begonnen met een aanpassing aan mijn datastructuur. Ik wil de
jaren onder een kopje plaatsen zodat ik hier makkelijk en overzichtelijk bij
kan. Ik heb ook mijn transitie in mijn barchart verandert zodat die er wat
soepeler uitziet. 
