<?php

class Cache {

	CONST PATH = 'Data';

	public function __construct()
	{

	}

	public function put($file, $name)
	{
		$path = SELF::PATH . '/' . $name . '.json';
    $data = fopen($path, 'w') or die("Failed to create file");
    fwrite($data, $file) or die("Could not write to file");  
	}

	public function get($key)
	{
		$path = SELF::PATH . '/' . $key . '.json';
		if($this->has($key))
		{
			$file = json_decode(file_get_contents($path));
			return $file;
		}
		return false;
	}
	
	public function has($key)
	{
		$path = SELF::PATH . '/' . $key . '.json';
		if(file_exists($path))
		{
			return true;
		}

		return false;
	}

}