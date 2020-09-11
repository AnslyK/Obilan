// Get Tournament data file
async function getName(req, res){
    const id  = req.params.id;

    const getName = 'SELECT nameTeamTournament FROM teamtournament WHERE idTournament=?'
    con.query(getName, [ id ], function(err, result){
        if (err) throw err;
        if (result.length === 0) return res.status(201).json({
            text: "no data"
        })
        return res.status(200).json({
            text: result
        })
    })
}

async function getAllTournament(req, res){
    const getTournament = 'SELECT idTournament,nameTeamTournament, slotPlayerTeam, slotTeamTournament, rulesTeamTournament, scheduleTeamTournament FROM teamtournament';
    
    con.query(getTournament, function(err, result){
        if (err) throw err;
        if (result.length === 0) return res.status(201).json({
            text: "no data"
        })

        return res.status(200).json({
            text: "Success",
            result: result
        })
    })
}

async function getDetail(req, res){
    const id = req.params.id;

    const detail = 'SELECT nameTeamTournament, slotPlayerTeam, slotTeamTournament, rulesTeamTournament, scheduleTeamTournament FROM teamTournament WHERE idTournament=?';
    con.query(detail, [ id ], function(err, result){
        if (err) throw err;
        if (result.length === 0) return res.status(201).json({
            text: "no data"
        })
        return res.status(200).json({
            text: "success",
            result: result
        })
    })
}

exports.getAll = getAllTournament;
exports.getName = getName;
exports.getDetail = getDetail;