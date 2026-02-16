const form = document.getElementById("form");
const table = document.getElementById("table");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = {
        fullname: document.getElementById("fullname").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
        department: document.getElementById("department").value,
        course: document.getElementById("course").value
    };

    const response = await fetch("http://localhost:3000/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });

    const message = await response.text();
    alert(message);

    loadStudents();
});

async function loadStudents(){
    const res = await fetch("http://localhost:3000/students");
    const students = await res.json();

    table.innerHTML = `
        <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Department</th>
            <th>Status</th>
        </tr>
    `;

    students.forEach(student => {
        table.innerHTML += `
            <tr>
                <td>${student.fullname}</td>
                <td>${student.email}</td>
                <td>${student.department}</td>
                <td>${student.status}</td>
            </tr>
        `;
    });
}

loadStudents();
