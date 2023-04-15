const { Pool } = require('pg');
const poolConfig = process.env.DATABASE_URL ? {
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
} : {
    host: 'localhost',
    user: 'postgres',
    password: '103797947',
    database: 'limber_it_test_db',
    port: '5432'
};
const pool = new Pool(poolConfig);

const getStudents = async (req, res) => {
    await pool.query(
        'SELECT * FROM STUDENTS', (error, results) => {
            if (error) throw error;
            return res.status(200).json(results.rows);
        });
};
const getStudentById = async (req, res) => {
    const id = req.params.id;
    await pool.query('SELECT * FROM STUDENTS WHERE STUDENT_ID = $1', [id], (error, results) => {
        if (error) throw error;
        return res.status(200).json(results.rows);
    });
}

const updateStudent = async (req, res) => {
    const id = req.params.id;
    const { name,date_of_birth, gender } = req.body;
    await pool.query('UPDATE STUDENTS SET NAME = $1, DATE_OF_BIRTH = $2, GENDER = $3 WHERE STUDENT_ID = $4', [
        name,date_of_birth, gender, id
    ], (error, results) => {
        if (error) throw error;
        console.log(results);
        return res.status(200).json('Student data updated succesfully');
    })
};
const deleteStudent = async (req, res) => {
    const id = req.params.id;
    await pool.query('DELETE FROM STUDENTS WHERE STUDENT_ID = $1', [id], (error, results) => {
        if (error) throw error;
        res.json(`Student data with id ${id} deleted succesfully`);
    });
};

const postStudent = async (req, res) => {
    const { student_id, name,date_of_birth, gender, email, password } = req.body;
    await pool.query('INSERT INTO STUDENTS (STUDENT_ID, NAME, DATE_OF_BIRTH, GENDER, EMAIL, PASSWORD) VALUES ($1, $2, $3, $4, $5, $6)',
        [
            student_id, name,date_of_birth, gender, email, password
        ],
        (error, results) => {
            if (error) throw error;
            res.status(201).json({
                message: "Student data added Succesfully",
                body: {
                    student: req.body
                }
            });
        });
}

const getCourses = async (req, res) => {
    const id = req.params.id;
    await pool.query(
        'SELECT c.*, CASE WHEN cs.student_id IS NOT NULL THEN true ELSE false END AS assigned FROM courses c LEFT JOIN registration cs ON c.course_id = cs.course_id AND cs.student_id = $1', [id], (error, results) => {
            if (error) throw error;
            return res.status(200).json(results.rows);
        });
};
const getCourseById = async (req, res) => {
    const id = req.params.id;
    await pool.query('SELECT * FROM COURSES WHERE COURSE_ID = $1', [id], (error, results) => {
        if (error) throw error;
        return res.status(200).json(results.rows);
    });
}

const updateCourse = async (req, res) => {
    const id = req.params.id;
    const { name,credits,teacher } = req.body;
    await pool.query('UPDATE COURSES SET NAME = $1, CREDITS = $2, TEACHER = $3 WHERE COURSE_ID = $4', [
        name,credits,teacher
    ], (error, results) => {
        if (error) throw error;
        console.log(results);
        return res.status(200).json('Course data updated succesfully');
    })
};
const deleteCourse = async (req, res) => {
    const id = req.params.id;
    await pool.query('DELETE FROM COURSES WHERE COURSE_ID = $1', [id], (error, results) => {
        if (error) throw error;
        res.json(`Course data with id ${id} deleted succesfully`);
    });
};

const postCourse = async (req, res) => {
    const { name,credits,teacher } = req.body;
    await pool.query('INSERT INTO COURSES (NAME, CREDITS, TEACHER) VALUES ($1, $2, $3)',
        [
            name,credits,teacher
        ],
        (error, results) => {
            if (error) throw error;
            res.status(201).json({
                message: "Course data added Succesfully",
                body: {
                    course: req.body
                }
            });
        });
}


const deleteRegistration = async (req, res) => {
    const { student_id, course_id } = req.body;
    await pool.query('DELETE FROM REGISTRATION WHERE STUDENT_ID = $1 AND COURSE_ID = $2',        
    [
        student_id, course_id
    ], (error, results) => {
        if (error) throw error;
        res.json(`registration data with id ${id} deleted succesfully`);
    });
};

const postRegistration = async (req, res) => {
    const { student_id, course_id } = req.body;
    await pool.query('INSERT INTO REGISTRATION (STUDENT_ID, COURSE_ID) VALUES ($1, $2)',
        [
            student_id, course_id
        ],
        (error, results) => {
            if (error) throw error;
            res.status(201).json({
                message: "Student data added Succesfully",
                body: {
                    student: req.body
                }
            });
        });
}
module.exports = {
    getStudents, getStudentById, updateStudent, deleteStudent, postStudent,
    getCourses, getCourseById, updateCourse, deleteCourse, postCourse
}