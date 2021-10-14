const {MessageButton,MessageActionRow} = require('discord.js');

module.exports = {
    name: 'ticket-remove',
    description: 'Remove a user from the ticket',
    usage: 'ticket-remove <@user>',
    aliases: ['t-remove', 'tremove'],
    args: 1,
    requiredRoles: [],
    requiredPerms: [],
    async execute(client, Discord, message, args){

        if(!message.member.roles.cache.has(client.config.ticket_settings.ticket_access)) return message.reply(`You need <@&${client.config.ticket_settings.ticket_access}> to execute this command!`);

        if (!message.channel.name.includes('ticket-')){
            const embedCancel = new Discord.MessageEmbed()
                .setColor(client.config.branding.embed_color)
                .setAuthor(client.config.branding.name, message.guild.iconURL({dynamic: true}))
                .setThumbnail(message.guild.iconURL())
                .setDescription(
                    `__**Action Cancelled**__\n
                    You can only use this command in ticket channels!`
                )
                .setTitle('🎟️ Tickets')
                .setTimestamp()
                .setFooter(client.config.branding.ip);
            return message.channel.send({embeds:[embedCancel]});
        }

        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(x => x.user.tag.toLowerCase() === args[0] || x.user.tag === args[0]);
        
        if (!member) return message.reply('Mention a member! (or the user isn\'t in the guild)');

        if(!member.roles.cache.has(client.config.ticket_settings.ticket_access) && !member.permissions.has(['ADMINISTRATOR'])){
            message.channel.permissionOverwrites.delete(member.user.id);

            const embed = new Discord.MessageEmbed()
                .setColor(client.config.branding.embed_color)
                .setAuthor(client.config.branding.name, message.guild.iconURL({dynamic: true}))
                .setDescription(`<@${message.author.id}> has removed the user <@${member.user.id}> from the ticket.`)
                .setTimestamp()
                .setFooter(client.config.branding.ip);
            return message.channel.send({embeds:[embed]});
        }else{

            const embed = new Discord.MessageEmbed()
                .setColor(client.config.branding.embed_color)
                .setAuthor(message.author.tag, message.author.displayAvatarURL({dynamic: true}))
                .setDescription(`You can't remove someone from the staff team!`)
                .setTimestamp()
                .setFooter(client.config.branding.ip);
            return message.channel.send({embeds:[embed]});

        }

    }
}