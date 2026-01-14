import express from 'express';
import * as StudentController from '../controllers/StudentController.js';

const router = express.Router();

router.get('/', StudentController.getAllStudents);
router.post('/', StudentController.createStudent);
router.get('/:id', StudentController.getStudentById);
router.put('/:id', StudentController.updateStudent);
router.delete('/:id', StudentController.deleteStudent);

export default router;