const passwordHash = require("password-hash");

async function signup(req, res) {
  const { password, email, name } = req.body;
  if (!email || !password || !name) {
    //Le cas où l'email ou bien le password ne serait pas soumit ou nul
    return res.status(400).json({
      text: "Requête invalide"
    });
  }
  // Création d'un objet user, dans lequel on hash le mot de passe
  const hashedPassword = passwordHash.generate(password)

  // On check en base si l'utilisateur existe déjà
    const findUser = 'SELECT usr_mail FROM user_usr WHERE usr_mail=?'
    con.query(findUser, [ email ], function(err, result) {
        if (err) throw err
        if (result.length !== 0) {
            return res.status(400).json({
              text: "L'utilisateur existe déjà"
            });
        } else {
                // Sauvegarde de l'utilisateur en base
            const userData = 'INSERT INTO user_usr ( usr_name, usr_mail, usr_password) VALUES (?,?,?)'
            con.query(userData, [name, email, hashedPassword], function(err, result) {
                if(err) throw err
                return res.status(200).json({
                    text: "Succès",
                    token: passwordHash.generate(email),
                });
             })
        }
    })



}

async function login(req, res) {
  const { password, email } = req.body;
  if (!email || !password) {
    //Le cas où l'email ou bien le password ne serait pas soumit ou nul
    return res.status(400).json({
      text: "Requête invalide"
    });
  }
  //console.log('password = '+password+', hashedPassword = ' +hashedPassword)
    // On check si l'utilisateur existe en base
    const findUser = 'SELECT usr_mail, usr_name, usr_password FROM user_usr WHERE usr_mail=?'
    con.query(findUser, [ email ], function(err, result) {
        if(err) throw err
        if(result.length === 0)
        return res.status(401).json({
          text: "L'utilisateur n'existe pas"
        });
        //console.log(result[0])
        //console.log(result[0].usr_password)
        if(passwordHash.verify(password, result[0].usr_password))
        return res.status(200).json({
            token: passwordHash.generate(email),
            name: result[0].usr_name,
            text: "Authentification réussi"
        })

        return res.status(402).json({
            text: "probleme password"
        })
    })
}

// test perso pour afficher les utilisateurs enregistrés
async function list(req, res){
    const listUser = 'SELECT * FROM user_usr';
    con.query(listUser, function(err, result) {
        if(err) throw err
        if (!result)
        return res.status(401).json({
            text: "Aucun utilisateur en base"
        });
        return res.status(200).json({
            result,
        });
    })
}

async function name(req, res){
    const { email } = req.body;
    const name = 'SELECT usr_name FROM user_usr WHERE usr_mail=?';

    con.query(name, [ email ], function(err, result) {
        if(err) throw err
        if (result.length === 0)
        return res.status(401).json({
            text: "Aucun nom"
        });
        return res.status(200).json({
            result,
        });
    })
}

//On exporte nos deux fonctions

exports.login = login;
exports.signup = signup;

// perso
exports.list = list;
exports.name = name;