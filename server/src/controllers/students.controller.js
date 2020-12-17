const Students = require("../models/students.model");

exports.getListAllStudents = async (req, res, next) => {
  const message = await Students.getAllStudents().catch(next);

  return res.status(200).json(message);
};

exports.createNewStudent = async (req, res, next) => {
  const studentReqData = new Students(req.body);
  if ((await Students.checkStudentExist(studentReqData)).length) {
    return res.status(409).json({status: false, message: 'The student already exists!'});
  }

  await Students.createStudent(studentReqData).catch(next);

  return res.status(200).json({
    status: true,
    message: 'Student created successfully',
  });
};

exports.updateStudents = async (req, res, next) => {
  const studentReqData = new Students(req.body);

  if ((await Students.checkStudentExist(studentReqData)).length) {
    return res.status(409).json({status: false, message: 'The student already exists!'});
  }

  await Students.updateStudents(req.params.id, studentReqData).catch(next);

  return res.status(200).json({
    status: true,
    message: 'Student updated successfully!',
  });
};

exports.deleteStudent = async (req, res, next) => {
  await Students.deleteStudent(req.params.id).catch(next);

  return res.status(200).json({
    success: true,
    message: 'Student deleted successfully!',
  });
};

exports.selectCourse = async (req, res, next) => {
  let allCourse = await Students.getAllCourseTimeStudent(req.body.studentId);
  let courseTime = await Students.getTimeCourse(req.body.courseId);

  if (await Students.checkingExistCourse(allCourse, courseTime)) {
    return res.status(409).json({status: false, message: 'You already have a course at this time!'});
  }

  await Students.selectCourse(req.body.studentId, req.body.courseId).catch(next);

  return res.status(200).json({
    status: true,
    message: 'The course was successfully selected!',
  });
};
