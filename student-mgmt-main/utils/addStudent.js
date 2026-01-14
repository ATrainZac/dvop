const { Student } = require('../models/students');
const fs = require('fs').promises;
const path = require('path');

const STUDENTS_FILE = path.join('utils', 'students.json');
const TEMPLATE_FILE = path.join('utils', 'students.template.json');

async function addStudent(req, res) {
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
        return res.status(201).json(students);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message });
    }
}

module.exports = { addStudent };