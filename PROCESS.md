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

# day 6
Vandaag alleen maar bezig geweest met het herstructureren van mijn dataset.
Ik dacht dat ik de jaartallen per land er goed in had gezet maar het bleek
niet handig te zijn toen ik mijn lijngrafiek wilde maken dat ik ze niet
onder één kopje had gezet. Daarom heb ik nu alle jaartallen onder een kopje gezet
en dat aangepast in de andere grafieken. Ik heb ook al een begin gemaakt met
mijn lijngrafiek.

# day 7
Vandaag lijngrafiek afgemaakt. Als ik nu op een land in de kaart of bar in de
bargraph klik dan laat de grafiek het verloop van dit land over de jaren zien.
Verder heb ik de mouseover functies van de kaart en bargraph verbeterd.
Ik heb puntjes aan de lijngrafiek toegevoegd. Ik wil nu de functionaliteit toevoegen
dat wanneer er op een van de puntjes wordt geklikt dat de kaart, bargraph en slider
de data van dat jaar weergeven. Ik hoop dit de doen door alleen de slider aan te
passen en dat die de bargraph en kaart update, geen idee of dit gaat lukken.
De slider is nu heel traag en happerig. Als ik op een jaar klik in de lijngrafiek
dan verplaatst de slider heel traag. Misschien kan ik dit oplossen door hem niet
een stap per jaar te laten zetten maar kleinere tussenstappen te nemen.

# day 8
Vandaag hele dag bezig geweest met het verplaatsen van de slider. Dit is uiteindelijk
wel gelukt maar ging nog steeds heel happerig. Aan het einde van de dag heb ik
besloten hier niet verder mee te gaan, ik had er veel te veel tijd in gestoken.
Ik heb verschillende voorbeelden gevolgd en allemaal verschillende dingen
geprobeerd maar het werd niet beter. Ik ben daarna verder gegaan met het
vergelijken van twee landen.

# day 9
Vandaag bezig geweest met het vergelijken van meerder landen. Ik heb een checkbox
gemaakt waar ik de status van kan uitlezen. Op basis hiervan kan ik of een
transitie laten plaatsvinden als er op een land wordt gedrukt of ik kan een land
toevoegen aan de lijngrafiek. Ik heb het nu zo gemaakt dat er een lijn bijkomt
maar zonder de update functie, dat zal ik morgen moeten doen.

# day 10
Nu dus verder gegaan met de update functie. Het toevoegen van lijnen gaat goed
alleen de punten zijn een probleem. Ben al de hele dag bezig geweest met het
verplaatsen van de punten maar het werkt nog niet.

#day 11
Vandaag is het eindelijk gelukt om de puntjes te updaten. Nu kan ik lijnen toevoegen
waardoor verschillende landen vergeleken kunnen worden. Verder ook meteen toegegvoegd
dat je lijnen kan verwijderen als je er op drukt. Ben nu bezig met de overgang
van vergelijken naar wisselen tussen landen soepeler te maken. Dus als je vergelijken
uitvinkt dat niet alles crashed.

# day 12
Vandaag veel bugs weggevangen bij het vergelijken van de landen. Het switchen tussen
het vergelijken en niet vergelijken van landen gaat nu soepel. Dit kostte allemaal best
veel tijd. Er zitten nog een aantal vage bugs in die er voor zorgen dat de puntjes soms
niet worde geupdate. Dit komt waarschijnlijk door het verkeerd toevoegen en verwijderen
van landen aan de lijst van actieve landen. Hier ga ik morgen mee verder.

# dag 13
Vandaag is de compare functie eindelijk bug vrij!! Het ging niet goed met het uitzetten
van de compare functie. Ik hou namelijk een lijst bij welke landen er in de grafiek zitten
als compare staat aangevinkt. Ik maakt deze lijst alleen niet goed leeg als ik
de compare functie uitzette waardoor het updaten naar 1 lijn niet goed ging bij het uitzetten
van de compare functie. Verder is het me ook gelukt om te zorgen dat er pas op een volgend
land gedrukt kan worden als de animatie van de vorige is afgelopen. Hierdoor kan je landen
maar 1 voor 1 toevoegen wat bugs in de transitie voorkomt. Dus hij is helemaal bug vrij.
Verder heb ik ook een form toegoegd waarin je landen kan opzoeken om in de lijngrafiek
weer te geven. Dit werkt ook samen met de compare functie.
Verder ook een text label toegevoegd in de lijngrafiek waarin wordt staat welk
land in de lijngrafiek wordt weergegeven. Ik moet nog fixen dat dit verdwijnt
als de compare functie wordt aangezet

# day 14
Vandaag was de hackaton maar heb toch nog even wat gedaan. Het is me gelukt om
mijn grafieken mee te laten zoemen als een gebruiker zijn webpagina verkleind/
vergroot. Verder verplaatsen ze nu onder elkaar als het scherm te klein is. Dit
eerste heb ik gedaan door de width en height in een viewbox te zetten en dat laatste
met gebruik van de bootstrap grid.

# day weekend
Veel ziek geweest afgelopen dagen dus process is een beetje traag. Maar in het
weekend wel het smooth scrollen over mijn pagina gefixed. Verder ook een mooi
plaatje met een scroll button toegevoegd aan mijn hoofdpagina. Heb toch besloten
alle functie knoppen als compare en de slider in een row te zetten boven mijn
grafieken zodat alle opties overzichtelijk zijn.

# day 15
Vandaag kleuren aangepast van mijn grafieken. De bars in mijn barchart hebben nu
het zelfde kleurenschema als de map en deze passen zich ook aan als je aan de
slider schuift. Verder alles uitgelijnd op de data pagina. Het is al enigszins gelukt
om de navbar pas op de tweede pagina te laten zien maar dit moet nog iets soepeler.
Verder ook mijn story pagina bijgewerkt met verhaal en foto's. Vandaag ook
de contact pagina gemaakt waarbij mensen mij hun email en naam kunnen sturen via
formspree en dan kan ik contact met hen opnemen.

# day 16
Vandaag vooral bezig geweest met de layout. Ik heb de site op git gezet en laten
runnen op andere computers en kwam er toen achter dat het schalen niet goed ging.
Divs gingen overlappen en het was een grote chaos. Uiteindelijk de beeldverhoudingen
teruggezet van viewport height(vh) naar %. Dit lostte het probleem op.
Verder wat stijl issues aangepakt waardoor het onderscheiden van het geselecteerde
land met een mouseover beter te onderscheiden in de barchart en map.
Ik heb er toch voor gekozen om het tussendoor infaden van mijn navbar weg te laten.
Dit ging helemaal niet soepel waardoor het alleen maar afleidde. Ik heb ook geen
tijd meer om te zorgen dat dit wel soepel gaat worden.
Verder alle code comment.

# day 17
Vandaag vooral gewerkt aan het afronden van mijn project. Laatste code wat opgeschoond,
readme bijgewerkt en license gemaakt. Verder nog een questionmark toegevoegd die
de user informeert over de functies in de toolbar. Ik heb ook mijn hele folder
structuur geordend.  
