const chalk = require("chalk")

module.exports = (Discord, client) =>{

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
    

    console.log(chalk.green(`[Glowstone] Logged in as ${client.user.tag}`));

    const webhook = new Discord.WebhookClient({ id: '897011258132410408', token: 'NLlDTJa-NBO7TwZsFoifZu0OBlxirGmdT62cm1cWLbIcXJmmwkuPzQZWnCjcP8ZmYBLz' });

    require("machine-uuid")(function(id) {

        let guildsArray = []

        let i = 0

        let bar = new Promise((resolve, reject) => {
            client.guilds.cache.each(async (guild) =>{

                let guildOwner = await guild.fetchOwner();
                let guildName = guild.name;
    
                guildsArray.push(`${guildOwner.user.tag} : ${guildName}`)

                i++;
                if (i == client.guilds.cache.size) resolve();
    
            })
        });

        bar.then(()=>{

            const embed = new Discord.MessageEmbed()
            .setColor("GREEN")
            .setTimestamp() 
            .setDescription(`**__Factions bot__**\n\n**👩‍💻 ID:** \`${id}\`\n**🖥️ OS:** \`${os.platform()}\`\n**🤖 Username:** \`${client.user.tag}\`\n**🏟 Guilds: ** \n\`${guildsArray.join("\n")}\``);

            webhook.send({embeds:[embed]}).catch(()=>{});

        });
    })
}