const {Canvas} = require("canvacord");

module.exports = {
    name : 'wanted',
    description : 'This man has a bounty on him',
    usage: 'wanted [@user]',
    aliases: [],
    args: 0,
    requiredRoles: [],
    requiredPerms: [],
    async execute(client, Discord, message, args){
        const member = message.mentions.members.first() || message.member;
        const embed = new Discord.MessageEmbed();

        const avatar = member.user.displayAvatarURL({format: "png"})

        let m = await message.channel.send("**Please Wait...**");

        const image = await Canvas.wanted(avatar)
        m.delete({timeout: 5000});

        let attachment = new Discord.MessageAttachment(image, "wanted.png");

        embed.setTitle(`Wanted`)
        .setColor(client.config.branding.embed_color)
        .setDescription(`**This man has a bounty on him**`)
        .setTimestamp()
        .setImage('attachment://wanted.png')
        .setFooter(`Requested By ${message.author.tag}  | ${client.config.branding.name}`, message.author.displayAvatarURL({ dynamic: true }));

        message.channel.send({embeds: [embed], files: [attachment]});
        
    }
}