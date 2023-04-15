const { Router } = require('express');
const router = Router();
const cors = require('cors');
const { getStudents, getStudentById, updateStudent, deleteStudent, postStudent,
    getCourses, getCourseById, updateCourse, deleteCourse, postCourse } = require('../controllers/index.controllers');

//Students
router.get('/students', cors(), getStudents);
router.get('/students/:id', cors(), getStudentById);
router.put('/students/:id', cors(), updateStudent);
router.post('/students', cors(), postStudent);
router.delete('/students/:id', cors(), deleteStudent);

//Courses
router.get('/courses/:id', cors(), getCourses);
// router.get('/courses/:id', cors(), getCourseById);
router.put('/courses/:id', cors(), updateCourse);
router.post('/courses', cors(), postCourse);
router.delete('/courses/:id', cors(), deleteCourse);

module.exports = router;