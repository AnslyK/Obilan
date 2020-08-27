/*async function createTeam(req, res){
    const {  }

    if (!idTeamTournament) {
        return res.status(400).json({
            text: "Requête invalide"
        })
    }
}*/

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

