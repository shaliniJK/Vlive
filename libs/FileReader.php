<?php 

class FileReader {

	protected $proxy;
	protected $path;
	protected $data; 

	public function __construct()
	{

	}

	public function setPath($path)
	{
		$this->path = $path;
	}

	public function setProxy($proxy)
	{
		$this->proxy = $proxy;
	}

	public function read() 
	{
		// if we have a proxy, set default configuration for fopen

		if(! empty($this->proxy))
		{
			$config = array(
				'http' => array(
					'proxy' => 'tcp://cache.univ-lille1.fr:3128',
					'request_fulluri' => true
					)
				);
			stream_context_set_default($config);
		}

		if(empty($this->path))
		{
			throw new \Exception("Path empty. No file to read");
		}

		try 
		{
			
			$file = fopen($this->path, "r");
			$this->data = '';

			while (! feof($file)) 
			{
				$line        = fgets($file);
				$this->data .= $line;
			}

			fclose($file);

		} 
		catch (Exception $e) 
		{ 
			die("Could not read file");
		}

	}

	public function toRaw()
	{
		return $this->data;
	}


}