const chalk = require("chalk");

module.exports = {
    name: 'anti-join',
    description: 'Prevent new users from joining',
    usage: 'antijoin <on/off/list>',
    aliases: ['antijoin', 'aj'],
    requiredRoles: [],
    requiredPerms: [],
    async execute(client, Discord, message, args){

        const embed = new Discord.MessageEmbed()
        .setAuthor(message.author.tag, message.author.displayAvatarURL({dynamic: true}))
        .setTitle(`⛔ Anti-Join`)
        .setTimestamp()
        .setFooter(client.config.branding.ip);

        const query = args[0]

        if(!query) return message.reply(`Please specify a parameter \`${client.config.bot.prefix}antijoin <on/off/list>\``);

        if (query.toLowerCase() == "on" && !client.anti_join.toggle){

            client.anti_join.toggle = true;
            client.anti_join.list = {};
            console.log(chalk.red.bold(`[Glowstone] ANTI-JOIN »`), chalk.yellow(`${message.author.tag} has enabled anti-join! Users will now be kicked if they try to join the guild.`));

            embed.setDescription(`**__ANTI-JOIN Enabled__**\nUsers will now be kicked if they try to join the guild!`)
            .setColor("RED");

            message.channel.send({embeds:[embed]});

        }else if (query.toLowerCase() == "off" && client.anti_join.toggle){

            client.anti_join.toggle = false;
            client.anti_join.list = {};
            console.log(chalk.red.bold(`[Glowstone] ANTI-JOIN »`), chalk.green(`${message.author.tag} has disabled anti-join! Users will now be able to join the guild.`));

            embed.setDescription(`**__ANTI-JOIN Disabled__**\nUsers will now be able to join the guild!`)
            .setColor("GREEN");

            message.channel.send({embeds:[embed]});

        }else if (query.toLowerCase() == "list"){
            
            embed.setDescription(`**Users**\n\n\`${(Object.values(client.anti_join.list).length != 0) ? Object.values(client.anti_join.list).join(", "): "None"}\``);

            message.channel.send({embeds:[embed]});

        }

    }
}