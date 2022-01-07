const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  password: '123',
  host: 'localhost',
  database: 'bootcampx'
});

pool.query(`
SELECT teachers.name as teacher, students.name as student, assignments.name as assignment, (assistance_requests.completed_at-assistance_requests.started_at) as duration 
FROM assistance_requests 
JOIN students ON student_id = students.id 
JOIN teachers ON teacher_id = teachers.id 
JOIN assignments ON assignment_id = assignments.id 
ORDER BY duration;
`)
.then(res => {
  res.rows.forEach(user => {
    console.log(`${user.name} has an id of ${user.student_id} and was in the ${user.cohort} cohort`);
  })
}).catch(err => console.error('query error', err.stack));