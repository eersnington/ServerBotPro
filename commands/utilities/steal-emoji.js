const { Util } = require('discord.js');

module.exports = {
    name: 'steal-emoji',
    description: 'Steal and add emojis from other servers',
    usage: 'steal-emoji <emoji>',
    aliases: ['getemoji', 'addemoji', 'stealemoji'],
    args: 1,
    requiredRoles: [],
    requiredPerms: [],
    async execute(client, Discord, message, args){

        if (!args.length) return message.reply("Please specify some emojis!");

        for (const rawEmoji of args){

            const parsedEmoji = Util.parseEmoji(rawEmoji);

            if (parsedEmoji.id){

                const extension = parsedEmoji.animated ? ".gif" : ".png";
                const url = `https://cdn.discordapp.com/emojis/${parsedEmoji.id + extension}`;

                message.guild.emojis.create(url, parsedEmoji.name).then((emoji) =>{

                    const emojiConstruct = (emoji.animated) ? `<a:${emoji.name}:${emoji.id}>` : `<:${emoji.name}:${emoji.id}>`
                    message.channel.send(`\`Successfully added the emoji: \` ${emojiConstruct}`)})
            }
        }
    }
}