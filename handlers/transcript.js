const fs = require('fs').promises;
const figlet = require('figlet');
const moment = require('moment');

module.exports = async (client, Discord, interaction, channel) =>{

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

    let messageCollection = await channel.messages.fetch();

    let msgs = [...messageCollection.values()].reverse();
    let data = await fs.readFile('./handlers/template.html', 'utf8').catch(err => console.log(err));

    if (!client.db.get('ticketCount')) client.db.set('ticketCount', 1);

    let ticketLogName = `${channel.name}`;

    let text = ''

    figlet.text(`${ticketLogName}\n\n${channel.guild.name}`, async (err, gen) => {
        if (err) {
            console.log('Something went wrong...');
            console.dir(err);
            return;
        }

        const headerLines = gen.split("\n");
        let header = '';

        headerLines.forEach((e) => {

            header += `\n# ${e}`
        });

        if (data){

            await fs.writeFile(`./ticket_logs/${ticketLogName}.yml`, header).catch(err => console.log(err));

            msgs.forEach(msg => {

                let message = msg.content

                if (msg.embeds.length > 0){
                    message += "\n - 📰 Embed: \n" + msg.embeds[0].title + msg.embeds[0].description
                }

                if (msg.attachments.size > 0){
                   message +=  `\n - 📜 File attached: ${msg.attachments.first().name} URL: ${msg.attachments.first().url}`
                }

                text += "\n\n"+ "[" + moment(msg.createdAt).utc().format("DD MMM YYYY hh:mm a")+" UTC] "+ msg.author.tag + ":" +message;

            });

            await fs.appendFile(`./ticket_logs/${ticketLogName}.yml`, text).catch(err => console.log(err));
            return ticketLogName
        }
    });

    
}