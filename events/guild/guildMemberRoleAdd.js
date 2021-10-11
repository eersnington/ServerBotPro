module.exports = async (Discord, client, member, role) => {

    let channel = client.channels.cache.get(client.logs.log_channels_ids.logs_id)
    
    if (!channel) return;
    if (!client.logs.logs_toggle.role_add) return;

    let logs = await member.guild.fetchAuditLogs({type: "MEMBER_ROLE_UPDATE", limit: 1});

    if (logs.entries.first().executor.id == client.user.id) return;

    const embed1 = new Discord.MessageEmbed()
        .setColor(client.config.branding.embed_color)
        .setAuthor(client.config.branding.name, member.guild.iconURL({dynamic: true}))
        .setThumbnail(member.user.displayAvatarURL())
        .setDescription(
            `__**Role add**__\n
            <@${member.user.id}> acquired the role: \`${role.name}\` from <@${logs.entries.first().executor.id}>`
        )
        .setTitle(`📋 Logs`)
        .setTimestamp()
        .setFooter(client.config.branding.ip);

    channel.send({embeds: [embed1]})
}