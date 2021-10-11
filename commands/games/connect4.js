
module.exports = {
    name: 'connect4',
    description: 'Duel a user to a game of Connect4',
    usage: 'connect4 <@user>',
    aliases: ['c4'],
    requiredRoles: [],
    requiredPerms: [],
    async execute(client, Discord, message, args){

        const Connect4 = new client.djs_games.c4();
        Connect4.startGame(message, client);
    }
}