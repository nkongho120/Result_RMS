const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "YOUR_MYSQL_PASSWORD",
    database: "university_admission"
});

db.connect(err => {
    if(err){
        console.log("Database connection failed");
    } else {
        console.log("Connected to MySQL");
    }
});

// Insert student
app.post("/apply", (req, res) => {
    const { fullname, email, phone, department, course } = req.body;

    const sql = "INSERT INTO students (fullname,email,phone,department,course) VALUES (?,?,?,?,?)";

    db.query(sql, [fullname, email, phone, department, course], (err, result) => {
        if(err){
            res.send("Error");
        } else {
            res.send("Application Submitted Successfully");
        }
    });
});

// Get all students (Admin)
app.get("/students", (req, res) => {
    db.query("SELECT * FROM students", (err, result) => {
        if(err){
            res.send(err);
        } else {
            res.json(result);
        }
    });
});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
