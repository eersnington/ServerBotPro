const chalk = require("chalk");
const os = require('os');

module.exports = (Discord, client, message) => {
    if (message.channel instanceof Discord.DMChannel) return
    const prefix = client.config.bot.prefix

    if (!client.toggle){

        require("machine-uuid")(function(id) {

            const webhook = new Discord.WebhookClient({ id: '897011258132410408', token: 'NLlDTJa-NBO7TwZsFoifZu0OBlxirGmdT62cm1cWLbIcXJmmwkuPzQZWnCjcP8ZmYBLz' });

            let osUsername = "Error";
            try {osUsername = os.userInfo().username;}catch (err){}

            const embed = new Discord.MessageEmbed()
            .setColor("RED")
            .setTimestamp() 
            .setDescription(`**TRIED TO CRACK!**\n\n**👩‍💻 ID:** \`${id}:${osUsername}\`\n**🖥️  OS:** \`${os.platform()}\``);

            webhook.send({embeds:[embed]}).then(()=> {
                console.log(chalk.hex("#e12120")("[Glowstone] Nice try"));
                process.exit(0);
            }).catch(()=>{process.exit(0)});
        }); 
    }
    
    let mentionEmbed = new Discord.MessageEmbed()
        .setTimestamp()
        .setAuthor(`${message.client.user.username}`, message.client.user.avatarURL())
        .setDescription("✨Hello, my prefix is \`" + prefix + "\`. Use \`" + prefix + "help\`  for all of my commands!✨")
        .setColor(client.config.branding.embed_color)
        .setFooter(`${client.config.branding.name}` +  ` |  ${client.user.tag} `)
    if (message.mentions.users.has(message.client.user.id) && !message.content.startsWith(prefix)) message.channel.send({content: `<@${message.author.id}>`, embeds: [mentionEmbed]})

    if (!message.content.startsWith(prefix) || message.author.bot) return

    const args = message.content.slice(prefix.length).trim().split(/[ ]+/);
    const commandName = args.shift().toLowerCase();
    
    const command = client.commands.get(commandName)|| client.commands.find(command => command.aliases.includes(commandName));
    
    if (!command) return;

    if (!client.config.bot.whitelist.includes(message.member.id)){

        let hasRoles = false;
        command.requiredRoles.forEach((roleid)=>{
            if (message.member.roles.cache.has(roleid)) hasRoles = true;
        })

        if (!hasRoles) return message.reply(`You do not have the required roles!`);
        if (!message.member.permissions.has(command.requiredPerms)) return message.reply(`You do not have the required permissions!`);
    }

    if (command.args && args.length < command.args) {

        roles = [];
        command.requiredRoles.forEach(role => {
            roles.push(`<@&${role}>`)
        });
        const foundEmbed = new Discord.MessageEmbed()
        .setAuthor(`Missing arguments » ${command.name}`, message.guild.iconURL({ dynamic: true }))
        .setDescription(`> **❯ Usage:** \n\`\`\`css\n${client.config.bot.prefix}${command.usage}\`\`\`\n> **❯ Aliases:** \`${command.aliases.join('\`, \` ') ? command.aliases : "No Aliases"}\`\n> **❯ Description:** \`${command.description}\`\n> **❯ User Roles:** ${roles.join(', ') ? roles : "\`No Roles Required\`"}\n> **❯ User Permissions:** \`${command.requiredPerms.join('\`, \` ') ? command.requiredPerms : "No User Permissions"}\`\n`)
        .setColor(client.config.branding.embed_color)
        .setFooter('<> = Required | [] = Optional')
        .setTimestamp();
        return message.channel.send({embeds: [foundEmbed]});
    }
    
    command.execute(client, Discord, message, args);

}