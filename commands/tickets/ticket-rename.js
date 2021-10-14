const {MessageButton,MessageActionRow} = require('discord.js');

module.exports = {
    name: 'ticket-rename',
    description: 'Rename a ticket channel',
    usage: 'ticket-rename <new_name>',
    aliases: ['t-rename', 'trename'],
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

        let name = args.slice(0).join(' ');

        if (!name) return message.reply('No Channel name provided.');

        message.channel.setName(`ticket-${name}`);

        const embed = new Discord.MessageEmbed()
            .setColor(client.config.branding.embed_color)
            .setAuthor(client.config.branding.name, message.guild.iconURL({dynamic: true}))
            .setDescription(`<@${message.author.id}> has set the ticket channel name to \`ticket-${name}\``)
            .setTimestamp()
            .setFooter(client.config.branding.ip);
        return message.channel.send({embeds:[embed]});

    }
}