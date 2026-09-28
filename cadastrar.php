<?php
// Connect to the database
include 'conexao.php';
// Get data from the form
$name = $_POST['nome'];
$age = $_POST['idade'];
$school = $_POST['escola'];
$grade = $_POST['serie'];

// Prepare and execute an SQL statement to insert the data
$sql = "INSERT INTO students (name_aluno, age, school, grade) VALUES (?, ?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("sssi", $name_aluno, $age, $school, $grade);
$stmt->execute();

//redirecionando para outra página
header('Location: jogo.html');
exit;

// Close the statement and connection
$stmt->close();
$conn->close();
?>