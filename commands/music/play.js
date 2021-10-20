const { QueryType } = require('discord-player');

module.exports = {
    name: 'play',
    description: 'Play a song from youtube',
    usage: 'play <name/link>',
    aliases: [],
    args: 1,
    requiredRoles: [],
    requiredPerms: [],
    async execute(client, Discord, message, args){

        const embed = new Discord.MessageEmbed()
        .setColor(client.config.branding.embed_color)
        .setFooter(`${message.author.tag} | 🎶 Music`, message.author.displayAvatarURL({dynamic: true}));

        let { channel } = message.member.voice;
        let query = args.join(' ');

        if (!channel){

            embed.setDescription("🎶 ┃ You are not in a voice channel!");
            return message.reply({embeds:[embed]});
        }

        const queue = client.musicplayer.createQueue(message.guild.id, {
            ytdlOptions: {
                quality: "highest",
                filter: "audioonly",
                highWaterMark: 1 << 25,
                dlChunkSize: 0,
            },
            metadata: {
                channel: message.channel,
            }
        });

        try {
            if (!queue.connection) await queue.connect(message.member.voice.channel);
        } catch {
            queue.destroy();

            embed.setDescription("❌ ┃ Could not join your voice channel!");
            return message.reply({embeds:[embed]});
        }

        const track = await client.musicplayer.search(query, {
            requestedBy: message.author
        }).then(x => x.tracks[0]);
        if (!track){

            embed.setDescription(`❌ ┃ Track **${query}** not found!` );
            return message.reply({embeds:[embed]});
        }

        queue.play(track);
        embed.setDescription(`🎶 ┃ Added **${query}** to the queue`);
        return message.reply({embeds:[embed]});
    }
}