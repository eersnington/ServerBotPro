
module.exports = {
    name: 'pause',
    description: 'Pause the playlist',
    usage: 'pause',
    aliases: [],
    args: 0,
    requiredRoles: [],
    requiredPerms: [],
    async execute(client, Discord, message, args){

        const embed = new Discord.MessageEmbed()
        .setColor(client.config.branding.embed_color)
        .setFooter(`${message.author.tag} | 🎶 Music`, message.author.displayAvatarURL({dynamic: true}));

        let { channel } = message.member.voice;

        if (!channel){

            embed.setDescription("🎶 ┃ You are not in a voice channel!");
            return message.reply({embeds:[embed]});
        }

        const queue = client.musicplayer.getQueue(message.guild.id);

        if (!queue || !queue.playing){

            embed.setDescription('❌ | No music is being played!');
            return message.reply({embeds:[embed]});
        }

        const success = (queue.setPaused(true)) ? embed.setDescription( '⏸ | Paused!'): embed.setDescription('❌ | Something went wrong!');
        return message.channel.send({embeds:[embed]});
       
    }
}