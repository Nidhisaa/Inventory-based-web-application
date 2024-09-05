// Import required modules
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// Use bodyParser middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));

// Example credentials
const admin_user = 'admin';
const admin_pass = 'admin123';

const other_user = 'user';
const other_pass = 'user123';

// Handle POST requests
app.post('/login', (req, res) => {
    const username = req.body.username ? req.body.username.trim() : '';
    const password = req.body.password ? req.body.password.trim() : '';

    // Basic validation to check if fields are empty
    if (!username || !password) {
        return res.send('Please enter both username and password.');
    }

    // Check if the username and password match the admin credentials
    if (username === admin_user && password === admin_pass) {
        return res.redirect('/main.html'); // Redirect to admin's main.html
    } else if (username === other_user && password === other_pass) {
        return res.redirect('/ENTRY.html'); // Redirect to user's ENTRY.html
    } else {
        // Invalid credentials
        return res.send('Invalid username or password!');
    }
});

// Handle other HTTP methods (like GET)
app.use((req, res) => {
    res.status(405).send('HTTP Method Not Allowed.');
});

// Start the server on port 3000
const port = 3000;
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
