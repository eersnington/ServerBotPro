
module.exports = {
    name: 'tictactoe',
    description: 'Challenge a user to a game of tictactoe',
    usage: 'tictactoe <@user>',
    aliases: ['ttt'],
    requiredRoles: [],
    requiredPerms: [],
    async execute(client, Discord, message, args){

        const TicTacToe = new client.djs_games.ttt();
        TicTacToe.startGame(message);
    }
}