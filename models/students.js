
class Student {
    constructor(name, email, course, gpa) {
        this.name = name;
        this.email = email;
        this.course = course;
        this.gpa = gpa;




        const timestamp = new Date().getTime();
        const random = Math.floor(Math.random() * 1000);
        this.id = timestamp + "" + random.toString().padStart(3, "0");
    }
}


module.exports = { Student };
