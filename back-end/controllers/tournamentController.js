const teamTournament = require('./tournament/teamTournament.js');
const getTeamTournament = require('./tournament/getTeamTournament.js')

module.exports = function (app) {
    app.post('/createTeamTournament', teamTournament.createTeamTournament);
    
    app.put('/rules', teamTournament.editRules);
    app.put('/slotPlayer', teamTournament.editSlotPlayer);
    app.put('/schedule', teamTournament.editSchedule);
    app.put('/teamSlot', teamTournament.editTeamSlot);

    app.delete('', teamTournament.deleteTournament);

    app.get('/getName/:id', getTeamTournament.getName);
    app.get('', getTeamTournament.getAll);
    app.get('/:id', getTeamTournament.getDetail);

}