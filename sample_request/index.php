<?php header('content-type: application/json; charset=utf-8');

$json = '[{"date":"2015-08-21","business_day":true},{"date":"2015-10-25","business_day":true},{"date":"2015-10-26","business_day":true},{"date":"2015-10-27","business_day":true},{"date":"2015-10-28","business_day":true},{"date":"2015-10-29","business_day":true}]';

echo isset($_GET['callback'])
    ? "{$_GET['callback']}($json)"
    : $json;