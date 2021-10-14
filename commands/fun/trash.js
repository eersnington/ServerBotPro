const {Canvas} = require("canvacord");

module.exports = {
    name : 'trash',
    description : 'Bro you\'re trash',
    usage: 'trash [@user]',
    aliases: [],
    args: 0,
    requiredRoles: [],
    requiredPerms: [],
    async execute(client, Discord, message, args){
        const member = message.mentions.members.first() || message.member;
        const embed = new Discord.MessageEmbed();
        
        const avatar = member.user.displayAvatarURL({format: "png"})

        let m = await message.channel.send("**Please Wait...**");

        const image = await Canvas.trash(avatar)
        m.delete({timeout: 5000});

        let attachment = new Discord.MessageAttachment(image, "trash.png");

        embed.setTitle(`Trash`)
        .setColor(client.config.branding.embed_color)
        .setDescription(`**Trash?**`)
        .setTimestamp()
        .setImage('attachment://trash.png')
        .setFooter(`Requested By ${message.author.tag}  | ${client.config.branding.name}`, message.author.displayAvatarURL({ dynamic: true }));

        message.channel.send({embeds: [embed], files: [attachment]});
        
    }
}