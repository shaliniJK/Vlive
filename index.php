<?php 
// Load project dependencies
require_once('libs/bootstrap.php');
require_once('app.php');
?>
<!doctype html>
<html lang="fr">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="x-ua-compatible" content="ie=edge">
        <title>V'LiVE</title>
        <meta name="description" content="">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" href="//code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css">
        <link href="//fonts.googleapis.com/css?family=Lato:400,700" rel="stylesheet">
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.0.3/dist/leaflet.css" />
    		<script src="https://unpkg.com/leaflet@1.0.3/dist/leaflet.js" async></script>
        <link rel="stylesheet" href="assets/css/app.css">
        <script>
            window.Stations = <?php echo json_encode($stations); ?>;
        </script>
    </head>
    <body>
      <!--[if lte IE 9]>
          <p class="browserupgrade">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience and security.</p>
      <![endif]-->
			
			<header>
				<h1>V'LiVE</h1>
				<span>Disponibilité en temps réel</span>
			</header>

			<main class="cf">
				<aside>
					<div class="box">
						<div class="box__title">
							<h2><?php echo $station->getNumberOfRecords(); ?> records</h2>
						</div>
						<div class="box__content filters">
							<?php if(isset($q) && $q != '') { ?>
								<p><span class="text">Text</span><?php echo $q; ?></p>
							<?php } ?>
							<?php if(isset($pNom) && $pNom != '') { ?>
								<p><span class="text">Nom</span><?php echo $pNom; ?></p>
							<?php } ?>
							<?php if(isset($pCommune) && $pCommune != '') { ?>
								<p><span class="text">Commune</span><?php echo $pCommune; ?></p>
							<?php } ?>
							<?php if(!$hasParameters) { ?>
								<strong>No active filters</strong>
							<?php } else { ?>
								<a href="#" class="clear-filters" id="clearFilter">Clear Filters</a>
							<?php } ?>
						</div>
					</div>
					<form action="" class="search" method="GET" id="searchForm">
						<div class="box">
							<div class="box__title">
								<h2>Filters</h2>
							</div>
							<div class="box__content">
								<input type="search" placeholder="Search.." class="search-field" name="q" value="<?php echo $q; ?>">
							</div>
						</div>
						<div class="box">
							<div class="box__title">
								<h2>Noms</h2>
							</div>
							<div class="box__content">
								<ul>
									<?php foreach($noms as $nom) { ?>
										<li class="nomList">
											<input type="radio" 
														 class="radio-nom" 
														 value="<?php echo $nom['nom']; ?>" 
														 name="nom" 
														 id="<?php echo $nom['nom']; ?>"
														 <?php if($nom['cleanName'] == $pNom) { echo 'checked'; } ?>
														 >
											<label for="<?php echo $nom['nom']; ?>"><?php echo $nom['cleanName']; ?></label>
										</li>
								  <?php } ?>
								</ul>
								<a href="#" class="more-names" id="more-names">More</a>
							</div>
						</div>
						<div class="box">
							<div class="box__title">
								<h2>Communes</h2>
							</div>
							<div class="box__content">
								<ul>
									<?php foreach($communes as $commune) { ?>
										<li>
											<input type="radio" class="radio-commune" 
										         value="<?php echo $commune; ?>" 
										         name="commune" 
										         id="<?php echo $commune; ?>"
														 <?php if($commune == $pCommune) { echo 'checked'; } ?>
										         >
										  <label for="<?php echo $commune; ?>"><?php echo $commune; ?></label>
										</li>
								  <?php } ?>
								</ul>
							</div>
						</div>
					</form>
				</aside>
				<article>
					<div class="article__header">
						<ul>
							<li><a href="#table" id="btn-table"><i class="ion-grid"></i>Table</a></li>
							<li><a href="#map" id="btn-map"><i class="ion-map"></i>Map</a></li>
						</ul>
					</div>
					<div class="article__content" id="map"></div>
					<div class="article__content" id="table">
						<table class="table">
							<tr>
								<th>Nom</th>
								<th>Velos disponible</th>
								<th>Places disponible</th>
								<th>Adresse</th>
								<th>Commune</th>
								<th>Etat</th>
								<th>Type</th>
								<th>Geo</th>
							</tr>
							<?php foreach($stations as $station) { ?>
							<tr>
								<td><?php echo $station['nom']; ?></td>
								<td><?php echo $station['nbVelosDispo']; ?></td>
								<td><?php echo $station['nbPlacesDispo']; ?></td>
								<td><?php echo $station['adresse']; ?></td>
								<td><?php echo $station['commune']; ?></td>
								<td><?php echo $station['etat']; ?></td>
								<td><?php echo $station['type']; ?></td>
								<td><?php echo implode(', ', $station['geo']); ?></td>
							</tr>
							<?php } ?>
						</table>
					</div>
				</article>
			</main>

			<footer>
				<ul class="cf">
					<li>
            <h3>Données</h3>
            <a href="https://opendata.lillemetropole.fr/page/home/">LES DONNÉES OUVERTES DE LA MÉTROPOLE EUROPÉENNE DE LILLE</a>
            <p>Licence ETALAB</p>
        	</li>
	        <li>
	            <h3>Cartographie</h3>
	            <a href="http://leafletjs.com/">leafletjs</a>
	            <p>Creative Commons CC BY-SA OpenStreetMap</p>
	        </li>
	        <li>
	            <h3>Icones</h3>
	            <ul class="cf">
	                <li>
	                    <a href="http://ionicons.com/">Ionicons</a>
	                    <p>License MIT</p>     
	                </li>
	                <li>
	                    <a href="http://www.fil.univ-lille1.fr/~bogaert/tw2/projet2017-1/VliveImage.js.zip">VliveImage.js</a>
	                    <p>Creative Commons CC-BY-NC Bruno.Bogaert [at] univ-lille1.fr</p>     
	                </li>
	            </ul>
	        </li>
	        <li>
	            <h3>Compléments dans la feuille de style</h3>
	            <a href="http://meyerweb.com/eric/tools/css/reset/" class="">CSS Reset by Eric Meyer</a>
	            <p>License: none (public domain)</p>
					</li>
				</ul>
			</footer>
			<script src="assets/js/VliveImage.js"></script>
			<script src="assets/js/app.js"></script>
    </body>
</html>