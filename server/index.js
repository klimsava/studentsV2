const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();

const port = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello World');
});

const studentsRoutes = require('./src/routes/students.route');
const coursesRoutes = require('./src/routes/courses.route');

app.use('/api/students', studentsRoutes);
app.use('/api/courses', coursesRoutes);

app.listen(port, () => {
  console.log(`Express Server is running at port ${port}`);
});