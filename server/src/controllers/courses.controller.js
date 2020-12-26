const Courses = require("../models/courses.model");

exports.getListAllCourses = async (req, res, next) => {
  const message = await Courses.getAllCourses().catch(next);

  return res.status(200).json(message);
};

exports.createNewCourse = async (req, res, next) => {
  const courseReqData = new Courses(req.body);
  if ((await Courses.checkCourseExist(courseReqData)).length) {
    return res.status(409).json({status: false, message: 'Course exists!'});
  }

  await Courses.createCourse(courseReqData).catch(next);

  return res.status(200).json({
    status: true,
    message: 'Course created successfully',
  });
};

exports.updateCourse = async (req, res, next) => {
  const courseReqData = new Courses(req.body);

  if ((await Courses.checkCourseExist(courseReqData)).length) {
    return res.status(409).json({status: false, message: 'Course exists!'});
  }

  await Courses.updateCourse(req.params.id, courseReqData).catch(next);

  return res.status(200).json({
    status: true,
    message: 'Course updated successfully!',
  });
};

exports.deleteCourse = async (req, res, next) => {
  await Courses.deleteCourse(req.params.id).catch(next);

  return res.status(200).json({
    success: true,
    message: 'Course deleted successfully!',
  });
};
