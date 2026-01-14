import express from 'express';
import { logAttendance } from '../controllers/AttendanceController.js';

const router = express.Router();

// POST /api/attendance
router.post('/', logAttendance);

export default router;