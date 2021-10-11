module.exports = {
    name: 'hire',
    description: 'Hire a user to a specified role',
    usage: 'hire @user @role',
    aliases: [],
    requiredRoles: [],
    requiredPerms: [],
    async execute(client, Discord, message, args){
        let channel = client.channels.cache.get(client.logs.log_channels_ids.staff_movement_id);
        const member = message.mentions.members.first();
        const promotionEmbed = new Discord.MessageEmbed();

        if (!member) return message.reply('Mention a user! (or the user isn\'t in the guild)');
        if (member.id === message.author.id) return message.reply('You can\'t hire yourself!');
        if (member.roles.highest.position >= message.member.roles.highest.position) return message.reply('You can\'t hire a user as this role!');

        const role = message.mentions.roles.first();
        if (!role) return message.reply('Mention a role!');

        if (client.config.blacklisted_roles.includes(role.id)) return message.reply('You can\'t promote a user to this role!'); 

        try{
            await member.roles.add(role);
        }catch(err){
            return message.reply('My role is not high enough to manage this user or role')
        }

        promotionEmbed.setColor(client.config.branding.embed_color)
            .setAuthor(client.config.branding.name, message.guild.iconURL({dynamic: true}))
            .setThumbnail(message.guild.iconURL())
            .setDescription(
                `<@${member.user.id}> has been hired as **➜** <@&${role.id}>`
            )
            .setTitle(`${client.config.branding.name} | Hired +`)
            .setTimestamp()
            .setFooter(`Hired by ${message.author.tag}`, message.author.displayAvatarURL({dynamic: true}));
        if (channel){
            await channel.send({embeds: [promotionEmbed]})
            message.react('👍');
        }
    }
}