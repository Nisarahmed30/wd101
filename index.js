document.addEventListener("DOMContentLoaded", function() {
    const registrationForm = document.getElementById("registrationForm");
    const dataTable = document.getElementById("dataTable");

    // Load saved data from web storage
    const savedData = JSON.parse(localStorage.getItem("registrationData")) || {};
    document.getElementById("name").value = savedData.name || "";
    document.getElementById("email").value = savedData.email || "";
    document.getElementById("dob").value = savedData.dob || "";

    registrationForm.addEventListener("submit", function(event) {
        event.preventDefault();

        // Additional validation for date of birth (DOB) between ages 18 and 55
        const dob = new Date(document.getElementById("dob").value);
        const currentDate = new Date();
        const minDob = new Date(currentDate.getFullYear() - 55, currentDate.getMonth(), currentDate.getDate());
        const maxDob = new Date(currentDate.getFullYear() - 18, currentDate.getMonth(), currentDate.getDate());

        if (dob < minDob || dob > maxDob) {
            alert("Please enter a valid date of birth between ages 18 and 55.");
            return;
        }

        // Save data to web storage
        const formData = {
            name: document.getElementById("name").value,
            email: document.getElementById("email").value,
            dob: document.getElementById("dob").value,
            password: document.getElementById("password").value,
            terms: true // Default value for the "Accepted terms?" column
        };
        localStorage.setItem("registrationData", JSON.stringify(formData));

        // Display data in the table
        const row = dataTable.insertRow(-1);
        const columns = ["name", "email", "password", "dob", "terms"];
        columns.forEach(function(column) {
            const cell = row.insertCell(-1);
            cell.textContent = formData[column] || "";
        });

        // Clear the form
        registrationForm.reset();

        // Clear the saved data from localStorage after displaying it
        localStorage.removeItem("registrationData");
    });
});
