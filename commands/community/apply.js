const {MessageButton,MessageActionRow} = require('discord.js');
const performance = require('perf_hooks').performance;
const moment = require('moment');
let cooldown = new Set();

module.exports = {
    name: 'apply',
    description: 'Start an application',
    usage: 'apply',
    aliases: [],
    args: 0,
    requiredRoles: [],
    requiredPerms: [],
    async execute(client, Discord, message, args){
        if (!client.db.get('applications')) client.db.set('applications', {})
        if (cooldown.has(message.author.id)){
            const cooldownEmbed = new Discord.MessageEmbed()
            .setColor(client.config.branding.embed_color)
            .setAuthor(client.config.branding.name, message.guild.iconURL({dynamic: true}))
            .setThumbnail(message.guild.iconURL())
            .setDescription('You already have an application open in your dms!')
            .setTitle('📑 Application Cooldown')
            .setTimestamp()
            .setFooter(client.config.branding.ip);
        
            return message.reply({embeds: [cooldownEmbed]})
        }

        if (client.db.get(`applications`)[message.author.id]){
            const cooldownEmbed = new Discord.MessageEmbed()
                .setColor(client.config.branding.embed_color)
                .setAuthor(client.config.branding.name, message.guild.iconURL({dynamic: true}))
                .setThumbnail(message.guild.iconURL())
                .setDescription('You already have an application created!\nPlease wait patiently for the management to review it')
                .setTitle('📑 Application Exists')
                .setTimestamp()
                .setFooter(client.config.branding.ip);
        
            return message.reply({embeds: [cooldownEmbed]})
        }

        let appsChannel = client.channels.cache.get(client.config.application_settings.applications_channel);
        const error = new Discord.MessageEmbed()
            .setColor(client.config.branding.embed_color)
            .setAuthor(client.config.branding.name, message.guild.iconURL({dynamic: true}))
            .setDescription('⚠️ There is no applications channel set in the config.')
            .setTitle('📑 Application')
            .setTimestamp()
            .setFooter(client.config.branding.ip);
        if (!appsChannel) return message.reply({embeds:[error]})

        const questions = client.config.application_settings.questions;
        const embed1 = new Discord.MessageEmbed()
            .setColor(client.config.branding.embed_color)
            .setAuthor(client.config.branding.name, message.guild.iconURL({dynamic: true}))
            .setThumbnail(message.guild.iconURL())
            .setDescription('Welcome to you application!')
            .setTitle('📑 Application')
            .setTimestamp()
            .setFooter(client.config.branding.ip);
        
        
        await message.author.send({embeds: [embed1]}).catch(()=> {});

        let collectCounter = 0;
        let endCounter = 0;

        const filter = (m) => m.author.id === message.author.id;

        const appStart = await message.author.send(questions[collectCounter++]).catch(()=> {return message.reply("Please enable your DM's")}).then((m)=>{

            const channel = m.channel;

            if (!channel instanceof Discord.DMChannel) return

            const startedEmbed = new Discord.MessageEmbed()
            .setColor(client.config.branding.embed_color)
            .setDescription(`📑 An application has started in your DMs **${message.author.tag}**`);
        
            message.channel.send({embeds: [startedEmbed]});

            cooldown.add(message.author.id)

            const collector = channel.createMessageCollector({filter});
            let timerStart, timerEnd;
            timerStart = performance.now();

            collector.on("collect", ()=> {
                if (collectCounter < questions.length){
                    channel.send(questions[collectCounter++]);
                }else{

                    const embed2 = new Discord.MessageEmbed()
                        .setColor(client.config.branding.embed_color)
                        .setAuthor(client.config.branding.name, message.guild.iconURL({dynamic: true}))
                        .setDescription('Are you sure you want to submit?');
                    
                    const row = new MessageActionRow()
                        .addComponents(
                            new MessageButton()
                            .setCustomId('application-submit')
                            .setLabel('✅ Submit')
                            .setStyle('SUCCESS'),
                        ).addComponents(
                            new MessageButton()
                            .setCustomId('application-cancel')
                            .setLabel('❌ Cancel')
                            .setStyle('DANGER'),
                        );
                    
                    channel.send({embeds: [embed2], components: [row]});
                    timerEnd = performance.now();
                }
            });

            const buttonFilter = (interaction) => interaction.user.id == message.author.id;

            const collector2 = channel.createMessageComponentCollector({buttonFilter, max:1});

            collector2.on("end", (interaction)=>{
                if (interaction.first().customId === 'application-submit') return collector.stop("submitted");
                if (interaction.first().customId === 'application-cancel') return collector.stop("cancelled");
            });

            collector.on("end", (collected, reason) =>{
                
                cooldown.delete(message.author.id)
                if (reason === "submitted"){

                    const mappedResponses = collected.map((msg)=> {
                        return `**${questions[endCounter++]}**\n${(msg.content.length > 170) ? `${msg.content.substring(0, 170)}...` : msg.content}`
                    }).join('\n\n')

                    const row = new MessageActionRow()
                        .addComponents(
                            new MessageButton()
                            .setCustomId('application-accept')
                            .setLabel('Accept Application')
                            .setStyle('PRIMARY'),
                        ).addComponents(
                            new MessageButton()
                            .setCustomId('application-deny')
                            .setLabel('Deny Application')
                            .setStyle('DANGER'),
                        );

                    const embedSubmission = new Discord.MessageEmbed()
                    .setColor(client.config.branding.embed_color)
                    .setTitle("New Application")
                    .setThumbnail(message.author.displayAvatarURL({dynamic: true}))
                    .setAuthor(message.author.tag, message.author.displayAvatarURL({dynamic: true}))
                    .setTimestamp()
                    .setDescription(`${mappedResponses}\n\n**Duration**\n${moment.duration((Math.round(timerEnd-timerStart)).toFixed(2)).format(" m [mins], s [secs]")}`); // 

                    appsChannel.send({embeds: [embedSubmission], components:[row]}).then(m =>{

                        const embedSuccess = new Discord.MessageEmbed()
                        .setColor("GREEN")
                        .setAuthor(client.config.branding.name, message.guild.iconURL({dynamic: true}))
                        .setDescription('You have successfully submitted your application')
                        .setTimestamp();

                        channel.send({embeds: [embedSuccess]})

                        let json = client.db.get('applications')
                        json[message.author.id] = m.id
                        client.db.set('applications', json)

                    })

                    
                }else if (reason === "cancelled"){
                    const embedCancelled = new Discord.MessageEmbed()
                        .setColor(client.config.branding.embed_color)
                        .setAuthor(client.config.branding.name, message.guild.iconURL({dynamic: true}))
                        .setDescription('You have cancelled your application.\nYou can start a new one in the discord.');

                    channel.send({embeds: [embedCancelled]})
                }
                
            });

        })

    }
}