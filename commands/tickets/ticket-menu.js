const {MessageButton,MessageActionRow} = require('discord.js');

module.exports = {
    name: 'ticket-menu',
    description: 'Ticket menu for staff to manage tickets',
    usage: 'ticket-menu',
    aliases: ['t-menu', 'tmenu'],
    requiredRoles: [],
    requiredPerms: [],
    async execute(client, Discord, message, args){
        if(!message.member.roles.cache.has(client.config.ticket_settings.ticket_access)) return
        
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
            return message.channel.send({embeds:[embedCancel]})
        }
        const embed1 = new Discord.MessageEmbed()
            .setColor(client.config.branding.embed_color)
            .setAuthor(client.config.branding.name, message.guild.iconURL({dynamic: true}))
            .setThumbnail(message.guild.iconURL())
            .setDescription(
                `__**Ticket Menu**__\n
                Please choose the appropirate option to manage this ticket!
                \n*Do not abuse as your actions are logged are recorded!*`
            )
            .setTitle('🎟️ Tickets')
            .setTimestamp()
            .setFooter(client.config.branding.ip);

            const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                .setCustomId('close-ticket')
                .setLabel('🔒 Close')
                .setStyle('PRIMARY'),
            ).addComponents(
                new MessageButton()
                .setCustomId('ticket-transcript')
                .setLabel('📜 Transcript')
                .setStyle('SECONDARY'),
            ).addComponents(
                new MessageButton()
                .setCustomId('ticket-delete')
                .setLabel('❌ Delete')
                .setStyle('DANGER'),
            );
        
        message.channel.send({embeds: [embed1], components: [row]});

    }
}