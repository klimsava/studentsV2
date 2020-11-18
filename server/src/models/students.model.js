const dbConnect = require('../../config/db.config');

const Students = function (students) {
  this.first_name = students.first_name;
  this.last_name = students.last_name;
  this.age = students.age;
}

//get all students
Students.getAllStudents = result => {
  dbConnect.query('SELECT * FROM students', (err, res) => {
    if (err) {
      console.log('Error while fetching students', err);
      result(null, err);
    }

    console.log('Students fetched successfully');
    result(null, res);
  });
};

//create new student
Students.createStudent = (studentData, result) => {
  dbConnect.query('INSERT INTO students SET ? ', studentData, (err, res) => {
    if (err) {
      console.log('Error while inserting data', err);
      result(null, err);
    }

    console.log('Student created successfully');
    result(null, res);
  })
};

//check exist student in DB
Students.checkStudentExist = (studentData, result) => {
  dbConnect.query('SELECT COUNT(*) AS nameExists FROM students WHERE first_name=? AND last_name=?',
    [studentData.first_name, studentData.last_name],
    (err, res) => {
      if (err) {
        console.log('', err);
        result(null, err);
      }
      console.log('Result student', res[0].nameExists);

      result(null, res[0].nameExists);
    })
};

//update student
Students.updateStudents = (id, studentReqData, result) => {
  dbConnect.query(
    "UPDATE students SET first_name=?, last_name=?, age=? WHERE id = ?",
    [studentReqData.first_name, studentReqData.last_name, studentReqData.age, id],
    (err, res) => {
      if (err) {
        console.log('Error while updating the student');
        result(null, err);
      }

      console.log('Student updated successfully');
      result(null, res);
    });
};

//delete student
Students.deleteStudent = (id, result) => {
  dbConnect.query(
    "DELETE FROM students WHERE id= ?",
    [id],
    (err, res) => {
      if (err) {
        console.log('Error while deleting student.');
        result(null, err);
      }

      console.log('Student deleted successfully');
      result(null, res);
    }
  );
};

module.exports = Students;