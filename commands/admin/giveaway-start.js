const ms = require('ms');

module.exports = {
    name: 'giveaway-start',
    description: 'Start a giveaway',
    usage: 'giveaway-start <duration> <winner_count> <prize>',
    aliases: ['g-start', 'gstart'],
    args: 3,
    requiredRoles: [],
    requiredPerms: [],
    async execute(client, Discord, message, args){
        if (!ms(args[0])) return message.reply(`Please follow the giveaway format! \`${client.config.bot.prefix}help giveaway-start\``);
        if (isNaN(parseInt(args[1]))) return message.reply(`Please follow the giveaway format! \`${client.config.bot.prefix}help giveaway-start\``);
        client.giveawaysManager.start(message.channel, {
            duration: ms(args[0]),
            winnerCount: parseInt(args[1]),
            prize: args.slice(2).join(' '),
            messages: {
                giveaway: '🎉🎉 **GIVEAWAY** 🎉🎉',
                giveawayEnded: '🎉🎉 **GIVEAWAY ENDED** 🎉🎉',
                drawing: 'Drawing: {timestamp}',
                dropMessage: 'Be the first to react with 🎉 !',
                inviteToParticipate: 'React with 🎉 to participate!',
                winMessage: 'Congratulations, {winners}! You won **{this.prize}**!',
                embedFooter: `${client.config.branding.ip}`,
                noWinner: 'Giveaway cancelled, no valid participations.',
                hostedBy: 'Hosted by: {this.hostedBy}',
                winners: 'Winner(s):',
                endedAt: 'Ended at'
              }
        }).then((gData) => {
            message.channel.send(`Giveaway end command \`${client.config.bot.prefix}g-end ${gData.messageId}\``);
            message.channel.send(`Giveaway reroll command \`${client.config.bot.prefix}g-reroll ${gData.messageId}\``);
        });
        // And the giveaway has started!
    }
}