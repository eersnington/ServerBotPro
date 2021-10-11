module.exports = {
    name: 'emoteid',
    description: 'Find out the ID of a custom emote',
    usage: 'emoteid <emoji>',
    aliases: ['emid', 'emojiid', 'emojid'],
    requiredRoles: [],
    requiredPerms: [],
    async execute(client, Discord, message, args){
        if (!args[0]) return message.reply("You need to specify an emoji")
        message.channel.send(`\`${args}\``)
    }
}