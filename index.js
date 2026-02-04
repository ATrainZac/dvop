var express = require('express');
var bodyParser = require("body-parser");
const { deleteStudent } = require('./utils/DeleteStudentUtil');
const { addStudent } = require('./utils/addStudent');
var app = express();

const viewUtil = require('./utils/viewUtil');

const PORT = process.env.PORT || 5050;
var startPage = "index.html";

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("./public"));
/* istanbul ignore next */
app.get('/', (req, res) => {
    /* istanbul ignore next */
    res.sendFile(__dirname + "/public/" + startPage);
});

//  VIEW STUDENT ROUTES //

app.delete('/delete/:id', deleteStudent);

app.get('/students/search', viewUtil.searchStudentByName);

//taskkill /F /IM node.exe

app.post('/api/students', addStudent);

server = app.listen(PORT, function () {
    const address = server.address();
    if (address) {
        const baseUrl = `http://${address.address == "::" ? 'localhost' :
            /* istanbul ignore next */
            address.address}:${address.port}`;
        console.log(`DVOPS project at: ${baseUrl}`);
    }
});

module.exports = { app, server };
