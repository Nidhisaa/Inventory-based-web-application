<?php
// Start output buffering to prevent any accidental output before headers
ob_start();

// Example credentials
$admin_user = 'admin';
$admin_pass = 'admin123';

$other_user = 'user';
$other_pass = 'user123';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Retrieve and trim the username and password from the POST request
    $username = isset($_POST['username']) ? trim($_POST['username']) : '';
    $password = isset($_POST['password']) ? trim($_POST['password']) : '';

    // Basic validation to check if fields are empty
    if (empty($username) || empty($password)) {
        echo "Please enter both username and password.";
    } else {
        // Check if the username and password match the admin credentials
        if ($username === $admin_user && $password === $admin_pass) {
            // Redirect to admin's main.html
            header("Location: main.html");
            exit();
        } elseif ($username === $other_user && $password === $other_pass) {
            // Redirect to user's entry.html
            header("Location: ENTRY.html");
            exit();
        } else {
            // Invalid credentials
            echo "Invalid username or password!";
        }
    }
} else {
    // If the request method is not POST, return a 405 error
    http_response_code(405);
    echo "HTTP Method Not Allowed.";
}

// Send output to the browser and end buffering
ob_end_flush();
?>
