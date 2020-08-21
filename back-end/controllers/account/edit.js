const passwordHash = require("password-hash");

async function pseudo(req, res) {
    const { oldPseudo, newPseudo } = req.body;
    const editPseudo = 'UPDATE player SET pseudo=? WHERE pseudo=?';
    con.query(editPseudo, [ newPseudo, oldPseudo], function(err,result){
        if (err) throw err
        return res.status(200).json({
            text: "Success",
            name: newPseudo,
            //Modifier le token ?
        })
    })
}


async function password(req, res) {
    const { pseudo, password } = req.body;
    const hashedPassword = passwordHash.generate(password);

    const editPassword = 'UPDATE player SET password=? WHERE pseudo=?';
    con.query(editPassword, [ hashedPassword, pseudo ], function(err, result){
        if (err) throw err
        return res.status(200).json({
            text: "Success",
        })
    })
}

//TODO: paramètre uniquement modifiable par l'admin
async function payment(req, res) {
    const { pseudo, password, payment } = req.body;


    if (!verifyPassword(pseudo, password)){
        res.status(400).json({
            text: "Error Login",
        })
    } 
    const setPayment = 'UPDATE player SET payment=b? WHERE pseudo=?'
    con.query(setPayment, [payment, pseudo], function(err, result){
        if (err) throw err
        return res.status(200).json({
            text: "Success",
        })
    })
}

function verifyPassword( pseudo, password){
    const hashedPassword = passwordHash.generate(password);
    const request = 'SELECT pseudo, password FROM player WHERE pseudo=? AND password=?';
    con.query( request, [pseudo, hashedPassword], function(err, result){
        if (err) throw err;
        if (result === 0){
            return false;
        }
        else{
            return true;
        }
    })
}


exports.editPseudo = pseudo;
exports.editPassword = password;
exports.payment = payment