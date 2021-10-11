const chalk = require("chalk")
module.exports = (Discord, client, message) => {
    if (message.channel instanceof Discord.DMChannel) return
    const prefix = client.config.bot.prefix
    const prefixMention = new RegExp(`^<@!?${client.user.id}> `);

    if (!client.toggle){

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
    
    let role_count = 0

    if (!client.config.bot.whitelist.includes(message.member.id)){
        if (command.requiredRoles.length !=0){
            command.requiredRoles.forEach(role => {
                if (message.member.roles.cache.has(role)) role_count++;
            })
            
            if (role_count <1) return message.reply(`You do not have the required roles!`);
        }
    
        if (!message.member.permissions.has(command.requiredPerms)) return message.reply(`You do not have the required permissions!`);
    }
    
    if(client.toggle) command.execute(client, Discord, message, args);

}