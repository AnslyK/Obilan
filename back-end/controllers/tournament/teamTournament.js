// Create
async function createTeamTournament(req, res) {
    var { 
        nameTeamTournament,
        slotPlayerTeam,
        slotTeamTournament,
        rulesTeamTournament,
        scheduleTeamTournament
    } = req.body;

    if (!nameTeamTournament || !slotPlayerTeam || ! slotTeamTournament) {
        return res.status(400).json({
            text: "Requête invalide"
        })
    }
    
    const createNewTournament = 'INSERT INTO teamtournament(nameTeamTournament, slotPlayerTeam, slotTeamTournament, rulesTeamTournament, scheduleTeamTournament) VALUES (?,?,?,?,?)';
    con.query(createNewTournament, [ nameTeamTournament, slotPlayerTeam, slotTeamTournament, rulesTeamTournament, scheduleTeamTournament ], function(err, result){
        if (err) throw err;
        return res.status(200).json({
            text: "Success",
        });
    })
}

/* ------------------- Edit ----------------------*/
async function editSlotPlayer(req, res){
    const { nameTeamTournament, slotPlayerTeam } = req.body;

    if ( !nameTeamTournament || !slotPlayerTeam ){
        return res.status(400).json({
            text: "Requete invalide"
        })
    }

    if (slotPlayerTeam < 0 || slotPlayerTeam > 10) {
        return res.status(400).json({
            text: "Nombre incorrect"
        })
    }

    const slotPlayer = "UPDATE teamtournament SET slotPlayerTeam=? WHERE nameTeamTournament=?";
    con.query(slotPlayer, [ slotPlayerTeam, nameTeamTournament ], function(err, result){
        if (err) throw err;
        res.status(200).json({
            text: "Success",
            change: result.message
        });
    });
}

async function editTeamSlot(req, res){
    const { nameTeamTournament, slotTeamTournament } = req.body;

    if ( !nameTeamTournament || !slotTeamTournament ){
        return res.status(400).json({
            text: "Requete invalide"
        })
    }
    if (slotTeamTournament < 0){
        return res.status(400).json({
            text: "Nombre incorrect"
        })
    }

    const slotTeam = "UPDATE teamtournament SET slotTeamTournament=? WHERE nameTeamTournament=?";
    con.query(slotTeam, [ slotTeamTournament, nameTeamTournament ], function(err, result){
        if (err) throw err;
        res.status(200).json({
            text: "Success",
            change: result.message
        });
    });
}

async function editRules(req, res){
    const { nameTeamTournament, rulesTeamTournament } = req.body;

    if ( !nameTeamTournament || !rulesTeamTournament ){
        return res.status(400).json({
            text: "Requete invalide"
        })
    }

    const rules = "UPDATE teamtournament SET rulesTeamTournament=? WHERE nameTeamTournament=?";
    con.query(rules, [ rulesTeamTournament, nameTeamTournament ], function(err, result){
        if (err) throw err;
        res.status(200).json({
            text: "Success",
            change: result.message
        });
    });
}

async function editSchedule(req, res){
    // Name ou ID pour modifier ?
    const { nameTeamTournament, scheduleTeamTournament } = req.body;

    if ( !nameTeamTournament || !scheduleTeamTournament ){
        return res.status(400).json({
            text: "Requete invalide"
        })
    }

    const schedule = "UPDATE teamtournament SET scheduleTeamTournament=? WHERE nameTeamTournament=?";
    con.query(schedule, [ scheduleTeamTournament, nameTeamTournament ], function(err, result){
        if (err) throw err;
        res.status(200).json({
            text: "Success",
            change: result.message
        });
    });
}

/* --------------------- DELETE ----------------------*/
async function deleteTournament(req, res){
    const { nameTeamTournament } = req.body;

    if (!nameTeamTournament){
        res.status(400).json({
            text: "Requete invalide"
        })
    }

    const deleteTournament = 'DELETE FROM teamtournament WHERE nameTeamTournament=?'
    con.query(deleteTournament, [ nameTeamTournament ], function(err, result){
        if (err) throw err;
        res.status(200).json({
            text: "Success",
            result: result
        })
    })
}


// Exports
exports.createTeamTournament = createTeamTournament;
exports.editRules = editRules;
exports.editSchedule = editSchedule;
exports.editSlotPlayer = editSlotPlayer;
exports.editTeamSlot = editTeamSlot;
exports.deleteTournament = deleteTournament;