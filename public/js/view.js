// public/js/view.js

const searchForm = document.getElementById("searchForm");
const nameInput = document.getElementById("nameInput");
const messageEl = document.getElementById("message");
const tableBody = document.getElementById("studentsBody");

function setMessage(text) {
    if (messageEl) {
        messageEl.textContent = text;
    }
}

function clearTable() {
    if (tableBody) {
        tableBody.innerHTML = "";
    }
}

function renderStudents(students) {
    if (!tableBody) return;

    if (!students || students.length === 0) {
        clearTable();
        setMessage("No students to display.");
        return;
    }

    const rowsHtml = students
        .map((s) => {
            return `
        <tr>
            <td>${s.id}</td>
            <td>${s.name}</td>
            <td>${s.email}</td>
            <td>${s.course}</td>
            <td>${s.gpa}</td>
        </tr>
        `;
        })
        .join("");

    tableBody.innerHTML = rowsHtml;
}

async function handleSearch(event) {
    event.preventDefault(); // prevent page reload

    const name = nameInput ? nameInput.value.trim() : "";

    // Frontend validation (extra)
    if (!name) {
        setMessage("Please type a name before searching.");
        clearTable();
        return;
    }

    clearTable();
    setMessage("Searching...");

    try {
        const url = `/students/search?name=${encodeURIComponent(name)}`;
        const res = await fetch(url);

        let data = null;
        try {
            data = await res.json();
        } catch (err) {
            data = null;
        }

        if (!res.ok) {
            const msg = (data && data.message) || "Search failed.";
            setMessage(msg);
            clearTable();
            return;
        }

        // Success
        renderStudents(data);
        setMessage(`${data.length} student(s) found for "${name}".`);

    } catch (error) {
        clearTable();
        setMessage("An error occurred while searching.");
    }
}

// Attach event listener ONLY to click/submit
document.addEventListener("DOMContentLoaded", () => {
    if (searchForm) {
        searchForm.addEventListener("submit", handleSearch);
    }
});
