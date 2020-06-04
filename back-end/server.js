var mysql = require('mysql');
const express = require("express");
const bodyParser = require("body-parser");


//On définit notre objet express nommé app
const app = express();

//Body parser
const urlencodedParser = bodyParser.urlencoded({
    extended: true
});
app.use(urlencodedParser);

app.use(bodyParser.json());

//Définition des CORS
app.use(function(req,res, next) {
    res.setHeader(
        "Access-Control-Allow-Headers",
        "X-Requested-With,content-type"
    )
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, OPTIONS, PUT, PATCH, DELETE"
    );
    res.setHeader("Access-Control-Allow-Credentials", true);
    next();
});

//Définition du routeur
const userRouter = express.Router();
app.use("/user", userRouter);
require(__dirname + "/controllers/userController")(userRouter);
const articleRouter = express.Router();
app.use("/article", articleRouter);
require(__dirname + "/controllers/articleController")(articleRouter);


//Connexion à la base de donnée

// TODO: A MODIFIER AVEC LA NOUVELLE BASE
con = mysql.createConnection({
    host: "localhost",
    database: "the_boomer_war",
    user: "root",
    password: ""
});

try{
    con.connect();
    console.log("Connecté Mysql")
} catch {
    console.log("erreur con.connect")
}

//Définition et mise en place du port d'écoute
const port = 8800;
app.listen(port, () => console.log(`Listeninig on port ${port}`));