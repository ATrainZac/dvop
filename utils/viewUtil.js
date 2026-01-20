// utils/viewUtil.js
const fs = require('fs').promises;
const path = require('path');

const STUDENTS_FILE = path.join('utils', 'students.json');

async function searchStudentByName(req, res) {
    const searchName = req.query.name;

    // E1: missing name input
    if (!searchName || searchName.trim() === '') {
        return res.status(400).json({
            message: 'Please enter a name to search.'
        });
    }

    const keyword = searchName.trim().toLowerCase();

    // E2: input does not contain at least ONE alphabetical character
    if (!/[a-zA-Z]/.test(keyword)) {
        return res.status(400).json({
            message: 'Invalid name. Name must contain at least one alphabetical letter.'
        });
    }

    try {
        const data = await fs.readFile(STUDENTS_FILE, 'utf8');
        const json = JSON.parse(data);
        const students = Array.isArray(json) ? json : (Array.isArray(json.students) ? json.students : []);

        // Apply partial match search
        const matched = students.filter((s) =>
            s.name && s.name.toLowerCase().includes(keyword)
        );

        //  E3: valid format, but no matching results
        if (matched.length === 0) {
            return res.status(404).json({
                message: `No students found with name containing "${searchName.trim()}".`
            });
        }

        // S1: return matches
        return res.status(200).json(matched);

    } catch (error) {
        //  E4: database file missing or corrupted
        if (error.code === 'ENOENT') {
            return res.status(500).json({
                message: 'Student database file is missing.'
            });
        }

        return res.status(500).json({
            message: 'Unexpected server error: ' + error.message
        });
    }
}

module.exports = { searchStudentByName };
