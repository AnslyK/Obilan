var verifyToken = require('./../auth/VerifyToken.js');
const account = require('./account/login.js');
const edit = require('./account/edit.js');

module.exports = function (app) {
    app.post('/login',account.login);
    app.post('/signup',account.signup);
    app.get('/decode', verifyToken, account.decodeToken)
    app.get('/list', verifyToken, account.list);
    app.post('/name', account.name);
    app.put('/pseudo', edit.editPseudo);
    app.put('/password', edit.editPassword);
    app.put('/setPayment', edit.payment);
}