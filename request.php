<?php
/**
 * Project portfolio
 * request.php
 * 2016.06.06 10:53
 * 
 * @author Domas <sungaila.d@gmail.com>
 */

ini_set('log_errors', TRUE);
ini_set('error_log', dirname(__FILE__) . '/log.txt');
error_reporting(E_ERROR);

include 'functions.php';

$primary_email = "info@matomi.lt";

//data_log($_POST);

$email = isset($_POST['email']) ? trim($_POST['email']) : null;
$name = isset($_POST['name']) ? trim($_POST['name']) : null;
$phone = isset($_POST['phone']) ? trim($_POST['phone']) : null;
$message = isset($_POST['message']) ? trim($_POST['message']) : null;

$valid = true;
$success = false;
$alerts = array();

if (empty($email)) {
    $valid = false;
    $alerts[] = 'Neįvestas el. paštas.';
}

if (empty($message)) {
    $valid = false;
    $alerts[] = 'Neįvestas klausimas.';
}

if ($valid) {
    $headers = "From: $email\r\n" .
        "Reply-To: $email\r\n" .
        "X-Mailer: PHP/" . phpversion();
    $text = "El. paštas: $email\r\nVardas: $name\r\nTelefonas: $phone\r\nKlausimas:\r\n$message";
    if (mail($primary_email, "Internetiniu puslapiu klausimas", $text, $headers) === FALSE) {
        $success = false;
        $alerts[] = "Nepavyko išsiųsti Jūsų klausimo. Susisiekite su mumis el. paštu <a href='mailto:$primary_email'>$primary_email</a>.";
    } else {
        $success = true;
        $alerts[] = 'Dėkojame už klausimą. Greitai su Jumis susisieksime.';
    }
}

//data_log($success);
//data_log($alerts);

sleep(1);

$response = new stdClass();
$response->status = $success ? 'success' : 'failed';
$response->message = implode(' ', $alerts);
echo json_encode($response);