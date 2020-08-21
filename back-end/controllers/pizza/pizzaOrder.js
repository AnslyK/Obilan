async function addPizzaOrder(req, res) {
    const { idPlayer, idPizza, nb } = req.body;

    /*TODO: Ajout du pseudo à la place de "idPlayer"
     et requête pour avoir l'id */

    const DoesPizzaExist = 'SELECT idPizza FROM pizza WHERE idPizza=?';
    con.query(DoesPizzaExist, idPizza, function(err,result) {
        if(err) throw err
        if (result.length === 0) {
            return res.status(400).json({
                text: "Cette pizza n'existe pas"
            });
        } else {
            const orderPizza = 'INSERT INTO order_pizza (idPlayer, idPizza, nombre) values (?,?,?)'
            con.query(orderPizza, [ idPlayer, idPizza, nb ], function(err, result) {
                if (err) throw err;
                return res.status(200).json({
                    text: "Succès",
                })
            })
        }
    })
}

async function deletePizzaOrder(req, body){
    /* En attente d'internet (DELETE REQUETE)
    const { idPizza, idPlayer } = req.body;

    const cancelPizzaOrder = 'DELETE '
*/
}

exports.addPizzaOrder = addPizzaOrder;