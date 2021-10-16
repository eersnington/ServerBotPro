module.exports = {
    name: 'shutdown',
    description: 'Closes the application',
    usage: 'shutdown',
    aliases: ['turnoff', 'pce'],
    args: 0,
    requiredRoles: [],
    requiredPerms: [],
    async execute(client, Discord, message, args){
        
        let channel = client.channels.cache.get(client.logs.log_channels_ids.logs_id);

        const shutdownEmbed = new Discord.MessageEmbed()
            .setColor(client.config.branding.embed_color)
            .setAuthor(client.config.branding.name, message.guild.iconURL({dynamic: true}))
            .setThumbnail(message.guild.iconURL())
            .setDescription(
                `__**Client shutdown**__\n
                The client has logged out. Please start another session.\n
                **Moderator: **<@${message.member.id}>`
            )
            .setTitle(`📋 Logs`)
            .setTimestamp()
            .setFooter(`Session ended by ${message.author.tag}`, message.author.displayAvatarURL({dynamic: true}));
        if (channel){
            channel.send({embeds: [shutdownEmbed]}).then(()=>
                message.react('👍').then(()=>{
                    process.exit(1)
                })
            )
        }else {
            message.react('👍').then(()=>{
                process.exit(1);
            })
        }
    }
}
