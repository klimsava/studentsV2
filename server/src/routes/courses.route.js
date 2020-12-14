const express = require('express');
const router = express.Router();

const coursesController = require('../controllers/courses.controller');
const {validatorsId, checkValidationResult, coursesValidators} = require('../validators/validatorsParams');

//get all courses
router.get('/', coursesController.coursesController.getListAllCourses);

//create new course
router.post('/', coursesValidators, checkValidationResult, coursesController.coursesController.createNewCourse);

//update course
router.put('/:id', coursesValidators, validatorsId, checkValidationResult, coursesController.coursesController.updateCourse);

//delete course
router.delete('/:id', validatorsId, checkValidationResult, coursesController.coursesController.deleteCourse);

module.exports = router;