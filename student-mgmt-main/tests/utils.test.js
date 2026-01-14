// Import required modules and utilities
const fs = require('fs').promises;
const { deleteStudent } = require('../utils/DeleteStudentUtil');
// Mock the 'fs' module so we don't interact with the real file system.
// Instead, we simulate how readFile and writeFile should behave.
jest.mock('fs', () => ({
    promises: {
        readFile: jest.fn(),
        writeFile: jest.fn(),
    }
}));
describe('Unit Tests for Utils', () => {
    // Reset mocks before each test to avoid "leaking" state between tests
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it('deleteStudent should delete student', async () => {
        const mockData = JSON.stringify([
            {
                "id": "1",
                "name": "John Tan",
                "email": "john.tan@tp.edu.sg",
                "course": "Diploma in Information Technology",
                "gpa": 3.85
            }
        ]);
        fs.readFile.mockResolvedValue(mockData);
        fs.writeFile.mockResolvedValue();
        const req = { params: { id: "1" } };
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        await deleteStudent(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        // Extract the response
        const response = res.json.mock.calls[0][0];
        // Verify success message
        expect(response.message).toEqual('Student deleted successfully!');
    });
});