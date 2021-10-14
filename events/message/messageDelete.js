module.exports = async (Discord, client, message) => {
    
    if (message.author.id == client.user.id) return
    let channel = client.channels.cache.get(client.logs.log_channels_ids.logs_id)
    if (!channel) return;
    if (!client.logs.logs_toggle.message_delete) return;

    let messageContent = (message.content.length > 100) ? message.content.substring(0, 100) : message.content;
    
    const embed1 = new Discord.MessageEmbed()
        .setColor(client.config.branding.embed_color)
        .setAuthor(client.config.branding.name, message.guild.iconURL({dynamic: true}))
        .setThumbnail(message.guild.iconURL({dynamic: true}))
        .setDescription(
            `__**Message deleted**__\n
            **Channel: ** \`${message.channel.name}\`
            **User:** ${message.author.tag}
            **ID:** ${message.author.id}
            **Message:** \n${messageContent.substring(0, 1000)}`
        )
        .setTitle(`📋 Logs`)
        .setTimestamp()
        .setFooter(client.config.branding.ip);

    channel.send({embeds: [embed1]})
}