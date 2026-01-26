import db from '../config/db.js';

export const registerAndTimeInGuest = async (req, res) => {
    const { student_id, student_name } = req.body;
    let connection;

    try {
        // 1. Strict Format Validation (Answer #5)
        const idPattern = /^\d{4}-\d{5}$/;
        if (!idPattern.test(student_id)) {
            return res.status(400).json({ error: "Invalid format. ID must be ####-#####" });
        }

        if (!student_name || student_name.trim() === "") {
            return res.status(400).json({ error: "Name is required." });
        }

        // Get a specific connection for the transaction
        connection = await db.getConnection();
        await connection.beginTransaction();

        // 2. Check for Duplicate ID (Answer #1)
        // If ID exists, we STOP and return an error.
        const [existing] = await connection.query(
            'SELECT id FROM students_details WHERE student_id = ?', 
            [student_id]
        );

        if (existing.length > 0) {
            await connection.rollback();
            return res.status(409).json({ 
                error: "This Student ID is already registered. Please close this form and just Time In." 
            });
        }

        // 3. Register the Guest (Atomic Step 1)
        // Note: I fixed the typo 'student_details' -> 'students_details'
        const [insertStudent] = await connection.query(
            'INSERT INTO students_details (student_name, student_id) VALUES (?, ?)',
            [student_name, student_id]
        );

        // 4. Log Time In (Atomic Step 2)
        // We log the attendance immediately
        await connection.query(
            'INSERT INTO student_attendance (student_id, attendance_date, time_in) VALUES (?, CURDATE(), NOW())',
            [student_id]
        );

        // 5. Commit Transaction (Answer #3)
        // Both actions are saved only if we reach this point.
        await connection.commit();

        res.status(201).json({ 
            success: true, 
            message: "Guest registered and Timed In successfully!" 
        });

    } catch (error) {
        // If anything fails, undo everything
        if (connection) await connection.rollback();
        console.error("Guest Registration Error:", error);
        res.status(500).json({ error: "System error during registration." });
    } finally {
        if (connection) connection.release();
    }
};