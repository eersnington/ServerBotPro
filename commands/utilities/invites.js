
module.exports = {
    name: 'invites',
    description: 'Check invites',
    usage: 'invites [@user/top]',
    aliases: ['invs'],
    args: 0,
    requiredRoles: [],
    requiredPerms: [],
    async execute(client, Discord, message, args){

        const member =  message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(x => x.user.tag.toLowerCase() === args[0] || x.user.tag === args[0]) || message.member;

        const invites = await message.guild.invites.fetch();

        const embed = new Discord.MessageEmbed()
        .setAuthor(`${message.guild.name} | Invites`, message.guild.iconURL({ dynamic: true }))
        .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
        .setColor(client.config.branding.embed_color)
        .setFooter(member.user.tag, member.user.displayAvatarURL({ dynamic: true }))
        .setTimestamp();

        let codes = []
        let count = 0;
        invites.forEach(invite =>{

            if (invite.inviter.id === member.id){
                count += invite.uses;
                codes.push(invite.code);
            }
        });

        if (args[0] == "top"){

            let invitesList = {}

            invites.each((invite) => {
                
                if (invitesList[invite.inviter.tag]){
                    invitesList[invite.inviter.tag] += invite.uses;
                }else {
                    invitesList[invite.inviter.tag] = invite.uses;;
                } 
            });

            let invitesCount = Object.keys(invitesList).map((key) => {
                return [key, invitesList[key]];
            });

            invitesCount.sort((a, b) => {
                return b[1] - a[1];
            });

            let i = 1;

            embedDesc = `**Top Invites**\n`
            invitesCount.slice(0, 25).forEach((array)=>{embedDesc = embedDesc  + `\n**#${i++} ${array[0]} ≫** ${array[1]}`})
            embed.setDescription(embedDesc);
            return message.channel.send({embeds: [embed]});
        }

        embed.setDescription(`\n> **❯ Invites: ** \`${count}\`\n> **❯ Codes: ** \`${codes.length != 0 ? codes.join(", "): "None"}\``);
        return message.channel.send({embeds: [embed]});
    }
}