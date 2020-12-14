const dbConnect = require('../../components/db');

const Students = function (students) {
  this.first_name = students.first_name;
  this.last_name = students.last_name;
  this.age = students.age;
}

//get all students
async function getAllStudents() {
  try {
    let res = await dbConnect();
    let [rows, fields] = await res.execute('SELECT * FROM students');
    console.log('Students fetched successfully');
    return rows;
  } catch (err) {
    return err;
  }
}

//create new student
async function createStudent(studentData) {
  try {
    let res = await dbConnect();
    const response = await res.query("INSERT INTO students SET ? ", [studentData], async function (err, result) {
      return result;
    });

    console.log('Courses fetched successfully');
    return await response;
  } catch (err) {
    return err;
  }
}

//check exist student in DB
async function checkStudentExist(studentData) {
  try {
    let res = await dbConnect();
    let [rows, fields] = await res.execute("SELECT 1 AS nameExists FROM students WHERE first_name=? AND last_name=? LIMIT 1", [studentData.first_name, studentData.last_name]);

    return rows;
  } catch (err) {
    return err;
  }
}

//update student
async function updateStudents(id, studentReqData) {
  try {
    let res = await dbConnect();
    const response = await res.query("UPDATE students SET first_name=?, last_name=?, age=? WHERE id = ?", [studentReqData.first_name, studentReqData.last_name, studentReqData.age, id], async function (err, result, fields) {
      return result;
    });

    console.log('Student updated successfully');
    return await response;
  } catch (err) {
    return err;
  }
}

//delete student
async function deleteStudent(id) {
  try {
    let res = await dbConnect();
    const response = await res.query("DELETE FROM students WHERE id= ?", [id], async function (err, result) {
      return result;
    });

    console.log('Student deleted successfully');
    return await response;
  } catch (err) {
    return err;
  }
}

//Select course
async function selectCourse(selectCourseData) {
  try {
    let res = await dbConnect();
    const response = await res.query("INSERT INTO student_courses (student_id, course_id) VALUES ?", [getCorrectResult(getResultClient(selectCourseData))], async function (err, result) {
      return result;
    });

    console.log('Courses fetched successfully');
    return await response;
  } catch (err) {
    return err;
  }
}

async function checkSelectedCourse(selectCourseData) {
  try {
    let res = await dbConnect();
    let [rows, fields] = await res.execute("SELECT student_id, course_id FROM student_courses WHERE student_id=?", [selectCourseData.studentId]);

    let times = await getCourseTimeStudent(selectCourseData.studentId, selectCourseData.courseId);
    let resultFromDB = rows.map(item => {
      return {studentId: item.student_id, course_id: item.course_id};
    });

    if (await checkCourseTime(times, selectCourseData.courseId)) {
      return true;
    }

    return checkSameRecord(resultFromDB, getResultClient(selectCourseData)).length
  } catch (err) {
    return err;
  }
}

function checkSameRecord(resultDB, resultClient) {
  let result = [];

  resultDB.forEach(function (elementOfSomeArray) {
    resultClient.forEach(function (elementOfOtherArray) {
      if (JSON.stringify(elementOfSomeArray) === JSON.stringify(elementOfOtherArray)) {
        result.push(elementOfOtherArray);
      }
    });
  });

  return result;
}

function getResultClient(data) {
  let resultClient = [];

  if (data.courseId.length > 1) {
    data.courseId.forEach(courseId => {
      resultClient.push({studentId: +data.studentId, course_id: +courseId});
    });
  } else {
    resultClient.push({studentId: +data.studentId, course_id: +data.courseId})
  }

  return resultClient;
}

function getCorrectResult(arr) {
  return arr.reduce((index, item) => {
    let array = [];
    array.push(item.studentId);
    array.push(item.course_id);
    index.push(array);
    return index;
  }, [])
}

async function getCourseTimeStudent(studentId) {
  let res = await dbConnect();
  let [rows, fields] = await res.execute("SELECT student_id, time FROM students JOIN student_courses ON students.id = student_courses.student_id JOIN courses on student_courses.course_id = courses.id");

  let resultFromDB = rows.map(item => {
    return {studentId: item.student_id, time: item.time};
  });

  let result = [];
  resultFromDB.forEach(function (values, item) {
    if (+values.studentId === +studentId) {
      result.push(values.time);
    }
  });

  return result;
}

async function checkCourseTime(courseTime, courseId) {
  try {
    let res = await dbConnect();
    let [rows, fields] = await res.execute("SELECT time FROM courses WHERE id=?", [courseId]);
    return courseTime.forEach(item => {
      return item === rows[0].time;
    });
  } catch (err) {
    throw new Error(err);
  }
}

module.exports = {
  Students,
  getAllStudents,
  createStudent,
  checkStudentExist,
  updateStudents,
  deleteStudent,
  checkSelectedCourse,
  selectCourse
};