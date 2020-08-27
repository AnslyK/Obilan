const team = require('./team/team.js');

module.exports = function (app) {
    //app.(get/post/put/delete)('/team', team.);
    app.get('/all', team.getTeam);
    app.get('/tournament/:id', team.getTeamByTournament);
}