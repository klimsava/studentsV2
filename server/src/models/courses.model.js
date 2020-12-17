const dbConnect = require('../../components/db');

module.exports = class Courses {
  constructor(courses) {
    this.name = courses.name;
    this.time = courses.time;
    this.description = courses.description;
  }

  //get all courses
  static async getAllCourses() {
    let res = await dbConnect();
    let [rows, fields] = await res.execute('SELECT * FROM courses');

    return rows;
  }

  //delete course
  static async deleteCourse(id) {
    let res = await dbConnect();
    return await res.query('DELETE FROM courses WHERE id=?', [id], async function (err, result) {
      return result;
    });
  }

  //create new course
  static async createCourse(courseData) {
    let res = await dbConnect();

    return await res.query('INSERT INTO courses SET ?', courseData, async function (err, result, fields) {
      return result;
    });
  }

//check exist student in DB
  static async checkCourseExist(courseData) {
    let res = await dbConnect();
    let [rows, fields] = await res.execute('SELECT 1 FROM courses WHERE name=?', [courseData.name]);

    return rows;
  }

  //update course
  static async updateCourse(id, courseReqData) {
    let res = await dbConnect();
    return await res.query('UPDATE courses SET name=?, description=?, time=? WHERE id = ?', [courseReqData.name, courseReqData.description, courseReqData.time, id], async function (err, result, fields) {
      return result;
    });
  }
};
