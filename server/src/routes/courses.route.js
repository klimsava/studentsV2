const express = require('express');
const router = express.Router();

const coursesController = require('../controllers/courses.controller');
const {validatorsId, checkValidationResult, coursesValidators} = require('../validators/validatorsParams');

//get all courses
router.get('/', coursesController.getCoursesList);

//create new course
router.post('/', coursesValidators, checkValidationResult, coursesController.createNewCourse);

//update course
router.put('/:id', coursesValidators, validatorsId, checkValidationResult, coursesController.updateCourse);

//delete course
router.delete('/:id',validatorsId, checkValidationResult, coursesController.deleteCourse);

module.exports = router;