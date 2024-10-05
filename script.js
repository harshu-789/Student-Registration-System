let students = []; // Initialize an empty array to store student objects
let currentEditIndex = -1; // Initialize variable to track which student is being edited (-1 means no student is being edited)

// Access the "name" input field from the DOM
var inputName = document.getElementById("name");

// Save the value of the "name" input field to localStorage with the key "name"
localStorage.setItem("name", inputName.value);

// Retrieve the stored "name" value from localStorage and store it in 'storedValue'
var storedValue = localStorage.getItem("name");

function addStudent() {
    // Get values from the form inputs
    const name = document.getElementById('name').value;
    const classValue = document.getElementById('class').value;
    const email = document.getElementById('email').value;
    const address = document.getElementById('address').value;
    const contact = document.getElementById('contact').value;

    // Basic validation to ensure all fields are filled out
    if (name === '' || classValue === '' || email === " " || address === '' || contact === '') {
        alert('Please fill in all fields'); // Alert the user if any field is empty
        return; // Stop function execution if validation fails
    }

    // Create a student object with the form data
    const student = { name, classValue, email, address, contact };

    // Check if it's a new student (currentEditIndex is -1) or an update to an existing one
    if (currentEditIndex === -1) {
        students.push(student); // If adding a new student, push it to the students array
    } else {
        students[currentEditIndex] = student; // If editing, update the student at the currentEditIndex
        currentEditIndex = -1; // Reset the edit index after the update
    }

    resetForm(); // Clear the form inputs
    renderStudents(); // Re-render the student list
}

function renderStudents() {
    const studentList = document.getElementById('studentList'); // Get the student list table body element
    studentList.innerHTML = ''; // Clear the current contents of the table

    // Loop through each student in the students array
    students.forEach((student, index) => {
        // Append a new row for each student in the table with their data and action buttons
        studentList.innerHTML += `
            <tr>
                <td>${student.name}</td>
                <td>${student.classValue}</td>
                <td>${student.email}</td>
                <td>${student.address}</td>
                <td>${student.contact}</td>
                <td>
                    <button class="edit" onclick="editStudent(${index})">Edit</button> <!-- Edit button to modify student -->
                    <button class="delete" onclick="deleteStudent(${index})">Delete</button> <!-- Delete button to remove student -->
                </td>
            </tr>
        `;
    });
}

function editStudent(index) {
    const student = students[index]; // Get the student data from the array based on the index
    document.getElementById('name').value = student.name; // Populate the form fields with the student data
    document.getElementById('class').value = student.classValue;
    document.getElementById('email').value = student.email;
    document.getElementById('address').value = student.address;
    document.getElementById('contact').value = student.contact;

    currentEditIndex = index; // Set the currentEditIndex to the index of the student being edited
}

function deleteStudent(index) {
    students.splice(index, 1); // Remove the student from the students array by their index
    renderStudents(); // Re-render the student list after deletion
}

function resetForm() {
    // Clear the form inputs by setting their values to empty strings
    document.getElementById('name').value = '';
    document.getElementById('class').value = '';
    document.getElementById('email').value = '';
    document.getElementById('address').value = '';
    document.getElementById('contact').value = '';
}
