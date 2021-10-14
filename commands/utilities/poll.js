var onlyEmoji = require('emoji-aware').onlyEmoji;

module.exports = {
    name: 'poll',
    description: 'Create a poll',
    usage: 'poll <text>',
    aliases: ['ballot', 'vote'],
    args: 1,
    requiredRoles: [],
    requiredPerms: [],
    async execute(client, Discord, message, args){

        let messageArgs = args.join(' ');
        let emotes = onlyEmoji(messageArgs);

        const embed = new Discord.MessageEmbed()
        .setColor(client.config.branding.embed_color)
        .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true })) 
        .setThumbnail(message.guild.iconURL({ dynamic: true }))
        .setTitle('Incoming poll')
        .setDescription(`${messageArgs.substring(0, 4095)}`)
        .setTimestamp()
        .setFooter(client.config.branding.ip);
        
        message.channel.send({embeds:[embed]}).then((msg) =>{
            message.delete();
            for (e in emotes){
                msg.react(emotes[e]);
            }
        }).catch((err)=>{throw err});

    }
}