const { Fight } = require("weky");

module.exports = {
    name: 'fight',
    description: '1v1 duel someone',
    usage: 'fight <@user>',
    aliases: ['pvp'],
    requiredRoles: [],
    requiredPerms: [],
    async execute(client, Discord, message, args){

        const opponent = message.mentions.users.first();

        if (!opponent) return message.reply("**You need to mention an opponet!**");
        if (opponent.id == message.author.id) return message.reply("**You can't play it with your self**");

        await Fight({
            message: message,
            opponent: opponent,
            embed: {
                title: `⚔️ Fight | ${client.config.branding.name}`,
                color: client.config.branding.embed_color,
                footer: client.config.branding.ip,
                timestamp: true
            },
            buttons: {
              hit: 'Hit',
              heal: 'Heal',
              cancel: 'Stop',
              accept: 'Accept',
              deny: 'Deny'
            },
            acceptMessage: '<@{{challenger}}> has challenged <@{{opponent}}> for a fight!',
            winMessage: 'GG, <@{{winner}}> won the fight!',
            endMessage: '<@{{opponent}}> didn\'t answer in time. So, I dropped the game!',
            cancelMessage: '<@{{opponent}}> refused to have a fight with you!',
            fightMessage: '{{player}} you go first!',
            opponentsTurnMessage: 'Please wait for your opponents move!',
            highHealthMessage: 'You cannot heal if your HP is above 80!',
            lowHealthMessage: 'You cannot cancel the fight if your HP is below 50!',
            returnWinner: false,
            othersMessage: 'Only {{author}} can use the buttons!'
        });
    }
}