<?php 

// Inicio da conexão com o banco de dados utilizando PDO
$host = "localhost";
$db_name = "agenda";
$user = "root";
$pass = '';

try {
    // config conexão pdo
    $conn = new PDO("mysql:host={$host};dbname={$db_name}", $user, $pass);
    // config atributos PDO
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

} catch (PDOException $err) {
    // encerra o script e exibe uma mensagem
    die("Erro: Conexão com o banco de dados não realizada. Erro gerado: ".
    $err->getMessage());
}