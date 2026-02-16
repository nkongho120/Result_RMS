let students = JSON.parse(localStorage.getItem("students")) || [];

const form = document.getElementById("admissionForm");

if(form){
    form.addEventListener("submit", function(e){
        e.preventDefault();

        const student = {
            fullname: document.getElementById("fullname").value,
            email: document.getElementById("email").value,
            phone: document.getElementById("phone").value,
            department: document.getElementById("department").value,
            course: document.getElementById("course").value,
            status: "Pending"
        };

        students.push(student);
        localStorage.setItem("students", JSON.stringify(students));

        document.getElementById("message").innerText = 
            "Application Submitted Successfully!";
        
        form.reset();
    });
}
