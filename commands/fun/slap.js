const {Canvas} = require("canvacord");

module.exports = {
    name : 'slap',
    description : 'Send someone to the shadow realm',
    usage: 'slap [@user]',
    aliases: [],
    requiredRoles: [],
    requiredPerms: [],
    async execute(client, Discord, message, args){
        const member = message.mentions.members.first() || message.member;
        const embed = new Discord.MessageEmbed();
        
        const avatar = member.user.displayAvatarURL({format: "png"})

        let m = await message.channel.send("**Please Wait...**");

        const image = await Canvas.slap(message.author.displayAvatarURL({format:"png"}), avatar)
        m.delete({timeout: 5000});

        let attachment = new Discord.MessageAttachment(image, "slap.png");

        embed.setTitle(`Slap`)
        .setColor(client.config.branding.embed_color)
        .setDescription(`**Get bitch slapped**`)
        .setTimestamp()
        .setImage('attachment://slap.png')
        .setFooter(`Requested By ${message.author.tag}  | ${client.config.branding.name}`, message.author.displayAvatarURL({ dynamic: true }));

        message.channel.send({embeds: [embed], files: [attachment]});
        
    }
}