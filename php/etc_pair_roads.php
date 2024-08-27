<?php
set_time_limit(0);
header('Access-Control-Allow-Origin:*');  
header('Content-Type: application/json; charset=UTF-8'); 




//----------------------------------------------------------------------------------------------
// read XML road data to MySQL

libxml_use_internal_errors(true);
$myXMLData ='https://tisvcloud.freeway.gov.tw/history/motc20/ETagPair.xml';

$servername = "localhost";
$username = 'StaRain';
$password = 'BJ2498717';
$dbname = 'etc_environment';

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}


$sql =  "CREATE TABLE `etc_road_link` (
    `sid` INT AUTO_INCREMENT ,
    `ETagPairID` TINYTEXT NOT NULL,
    `StartETagGantryID` TINYTEXT NOT NULL,
    `EndETagGantryID` TINYTEXT NOT NULL,
    `Description` TINYTEXT NOT NULL,
    `Distance` FLOAT(3) NOT NULL,
    `StartLinkID` TINYTEXT NOT NULL,
    `EndLinkID` TINYTEXT NOT NULL, 
    `Geometry` TEXT,
    PRIMARY KEY(`sid`)
) ENGINE = InnoDB";

mysqli_query($conn,$sql);



$xml = simplexml_load_file($myXMLData);
$array = json_decode(json_encode($xml), TRUE);



foreach ($array["ETagPairs"]['ETagPair'] as $d){
    echo var_dump($d);
    echo $d["Geometry"];

    $sql =  "INSERT INTO `etc_road_link`
    (`ETagPairID`,
    `StartETagGantryID`,
    `EndETagGantryID`,
    `Description`,
    `Distance`,
    `StartLinkID`,
    `EndLinkID`,
    `Geometry`) 
    VALUES (
        '".$d["ETagPairID"]."',
        '".$d["StartETagGantryID"]."',
        '".$d["EndETagGantryID"]."',
        '".$d["Description"]."',
        ".floatval($d["Distance"]).",
        '".$d["StartLinkID"]."',
        '".$d["EndLinkID"]."',
        '".$d["Geometry"]."'
    )";

    mysqli_query($conn,$sql); 
}
$conn->close()

/**/
//----------------------------------------------------------------------------------------------



//----------------------------------------------------------------------------------------------
// read XML road data to GeoJSON
libxml_use_internal_errors(true);
$myXMLData ='https://tisvcloud.freeway.gov.tw/history/motc20/ETagPair.xml';

$xml = simplexml_load_file($myXMLData);
$array = json_decode(json_encode($xml), TRUE);


$geojson_etc=array(
    "type" => "FeatureCollection",
    "features"=> []
);



foreach ($array["ETagPairs"]['ETagPair'] as $d){
    $fea=array(
        "type"=> "Feature",
        "properties"=> [
            "ETagPairID" => $d["ETagPairID"],
            "StartETagGantryID" => $d["StartETagGantryID"],
            "EndETagGantryID" => $d["EndETagGantryID"],
            "Description" => $d["Description"],
            "Distance" => $d["Distance"],
            "StartLinkID" => $d["StartLinkID"],
            "EndLinkID" => $d["EndLinkID"],
        ],
        "geometry"=> [
            "type"=> "LineString",
            "coordinates"=> []
        ]
    );

    $sss = substr($d["Geometry"], 11,-1);
    $sss = explode (',',$sss);

    // echo var_dump($sss);
    foreach ($sss as $f){
        $ff = array(explode (' ',$f));
        $c = array($ff[0],$ff[1]);
        array_push($fea["geometry"]["coordinates"],$c[0]);
    }


    array_push($geojson_etc["features"],$fea);

}



echo json_encode($geojson_etc, JSON_UNESCAPED_UNICODE);


// echo var_dump($geojson_etc);  /**/





//----------------------------------------------------------------------------------------------


$conn->close()
?>