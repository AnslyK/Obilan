const team = require('./team/team.js');
const member = require('./team/member.js');

module.exports = function (app) {
    //app.(get/post/put/delete)('/team', team.);
    app.post('/create' , team.createTeam);

    app.put('/join', member.joinTeam);

    app.get('', team.getTeam);
    app.get('/tournament/:id', team.getTeamByTournament);
    
}