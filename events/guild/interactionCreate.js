let ticket_cooldown = new Set();
const {MessageButton,MessageActionRow, Permissions} = require('discord.js');
const fs = require('fs');
const os = require('os');

module.exports = async (Discord, client, interaction) => {

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
    });

    if (!client.db.get('ticketOpen')) client.db.set('ticketOpen', {});
    if (!client.db.get('ticketCount')) client.db.set('ticketCount', 0);
    
    if (interaction.isButton()) {
        let user = interaction.user;
        let ticket_category = client.channels.cache.find(c => c.name.toLowerCase() == "pending tickets" && c.type == "GUILD_CATEGORY");
    
        if (interaction.customId === 'ticket-panel') {
            await interaction.deferUpdate();

            let ticketOpenDB = client.db.get('ticketOpen');

            if (Object.keys(ticketOpenDB).includes(user.id)) {
        
                interaction.followUp({
                    content:`> You already have a ticket open in <#${ticketOpenDB[user.id]}>\n> If the channel does not appear as \`#deleted-channel\`, then please contact a staff member to close the ticket.`,
                    ephemeral:true
                })
            } else {

                let createdChannelID
                interaction.guild.channels.create(`ticket-${padLeadingZeros(parseInt(client.db.get('ticketCount')), 3)}`,{
                    type: 'GUILD_TEXT',
                }).then( m => {
                    if (ticket_category) m.setParent(ticket_category.id);
                    createdChannelID = m.id;
                    m.permissionOverwrites.set([
                        {
                            id: interaction.guild.id,
                            deny: [Permissions.FLAGS.VIEW_CHANNEL],
                        },
                        {
                            id: user.id,
                            allow: [Permissions.FLAGS.VIEW_CHANNEL, Permissions.FLAGS.ATTACH_FILES, Permissions.FLAGS.EMBED_LINKS],
                        },
                        {
                            id: client.config.ticket_settings.ticket_access,
                            allow: [Permissions.FLAGS.VIEW_CHANNEL, Permissions.FLAGS.ATTACH_FILES, Permissions.FLAGS.EMBED_LINKS],
                        },
                    ]);

                });
                const delay = ms => new Promise(res => setTimeout(res, ms));
                await delay(1000);

                const placeholders = { "%USERNAME%": user.tag, "%USERTAG%": `<@${user.id}>`};
                let embed_desc = client.config.ticket_settings.ticket_panel_message2;
                let ticketChannel = interaction.guild.channels.cache.get(createdChannelID);

                client.db.set('ticketCount', (client.db.get('ticketCount')+1));

                for (placeholder in placeholders) {

                   if(embed_desc.includes(placeholder)){
                       embed_desc = embed_desc.replace(placeholder, placeholders[placeholder]);
                   }
                }

                const embed = new Discord.MessageEmbed()
                .setColor(client.config.branding.embed_color)
                .setAuthor(client.config.branding.name, interaction.guild.iconURL({dynamic: true}))
                .setTitle(`${client.config.ticket_settings.ticket_panel_title}`)
                .setDescription(embed_desc)
                .setTimestamp()
                .setFooter(client.config.branding.ip);

                const close = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                    .setCustomId('close-ticket')
                    .setLabel('🔒 Close')
                    .setStyle('SECONDARY'),
                );
    
                ticketOpenDB[user.id] = createdChannelID;
                client.db.set("ticketOpen", ticketOpenDB);  

                ticketChannel.send({
                    content: `<@&${client.config.ticket_settings.ticket_access}>`,
                    embeds: [embed],
                    components: [close]
                }).then(interaction.followUp({
                    content: `Created Ticket! <#${createdChannelID}>`,
                    ephemeral: true
                }))
            }
		
        }else if (interaction.customId === 'close-ticket') {
            await interaction.deferUpdate();

            const channel = interaction.channel
            const tickerUsers = []
            const users = []

            let ticketLogsChannel = client.channels.cache.get(client.logs.log_channels_ids.ticket_logs_id)
            let ticketOpenDB = client.db.get('ticketOpen');

            channel.members.each(user => {
                users.push(user.user.id)
                tickerUsers.push(`<@${user.user.id}>`)
            })

            const ticketEmbed = new Discord.MessageEmbed()
            .setColor(client.config.branding.embed_color)
            .setTitle("🎟️  Ticket transcript")
            .addField('Ticket Name', `\`${channel.name}\``, true)
            .addField('Users in transcript', `${tickerUsers.join()}`, true)
            .setTimestamp()
            .setFooter(`${client.config.branding.name} Support System`, interaction.guild.iconURL({dynamic: true}));

            const non_staff = new Discord.Collection();

            users.forEach(user =>{
                let player = channel.members.find(member => member.id == user);

                if (ticketOpenDB[user]){
                    delete ticketOpenDB[user];
                    client.db.set('ticketOpen', ticketOpenDB);
                }
                if(!player.roles.cache.has(client.config.ticket_settings.ticket_access) && !player.permissions.has(['ADMINISTRATOR'])){

                    let ticketUser = channel.members.get(user);
                    non_staff.set(ticketUser.id, ticketUser);
                    
                    channel.permissionOverwrites.edit(user, { VIEW_CHANNEL: false });
                }
            });

            const embed1 = new Discord.MessageEmbed()
            .setColor(client.config.branding.embed_color)
            .setAuthor(client.config.branding.name, interaction.guild.iconURL({dynamic: true}))
            .setThumbnail(interaction.guild.iconURL())
            .setDescription(
                "**Closed**\n" +
                `> This ticket got closed by <@${interaction.member.id}>\n` +
                "> A transcript has been sent to the user!"
            )
            .setTitle(`${client.config.ticket_settings.ticket_panel_title}`)
            .setTimestamp()
            .setFooter(client.config.branding.ip);

            channel.send({embeds: [embed1]});

            const log = await require('./../../handlers/transcript')(client, Discord, interaction.message, channel);

            const delay = ms => new Promise(res => setTimeout(res, ms));
            await delay(1000);

            const transcriptFile = new Discord.MessageAttachment(`./ticket_logs/${channel.name}.yml`)

            non_staff.each((user)=>{ 

                ticketEmbed.setAuthor(user.user.tag, user.user.displayAvatarURL({dynamic: true}));
                user.send({embeds: [ticketEmbed],files:[transcriptFile]}).catch(()=> interaction.channel.send("**ERROR:** This user does not accept private messages."));
            })

            const logsEmbed = new Discord.MessageEmbed()
            .setColor(client.config.branding.embed_color)
            .setAuthor(client.config.branding.name, interaction.guild.iconURL({dynamic: true}))
            .setThumbnail(interaction.guild.iconURL())
            .setDescription(
                `__**Ticket closed**__\n
                **Channel: **\`${channel.name}\`\n**User: **<@${interaction.member.id}>`
            )
            .setTitle(`📋 Logs`)
            .setTimestamp()
            .setFooter(client.config.branding.ip);
        
            if (ticketLogsChannel && client.logs.logs_toggle.ticket_close) ticketLogsChannel.send({embeds:[logsEmbed]})

            const embedEnd = new Discord.MessageEmbed()
            .setColor(client.config.branding.embed_color)
            .setAuthor(client.config.branding.name, interaction.guild.iconURL({dynamic: true}))
            .setThumbnail(interaction.guild.iconURL())
            .setDescription(
                `__**Ticket Menu**__\n
                Please choose the appropirate option to manage this ticket!
                \n*Do not abuse as your actions are logged!*`
            )
            .setTitle(`${client.config.ticket_settings.ticket_panel_title}`)
            .setTimestamp()
            .setFooter(client.config.branding.ip);

            const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                .setCustomId('ticket-transcript')
                .setLabel('📜 Transcript')
                .setStyle('SECONDARY'),
            ).addComponents(
                new MessageButton()
                .setCustomId('ticket-delete')
                .setLabel('❌ Delete')
                .setStyle('DANGER'),
            );
        
        interaction.channel.send({embeds: [embedEnd], components: [row]});

        }else if (interaction.customId === 'ticket-delete') {
            await interaction.deferUpdate();
            if(interaction.member.roles.cache.has(client.config.ticket_settings.ticket_access) || interaction.member.permissions.has(['ADMINISTRATOR'])) {

                const channel = interaction.channel;
                const embed1 = new Discord.MessageEmbed()
                .setColor(client.config.branding.embed_color)
                .setAuthor(client.config.branding.name, interaction.guild.iconURL({dynamic: true}))
                .setThumbnail(interaction.guild.iconURL())
                .setDescription(
                    "**DELETING TICKET!**\n" +
                    `> Delete initiated by <@${interaction.member.id}>\n` +
                    "> This channel will delete in a few seconds"
                )
                .setTitle(`${client.config.ticket_settings.ticket_panel_title}`)
                .setTimestamp()
                .setFooter(client.config.branding.ip);

                let ticketLogsChannel = client.channels.cache.get(client.logs.log_channels_ids.ticket_logs_id)

                const logsEmbed = new Discord.MessageEmbed()
                .setColor(client.config.branding.embed_color)
                .setAuthor(client.config.branding.name, interaction.guild.iconURL({dynamic: true}))
                .setThumbnail(interaction.guild.iconURL())
                .setDescription(
                    `__**Ticket deleted**__\n
                    **Channel: **\`${channel.name}\`\n**User: **<@${interaction.member.id}>`
                )
                .setTitle(`📋 Logs`)
                .setTimestamp()
                .setFooter(client.config.branding.ip);

            
                if (ticketLogsChannel && client.logs.logs_toggle.ticket_delete){
                    ticketLogsChannel.send({embeds:[logsEmbed]});
                    try {
                        const transcriptFile = new Discord.MessageAttachment(`./ticket_logs/${interaction.channel.name}.yml`);
                        ticketLogsChannel.send({files:[transcriptFile]});
                    }catch (err){}
                }

                channel.send({embeds: [embed1]});

                const delay = ms => new Promise(res => setTimeout(res, ms));
                await delay(3000);
                channel.delete();
            }

        }else if (interaction.customId === 'ticket-transcript') {
            await interaction.deferUpdate();

            const channel = interaction.channel
            const embed1 = new Discord.MessageEmbed()
            .setColor(client.config.branding.embed_color)
            .setAuthor(client.config.branding.name, interaction.guild.iconURL({dynamic: true}))
            .setThumbnail(interaction.guild.iconURL())
            .setDescription(
                "**Creating Transcript!**\n" +
                "> Creating transcript in a few seconds!"
            )
            .setTitle('🎟️ Tickets')
            .setTimestamp()
            .setFooter(client.config.branding.ip);

            channel.send({embeds: [embed1]});
            const log = await require('./../../handlers/transcript')(client, Discord, interaction.message, channel);

            const delay = ms => new Promise(res => setTimeout(res, ms));
            await delay(1000);

            const transcriptFile = new Discord.MessageAttachment(`./ticket_logs/${channel.name}.yml`)

            channel.send({files:[transcriptFile]})

        }else if (interaction.customId === 'application-accept'){
            await interaction.deferUpdate();

            const appsJson =  client.db.get('applications')

            let appsUserID = Object.keys(appsJson).find(key => appsJson[key] === interaction.message.id);
            let appsUser = await interaction.guild.members.fetch(appsUserID);

            if (!appsUser){
                delete appsJson[appsUserID]
                client.db.set('applications', appsJson)
                interaction.message.delete()
                return interaction.reply(`User is not in the Discord server! \`User ID: ${appsUserID}\``)
            } 
            
            const embedSuccess = new Discord.MessageEmbed()
            .setColor("GREEN")
            .setAuthor(client.config.branding.name, interaction.guild.iconURL({dynamic: true}))
            .setDescription(client.config.application_settings.accepted_response)
            .setTimestamp()
            .setFooter(client.config.branding.ip);

            interaction.channel.send({embeds:[interaction.message.embeds[0]]});
            interaction.message.delete();
            appsUser.user.send({embeds: [embedSuccess]}).catch(()=> interaction.channel.send("This user does not accept private messages."))
            
            delete appsJson[appsUserID]
            client.db.set('applications', appsJson)
            
        }else if (interaction.customId === 'application-deny'){
            await interaction.deferUpdate();

            const appsJson =  client.db.get('applications')
            let appsUserID = Object.keys(appsJson).find(key => appsJson[key] === interaction.message.id);
            let appsUser = await interaction.guild.members.fetch(appsUserID);

            if (!appsUser){
                delete appsJson[appsUserID]
                client.db.set('applications', appsJson)
                interaction.message.delete()
                return interaction.reply(`User is not in the Discord server! \`User ID: ${appsUserID}\``)
            } 
            
            const embedSuccess = new Discord.MessageEmbed()
            .setColor("RED")
            .setAuthor(client.config.branding.name, interaction.guild.iconURL({dynamic: true}))
            .setDescription(client.config.application_settings.rejected_response)
            .setTimestamp()
            .setFooter(client.config.branding.ip);

            interaction.channel.send({embeds:[interaction.message.embeds[0]]});
            interaction.message.delete();
            appsUser.user.send({embeds: [embedSuccess]}).catch(()=> interaction.channel.send("This user does not accept private messages."))
            
            delete appsJson[appsUserID];
            client.db.set('applications', appsJson);
    
        }else {
            return
        }
    }

    if (interaction.isSelectMenu()){
        await interaction.deferUpdate();
    }

}

function padLeadingZeros(num, size) {
    var s = num+"";
    while (s.length < size) s = "0" + s;
    return s;
}