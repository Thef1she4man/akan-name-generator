// Akan names arrays: Index 0 = Sunday, 1 = Monday, ..., 6 = Saturday
const maleNames = ["Kwasi", "Kwadwo", "Kwabena", "Kwaku", "Yaw", "Kofi", "Kwame"];
const femaleNames = ["Akosua", "Adwoa", "Abenaa", "Akua", "Yaa", "Afua", "Ama"];

document.getElementById('akanForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Retrieve inputs
    const birthdate = document.getElementById('birthdate').value;
    const gender = document.querySelector('input[name="gender"]:checked');
    
    // Validate inputs
    if (!birthdate) {
        alert("Please enter a birthdate.");
        return;
    }
    if (!gender) {
        alert("Please select a gender.");
        return;
    }
    
    // Parse date
    const date = new Date(birthdate);
    const day = date.getDate();
    const month = date.getMonth() + 1; // JS months are 0-based
    const year = date.getFullYear();
    
    // Validate day and month
    if (day < 1 || day > 31 || month < 1 || month > 12) {
        alert("Invalid date. Day must be 1-31, month 1-12.");
        return;
    }
    
    // Check for invalid dates (e.g., Feb 30)
    if (day > new Date(year, month, 0).getDate()) {
        alert("Invalid date for the given month.");
        return;
    }
    
    // Calculate day of the week using the formula
    let CC = Math.floor(year / 100);
    let YY = year % 100;
    let MM = month;
    let DD = day;
    
    // Adjust for Jan/Feb (treat as 13/14 of previous year)
    if (MM === 1 || MM === 2) {
        MM += 12;
        YY -= 1;
        if (YY < 0) {
            YY += 100;
            CC -= 1;
        }
    }
    
    const dayOfWeek = (Math.floor((CC / 4) - 2 * CC - 1) + Math.floor((5 * YY / 4)) + Math.floor((26 * (MM + 1) / 10)) + DD) % 7;
    
    // Get Akan name
    const names = gender.value === 'male' ? maleNames : femaleNames;
    const akanName = names[dayOfWeek];
    
    // Display result
    document.getElementById('result').textContent = `Your Akan name is: ${akanName}`;
});