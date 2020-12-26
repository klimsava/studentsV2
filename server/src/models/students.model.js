const dbConnect = require('../../components/db');

module.exports = class Students {
  constructor(students) {
    this.first_name = students.first_name;
    this.last_name = students.last_name;
    this.age = students.age;
  }

  static async getAllStudents() {
    let res = await dbConnect();
    let [rows, fields] = await res.execute('SELECT * FROM students');
    console.log('Students fetched successfully');
    return rows;
  }

  static async createStudent(studentData) {
    let res = await dbConnect();
    return await res.query("INSERT INTO students SET ? ", [studentData], async function (err, result) {
      return result;
    });
  }

  static async checkStudentExist(studentData) {
    let res = await dbConnect();
    let [rows, fields] = await res.execute("SELECT 1 FROM students WHERE first_name=? AND last_name=?", [studentData.first_name, studentData.last_name]);

    return rows;
  }

  static async updateStudents(id, studentReqData) {
    let res = await dbConnect();
    return await res.query("UPDATE students SET first_name=?, last_name=?, age=? WHERE id = ?", [studentReqData.first_name, studentReqData.last_name, studentReqData.age, id], async function (err, result, fields) {
      return result;
    });
  }

  static async deleteStudent(id) {
    let res = await dbConnect();
    return await res.query("DELETE FROM students WHERE id= ?", [id], async function (err, result) {
      return result;
    });
  }

  static async selectCourse(studentId, courseId) {
    let res = await dbConnect();
    return await res.query("INSERT INTO student_courses SET ?", [{
      student_id: studentId,
      course_id: courseId
    }], async function (err, result) {
      return result;
    });
  }

  static async getAllCourseTimeStudent(studentId) {
    let res = await dbConnect();
    let [rows, fields] = await res.execute("SELECT student_id, time FROM students JOIN student_courses ON students.id = student_courses.student_id JOIN courses on student_courses.course_id = courses.id WHERE student_courses.student_id = ?", [studentId]);

    return rows.map(item => {
      return {studentId: item.student_id, time: item.time};
    });
  }

  static async getTimeCourse(courseId) {
    let res = await dbConnect();
    let [rows, fields] = await res.execute("SELECT time FROM `students_db`.`courses` WHERE `id`=?", [courseId]);

    return rows[0].time;
  }

  static async checkingExistCourse(allCourses, courseTime) {
    let result = [];

    for (let i = 0; i < allCourses.length; i++) {
      result.push(allCourses[i].time);
    }

    for (const item of result) {
      let time = item.match(/(\d{2}):(\d{2}):(\d{2})/);
      let hour = +time[1];
      let minute = +time[2];

      if (await this.compareTime(hour, minute, courseTime)) return true;
    }
  }

  static compareTime(hour, minute, courseTime) {
    const timeRegex = /(\d{2}):(\d{2}):(\d{2})/;
    let intervalTime = this.buildIntervalTime(hour, minute).match(timeRegex);
    let selectedCourseTime = courseTime.match(timeRegex);

    return ((+hour === +selectedCourseTime[1] && +minute === +selectedCourseTime[2]) || !((+intervalTime[1] <= +selectedCourseTime[1]) && (+selectedCourseTime[2] > intervalTime[2]) || +selectedCourseTime[1] < hour));
  }

  static buildIntervalTime(hour, minute) {
    let intervalHour, intervalMinute;
    let intervalTime = minute + 45;

    if (intervalTime + 45 > 60) {
      intervalHour = hour + 1;
      intervalMinute = intervalTime - 60;

      return intervalHour + ':' + intervalMinute + ':' + '00';
    }

    return `${hour}:${minute}:00`;
  }
};
