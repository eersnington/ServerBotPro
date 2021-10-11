const ms = require('ms')

module.exports = {
    name: 'slowmode',
    description: 'Set the rate limit of a channel',
    usage: 'slowmode <duration/off>',
    aliases: [],
    requiredRoles: [],
    requiredPerms: [],
    async execute(client, Discord, message, args){

        if (!args[0]) return message.reply('Please mention a valid time!');

        if (args[0] == "off"){

            message.channel.setRateLimitPerUser(0);
            return message.channel.send(`**Disabled this channel's rateLimit!**`)

        }

        const time = ms(args[0])

        if (isNaN(time)) return message.reply('Please mention a valid time!');
        if (time < 1000) return message.reply('The minimum rate limit is 1 second.');

        message.channel.setRateLimitPerUser(time/1000);
        message.channel.send(`Channel rateLimit has been set to **${ms(time, {long:true})} per user!**`)
    }
}