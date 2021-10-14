
module.exports = {
    name: 'invites',
    description: 'Check invites',
    usage: 'invites [@user]',
    aliases: ['invs'],
    args: 0,
    requiredRoles: [],
    requiredPerms: [],
    async execute(client, Discord, message, args){

        const member =  message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(x => x.user.tag.toLowerCase() === args[0] || x.user.tag === args[0]) || message.member;

        const invites = await message.guild.invites.fetch();

        let codes = []
        let count = 0;
        invites.forEach(invite =>{

            if (invite.inviter.id === member.id){
                count += invite.uses;
                codes.push(invite.code);
            }
        })

        const embed = new Discord.MessageEmbed()
        .setAuthor(`${message.guild.name} | Invites`, message.guild.iconURL({ dynamic: true }))
        .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
        .setDescription(`\n> **❯ Invites: ** \`${count}\`\n> **❯ Codes: ** \`${codes.length != 0 ? codes.join(", "): "None"}\``)
        .setColor(client.config.branding.embed_color)
        .setFooter(member.user.tag, member.user.displayAvatarURL({ dynamic: true }))
        .setTimestamp();
        return message.channel.send({embeds: [embed]});
    }
}