const account = require('./account/libSql.js');

module.exports = function (app) {
    app.post('/login',account.login);
    app.post('/signup',account.signup);
    app.get('/list', account.list);
    app.post('/name', account.name);
}