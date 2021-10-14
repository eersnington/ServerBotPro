const Discord = require('discord.js');
const ms = require('ms');

module.exports.run = async (client, message, member, action, reason, duration) =>{

    let channel = message.guild.channels.cache.get(client.logs.log_channels_ids.mod_logs_id);

    const logsEmbed = new Discord.MessageEmbed()
    .setColor(client.config.branding.embed_color)
    .setThumbnail(message.guild.iconURL({dynamic:true}))
    .setAuthor(client.config.branding.name, message.guild.iconURL({dynamic: true}))
    .setTimestamp()
    .setTitle(`📋 Logs`)
    .setFooter(client.config.branding.ip);

    if (action == "ban"){

        logsEmbed.setDescription(
            "__**Player banned**__\n\n"+
            `**Moderator: **<@${(message.member) ? message.member.id : client.user.id}>\n**User: **\`${(member.user) ? member.user.tag : member.tag}\`\n**Reason: ** \`${reason.substring(0,50)}\`\n**Duration: ** \`Permanent\``
        );

        if (channel)return channel.send({embeds:[logsEmbed]})
        return
    }

    if (action == "tempban"){

        logsEmbed.setDescription(
            "__**Player banned**__\n\n"+
            `**Moderator: **<@${(message.member) ? message.member.id : client.user.id}>\n**User: **\`${(member.user) ? member.user.tag : member.tag}\`\n**Reason: ** \`${reason.substring(0,50)}\`\n**Duration: ** \`${ms(ms(duration))}\``
        );

        if (channel)return channel.send({embeds:[logsEmbed]})
        return

    }

    if (action == "unban"){

        logsEmbed.setDescription(
            "__**Player unbanned**__\n\n"+
            `**Moderator: **<@${(message.member) ? message.member.id : client.user.id}>\n**User: **\`${(member.user) ? member.user.tag : member.tag}\`\n**Reason: ** \`${reason.substring(0,50)}\`\n**Date: ** \`${duration}\``
        );

        if (channel)return channel.send({embeds:[logsEmbed]})
        return
    }

    if (action == "mute"){

        logsEmbed.setDescription(
            "__**Player muted**__\n\n"+
            `**Channel: **\`${message.channel.name}\`\n**Moderator: **<@${(message.member) ? message.member.id : client.user.id}>\n**User: **\`${(member.user) ? member.user.tag : member.tag}\`\n**Reason: ** \`${reason.substring(0,50)}\`\n**Duration: ** \`${ms(ms(duration))}\``
        );

        if (channel)return channel.send({embeds:[logsEmbed]})
        return

    }

    if (action == "unmute"){

        logsEmbed.setDescription(
            "__**Player unmuted**__\n\n"+
            `**Channel: **\`${message.channel.name}\`\n**Moderator: **<@${(message.member) ? message.member.id : client.user.id}>\n**User: **\`${(member.user) ? member.user.tag : member.tag}\`\n**Reason: ** \`${reason.substring(0,50)}\`\n**Date: ** \`${duration}\``
        );

        if (channel)return channel.send({embeds:[logsEmbed]})
        return

    }

    if (action == "kick"){

        logsEmbed.setDescription(
            "__**Player kicked**__\n\n"+
            `**Channel: **\`${message.channel.name}\`\n**Moderator: **<@${(message.member) ? message.member.id : client.user.id}>\n**User: **\`${(member.user) ? member.user.tag : member.tag}\`\n**Reason: ** \`${reason.substring(0,50)}\``
        );

        if (channel)return channel.send({embeds:[logsEmbed]})
        return

    }

    if (action == "purge"){

        logsEmbed.setDescription(
            "__**Purged **__\n\n"+
            `**Moderator: **<@${message.member.id}>\n**Purged amount: ** \`${reason.substring(0,50)}\``
        );

        if (channel)return channel.send({embeds:[logsEmbed]})
        return

    }

}