const coursesModel = require('../models/courses.model');

//get all courses
exports.getCoursesList = (req, res) => {
  coursesModel.getAllCourses((err, courses) => {
    console.log('We are here');
    if (err) {
      res.send(400, err);
    }

    console.log('Course', courses);
    res.send(200, courses);
  });
};

//create new course
exports.createNewCourse = (req, res) => {
  console.log('create new course', req.body);
  const courseReqData = new coursesModel(req.body);
  coursesModel.checkCourseExist(courseReqData, (err, course) => {
    if (course) {
      res.send({status: false, message: 'Course exists!'})
    } else {
      console.log('Valid data');
      coursesModel.createCourse(courseReqData, (err, course) => {
        if (err) {
          res.send(err);
        }

        res.json({
          status: true,
          message: 'Course created successfully',
          data: course.insertId,
        });
      });
    }
  });
};

//update courses
exports.updateCourse = (req, res) => {
  const courseReqData = new coursesModel(req.body);
  coursesModel.checkCourseExist(courseReqData, (err, course) => {
    if (course) {
      res.send({status: false, message: 'Course exists!'})
    } else {
      console.log('Course update', courseReqData);
      coursesModel.updateCourse(req.params.id, courseReqData, (err, course) => {
        res.json({
          status: true,
          message: 'Course updated successfully',
          data: course.insertId,
        });
      });
    }
  });
};

//delete course
exports.deleteCourse = (req, res) => {
  coursesModel.deleteCourse(req.params.id, err => {
    if (err)
      res.send(err);
    res.json({
      success: true,
      message: 'Course deleted successfully',
    });
  });
};