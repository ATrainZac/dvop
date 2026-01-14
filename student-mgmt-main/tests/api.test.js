const request = require('supertest');
const { app, server } = require('../index');

// Close server after all tests complete
afterAll(() => server.close());

describe('Student Management API', () => {

  it('DELETE /delete/:id should handle non-existent student correctly', async () => {
    const studentId = 'S10001';

    const res = await request(app).delete(`/delete/${studentId}`);

    expect(res.status).toBe(404);
  });

});


