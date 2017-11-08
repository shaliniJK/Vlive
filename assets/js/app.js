// Tabs on homepage

var btnTable        = document.getElementById("btn-table");
var btnMap          = document.getElementById("btn-map");
var articleContents = document.getElementsByClassName("article__content");

btnTable.addEventListener('click', function(e) 
{
	e.preventDefault();
	var elem = this.getAttribute("href");
	    elem = document.getElementById(elem.replace('#', ''));

	hideArticleContent();
	elem.classList.remove("hidden");
	elem.classList.add("show");

	return false;
}, false);

btnMap.addEventListener('click', function(e) 
{
	e.preventDefault();
	var elem = this.getAttribute("href");
	    elem = document.getElementById(elem.replace('#', ''));

	hideArticleContent();
	elem.classList.remove("hidden");
	elem.classList.add("show");
	dessinerCarte();

	return false;
}, false);

function hideArticleContent()
{
	for (var i = articleContents.length - 1; i >= 0; i--) {
		articleContents[i].classList.add("hidden");
		articleContents[i].classList.remove("show");
	}
}

function dessinerCarte() 
{
    var map = L.map('map')
    
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    placeMarkers(map);
}

function placeMarkers(map) 
{
    var stations  = window.Stations;
    var pointList = [];

    for (var i=0; i<stations.length; i++) 
    {
        var point    = [stations[i].geo[0], stations[i].geo[1]];
        var texte    = "<strong>Nom: </strong>" + stations[i].nom + "<br/>";
        		texte   += "<strong>Nombre Velos Dispo: </strong>" + stations[i].nbVelosDispo + "<br/>";
        		texte   += "<strong>Nombre Places Dispo: </strong>" + stations[i].nbPlacesDispo + "<br/>";
        		texte   += "<strong>Adresse: </strong>" + stations[i].adresse + "<br/>";

        if(stations[i].type == 'AVEC TPE')
        {
        	texte   += "<br/>";
        	texte   += "<strong> Borne acceptant les cartes bancaires : abonnements 1j, 7j + recharge crédit temps possibles. </strong> <br/>";
        }

        var iconDraw = new VliveImageColors(stations[i].nbVelosDispo, stations[i].nbPlacesDispo, "#a3daff", "#ee2560", "#f9d423");
       
        var marker   = L.marker( point, { icon:iconDraw.getLeafletIcon() }).addTo(map).bindPopup(texte);
   
        pointList.push(point);
    }
    map.fitBounds(pointList);
}

function activerBouton(ev) {
    var noeudPopup = ev.popup._contentNode; // le noeud DOM qui contient le texte du popup
    var bouton = noeudPopup.querySelector("button"); // le noeud DOM du bouton inclu dans le popup
    bouton.addEventListener("click",boutonActive); // en cas de click, on déclenche la fonction boutonActive
}

// gestionnaire d'évènement (déclenché lors d'un click sur le bouton dans un popup)
function boutonActive(ev) {
    // this est ici le noeud DOM de <button>. La valeur associée au bouton est donc this.value
    alert("Vous avez choisi : " + this.value);
}

function afficheCoord(ev) {
    alert(ev.latlng);
}

var nom  =  document.getElementsByClassName('radio-nom');
for (var i = nom.length - 1; i >= 0; i--) {
	nom[i].addEventListener('click', submitForm);
}

var commune = document.getElementsByClassName('radio-commune');
for (var i = commune.length - 1; i >= 0; i--) {
	commune[i].addEventListener('click', submitForm);
}


var nomList  =  document.getElementsByClassName('nomList');
for (var i = nomList.length - 1; i >= 0; i--) {
	if(i > 10)
	{
		nomList[i].classList.add('hidden');
	}
}

var moreNames = document.getElementById('more-names');
moreNames.addEventListener('click', function(e) {
	e.preventDefault();
	if(this.classList.contains('more-names-open'))
	{
		this.classList.remove('more-names-open');
		this.innerHTML = 'More';
		for (var i = nomList.length - 1; i >= 0; i--) {
		if(i > 10)
			{
				nomList[i].classList.add('hidden');
			}
		}
	} 
	else 
	{
		this.classList.add('more-names-open');
		this.innerHTML = 'Less';
		for (var i = nomList.length - 1; i >= 0; i--) {
		if(i > 10)
			{
				nomList[i].classList.remove('hidden');
			}
		}
	}
});


function submitForm()
{
	document.getElementById('searchForm').submit();
}

var clearFilter = document.getElementById('clearFilter');
if(clearFilter)
{
	clearFilter.addEventListener('click', function(e) {
		e.preventDefault();
		window.location.href = 'Shalini/';
	});
}
