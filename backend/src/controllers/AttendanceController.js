import { AttendanceModel } from '../models/AttendanceModel.js';

export const logAttendance = async (req, res) => {
    // Expecting: { student_id: 123, type: 'IN' } or { student_id: 123, type: 'OUT' }
    const { student_id, type } = req.body; 

    if (!student_id || !type) {
        return res.status(400).json({ error: "Student ID and Type (IN/OUT) are required." });
    }

    try {
        // 1. Verify Student Exists using the model "findStudent" function
        const student = await AttendanceModel.findStudent(student_id);
        
    
        if (!student) {
            return res.status(404).json({ error: `Student ID ${student_id} not found in database.` });
        }

        // 2. Check for existing open session
        const activeSession = await AttendanceModel.findActiveSession(student_id);
      
        if (type === 'IN') {
            if (activeSession) {
                return res.status(409).json({ 
                    message: `Student ${student.student_name} is already timed in!`,
                    status: 'ALREADY_IN',
                    attendance_date: activeSession.attendance_date
                });
            }
            
            const timeInResult = await AttendanceModel.logTimeIn(student_id);
            const newSession = await AttendanceModel.findActiveSession(student_id);
            return res.status(200).json({ 
                message: `Welcome, ${student.student_name}. Time-in recorded.`,
                student_name: student.student_name,
                attendance_date: newSession?.attendance_date,
                timestamp: new Date()
            });

        } else if (type === 'OUT') {
            if (!activeSession) {
                return res.status(400).json({ 
                    error: `Cannot Time Out. ${student.student_name} has not timed in yet.` 
                });
            }

            await AttendanceModel.logTimeOut(student_id);
            return res.status(200).json({ 
                message: `Goodbye, ${student.student_name}. Time-out recorded.`,
                student_name: student.student_name,
                attendance_date: activeSession.attendance_date,
                timestamp: new Date()
            });
        } else {
            return res.status(400).json({ error: "Invalid type. Use 'IN' or 'OUT'." });
        }

    } catch (error) {
        console.error("Attendance Error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};