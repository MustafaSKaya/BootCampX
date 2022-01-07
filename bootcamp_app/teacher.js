const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  password: '123',
  host: 'localhost',
  database: 'bootcampx'
});

pool.connect().then(() => {
    console.log('connected');
});

pool.query(`
SELECT teachers.name as teacher, cohorts.name as cohort 
FROM assistance_requests 
JOIN teachers ON teachers.id = teacher_id 
JOIN students ON students.id = student_id 
JOIN cohorts ON cohorts.id = cohort_id 
WHERE cohorts.name LIKE '%${process.argv[2]}%' 
GROUP BY teachers.name, cohorts.name 
ORDER BY teachers.name;
`)
.then(res => {
  res.rows.forEach(row => {
    console.log(`${row.cohort} ${row.teacher}`);
  })
}).catch(err => console.error('query error', err.stack));