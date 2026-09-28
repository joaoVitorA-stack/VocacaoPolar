<?php
// Connect to the database
include 'conexao.php';

// Consultas SQL
// Total de alunos
$sql_total = "SELECT COUNT(*) AS total_alunos FROM students";
$result_total = $conn->query($sql_total);
$row_total = $result_total->fetch_assoc();

// Lista de nomes
$sql_nomes = "SELECT name FROM students";
$result_nomes = $conn->query($sql_nomes);

// Alunos por idade
$sql_idade = "SELECT age, COUNT(*) AS total FROM students GROUP BY age";
$result_idade = $conn->query($sql_idade);

// Alunos por série
$sql_serie = "SELECT grade, COUNT(*) AS total FROM students GROUP BY grade";
$result_serie = $conn->query($sql_serie);

// Alunos por escola
$sql_escola = "SELECT school, COUNT(*) AS total FROM students GROUP BY school";
$result_escola = $conn->query($sql_escola);

?>

<!DOCTYPE html>
<html>
<head>
    <title>Relatório de Alunos</title>
    <style>
        table, th, td {
            border: 1px solid black;
            border-collapse: collapse;
        }
    </style>
</head>
<body>
    <h1>Relatório de Alunos</h1>

    <p>Total de alunos: <?php echo $row_total['total_alunos']; ?></p>

    <h2>Lista de Nomes</h2>
    <ul>
        <?php while($row = $result_nomes->fetch_assoc()): ?>
            <li><?php echo $row["name"]; ?></li>
        <?php endwhile; ?>
    </ul>

    <h2>Alunos por Idade</h2>
    <table>
        <tr>
            <th>Idade</th>
            <th>Total</th>
        </tr>
        <?php while($row = $result_idade->fetch_assoc()): ?>
        <tr>
            <td><?php echo $row["age"]; ?></td>
            <td><?php echo $row["total"]; ?></td>
        </tr>
        <?php endwhile; ?>
    </table>

    <h2>Alunos por Série</h2>
    <table>    
            <th>Escola</th>
            <th>Total</th>    
    <?php while($row = $result_escola->fetch_assoc()): ?>
        <tr>
            <td><?php echo $row["school"]; ?></td>
            <td><?php echo $row["total"]; ?></td>
        </tr>
    <?php endwhile; ?>
    </table>

    <h2>Alunos por Escola</h2>
    <table>
    <th>Série</th>
    <th>Total</th>  
    <?php while($row = $result_serie->fetch_assoc()): ?>
        <tr>
            <td><?php echo $row["grade"]; ?></td>
            <td><?php echo $row["total"]; ?></td>
        </tr>
        <?php endwhile; ?>
    </table>
</body>
</html>