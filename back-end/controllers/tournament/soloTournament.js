// Create
async function createSoloTournament(req, res) {
    var { 
        nameSoloTournament,
        slotPlayer,
        rulesSolo,
        scheduleSolo
    } = req.body;

    if (!nameSoloTournament || !slotPlayer) {
        return res.status(400).json({
            text: "Requête invalide"
        })
    }
    
    const createNewTournament = 'INSERT INTO solotournament(nameSolo, slotSolo, rulesSolo, scheduleSolo) VALUES (?,?,?,?)';
    con.query(createNewTournament, [ nameSoloTournament, slotPlayer, rulesSolo, scheduleSolo ], function(err, result){
        if (err) throw err;
        return res.status(200).json({
            text: "Success",
            result: result
        });
    })
}

/* ------------------- Edit ----------------------*/
async function editSlotPlayer(req, res){
    const { nameSoloTournament, slotPlayer } = req.body;

    if ( !nameSoloTournament || !slotPlayer ){
        return res.status(400).json({
            text: "Requete invalide"
        })
    }

    if (slotPlayer < 0) {
        return res.status(400).json({
            text: "Nombre incorrect"
        })
    }

    const slotRequest = "UPDATE solotournament SET slotSolo=? WHERE nameSolo=?";
    con.query(slotRequest, [ slotPlayer, nameSoloTournament ], function(err, result){
        if (err) throw err;
        res.status(200).json({
            text: "Success",
            change: result.message
        });
    });
}

async function editRules(req, res){
    const { nameSoloTournament, rulesSolo } = req.body;

    if ( !nameSoloTournament || !rulesSolo ){
        return res.status(400).json({
            text: "Requete invalide"
        })
    }

    const rules = "UPDATE solotournament SET rulesSolo=? WHERE nameSolo=?";
    con.query(rules, [ rulesSolo, nameSoloTournament ], function(err, result){
        if (err) throw err;
        res.status(200).json({
            text: "Success",
            change: result.message
        });
    });
}

async function editSchedule(req, res){
    const { nameSoloTournament, scheduleSolo } = req.body;

    if ( !nameSoloTournament ){
        return res.status(400).json({
            text: "Requete invalide"
        })
    }

    const schedule = "UPDATE solotournament SET scheduleSolo=? WHERE nameSolo=?";
    con.query(schedule, [ scheduleSolo, nameSoloTournament ], function(err, result){
        if (err) throw err;
        res.status(200).json({
            text: "Success",
            change: result.message
        });
    });
}

/* --------------------- DELETE ----------------------*/
async function deleteTournament(req, res){
    const { nameSoloTournament } = req.body;

    if (!nameSoloTournament){
        res.status(400).json({
            text: "Requete invalide"
        })
    }

    const deleteTournament = 'DELETE FROM solotournament WHERE nameSolo=?'
    con.query(deleteTournament, [ nameSoloTournament ], function(err, result){
        if (err) throw err;
        res.status(200).json({
            text: "Success",
            result: result
        })
    })
}


// Exports
exports.createSoloTournament = createSoloTournament;
exports.editRules = editRules;
exports.editSchedule = editSchedule;
exports.editSlotPlayer = editSlotPlayer;
exports.deleteTournament = deleteTournament;