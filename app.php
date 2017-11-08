<?php 

/*
 * Retrieve file from cache
 */ 

$key   = 'vlille';
$cache = new Cache();

if(! $cache->has($key))
{
	$file = new FileReader();
	$file->setPath("https://opendata.lillemetropole.fr/api/records/1.0/search/?dataset=vlille-realtime&rows=250");
	// $file->setProxy(true);
	$file->read();
	$cache->put($file->toRaw(), $key);
}

$data     = $cache->get($key);
$station  = new Station($data);
$noms     = $station->getStationNames();
$communes = $station->getCommunes();

$url = "https://opendata.lillemetropole.fr/api/records/1.0/search/?dataset=vlille-realtime&rows=250";

$q = ''; 
if(isset($_GET['q']) && $_GET['q'] != '')
{
	$q   = $_GET['q'];
	$url = $url . "&q=" . $q;
}

$pNom = ''; 
if(isset($_GET['nom']) && $_GET['nom'] != '')
{
	$pNom = $_GET['nom'];
	$url  = $url . "&refine.nom=" . urlencode($pNom);
}

$pCommune = ''; 
if(isset($_GET['commune']) && $_GET['commune'] != '')
{
	$pCommune = $_GET['commune'];
	$url      = $url . "&refine.commune=" . urlencode($pCommune);
}

$hasParameters = false;
if(!empty($q) || !empty($pNom) || !empty($pCommune))
{
	$hasParameters = true;
}


$file = new FileReader();
$file->setPath($url);
// $file->setProxy(true);
$file->read();
$data = $file->toRaw();

$station  = new Station(json_decode($data));
$stations = $station->getStations();