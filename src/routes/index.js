const { Router } = require('express');
const router = Router();
const cors = require('cors');
const { getStudents, getStudentById, updateStudent, deleteStudent, postStudent,
    getCourses, getStudentCourses, getCourseById, updateCourse, deleteCourse, postCourse, postRegistration, deleteRegistration } = require('../controllers/index.controllers');

//Students
router.get('/students', cors(), getStudents);
router.get('/students/:id', cors(), getStudentById);
router.put('/students/:id', cors(), updateStudent);
router.post('/students', cors(), postStudent);
router.delete('/students/:id', cors(), deleteStudent);

//Courses
router.get('/courses', cors(), getCourses);
router.get('/courses/:id', cors(), getStudentCourses);
router.get('/course/:id', cors(), getCourseById);
router.put('/courses/:id', cors(), updateCourse);
router.post('/courses', cors(), postCourse);
router.delete('/courses/:id', cors(), deleteCourse);

//registration
router.post('/registration', cors(), postRegistration);
router.delete('/registration', cors(), deleteRegistration);
module.exports = router;