const request = require('supertest');
const { expect } = require('chai');
const { app, server } = require('../index');

describe('Student Management API - Mocha', () => {
  after(() => {
    server.close();
  });

  describe('POST /api/students - Add Student', () => {
    it('should create a student with valid data', (done) => {
      const newStudent = {
        name: 'Mocha Test Student',
        email: 'mocha.test@tp.edu.sg',
        course: 'Diploma in IT',
        gpa: 3.7
      };

      request(app)
        .post('/api/students')
        .send(newStudent)
        .expect(201)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body.message).to.equal('Student added successfully');
          expect(res.body.student.name).to.equal(newStudent.name);
          expect(res.body.student.email).to.equal(newStudent.email);
          expect(res.body.student.course).to.equal(newStudent.course);
          expect(res.body.student.gpa).to.equal(newStudent.gpa);
          expect(res.body.student.id).to.exist;
          done();
        });
    });

    it('should create a student with minimum GPA (0.0)', (done) => {
      request(app)
        .post('/api/students')
        .send({
          name: 'Low GPA Student',
          email: 'low.gpa@tp.edu.sg',
          course: 'Diploma in Business',
          gpa: 0.0
        })
        .expect(201)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body.student.gpa).to.equal(0.0);
          done();
        });
    });

    it('should create a student with maximum GPA (4.0)', (done) => {
      request(app)
        .post('/api/students')
        .send({
          name: 'High GPA Student',
          email: 'high.gpa@tp.edu.sg',
          course: 'Diploma in Engineering',
          gpa: 4.0
        })
        .expect(201)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body.student.gpa).to.equal(4.0);
          done();
        });
    });

    it('should return 400 for missing name field', (done) => {
      request(app)
        .post('/api/students')
        .send({
          email: 'no.name@tp.edu.sg',
          course: 'Diploma in IT',
          gpa: 3.0
        })
        .expect(400)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body.message).to.equal('Missing required fields');
          done();
        });
    });

    it('should return 400 for missing email field', (done) => {
      request(app)
        .post('/api/students')
        .send({
          name: 'No Email',
          course: 'Diploma in IT',
          gpa: 3.0
        })
        .expect(400)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body.message).to.equal('Missing required fields');
          done();
        });
    });

    it('should return 400 for missing course field', (done) => {
      request(app)
        .post('/api/students')
        .send({
          name: 'No Course',
          email: 'no.course@tp.edu.sg',
          gpa: 3.0
        })
        .expect(400)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body.message).to.equal('Missing required fields');
          done();
        });
    });

    it('should return 400 for missing gpa field', (done) => {
      request(app)
        .post('/api/students')
        .send({
          name: 'No GPA',
          email: 'no.gpa@tp.edu.sg',
          course: 'Diploma in IT'
        })
        .expect(400)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body.message).to.equal('Missing required fields');
          done();
        });
    });

    it('should return 400 for empty request body', (done) => {
      request(app)
        .post('/api/students')
        .send({})
        .expect(400)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body.message).to.equal('Missing required fields');
          done();
        });
    });
  });
});
