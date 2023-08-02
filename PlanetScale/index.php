<?php
$_ENV= parse_ini_file('.env');
$mysqli = mysqli_init();
$mysqli->ssl_set(NULL, NULL, '../cacert.pem', NULL, NULL);
$mysqli->real_connect($_ENV["HOST"], $_ENV["USERNAME"], $_ENV["PASSWORD"], $_ENV["DATABASE"]);

echo "AAAAAAAAAAAAAAa";

$result = $mysqli->query("SELECT * FROM test");
while($row = $result->fetch_assoc()){
    echo $row["id"] . " - " . $row["a"] . " - " . $row["b"];
}

$mysqli->close();
?>