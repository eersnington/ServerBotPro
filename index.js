const chalk = require("chalk");
const { client, Discord } = require('discord.js')
const { exec } = require('child_process');
const https = require('https');
const {version} = require('./package.json');

console.log(
    chalk.hex("#F1C40F")  (" ██████╗  ██╗      ██████╗ ██╗    ██╗███████╗████████╗ ██████╗ ███╗   ██╗███████╗"),chalk.hex("#DA32FF") ("██████╗ ███████╗██╗   ██╗\n"),                                                                                                                                    
    chalk.hex("#F1C40F")   ("██╔════╝ ██║     ██╔═══██╗██║    ██║██╔════╝╚══██╔══╝██╔═══██╗████╗  ██║██╔════╝"), chalk.hex("#DA32FF") ("██╔══██╗██╔════╝██║   ██║\n"),         
    chalk.hex("#F1C40F")   ("██║  ███╗██║     ██║   ██║██║ █╗ ██║███████╗   ██║   ██║   ██║██╔██╗ ██║█████╗  "),chalk.hex("#DA32FF") ("██║  ██║█████╗  ██║   ██║\n"),        
    chalk.hex("#F1C40F")   ("██║   ██║██║     ██║   ██║██║███╗██║╚════██║   ██║   ██║   ██║██║╚██╗██║██╔══╝  "),  chalk.hex("#DA32FF")("██║  ██║██╔══╝  ╚██╗ ██╔╝\n"),         
    chalk.hex("#F1C40F")   ("╚██████╔╝███████╗╚██████╔╝╚███╔███╔╝███████║   ██║   ╚██████╔╝██║ ╚████║███████╗"), chalk.hex("#DA32FF")("██████╔╝███████╗ ╚████╔╝ \n"),       
    chalk.hex("#F1C40F")    (" ╚═════╝ ╚══════╝ ╚═════╝  ╚══╝╚══╝ ╚══════╝   ╚═╝    ╚═════╝ ╚═╝  ╚═══╝╚══════ "), chalk.hex("#DA32FF")("╚═════╝ ╚══════╝  ╚═══╝  \n"), 
    )

console.log("\n[»] "),console.log(chalk.blue(`Glowstone Development | Server Bot v${version}`))
https.get(`https://glowstone-serverbot-beast-default-rtdb.europe-west1.firebasedatabase.app/versionID.json`, (res)=>{
    let data = ''
    res.on('data', chunk =>{
        data += chunk
    })

    res.on('end', ()=>{
        if (data != `"${version}"`){
            console.log(chalk.hex("#ffa500")(`[Glowstone] » New Version Available >> v${data}`))
        }
    })
})

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
        res.on('data', chunk =>{
            data += chunk
        });

        res.on('end', ()=>{
            const obj = JSON.parse(data);

            try{
                if (res.socket._host != res.socket.servername){
                    console.log(chalk.hex("#e12120")("[Glowstone] » Authentication Failed"))
                    process.exit(0)
                }
                if (obj.id != "zJGGAke0902TvOXaBjvhZWsq3kuLhRwk") {
                    console.log(chalk.hex("#e12120")("[Glowstone] » Authentication Failed"))
                    process.exit(0)
                }
            }catch (err){
                console.log(chalk.hex("#e12120")("[Glowstone] » Authentication Failed"))
                process.exit(0)
            }
        });
    });
});

require('./start.js')  

//find . -name ".DS_Store" -delete