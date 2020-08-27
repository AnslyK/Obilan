async function getPizza(req, res){
    // Return all pizza in base
    const pizza = 'SELECT namePizza, pricePizza FROM pizza';
    con.query(pizza, function(err, result){
        if (err) throw err;
        if (result.length === 0) {
            return res.status(400).json({
                text: "Pas de pizza"
            })
        } else {
            return res.status(200).json({
                pizza: result,
            })
        }
    })
}

async function getPizzaId(req, res){
    // Get pizza name and return id
    const name = req.params.name;
    const getId = 'SELECT idPizza, namePizza FROM pizza WHERE namePizza=?';
    con.query(getId, name, function(err, result){
        if (err) throw err;
        if (!result)
        return res.status(400).json({
            text: "Erreur pizza"
        });
        return res.status(200).json({
            result,
        })
    })
}



async function addPizza(req, res){
    const { namePizza, pricePizza } = req.body;

    if (!namePizza || !pricePizza){ 
        return res.status(400).json({
            text: "Requête invalide"
        })
    }

    const uniquePizza = 'SELECT namePizza FROM pizza WHERE namePizza=?';
    con.query(uniquePizza, namePizza, function(err, result){
        if (err) throw err;
        if (result.length !== 0 ) {
            return res.status(400).json({
                text: "Cette pizza existe déjà"
            });
        } else {
            const addNewPizza = 'INSERT INTO pizza (namePizza, pricePizza) VALUES(?,?)';
            con.query(addNewPizza, [ namePizza, pricePizza ], function(err, result) {
                if (err) throw err;
                return res.status(200).json({
                    text: "Success"
                })
            })
        }
    })
}

async function setPrice(req, res){
    const { namePizza, pricePizza } = req.body;

    if (!namePizza || !pricePizza){
        return res.status(400).json({
            text: "Requête invalide"
        })
    }

    const newPrice = 'UPDATE pizza SET pricePizza=? WHERE namePizza=?'
    con.query(newPrice, [ pricePizza, namePizza ], function(err, result){
        if (err) throw err
        res.status(200).json({
            text: "Success"
        })
    })
}

async function deletePizza(req, res){
    const { namePizza } = req.body;

    if (!namePizza){
        return res.status(400).json({
            text: "Requête invalide"
        })
    }

    const request = 'DELETE FROM pizza WHERE namePizza=?'

    console.log(namePizza);
    con.query(request, namePizza, function(err, result){
        if (err) throw err;
        console.log(result);
        return res.status(200).json({
            text: "Success"
        })
    })
}

// export des fonctions
exports.getPizza = getPizza;
exports.getPizzaId = getPizzaId;
exports.addPizza = addPizza;
exports.setPrice = setPrice;
exports.deletePizza = deletePizza;