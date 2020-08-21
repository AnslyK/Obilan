const account = require('./account/lib.js');
const edit = require('./account/edit.js');

module.exports = function (app) {
    app.post('/login',account.login);
    app.post('/signup',account.signup);
    app.get('/list', account.list);
    app.post('/name', account.name);
    app.put('/pseudo', edit.editPseudo);
    app.put('/password', edit.editPassword);
    app.put('/setPayment', edit.payment);
}