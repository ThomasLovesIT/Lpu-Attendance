import db from '../config/db.js';

export const AttendanceModel = {
    // Check if student exists based on ID provided
    findStudent: async (studentId) => {
        const [rows] = await db.query('SELECT * FROM students_details WHERE student_id = ? ', [studentId]);
        return rows[0];

      
    },

    // Check if they already timed in TODAY and haven't timed out yet
    findActiveSession: async (studentId) => {
        const query = `
            SELECT * FROM student_attendance
            WHERE student_id = ? 
            AND attendance_date = CURRENT_DATE()
            AND time_out IS NULL
        `;
        const [rows] = await db.query(query, [studentId]);
        return rows[0];
    },

    

    logTimeIn: async (studentId) => {
        const query = 'INSERT INTO student_attendance (student_id, attendance_date, time_in) VALUES (?, CURDATE(), NOW())';
        const [result] = await db.query(query, [studentId]);
        return result;
    },

    logTimeOut: async (studentId) => {
        // We update the record where time_out is NULL (the open session)
        const query = `
            UPDATE student_attendance
            SET time_out = NOW() 
            WHERE student_id = ? 
            AND attendance_date = CURRENT_DATE()
            AND time_out IS NULL
        `;
        const [result] = await db.query(query, [studentId]);
        return result;
    }
};