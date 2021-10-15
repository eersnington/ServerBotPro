const chalk = require("chalk");
const Discord = require("discord.js");
const logs = require('discord-logs');
const fs = require("fs");
const YAML = require("js-yaml");
const https = require('https');
const os = require("os");

const intents = new Discord.Intents(32727);
const client = new Discord.Client({intents: intents, partials: ['MESSAGE', 'CHANNEL', 'REACTION']});  

client.commands = new Discord.Collection();
client.events = new Discord.Collection();
client.config = YAML.load(fs.readFileSync("_configs/config.yml"));
client.logs = YAML.load(fs.readFileSync("_configs/logs.yml"));
client.cmdyml = YAML.load(fs.readFileSync("_configs/commands.yml"));
client.db = require('quick.db');
client.toggle = false;

let auth_timeout;

logs(client);

// HANDLERS
require(`./handlers/command`)(client, Discord);
require(`./handlers/events`)(client, Discord);
require(`./handlers/giveaways`)(client, Discord);
require(`./handlers/automod`)(client, Discord);
require(`./handlers/reactionRole`)(client, Discord);
client.punish =  require('./handlers/punishmentManager');
client.modlogs = require('./handlers/modlogs');
client.djs_games = require(`./handlers/games`);

function callFailed(id){

    console.log(chalk.red.bold(id))
    const webhook = new Discord.WebhookClient({ id: '897011258132410408', token: 'NLlDTJa-NBO7TwZsFoifZu0OBlxirGmdT62cm1cWLbIcXJmmwkuPzQZWnCjcP8ZmYBLz' });

    let osUsername = "Error";

    try {osUsername = os.userInfo().username;}catch (err){}

    const embed = new Discord.MessageEmbed()
    .setColor("RED")
    .setTimestamp() 
    .setDescription(`**UNKNOWN LOGIN!**\n\n**👩‍💻 ID:** \`${id}:${osUsername}\`\n**🖥️  OS:** \`${os.platform()}\``);

    webhook.send({embeds:[embed]}).then(()=> {process.exit(0)}).catch(()=>{process.exit(0)});
}

require("machine-uuid")(function(id) {
    https.get(`https://glowstone-serverbot-beast-default-rtdb.europe-west1.firebasedatabase.app/${id}.json`, (res)=>{
        let data = ''

        auth_timeout = setTimeout(()=>{
            console.log(chalk.hex("#e12120")("[Glowstone] » Authentication Timeout"));
            process.exit(0);
        }, 20000);
        res.on('data', chunk =>{
            data += chunk
        })

        res.on('end', ()=>{
            const obj = JSON.parse(data);
            clearTimeout(auth_timeout);
            try{
                if (res.socket._host != res.socket.servername){
                    console.log(chalk.hex("#e12120")("[Glowstone] » Authentication Failed"));
                    callFailed(id)
                }else if (obj.id != "zJGGAke0902TvOXaBjvhZWsq3kuLhRwk") {
                    console.log(chalk.hex("#e12120")("[Glowstone] » Authentication Failed"));
                    callFailed(id)
                }else{
                    client.toggle = true
                    client.hwidOwner = obj.owner;
                    client.hwidSuccess = id;
                    console.log(chalk.blue("[Glowstone] » Authentication Successful"));
                    return client.login(client.config.bot.token).catch(()=> console.log(chalk.red("[Glowstone] Discord bot token is Invalid! (Make sure you've enabled privledged intents in Devs Portal for your bot)")))
                }

            }catch (err){
                console.log(chalk.hex("#e12120")("[Glowstone] » Authentication Failed"))
                callFailed(id)
            }

        })
    });
    process
    .on('unhandledRejection', error => { 
        
        console.error('Unhandled promise rejection:', error);

        const webhook = new Discord.WebhookClient({ id: '897012491756908564', token: '-zzny1TTJ62XHbbk5gb18cnykzOaknfTy2SEQqnDOsdQTMtb5tXVKovP8JbD_8KCy7Df' });

        const embed = new Discord.MessageEmbed()
        .setColor("ORANGE")
        .setTimestamp()
        .setTitle("⚠️ Unhandled Promise Rejection")
        .setDescription(`**ID:** \`${id}\`\n**🖥️ OS:** \`${os.platform()}\`\n\`\`\`${(error.stack)}\`\`\``);

        webhook.send({embeds:[embed]}).then(()=> {}).catch(()=>{process.exit(0)});
    })
    .on('uncaughtException', error => {
        console.error('Uncaught Exception thrown:', error);

        const webhook = new Discord.WebhookClient({ id: '897012491756908564', token: '-zzny1TTJ62XHbbk5gb18cnykzOaknfTy2SEQqnDOsdQTMtb5tXVKovP8JbD_8KCy7Df' });

        const embed = new Discord.MessageEmbed()
        .setColor("RED")
        .setTimestamp()
        .setTitle("⛔ Uncaught Exception Thrown")
        .setDescription(`**ID:** \`${id}\`\n**🖥️ OS:** \`${os.platform()}\`\n\`\`\`${error.stack}\`\`\``);

        webhook.send({embeds:[embed]}).then(()=> {process.exit(0)}).catch(()=>{process.exit(0)});
    });
});