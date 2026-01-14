function addStudent() {
    var response = "";
    // Create an object to hold form data
    var jsonData = new Object();
    jsonData.name = document.getElementById("name").value;
    jsonData.course = document.getElementById("course").value;
    jsonData.email = document.getElementById("email").value;
    jsonData.gpa = document.getElementById("gpa").value;
    
    // Validate required fields (all must be filled in)
    if (jsonData.name == "" || jsonData.course == "" || jsonData.email == "" || jsonData.gpa == "") {
        alert('All fields are required!');
        return;
    }
    
    // Validate email format
    if (!jsonData.email.includes('@')) {
        alert('Email must contain @ symbol');
        return;
    }
    
    // Configure the request to POST data to /api/students
    var request = new XMLHttpRequest();
    request.open("POST", "/api/students", true);
    request.setRequestHeader('Content-Type', 'application/json');
    
    // Define what happens when the server responds
    request.onload = function () {
        try {
            response = JSON.parse(request.responseText);
            console.log(response);
            
            if (request.status === 201 && response.message && response.student) {
                alert('Student added successfully! ID: ' + response.student.id);
                // Clear form fields after success
                document.getElementById("name").value = "";
                document.getElementById("course").value = "";
                document.getElementById("email").value = "";
                document.getElementById("gpa").value = "";
            } else {
                alert('Error: ' + (response.message || 'Unable to add student!'));
            }
        } catch (e) {
            alert('Error processing response: ' + e.message);
        }
    };
    
    request.onerror = function () {
        alert('Network error occurred. Please check if the server is running.');
    };
    
    // Send the request with JSON-formatted data
    request.send(JSON.stringify(jsonData));
}