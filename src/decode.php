<?php

$serverName = "localhost"; // replace with your server name
$databaseName = "vPICDatabase"; // replace with your database name
$username = "username"; // replace with your database username
$password = "password"; // replace with your database password

// connect to vPIC database
$connection = mysqli_connect($serverName, $username, $password, $databaseName);

// check for errors
if (mysqli_connect_errno()) {
  die("Failed to connect to MySQL: " . mysqli_connect_error());
}

// retrieve VIN input from form
$vin = $_POST["vin"];

// decode VIN using spVINDecode stored procedure
$query = "EXEC spVINDecode @v='$vin'";
$result = mysqli_query($connection, $query);

// check for errors
if (!$result) {
  die("Error: " . mysqli_error($connection));
}

// retrieve decoded data
$row = mysqli_fetch_assoc($result);
$year = $row["ModelYear"];
$make = $row["Make"];
$model = $row["Model"];
$trim = $row["Trim"];
$style = $row["BodyClass"];

// close connection
mysqli_close($connection);

// display decoded data in HTML format
echo "<h2>Results</h2>";
echo "<p><strong>Year:</strong> $year</p>";
echo "<p><strong>Make:</strong> $make</p>";
echo "<p><strong>Model:</strong> $model</p>";
echo "<p><strong>Trim:</strong> $trim</p>";
echo "<p><strong>Style:</strong> $style</p>";

?>
