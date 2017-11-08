<?php 

class Station {

	protected $data;

	public function __construct($data)
	{
		$this->data = $data;
	}

	public function getNumberOfRecords()
	{
		return $this->data->nhits;
	}

	public function getStations()
	{
		$records = [];
		foreach($this->data->records as $record)
		{
			$record = [
				'nom' => $record->fields->nom,
				'type' => $record->fields->type,
				'geo' => $record->fields->geo,
				'adresse' => $record->fields->adresse,
				'commune' => $record->fields->commune,
				'etat' => $record->fields->etat,
				'nbVelosDispo' => $record->fields->nbVelosDispo,
				'nbPlacesDispo' => $record->fields->nbPlacesDispo
 			];	
 			$records[] = $record;
		}

		return $records;

	}

  public function getStationNames()
  {
  	$names = [];
  	foreach($this->data->records as $record)
		{
			$nom = [
				'nom' => $record->fields->nom,
				'cleanName' => $this->cleanStationName($record->fields->nom, $record->fields->type)
			];
 			$names[] = $nom;
		}

		return $names;

  }

  public function getCommunes()
  {
    $communes = [];
  	foreach($this->data->records as $record)
		{
 			$communes[] = $record->fields->commune;
		}

		return array_unique($communes);
  }

  private function cleanStationName($name, $type)
  {
      $name = substr(strstr($name," "), 1);
      if ($type == "AVEC TPE")
      {
          $name = trim(chop($name, "(CB)"));
      }
      return $name;
  }


}