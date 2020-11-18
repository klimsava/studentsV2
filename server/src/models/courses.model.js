const dbConnect = require('../../config/db.config');

const Courses = function (courses) {
  this.name = courses.name;
  this.time = courses.time;
  this.description = courses.description;
}

//get all courses
Courses.getAllCourses = result => {
  dbConnect.query('Select * FROM courses', (err, res) => {
    if (err) {
      console.log('Error while fetching courses', err);
      result(null, err);
    }

    console.log('Courses fetched successfully');
    result(null, res);
  });
};

//create new course
Courses.createCourse = (courseData, result) => {
  dbConnect.query('INSERT INTO courses SET ? ', courseData, (err, res) => {
    if (err) {
      console.log('Error while inserting data', err);
      result(null, err);
    }

    console.log('Course created successfully');
    result(null, res);
  });
};

//check exist student in DB
Courses.checkCourseExist = (courseData, result) => {
  dbConnect.query('SELECT COUNT(*) AS courseExists FROM courses WHERE name=?',
    [courseData.name],
    (err, res) => {
      if (err) {
        console.log('', err);
        result(null, err);
      }
      console.log('Result course ', res[0].courseExists);

      result(null, res[0].courseExists);
    })
};

//update course
Courses.updateCourse = (id, courseReqData, result) => {
  dbConnect.query(
    "UPDATE courses SET name=?, description=?, time=? WHERE id = ?",
    [courseReqData.name, courseReqData.description, courseReqData.time, id],
    (err, res) => {
      if (err) {
        console.log('Error while updating the course', err);
        result(null, err);
      }

      console.log('Course updated successfully');
      result(null, res);
    }
  );
};

//delete course
Courses.deleteCourse = (id, result) => {
  dbConnect.query(
    "DELETE FROM courses WHERE id=?",
    [id],
    (err, res) => {
     if (err) {
       console.log('Error while deleting course.');
       result(null, err);
     }

      console.log('Course deleted successfully');
      result(null, res);
    }
  );
};

module.exports = Courses;