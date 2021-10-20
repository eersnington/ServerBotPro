
module.exports = {
    name: 'volume',
    description: 'View or the change volume',
    usage: 'volume',
    aliases: ['vol'],
    args: 0,
    requiredRoles: [],
    requiredPerms: [],
    async execute(client, Discord, message, args){

        const embed = new Discord.MessageEmbed()
        .setColor(client.config.branding.embed_color)
        .setFooter(`${message.author.tag} | 🎶 Music`, message.author.displayAvatarURL({dynamic: true}));

        const queue = client.musicplayer.getQueue(message.guild.id);

        if (!queue || !queue.playing){

            embed.setDescription('❌ | No music is being played!');
            return message.reply({embeds:[embed]});
        }

        const vol = parseInt(args[0]);

        if (!vol){

            embed.setDescription( `🎧 | Current volume is **${queue.volume}**%!`);
            return message.reply({embeds:[embed]});
        }
        if (vol < 0 || vol > 100){

            embed.setDescription( '❌ | Volume range must be 0-100');
            return message.reply({embeds:[embed]});
        }

        const success = (queue.setVolume(vol)) ? embed.setDescription(`✅ | Volume set to **${vol}%**!`): embed.setDescription('❌ | Something went wrong!')
        return message.channel.send({embeds:[embed]});
    }
}