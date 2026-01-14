var express = require('express');
var bodyParser = require("body-parser");
const { Student } = require('./models/students');
const { deleteStudent } = require('./utils/DeleteStudentUtil');
const fs = require('fs').promises;
const path = require('path');
var app = express();

const viewUtil = require('./utils/viewUtil');

const PORT = process.env.PORT || 5050;
var startPage = "index.html";
const STUDENTS_FILE = path.join('utils', 'students.json');
const TEMPLATE_FILE = path.join('utils', 'students.template.json');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("./public"));

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/public/" + startPage);
});

//  VIEW STUDENT ROUTES //

app.delete('/delete/:id', deleteStudent);

app.get('/students/search', viewUtil.searchStudentByName);

//taskkill /F /IM node.exe

app.post('/api/students', async (req, res) => {
    try {
        const { name, email, course, gpa } = req.body;
        const newStudent = new Student(name, email, course, parseFloat(gpa));

        let students = [];
        try {
            const data = await fs.readFile(STUDENTS_FILE, 'utf8');
            students = JSON.parse(data);
        } catch (err) {
            if (err.code === 'ENOENT') {
                const templateData = await fs.readFile(TEMPLATE_FILE, 'utf8');
                students = JSON.parse(templateData);
                await fs.writeFile(STUDENTS_FILE, JSON.stringify(students, null, 2), 'utf8');
            } else {
                throw err;
            }
        }

        students.push(newStudent);
        await fs.writeFile(STUDENTS_FILE, JSON.stringify(students, null, 2), 'utf8');
        return res.status(201).json({ message: 'Student added successfully', student: newStudent });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message });
    }
})

server = app.listen(PORT, function () {
    const address = server.address();
    const baseUrl = `http://${address.address == "::" ? 'localhost' :
        address.address}:${address.port}`;
    console.log(`DVOPS project at: ${baseUrl}`);
});

module.exports = { app, server };
