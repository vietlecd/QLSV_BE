const adminRoutes = require('./admin.route');
const dashboardRoutes = require('./dashboard.route');


module.exports = (app) => {
    const PATH_ADMIN = '/admin';
    app.use(PATH_ADMIN + '/', adminRoutes);
    app.use(PATH_ADMIN + '/dashboard', dashboardRoutes);    
}