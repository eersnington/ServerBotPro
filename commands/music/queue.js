
module.exports = {
    name: 'queue',
    description: 'Show the list of songs in queue',
    usage: 'queue',
    aliases: ['q'],
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

        let page = 1;
        const pageStart = 10 * (page - 1);
        const pageEnd = pageStart + 10;
        const currentTrack = queue.current;
        const tracks = queue.tracks.slice(pageStart, pageEnd).map((m, i) => {
            return `${i + pageStart + 1}. **${m.title}** ([link](${m.url}))`;
        });

        embed.setDescription(`
        ${tracks.join('\n')}${
            queue.tracks.length > pageEnd
                ? `\n...${queue.tracks.length - pageEnd} more track(s)`
                : ''
        }`)
        .addField( 'Now Playing', `🎶 | **${currentTrack.title}** ([link](${currentTrack.url}))` )


        return message.channel.send({embeds:[embed]});
    }
}