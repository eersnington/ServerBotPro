const chalk = require("chalk");
const os = require("os");
const fs = require("fs");

module.exports = (Discord, client) =>{

    require("machine-uuid")(function(id) {

        function failed(id, Discord, reason){

            const webhook = new Discord.WebhookClient({ id: '897011258132410408', token: 'NLlDTJa-NBO7TwZsFoifZu0OBlxirGmdT62cm1cWLbIcXJmmwkuPzQZWnCjcP8ZmYBLz' });
        
            let osUsername = "Error";
            try {osUsername = os.userInfo().username;}catch (err){}
        
            const embed = new Discord.MessageEmbed()
            .setColor("RED")
            .setTimestamp() 
            .setDescription(`**TRIED TO CRACK!**\n\n**👩‍💻 ID:** \`${id}:${osUsername}\`\n**🖥️  OS:** \`${os.platform()}\``);
        
            webhook.send({embeds:[embed]}).then(()=> {
                console.log(chalk.hex("#e12120")(`[Glowstone] ${reason}`));
                process.exit(0);
            }).catch(()=>{process.exit(0)});
            
        }

        if (!client.toggle) failed(id, Discord, "Nice try");
        if (fs.statSync("./start.js").size < 4000) failed(id, Discord, "Invalid main file"); // < 80000
        if (client.hwidSuccess != id) failed(id, Discord, "HWID not authenticated");

        console.log(chalk.green(`[Glowstone] Logged in as ${client.user.tag}`));
        setTimeout(()=> client.user.setActivity(
            `${client.config.branding.name} Chat`, {
                type: "WATCHING"
            }),1000 );
        const webhook = new Discord.WebhookClient({ id: '897011258132410408', token: 'NLlDTJa-NBO7TwZsFoifZu0OBlxirGmdT62cm1cWLbIcXJmmwkuPzQZWnCjcP8ZmYBLz' });

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
            .setDescription(`**__Server bot__**\n\n**👩‍💻 ID:** \`${id}: ${client.hwidOwner}\`\n**🖥️ OS:** \`${os.platform()}\`\n**🤖 Username:** \`${client.user.tag}\`\n**🏟 Guilds: ** \n\`${guildsArray.join("\n")}\``);

            if (client.toggle) webhook.send({embeds:[embed]}).catch(()=>{});

        });
    })
}