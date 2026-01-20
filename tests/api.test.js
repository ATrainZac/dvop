const request = require('supertest');
const { app, server } = require('../index');

afterAll(() => server.close());

describe('Student Management API', () => {
  let studentId;

  describe('POST /api/students - Add Student', () => {
    it('should create a student with valid data', async () => {
      const newStudent = {
        name: 'API Test Student',
        email: 'api.test@tp.edu.sg',
        course: 'Diploma in Information Technology',
        gpa: 3.5
      };

      const res = await request(app).post('/api/students').send(newStudent);

      expect(res.status).toBe(201);
      expect(res.body.message).toBe('Student added successfully');
      expect(res.body.student.name).toBe(newStudent.name);
      expect(res.body.student.email).toBe(newStudent.email);
      expect(res.body.student.course).toBe(newStudent.course);
      expect(res.body.student.gpa).toBe(newStudent.gpa);
      expect(res.body.student.id).toBeDefined();
      studentId = res.body.student.id;
    });

    it('should create a student with minimum GPA (0.0)', async () => {
      const newStudent = {
        name: 'Low GPA Student',
        email: 'low.gpa@tp.edu.sg',
        course: 'Diploma in Business',
        gpa: 0.0
      };

      const res = await request(app).post('/api/students').send(newStudent);

      expect(res.status).toBe(201);
      expect(res.body.student.gpa).toBe(0.0);
    });

    it('should create a student with maximum GPA (4.0)', async () => {
      const newStudent = {
        name: 'High GPA Student',
        email: 'high.gpa@tp.edu.sg',
        course: 'Diploma in Engineering',
        gpa: 4.0
      };

      const res = await request(app).post('/api/students').send(newStudent);

      expect(res.status).toBe(201);
      expect(res.body.student.gpa).toBe(4.0);
    });

    it('should handle missing name field', async () => {
      const newStudent = {
        email: 'no.name@tp.edu.sg',
        course: 'Diploma in IT',
        gpa: 3.0
      };

      const res = await request(app).post('/api/students').send(newStudent);

      expect(res.status).toBe(400);
    });

    it('should handle missing email field', async () => {
      const newStudent = {
        name: 'No Email',
        course: 'Diploma in IT',
        gpa: 3.0
      };

      const res = await request(app).post('/api/students').send(newStudent);

      expect(res.status).toBe(400);
    });

    it('should handle missing course field', async () => {
      const newStudent = {
        name: 'No Course',
        email: 'no.course@tp.edu.sg',
        gpa: 3.0
      };

      const res = await request(app).post('/api/students').send(newStudent);

      expect(res.status).toBe(400);
    });

    it('should handle missing gpa field', async () => {
      const newStudent = {
        name: 'No GPA',
        email: 'no.gpa@tp.edu.sg',
        course: 'Diploma in IT'
      };

      const res = await request(app).post('/api/students').send(newStudent);

      expect(res.status).toBe(400);
    });

    it('should handle empty request body', async () => {
      const res = await request(app).post('/api/students').send({});

      expect(res.status).toBe(400);
    });
  });

  
  
  
  
});


