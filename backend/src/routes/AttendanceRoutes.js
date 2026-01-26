import express from 'express';
import { logAttendance } from '../controllers/AttendanceController.js';
import { registerAndTimeInGuest } from '../controllers/GuestController.js';

const router = express.Router();

// DEBUG LOG: This will print in your terminal when the server starts
console.log("✅ Attendance Routes Loaded: / and /guest");

router.post('/', logAttendance);
router.post('/guest', registerAndTimeInGuest);

export default router;