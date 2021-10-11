module.exports = async (Discord, client, message, oldContent, newContent) => {
    let channel = client.channels.cache.get(client.logs.log_channels_ids.logs_id)
    if (!channel) return;
    if (!client.logs.logs_toggle.message_edit) return;
    
    const embed1 = new Discord.MessageEmbed()
        .setColor(client.config.branding.embed_color)
        .setAuthor(client.config.branding.name, message.guild.iconURL({dynamic: true}))
        .setThumbnail(message.guild.iconURL())
        .setDescription(
            `__**Message Content Edited**__\n
            **Channel:** \`${message.channel.name}\`
            **User:** <@${message.author.id}>
            **Previous Message:** \n\`${oldContent}\`
            **New Message:** \n\`${newContent}\``
        )
        .setTitle(`📋 Logs`)
        .setTimestamp()
        .setFooter(client.config.branding.ip);

    channel.send({embeds: [embed1]})
}