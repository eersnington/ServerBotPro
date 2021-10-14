
module.exports = {
    name: 'leaderboard',
    description: 'Shows the leaderboard statistics',
    usage: 'invites [category]',
    aliases: ['top'],
    args: 0,
    requiredRoles: [],
    requiredPerms: [],
    async execute(client, Discord, message, args){

        message.channel.send("WIP");
    }
}