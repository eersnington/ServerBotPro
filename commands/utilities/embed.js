
module.exports = {
    name: 'embed',
    description: 'Send a message as an embed',
    usage: 'embed [title] :: [text]',
    aliases: [],
    args: 1,
    requiredRoles: [],
    requiredPerms: [],
    async execute(client, Discord, message, args){

        let msg = args.join(" ").split('::');
        const embed = new Discord.MessageEmbed()
        .setColor(client.config.branding.embed_color)
        .setTimestamp()
        .setFooter(client.config.branding.ip);

        const title = (msg[0]) ? embed.setTitle(`${msg[0].substring(0,100)}`): null;

        const desc = (msg[1]) ? embed.setDescription(`${msg[1].substring(0, 4000)}`): null;

        message.channel.send({embeds:[embed]}).then(()=> message.delete());

    }
}