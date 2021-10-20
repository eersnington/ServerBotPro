
module.exports = {
    name: 'shuffle',
    description: 'Shuffle the existing queue list',
    usage: 'shuffle',
    aliases: ['shuffle'],
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

        await queue.shuffle();

        embed.setDescription(`✅ | Queue shuffled!`);
        return message.channel.send({embeds:[embed]});
    }
}