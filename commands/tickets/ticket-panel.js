const {MessageButton,MessageActionRow} = require('discord.js');

module.exports = {
    name: 'ticket-panel',
    description: 'Create a panel for ticket creation',
    usage: 'ticket-panel',
    aliases: ['t-panel', 'tpanel'],
    args: 0,
    requiredRoles: [],
    requiredPerms: [],
    async execute(client, Discord, message, args){
        const ticketEmbed = new Discord.MessageEmbed()
            .setColor(client.config.branding.embed_color)
            .setAuthor(client.config.branding.name, message.guild.iconURL({dynamic: true}))
            .setThumbnail(message.guild.iconURL())
            .setDescription(`${client.config.ticket_settings.ticket_panel_message1}`)
            .setTitle(`${client.config.ticket_settings.ticket_panel_title}`)
            .setTimestamp()
            .setFooter(client.config.branding.ip);

            const button = new MessageActionRow()
            .addComponents(
                new MessageButton()
                .setCustomId('ticket-panel')
                .setLabel(`${client.config.ticket_settings.ticket_button_label}`)
                .setStyle('PRIMARY'),
            );

            message.channel.send({embeds: [ticketEmbed], components: [button]});
    }
}