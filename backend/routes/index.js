'use strict';

var controllers = {
    email: require('../controllers/api/email.js')
}

module.exports = function (app, express) {
    // STATIC ROUTES
    app.use('/',                               express.static('./frontend'));

    // API CONTROLLERS
    app.get('/api/emails/',                    controllers.email.index);
    app.post('/api/emails/',                   controllers.email.create);//send email included here
    app.get('/api/emails/:emailId',            controllers.email.details);
    app.put('/api/emails/:emailId',            controllers.email.update);//send email included here
    app.delete('/api/emails/:emailId',         controllers.email.delete);

    app.get('*', function (req, res) {
        res.status(404).send('Resource not found');
    });
};