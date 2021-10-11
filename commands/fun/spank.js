const {Canvas} = require("canvacord");

module.exports = {
    name : 'spank',
    description : 'You see an opportunity ( ͡° ͜ʖ ͡°)',
    usage: 'spank [@user]',
    aliases: [],
    requiredRoles: [],
    requiredPerms: [],
    async execute(client, Discord, message, args){
        const member = message.mentions.members.first() || message.member;
        const embed = new Discord.MessageEmbed();

        const avatar = member.user.displayAvatarURL({format: "png"})

        let m = await message.channel.send("**Please Wait...**");

        const image = await Canvas.spank(message.author.displayAvatarURL({format:"png"}), avatar)
        m.delete({timeout: 5000});

        let attachment = new Discord.MessageAttachment(image, "spank.png");

        embed.setTitle(`Spank`)
        .setColor(client.config.branding.embed_color)
        .setDescription(`**He saw an opportunity and took it**`)
        .setTimestamp()
        .setImage('attachment://spank.png')
        .setFooter(`Requested By ${message.author.tag}  | ${client.config.branding.name}`, message.author.displayAvatarURL({ dynamic: true }));

        message.channel.send({embeds: [embed], files: [attachment]});
        
    }
}