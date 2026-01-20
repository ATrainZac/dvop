const fs = require('fs').promises;
const path = require('path');
const STUDENT_FILE = path.join('utils', 'students.json');

async function deleteStudent(req, res) {
    try {
        const { id } = req.params;
        let students = [];

        try {
            const data = await fs.readFile(STUDENT_FILE, 'utf8');
            students = JSON.parse(data);
        } catch (err) {
            if (err.code === 'ENOENT') {
                return res.status(404).json({ message: 'No students found to delete.' });
            } else {
                throw err;
            }
        }

        const studentIndex = students.findIndex(s => s.id.trim() === id.trim());

        if (studentIndex === -1) {
            return res.status(404).json({ message: 'Student not found.' });
        }

        students.splice(studentIndex, 1);
        await fs.writeFile(STUDENT_FILE, JSON.stringify(students, null, 2), 'utf8');

        return res.status(200).json({ message: 'Student deleted successfully!' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message });
    }
}

module.exports = { deleteStudent };
