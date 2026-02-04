const fs = require('fs').promises;
const { addStudent } = require('../utils/addStudent');
const { deleteStudent } = require('../utils/DeleteStudentUtil');

jest.mock('fs', () => ({
    promises: {
        readFile: jest.fn(),
        writeFile: jest.fn(),
    }
}));

describe('Unit Tests for Utils', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('addStudent', () => {
        it('should add a student to empty file', async () => {
            const mockData = JSON.stringify([]);
            fs.readFile.mockResolvedValue(mockData);
            fs.writeFile.mockResolvedValue();

            const req = {
                body: {
                    name: "Jane Doe",
                    email: "jane.doe@tp.edu.sg",
                    course: "Diploma in Information Technology",
                    gpa: "3.75"
                }
            };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

            await addStudent(req, res);

            expect(res.status).toHaveBeenCalledWith(201);
            const response = res.json.mock.calls[0][0];
            expect(response.message).toEqual('Student added successfully');
            expect(response.student.name).toEqual('Jane Doe');
            expect(response.student.email).toEqual('jane.doe@tp.edu.sg');
            expect(response.student.gpa).toEqual(3.75);
        });

        it('should add a student to existing students', async () => {
            const mockData = JSON.stringify([{ id: "1", name: "John Tan", email: "john@tp.edu.sg", course: "IT", gpa: 3.5 }]);
            fs.readFile.mockResolvedValue(mockData);
            fs.writeFile.mockResolvedValue();

            const req = {
                body: {
                    name: "Mary Lee",
                    email: "mary.lee@tp.edu.sg",
                    course: "Business",
                    gpa: "3.8"
                }
            };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

            await addStudent(req, res);

            expect(res.status).toHaveBeenCalledWith(201);
            const response = res.json.mock.calls[0][0];
            expect(response.message).toEqual('Student added successfully');
            expect(response.student.name).toEqual('Mary Lee');
        });

        it('should handle file not found and use template', async () => {
            const templateData = JSON.stringify([]);
            fs.readFile.mockRejectedValueOnce({ code: 'ENOENT' }).mockResolvedValueOnce(templateData);
            fs.writeFile.mockResolvedValue();

            const req = {
                body: {
                    name: "Test Student",
                    email: "test@tp.edu.sg",
                    course: "IT",
                    gpa: "3.0"
                }
            };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

            await addStudent(req, res);

            expect(res.status).toHaveBeenCalledWith(201);
            expect(fs.writeFile).toHaveBeenCalledTimes(2);
        });

        it('should parse GPA as float', async () => {
            const mockData = JSON.stringify([]);
            fs.readFile.mockResolvedValue(mockData);
            fs.writeFile.mockResolvedValue();

            const req = {
                body: {
                    name: "GPA Test",
                    email: "gpa@tp.edu.sg",
                    course: "IT",
                    gpa: "3.99"
                }
            };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

            await addStudent(req, res);

            const response = res.json.mock.calls[0][0];
            expect(response.student.gpa).toBe(3.99);
            expect(typeof response.student.gpa).toBe('number');
        });

        it('should generate unique student ID', async () => {
            const mockData = JSON.stringify([]);
            fs.readFile.mockResolvedValue(mockData);
            fs.writeFile.mockResolvedValue();

            const req = {
                body: {
                    name: "ID Test",
                    email: "id@tp.edu.sg",
                    course: "IT",
                    gpa: "3.0"
                }
            };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

            await addStudent(req, res);

            const response = res.json.mock.calls[0][0];
            expect(response.student.id).toBeDefined();
            expect(typeof response.student.id).toBe('string');
        });

        it('should handle file read error', async () => {
            fs.readFile.mockRejectedValue(new Error('Read error'));

            const req = {
                body: {
                    name: "Error Test",
                    email: "error@tp.edu.sg",
                    course: "IT",
                    gpa: "3.0"
                }
            };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

            await addStudent(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json.mock.calls[0][0].message).toBeDefined();
        });

        it('should handle file write error', async () => {
            const mockData = JSON.stringify([]);
            fs.readFile.mockResolvedValue(mockData);
            fs.writeFile.mockRejectedValue(new Error('Write error'));

            const req = {
                body: {
                    name: "Write Error",
                    email: "write@tp.edu.sg",
                    course: "IT",
                    gpa: "3.0"
                }
            };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

            await addStudent(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
        });
    });

    it('deleteStudent should delete a student', async () => {
        const mockData = JSON.stringify([{ id: "123", name: "John Tan" }]);
        fs.readFile.mockResolvedValue(mockData);
        fs.writeFile.mockResolvedValue();

        const req = { params: { id: "123" } };
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

        await deleteStudent(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json.mock.calls[0][0].message).toEqual('Student deleted successfully!');
    });
});
