const teamTournament = require('./tournament/teamTournament.js');
const getTeamTournament = require('./tournament/getTeamTournament.js');
const soloTournament = require('./tournament/soloTournament.js');
const getSoloTournament = require('./tournament/getSoloTournament.js');

module.exports = function (app) {
    // TeamTournament routes
    app.post('/team/createTournament', teamTournament.createTeamTournament);

    app.put('/team/rules', teamTournament.editRules);
    app.put('/team/slotPlayer', teamTournament.editSlotPlayer);
    app.put('/team/schedule', teamTournament.editSchedule);
    app.put('/team/teamSlot', teamTournament.editTeamSlot);

    app.delete('/team', teamTournament.deleteTournament);

    app.get('/team/getName/:id', getTeamTournament.getName);
    app.get('/team', getTeamTournament.getAll);
    app.get('/team/:id', getTeamTournament.getDetail);

    // SoloTournament routes
    app.post('/solo/createTournament', soloTournament.createSoloTournament);

    app.put('/solo/slotPlayer', soloTournament.editSlotPlayer);
    app.put('/solo/rules', soloTournament.editRules);
    app.put('/solo/schedule', soloTournament.editSchedule);

    app.delete('/solo', soloTournament.deleteTournament);

    app.get('/solo/getName/:id', getSoloTournament.getName);
    app.get('/solo', getSoloTournament.getAll);
    app.get('/solo/:id', getSoloTournament.getDetail);

}