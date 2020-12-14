const dbConnect = require('../../components/db');

const Courses = function (courses) {
  this.name = courses.name;
  this.time = courses.time;
  this.description = courses.description;
}

//get all courses
async function getAllCourses() {
  try {
    let res = await dbConnect();
    let [rows, fields] = await res.execute('SELECT * FROM courses');
    console.log('Courses fetched successfully');
    return rows;
  } catch (err) {
    return err;
  }
}

//create new course
async function createCourse(courseData) {
  try {
    let res = await dbConnect();

    const response = await res.query('INSERT INTO courses SET ?', courseData, async function (err, result, fields) {
      return result;
    });

    console.log('Courses fetched successfully');
    return await response;
  } catch (err) {
    throw new Error(err);
  }
}

//check exist student in DB
async function checkCourseExist(courseData) {
  try {
    let res = await dbConnect();
    let [rows, fields] = await res.execute('SELECT 1 AS courseExists FROM courses WHERE name=?', [courseData.name]);

    return rows[0].courseExists;
  } catch (err) {
    return err;
  }
}

// //update course
async function updateCourse(id, courseReqData) {
  try {
    let res = await dbConnect();
    const response = await res.query('UPDATE courses SET name=?, description=?, time=? WHERE id = ?', [courseReqData.name, courseReqData.description, courseReqData.time, id], async function (err, result, fields) {
      return result;
    });

    console.log('Courses fetched successfully');
    return await response;
  } catch (err) {
    return err;
  }
}

// //delete course
async function deleteCourse(id) {
  try {
    let res = await dbConnect();
    const response = await res.query('DELETE FROM courses WHERE id=?', [id], async function (err, result) {
      return result;
    });

    console.log('Course deleted successfully');
    return await response;
  } catch (err) {
    return err;
  }
}

module.exports = {Courses, getAllCourses, checkCourseExist, createCourse, updateCourse, deleteCourse};