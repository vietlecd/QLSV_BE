const teacherRoute = require('./teacher.route');
const studentRoute = require('./student.route');


module.exports = (app) => {
    app.get('/home', (req, res) => {
        res.send('Welcome to the home page');
    });
    app.use('/student',studentRoute);
    app.use('/teacher',teacherRoute);
}