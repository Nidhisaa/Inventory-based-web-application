document.getElementById("manufacture-btn").addEventListener("click", function() {
    showSection("manufacture");
});

document.getElementById("warehouse-btn").addEventListener("click", function() {
    showSection("warehouse");
});

document.getElementById("vendor-btn").addEventListener("click", function() {
    showSection("vendor");
});

function showSection(sectionId) {
    // Hide all sections
    document.getElementById("manufacture").style.display = "none";
    document.getElementById("warehouse").style.display = "none";
    document.getElementById("vendor").style.display = "none";

    // Show the selected section
    document.getElementById(sectionId).style.display = "block";
}
