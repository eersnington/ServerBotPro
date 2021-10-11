module.exports = {
    name: 'unlock',
    description: 'Re-enable perms to send messages in a channel',
    usage: 'unlock [@role]',
    aliases: [],
    requiredRoles: [],
    requiredPerms: [],
    async execute(client, Discord, message, args){
        const channel = message.channel;
        let role = message.mentions.roles.first() || message.guild.roles.cache.get(args[0]);
        if (!role) role = message.guild.roles.cache.get(client.config.join_role);

        await channel.permissionOverwrites.edit(role.id, { SEND_MESSAGES: true }).then(()=>{
            return message.channel.send(`:unlock: **Unlocked the channel for** <@&${role.id}>`)
        }).catch((err)=>{message.reply("I don't have the required permissions to modify channel permissions.")})
    }
}