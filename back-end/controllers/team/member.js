async function joinTeam(req, res){
    const { idPlayer, idTeam } = req.body;

    if (!idPlayer || !idTeam){
        res.status(400).json({
            text: "Requete invalide"
        })
    }

    /*var whatINeed = new Object();
    whatINeed.idTeam = idTeam;
    whatINeed.idPlayer = idPlayer;

    const getIdTournament = 'SELECT idTeamTournament FROM team WHERE idTeam=?';
    con.query(getIdTournament, [ idTeam ], function(err, result){
        if (err) throw err;
        whatINeed.idTournament = result[0].idTeamTournament;
        console.log("Infunction -> idTournament = "+ whatINeed.idTournament)
    })

    console.log("OutFunction -> idTournament = "+ whatINeed.idTournament)
*/

    hasTeam(idPlayer, function(has){

        // TESTER si le joueurs à déjà une équipe ou un tournoi solo
        if(has){
            return res.status(400).json({
                text: "Already in team !"
            })
        }

        isCaptain(idPlayer, function(is){
            if(is){
                return res.status(400).json({
                    text: "Already Captain !"
                })
            }

            const doesTeamExist = 'SELECT nameTeam, fullTeam, idTeamTournament FROM team WHERE idTeam=?';
            con.query(doesTeamExist, [ idTeam ], function(err, result){
                if (err) throw err;
                if (result.length === 0){
                    return res.status(400).json({
                        text: "This team doesn't exist"
                    })
                }

                if(result[0].fullTeam === 1){
                    return res.status(401).json({
                        text: "Team Full"
                    })
                }

                var setFullTeam = new Object();
                setFullTeam = result[0].idTeamTournament;

                const joiningTeam = 'UPDATE player SET idTeam=? where idPlayer=?';
                con.query(joiningTeam, [ idTeam, idPlayer ], function(err, result){
                    if (err) throw err;

                    // Check if the team become is full or no.
                    // Ce que j'ai besoin: idTeam, idTournament, slotPlayerTeam, count(idTeam) "pour compter le nombre de personne présente dans l'équipe (sans compter le capitaine)"

                    /*const setFullTeam = 'SELECT COUNT(idTeam), slotPlayerTeam FROM player NATURAL JOIN teamtournament WHERE idTeam=? & idTournament=?'
                    con.query(setFullTeam, )

*/



                    res.status(200).json({
                        text: "Success",
                        change: result.message
                    })
                })
            })
        })
    })
    //INWORK
}

// Problème de return après le con.query
function hasTeam(idPlayer, callback){
    const isInTeam = 'SELECT idTeam, idSolo FROM player WHERE idPlayer=?'
    
    con.query(isInTeam, idPlayer, function(err, result){
        if (err) throw err;
        callback(result[0].idTeam !== null || result[0].idSolo !== null);
    })
}



function isCaptain(idCaptain, callback){
    const captain = 'SELECT idTeam, nameTeam, idCaptain FROM team WHERE idCaptain=?'
    con.query(captain, [ idCaptain ], function(err, result){
        if (err) throw err;
        callback(result.length !== 0);
    })
}


function setFullTeam(whatINeed, callback){
    
}

exports.joinTeam = joinTeam;