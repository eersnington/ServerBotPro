module.exports = async (Discord, client, role, oldPermissions, newPermissions) => {
    let channel = client.channels.cache.get(client.logs.log_channels_ids.logs_id)
    if (!channel) return;
    if (!client.logs.logs_toggle.role_permission_update) return;

    const embed1 = new Discord.MessageEmbed()
        .setColor(client.config.branding.embed_color)
        .setAuthor(client.config.branding.name, channel.guild.iconURL({dynamic: true}))
        .setThumbnail(channel.guild.iconURL({dynamic: true}))
        .setDescription(
            `__**Role permissions update**__\n
            \`${role.name}\` had permissions \`${oldPermissions}\` and now has permissions \`${newPermissions}\``
        )
        .setTitle(`📋 Logs`)
        .setTimestamp()
        .setFooter(client.config.branding.ip);

    channel.send({embeds: [embed1]})
}