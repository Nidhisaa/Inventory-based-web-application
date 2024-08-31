<?php
// backend.php

// Database connection parameters
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "your_database_name";

// Create a connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check the connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Handle AJAX requests
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $action = $_POST['action'];

    switch ($action) {
        case 'fetch':
            fetchData($conn);
            break;
        case 'insert':
            insertData($conn);
            break;
        case 'update':
            updateData($conn);
            break;
        case 'delete':
            deleteData($conn);
            break;
        default:
            echo json_encode(["error" => "Invalid action"]);
            break;
    }
}

function fetchData($conn) {
    $sql = "SELECT * FROM your_table_name";
    $result = $conn->query($sql);

    $data = [];
    while($row = $result->fetch_assoc()) {
        $data[] = $row;
    }

    echo json_encode($data);
}

function insertData($conn) {
    $column1 = $_POST['column1'];
    $column2 = $_POST['column2'];

    $sql = "INSERT INTO your_table_name (column1, column2) VALUES ('$column1', '$column2')";
    if ($conn->query($sql) === TRUE) {
        echo json_encode(["success" => "New record created successfully"]);
    } else {
        echo json_encode(["error" => "Error: " . $sql . "<br>" . $conn->error]);
    }
}

function updateData($conn) {
    $id = $_POST['id'];
    $column1 = $_POST['column1'];
    $column2 = $_POST['column2'];

    $sql = "UPDATE your_table_name SET column1='$column1', column2='$column2' WHERE id='$id'";
    if ($conn->query($sql) === TRUE) {
        echo json_encode(["success" => "Record updated successfully"]);
    } else {
        echo json_encode(["error" => "Error: " . $sql . "<br>" . $conn->error]);
    }
}

function deleteData($conn) {
    $id = $_POST['id'];

    $sql = "DELETE FROM your_table_name WHERE id='$id'";
    if ($conn->query($sql) === TRUE) {
        echo json_encode(["success" => "Record deleted successfully"]);
    } else {
        echo json_encode(["error" => "Error: " . $sql . "<br>" . $conn->error]);
    }
}

$conn->close();
?>
