const studentsModel = require('../models/students.model');
const {Students} = require("../models/students.model");

//get all students
exports.getListAllStudents = async (req, res) => {
  try {
    return res.status(200).json(await studentsModel.getAllStudents());
  } catch (err) {
    return res.send(500, err);
  }
};

//create new student
exports.createNewStudent = async (req, res) => {
  try {
    const studentReqData = new Students(req.body);
    let data = await studentsModel.checkStudentExist(studentReqData);

    if (data.length) {
      return res.status(500).json({status: false, message: 'The student already exists!'});
    } else {
      try {
        console.log('Valid data');
        let course = await studentsModel.createStudent(studentReqData);
        return res.status(200).json({
          status: true,
          message: 'Student created successfully',
          data: course.insertId,
        });
      } catch (err) {
        throw new Error(err);
      }
    }
  } catch (err) {
    throw new Error(err);
  }
};

//update student
exports.updateStudents = async (req, res) => {
  try {
    const studentReqData = new Students(req.body);
    let data = await studentsModel.checkStudentExist(studentReqData);

    if (data.length) {
      return res.status(500).json({status: false, message: 'The student already exists!'});
    } else {
      try {
        console.log('Valid data');
        let course = await studentsModel.updateStudents(req.params.id, studentReqData);
        return res.status(200).json({
          status: true,
          message: 'Student updated successfully!',
          data: course.insertId,
        });
      } catch (err) {
        throw new Error(err);
      }
    }
  } catch (err) {
    throw new Error(err);
  }
};

//delete student
exports.deleteStudent = async (req, res) => {
  try {
    await studentsModel.deleteStudent(req.params.id);
    return res.status(200).json({
      success: true,
      message: 'Student deleted successfully!',
    });
  } catch (err) {
    return res.send(500, err);
  }
};

exports.selectCourse = async (req, res) => {
  let response = await studentsModel.checkSelectedCourse(req.body);

  if (response) {
    res.status(500).json({status: false, message: 'You are already enrolled in the course at this time!'})
  } else {
    try {
      await studentsModel.selectCourse(req.body);
      return res.status(200).json({
          status: true,
          message: 'The course was successfully selected!',
        });
    } catch (err) {
      return res.send(500, err);
    }
  }
};
