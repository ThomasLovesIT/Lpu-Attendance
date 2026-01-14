import db from '../config/db.js';

export const StudentModel = {
    getAll: async () => {
        const [rows] = await db.query('SELECT * FROM students_details');
        return rows;
    },

    create: async (student) => {
        const { student_name, student_id } = student;
        const query = 'INSERT INTO students_details (student_name, student_id) VALUES (?, ?)';
        const [result] = await db.query(query, [student_name, student_id]);
        return result;
    },

    getById: async (id) => {
        const [rows] = await db.query('SELECT * FROM student_details WHERE id = ?', [id]);
        return rows[0]; // Return the first result or undefined
    },

    update: async (id, student) => {
        const { name, email, age, gender } = student;
        const query = 'UPDATE student_details SET name=?, email=?, age=?, gender=? WHERE id=?';
        const [result] = await db.query(query, [name, email, age, gender, id]);
        return result;
    },

    delete: async (id) => {
        const [result] = await db.query('DELETE FROM student_details WHERE id = ?', [id]);
        return result;
    }
};