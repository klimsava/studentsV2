const express = require('express');
const router = express.Router();

const studentsController = require('../controllers/students.controller');
const {validatorsId, checkValidationResult, studentsValidators} = require('../validators/validatorsParams');

//get all students
router.get('/', studentsController.getStudentsList);

//create new student
router.post('/', studentsValidators, checkValidationResult, studentsController.createNewStudent);

//update student
router.put('/:id', studentsValidators, validatorsId, checkValidationResult, studentsController.updateStudents);

//delete student
router.delete('/:id', validatorsId, checkValidationResult, studentsController.deleteStudent);

module.exports = router;