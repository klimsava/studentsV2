const coursesModel = require('../models/courses.model');
const {Courses} = require("../models/courses.model");

//get all courses
async function getListAllCourses(req, res) {
  try {
    return res.status(200).json(await coursesModel.getAllCourses());
  } catch (err) {
    return res.send(500, err);
  }
}

//create new course
async function createNewCourse(req, res) {
  try {
    const courseReqData = new Courses(req.body);
    let data = await coursesModel.checkCourseExist(courseReqData);

    if (data === 1) {
      return res.status(500).json({status: false, message: 'Course exists!'});
    } else {
      try {
        console.log('Valid data');
        let course = await coursesModel.createCourse(courseReqData);
        return res.status(200).json({
          status: true,
          message: 'Course created successfully',
          data: course.insertId,
        });
      } catch (err) {
        throw new Error(err);
      }
    }
  } catch (err) {
    throw new Error(err);
  }
}

//update courses
async function updateCourse(req, res) {
  try {
    const courseReqData = new Courses(req.body);
    let data = await coursesModel.checkCourseExist(courseReqData);

    if (data === 1) {
      return res.status(500).json({status: false, message: 'Course exists!'});
    } else {
      try {
        console.log('Valid data');
        let course = await coursesModel.updateCourse(req.params.id, courseReqData);
        return res.status(200).json({
          status: true,
          message: 'Course updated successfully!',
          data: course.insertId,
        });
      } catch (err) {
        throw new Error(err);
      }
    }
  } catch (err) {
    throw new Error(err);
  }
}

//delete course
async function deleteCourse(req, res) {
  try {
    await coursesModel.deleteCourse(req.params.id);
    return res.status(200).json({
      success: true,
      message: 'Course deleted successfully!',
    });
  } catch (err) {
    return res.send(500, err);
  }
}

exports.coursesController = {getListAllCourses, createNewCourse, updateCourse, deleteCourse};