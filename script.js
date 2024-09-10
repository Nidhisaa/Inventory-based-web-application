document.getElementById('sale-form').addEventListener('submit', function(event) {
    // Get form values
    var drugName = document.getElementById('drug-name').value;
    var requiresPrescription = document.getElementById('requires-prescription').checked;
    
    if (requiresPrescription) {
        var prescriptionId = document.getElementById('prescription-id').value;
        var doctorName = document.getElementById('doctor-name').value;

        // Check if prescription details are provided
        if (!prescriptionId || !doctorName) {
            alert('Prescription ID and Doctor\'s Name are required for this drug.');
            event.preventDefault(); // Prevent form submission
        }
    }
});
