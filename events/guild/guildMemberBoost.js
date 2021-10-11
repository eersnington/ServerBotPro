module.exports = async (Discord, client, member) => {
    let channel = client.channels.cache.get(client.logs.log_channels_ids.logs_id)
    if (!channel) return;
    if (!client.logs.logs_toggle.boost) return;

    const embed1 = new Discord.MessageEmbed()
        .setColor(client.config.branding.embed_color)
        .setAuthor(client.config.branding.name, member.guild.iconURL({dynamic: true}))
        .setThumbnail(member.user.displayAvatarURL())
        .setDescription(
            `__**Server boost**__\n
            <@${member.user.id}> has just boosted the server`
        )
        .setTitle(`📋 Logs`)
        .setTimestamp()
        .setFooter(client.config.branding.ip);

    channel.send({embeds: [embed1]})

    const boostEmbed = new Discord.MessageEmbed()
        .setColor(client.config.branding.embed_color)
        .setAuthor(member.user.tag, member.user.displayAvatarURL({dynamic: true}))
        .setThumbnail("https://i.redd.it/qq911bvdqwu51.gif")
        .setDescription(`<@${member.user.id}> **has just boosted the server!**`)
        .setTimestamp()
        .setFooter(client.config.branding.ip);
    
    let boostChannel = client.channels.cache.get(client.logs.log_channels_ids.boost_id)
    boostChannel.send({embeds:[boostEmbed]})
}