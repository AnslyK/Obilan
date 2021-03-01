async function createTeam(req, res){
    const { nameTeam, idCaptain, publicTeam, idTeamTournament } = req.body;

    if ( !nameTeam || !idCaptain || !idTeamTournament) {
        return res.status(400).json({
            text: "Requête invalide"
        });
    }

    // TODO: Check if tournoi is full team. (16 slot ...)

    const tournament = 'SELECT idTournament, slotPlayerTeam FROM teamtournament WHERE idTournament=?';
    con.query(tournament, [ idTeamTournament ], function(err, result){
        if (err) throw err;
        if (result.length === 0){
            res.status(401).json({
                text: "Error tournament"
            })
        } else {
            var slotPlayer = result[0].slotPlayerTeam;
            const create = 'INSERT INTO team (nameTeam, slotPlayer, idCaptain, publicTeam, idTeamTournament) VALUES (?,?,?,b?,?)';
            con.query(create, [ nameTeam, slotPlayer, idCaptain, publicTeam, idTeamTournament], function(err, result){
                if (err) throw err;
                res.status(200).json({
                    text: "Success"
                });
            });
        }
    })
}

async function getTeam(req, res){
    const listTeam = 'SELECT nameTeam, fullTeam FROM team';

    con.query(listTeam, function(err, result){
        if (err) throw err;
        console.log(result);
        if (result.length === 0)
        return res.status(204).json({ 
            text: 'Aucune équipe'
        });
        return res.status(200).json({
            team: result,
        });
    });
}

async function getTeamByTournament(req, res){
    const { idTeamTournament } = req.params.id;

    if (!idTeamTournament) {
        return res.status(400).json({
            text: "Requête invalide"
        })
    }

    const teamFromTournament = 'SELECT nameTeam FROM team WHERE idTeamTournament=?';
    con.query(teamFromTournament, [ idTeamTournament ], function(err, result){
        if (err) throw err;
        console.log(result);
        if (result.length === 0){
            return res.status(204).json({
                text: 'Aucune équipe inscrite',
            })
        }
        return res.status(200).json({
            team: result,
        });
    });
}

//exports
exports.getTeam = getTeam;
exports.getTeamByTournament = getTeamByTournament;
exports.createTeam = createTeam;

