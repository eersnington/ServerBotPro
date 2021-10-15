
module.exports = {
    name: 'suggest',
    description: 'Create a suggestion',
    usage: 'suggest <text>',
    aliases: ['suggestion'],
    args: 1,
    requiredRoles: [],
    requiredPerms: [],
    async execute(client, Discord, message, args){
        const channel = client.channels.cache.get(client.config.suggestions_channel);
        if(!channel) return message.channel.send({content: 'Suggestions channel does not exist! Please contact an Administrator.'});

        let messageArgs = args.join(' ');

        const embed = new Discord.MessageEmbed()
        .setColor(client.config.branding.embed_color)
        .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
        .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
        .setDescription(`\`${messageArgs}\``)
        .setTitle('Incoming suggestion')
        .setTimestamp()
        .setFooter(client.config.branding.ip);
        
        
        channel.send({embeds:[embed]}).then((msg) =>{
            msg.react('👍');
            msg.react('👎');
            message.delete();
        }).catch((err)=>{
            throw err;
        });

    }
}