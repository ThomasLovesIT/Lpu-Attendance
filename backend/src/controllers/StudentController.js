import { StudentModel } from '../models/StudentModel.js';

export const getAllStudents = async (req, res) => {
    try {
        const students = await StudentModel.getAll();
        res.status(200).json(students);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch students' });
    }
};

// --- CORRECTED FUNCTION ---
export const createStudent = async (req, res) => {
   try {
    // 1. The controller's job is to get data from the request.
    //    It doesn't need to know about database columns.
    const newStudentData = req.body;

    // 2. Call the model to do the database work. This keeps your logic separate.
    const result = await StudentModel.create(newStudentData);

    // 3. Send the response.
  
    res.status(201).json({ message: 'Student added successfully', studentId: result.insertId });
   } catch(error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to add student' });
    }
};

export const getStudentById = async (req, res) => {
    try {
        const student = await StudentModel.getById(req.params.id);
        if (!student) return res.status(404).json({ error: "Student not found" });
        res.json(student);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

export const updateStudent = async (req, res) => {
    try {
        const result = await StudentModel.update(req.params.id, req.body);
        if (result.affectedRows === 0) return res.status(404).json({ error: "Student not found" });
        res.json({ message: "Student updated successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

export const deleteStudent = async (req, res) => {
    try {
        const result = await StudentModel.delete(req.params.id);
        if (result.affectedRows === 0) return res.status(404).json({ error: 'Student not found' });
        res.status(200).json({ message: 'Student deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete student' });
    }
};