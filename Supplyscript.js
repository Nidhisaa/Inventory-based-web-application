// Supplyscript.js

document.addEventListener('DOMContentLoaded', function() {
    fetchData();
});

function fetchData() {
    $.ajax({
        url: 'backend.php',
        type: 'POST',
        data: { action: 'fetch' },
        success: function(response) {
            const data = JSON.parse(response);
            // Process the data and update the DOM
        },
        error: function(error) {
            console.error('Error fetching data:', error);
        }
    });
}

function insertData(formData) {
    $.ajax({
        url: 'backend.php',
        type: 'POST',
        data: formData,
        success: function(response) {
            const result = JSON.parse(response);
            if (result.success) {
                alert('Data inserted successfully');
                fetchData();  // Refresh the data after insertion
            } else {
                alert('Error: ' + result.error);
            }
        },
        error: function(error) {
            console.error('Error inserting data:', error);
        }
    });
}

document.querySelector('form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = $(this).serialize() + '&action=insert';
    insertData(formData);
});
