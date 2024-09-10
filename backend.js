// Import required modules
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

// Use bodyParser middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Example credentials
const admin_user = 'admin';
const admin_pass = 'admin123';

const other_user = 'user';
const other_pass = 'user123';
const required_vendor_license = 'VENDOR123'; // Example vendor license for validation

// Handle POST requests to /login
app.post('/login', (req, res) => {
    const username = req.body.username ? req.body.username.trim() : '';
    const password = req.body.password ? req.body.password.trim() : '';
    const vendorLicense = req.body.vendorLicense ? req.body.vendorLicense.trim() : '';

    // Basic validation to check if fields are empty
    if (!username || !password) {
        return res.send('Please enter both username and password.');
    }

    // Check if the user is admin (admin does not need vendor license)
    if (username === admin_user && password === admin_pass) {
        return res.redirect('/main.html'); // Redirect to admin's main.html
    }

    // For non-admin users, check the vendor license and credentials
    if (username === other_user && password === other_pass) {
        if (!vendorLicense) {
            return res.send('Vendor License is required for non-admin users.');
        }

        // Validate the vendor license
        if (vendorLicense === required_vendor_license) {
            return res.redirect('/ENTRY.html'); // Redirect to user's ENTRY.html
        } else {
            return res.send('Invalid Vendor License.');
        }
    }

    // If credentials don't match
    return res.send('Invalid username or password!');
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

// Example functions for stock level checking
function checkStockLevels() {
    let drugs = getDrugsFromInventory();  // Fetch drugs from your database
    drugs.forEach(drug => {
        if (drug.quantity < drug.reorder_level) {
            sendNotificationToWarehouse(drug);
        }
    });
}

function sendNotificationToWarehouse(drug) {
    // Implement email or notification sending logic here
    console.log(`Low stock alert: ${drug.name}`);
}

// Dummy function to simulate fetching drugs from inventory (replace this with actual DB code)
function getDrugsFromInventory() {
    return [
        { name: 'Aspirin', quantity: 5, reorder_level: 10 },
        { name: 'Paracetamol', quantity: 20, reorder_level: 15 },
        { name: 'Ibuprofen', quantity: 3, reorder_level: 5 }
    ];
}
