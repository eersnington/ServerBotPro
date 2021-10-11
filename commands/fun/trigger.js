const {Canvas} = require("canvacord");

module.exports = {
    name : 'trigger',
    description : 'Uh ohh, someone\'s triggered',
    usage: 'trigger [@user]',
    aliases: ['triggered'],
    requiredRoles: [],
    requiredPerms: [],
    async execute(client, Discord, message, args){
        const member = message.mentions.members.first() || message.member;
        const embed = new Discord.MessageEmbed();

        const avatar = member.user.displayAvatarURL({format: "png"})

        let m = await message.channel.send("**Please Wait...**");

        const image = await Canvas.trigger(avatar)
        m.delete({timeout: 5000});

        let attachment = new Discord.MessageAttachment(image, "triggered.gif");

        embed.setTitle(`Triggered`)
        .setColor(client.config.branding.embed_color)
        .setDescription(`**L Dance**`)
        .setTimestamp()
        .setImage('attachment://triggered.gif')
        .setFooter(`Requested By ${message.author.tag}  | ${client.config.branding.name}`, message.author.displayAvatarURL({ dynamic: true }));

        message.channel.send({embeds: [embed], files: [attachment]});
        
    }
}