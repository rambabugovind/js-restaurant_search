<?php

  // Set your YELP keys here
  $consumer_key = "b3tPLZVAu7wGx6TcnRPVjg";
  $consumer_secret = "u0hnPwu7sHxisTmtpphyVa8VU6I";
  $token = "B0MVE7Jey1KI4GLJpPBlpMxOUJs0hLlB";
  $token_secret = "YQ1zsuIiIKg_cpPcMxsQbVVRo5g";

  require_once ('OAuth.php');
  header("Content-type: application/json\n\n");
  $params = $_SERVER['QUERY_STRING'];
  $unsigned_url = "http://api.yelp.com/v2/search?$params";
  $token = new OAuthToken($token, $token_secret);
  $consumer = new OAuthConsumer($consumer_key, $consumer_secret);
  $signature_method = new OAuthSignatureMethod_HMAC_SHA1();
  $oauthrequest = OAuthRequest::from_consumer_and_token($consumer, $token, 'GET', $unsigned_url);
  $oauthrequest->sign_request($signature_method, $consumer, $token);
  $signed_url = $oauthrequest->to_url();
  $ch = curl_init($signed_url);
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
  curl_setopt($ch, CURLOPT_HEADER, 0);
  $data = curl_exec($ch);
  curl_close($ch);
  print_r($data);

?>
