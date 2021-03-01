var mysql = require('mysql');
const express = require("express");
const bodyParser = require("body-parser");
const config = require("./admin/config.js");


//On définit notre objet express nommé app
const app = express();

//Body parser
const urlencodedParser = bodyParser.urlencoded({
    extended: true
});
app.use(urlencodedParser);

app.use(bodyParser.json());

//Définition des CORS
app.use(function(req, res, next) {
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
//const { userRouter, pizzaRouter, teamRouter, tournamentRouter } = express.Router();

const userRouter = express.Router();
app.use("/user", userRouter);
require(__dirname + "/controllers/userController")(userRouter);

const pizzaRouter = express.Router();
app.use("/pizza", pizzaRouter);
require(__dirname + "/controllers/pizzaController")(pizzaRouter);

const teamRouter = express.Router();
app.use("/team", teamRouter);
require(__dirname + "/controllers/teamController")(teamRouter);

const tournamentRouter = express.Router();
app.use("/tournament", tournamentRouter);
require(__dirname + "/controllers/tournamentController")(tournamentRouter);





// Autre route à définir
/*app.use("/article", articleRouter);
require(__dirname + "/controllers/articleController")(articleRouter);*/


//Connexion à la base de donnée

con = mysql.createConnection({
    host: config._BDD_HOST_,
    database: config._BDD_DATABASE_,
    user: config._BDD_USER_,
    password: config._BDD_PASSWORD_
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