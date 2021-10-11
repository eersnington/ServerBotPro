module.exports = {
    name: 'tempban',
    description: 'Ban a user termporarily',
    usage: 'tempban <@user> <time> <reason>',
    aliases: [],
    requiredRoles: [],
    requiredPerms: [],
    async execute(client, Discord, message, args){
        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(x => x.user.tag.toLowerCase() === args[0] || x.user.tag === args[0]);
        let time = args[1];
        const reason = args.slice(2).join(' ');

        if (!member) return message.reply('Mention a user! (or the user isn\'t in the guild)');
        if (!time) return message.reply('Tell the time!');
        if (!reason) return message.reply('Tell me a reason');

        if (member.id === message.author.id) return message.reply('You can\'t ban your self!')
        if (member.id === client.user.id) return message.reply('You can\'t ban me!');
        if (member.roles.highest.position >= message.member.roles.highest.position) return message.reply('You can\'t ban this user');

        client.punish.tempban(client, message, member, reason, time);

    }
}