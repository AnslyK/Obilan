const passwordHash = require("password-hash");
var config = require('../../config.js');
var jwt = require('jsonwebtoken');

async function signup(req, res) {
  const { lastName, firstName, pseudo, password, email } = req.body;
  let { mature } = req.body;
  if (!lastName || !firstName || !pseudo || !password || !email) {
    //Le cas où un des champs ne serait pas soumit ou nul
    return res.status(400).json({
      text: "Requête invalide"
    });
  }
  // Si mature n'est pas défini, on let set à 0 pour correspondre au format de la base (0 ou 1)
  if (!mature){
    mature = '0';
  }

  // Création d'un objet user, dans lequel on hash le mot de passe
  const hashedPassword = passwordHash.generate(password)

  // On check en base si l'utilisateur existe déjà
    const findUser = 'SELECT mail, pseudo FROM player WHERE mail=? OR pseudo=?'
    con.query(findUser, [ email, pseudo ], function(err, result) {
        if (err) throw err
        if (result.length !== 0) {
            return res.status(400).json({
              text: "L'utilisateur existe déjà"
            });
        } else {
              // Sauvegarde de l'utilisateur en base
          const userData = 'INSERT INTO player ( lastName, firstName, pseudo, password, mature, mail) VALUES (?,?,?,?,b?,?)'
          con.query(userData, [lastName, firstName, pseudo, hashedPassword, mature, email], function(err, result) {
              if(err) throw err
              var token = jwt.sign({ id: result.insertId }, config.secret, { expiresIn: 86400 // expire en 24 heures
              });
              console.log(token);
              return res.status(200).json({
                  text: "Succès",
                  name: pseudo,
                  token: token /*"user:" + passwordHash.generate(pseudo),*/
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

    // On check si l'utilisateur existe en b-ase
    const findUser = 'SELECT idPlayer, mail, pseudo, password FROM player WHERE mail=? OR pseudo=?'
    con.query(findUser, [ email, email ], function(err, result) {
        if(err) throw err
        if(result.length === 0)
        return res.status(401).json({
          text: "L'utilisateur n'existe pas"
        });

        if(passwordHash.verify(password, result[0].password)) {
          var token = jwt.sign({ id: result[0].idPlayer }, config.secret, { expiresIn: 86400 // expire en 24 heures
          });
          return res.status(200).json({
            token: token, //"user:" + passwordHash.generate(result[0].pseudo),
            text: "Authentification réussi"
          })
        }

        return res.status(402).json({
            text: "probleme password"
        })
    })
}

// test perso pour afficher les utilisateurs enregistrés
async function list(req, res, next){

  const listUser = 'SELECT * FROM player';
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

// Pour récupérer les informations contenu dans le token
async function decodeToken(req, res, next){
  var token = req.headers['x-access-token'];
  if (!token) return res.status(401).json({
    auth: false,
    message: 'No token provided.'
  });

  jwt.verify(token, config.secret, function(err, decoded) {
    if (err) return res.status(500).json({
      auth: false,
      message: 'Failed to authenticate token.'
    });

    res.status(200).json(decoded);
  });
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
exports.decodeToken = decodeToken;