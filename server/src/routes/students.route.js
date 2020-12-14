const express = require('express');
const router = express.Router();

const studentsController = require('../controllers/students.controller');
const {validatorsSelectedCourses, validatorsId, checkValidationResult, studentsValidators} = require('../validators/validatorsParams');

//get all students
router.get('/', studentsController.studentsController.getListAllStudents);

//create new student
router.post('/', studentsValidators, checkValidationResult, studentsController.studentsController.createNewStudent);

//update student
router.put('/:id', studentsValidators, validatorsId, checkValidationResult, studentsController.studentsController.updateStudents);

//delete student
router.delete('/:id', validatorsId, checkValidationResult, studentsController.studentsController.deleteStudent);
//
// //chosen course
router.post('/chosen-course', validatorsSelectedCourses, checkValidationResult, studentsController.studentsController.selectCourse);

module.exports = router;