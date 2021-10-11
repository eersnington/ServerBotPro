const Filter = require("badwords-filter");
const ms = require('ms')
var onlyEmoji = require('emoji-aware').onlyEmoji;
const ipRegex = require('ip-regex');
const chalk = require('chalk');
const moment = require('moment');

const userMap = new Map()
let DIFF = 3000;

module.exports = (client, Discord) =>{
    const config = { list: client.config.automod_settings.profanity.list };
    const filter = new Filter(config);
    DIFF = isNaN(ms(client.config.automod_settings.anti_spam.max_interval)) ? 3000 : ms(client.config.automod_settings.anti_spam.max_interval);
    client.anti_join = {toggle:false, list:{}};

    

    client.on('messageCreate', async (message)=>{
        if (message.channel instanceof Discord.DMChannel) return
        if (client.config.automod_settings.ignore_bots && message.author.bot) return
        if (!client.db.get('muted')) client.db.set('muted', {})
        if (message.channel.name.includes('ticket-')) return

        const {member, content} = message;

        const embed = new Discord.MessageEmbed()
        .setAuthor(`Automod`, message.guild.iconURL({ dynamic: true }))
        .setColor(client.config.branding.embed_color)
        .setTimestamp();


        if (client.config.bot.whitelist.includes(member.id)) return

        /**
         * LINKS
         */
        if (client.config.automod_settings.links.enabled){

            const urlRE= new RegExp("([a-zA-Z0-9]+://)?([a-zA-Z0-9_]+:[a-zA-Z0-9_]+@)?([a-zA-Z0-9.-]+\\.[A-Za-z]{2,4})(:[0-9]+)?([^ ])+");

            
            if (client.config.automod_settings.links.ignored_links.includes(content)) return
            if (client.config.automod_settings.links.ignored_channels.includes(message.channel.id)) return
            if (client.config.automod_settings.links.ignored_users.includes(member.id)) return

            if (content.match(urlRE)){

                const YTLinks = ['www.youtube.com', 'youtu.be'];
                if (YTLinks.includes(content.match(urlRE)[3]) && client.config.automod_settings.links.allow_youtube) return

                message.delete();
                let messageContent = (content.length > 100) ? content.substring(0, 100) : content;
                console.log(chalk.blue(`[Glowstone] Logs » ${message.author.tag}: `), chalk.yellow(messageContent));

                if (client.config.automod_settings.links.punishment[0] == "Mute"){
                    
                    embed.setDescription(`<@${member.id}>, you've triggered Automod for Sending links.\nYou're muted for ${ms(ms(client.config.automod_settings.links.punishment[1]))}`);
                    message.channel.send({embeds:[embed]});

                    return client.punish.mute(client, message, member, `AUTOMOD Links  `, client.config.automod_settings.links.punishment[1]);

                }else if (client.config.automod_settings.links.punishment[0] == "Ban"){

                    if (client.config.automod_settings.links.punishment[1] == "permanent"){
                        embed.setDescription(`<@${member.id}>, you've triggered Automod for Sending links.\nUser is now banned permanently!`);
                        message.channel.send({embeds:[embed]});

                        return client.punish.ban(client, message, member, `AUTOMOD Links `);
                    }
                
                    embed.setDescription(`<@${member.id}>, you've triggered Automod for Sending links.\nUser is banned for ${ms(ms(client.config.automod_settings.links.punishment[1]))}!`);
                    message.channel.send({embeds:[embed]});

                    return client.punish.tempban(client, message, member, `AUTOMOD Links  `, client.config.automod_settings.links.punishment[1]);

                }else if (client.config.automod_settings.links.punishment[0] == "Kick"){

                    embed.setDescription(`<@${member.id}>, you've triggered Automod for Sending links.\n User kicked!\n`);
                    message.channel.send({embeds:[embed]});

                    return client.punish.kick(client, message, member, `AUTOMOD Links  `);

                }else{
                    embed.setDescription(`<@${member.id}>, you've triggered Automod for Sending links.`);
                    return message.channel.send({embeds:[embed]});
                }
            }

        }
        /**
         * PROFANITY
         */
        if (client.config.automod_settings.profanity.enabled){

            if (client.config.automod_settings.profanity.ignored_channels.includes(message.channel.id)) return
            if (client.config.automod_settings.profanity.ignored_users.includes(member.id)) return

            if (filter.isUnclean(content)){

                message.delete();
                let messageContent = (content.length > 100) ? content.substring(0, 100) : content;
                console.log(chalk.blue(`[Glowstone] Logs » ${message.author.tag}: `), chalk.yellow(messageContent));

                if (client.config.automod_settings.profanity.punishment[0] == "Mute"){

                    embed.setDescription(`<@${member.id}>, you've triggered Automod for Profanity.\nYou're muted for ${ms(ms(client.config.automod_settings.profanity.punishment[1]))}`);
                    message.channel.send({embeds:[embed]});

                    return client.punish.mute(client, message, member, `AUTOMOD Profanity`, client.config.automod_settings.profanity.punishment[1]);

                }else if (client.config.automod_settings.profanity.punishment[0] == "Ban"){

                    if (client.config.automod_settings.profanity.punishment[1] == "permanent"){
                        embed.setDescription(`<@${member.id}>, you've triggered Automod for Profanity.\nUser is now banned permanently!`);
                        message.channel.send({embeds:[embed]});

                        return client.punish.ban(client, message, member, `AUTOMOD Profanity`);
                    }
        
                    embed.setDescription(`<@${member.id}>, you've triggered Automod for Profanity.\nUser is banned for ${ms(ms(client.config.automod_settings.profanity.punishment[1]))}!`);
                    message.channel.send({embeds:[embed]});

                    return client.punish.tempban(client, message, member, `AUTOMOD Profanity  `, client.config.automod_settings.links.punishment[1]);

                }else if (client.config.automod_settings.profanity.punishment[0] == "Kick"){

                    embed.setDescription(`<@${member.id}>, you've triggered Automod for Profanity.\n User kicked!\n`);
                    message.channel.send({embeds:[embed]});

                    return client.punish.kick(client, message, member, `AUTOMOD Profanity`);

                }else{
                    embed.setDescription(`<@${member.id}>, you've triggered Automod for Profanity.`);
                    return message.channel.send({embeds:[embed]});
                }
            }
        }

        /**
         * ANTI SPAM
         */

        if (client.config.automod_settings.anti_spam.enabled){

            if (client.config.automod_settings.anti_spam.ignored_channels.includes(message.channel.id)) return
            if (client.config.automod_settings.anti_spam.ignored_users.includes(member.id)) return

            if (userMap.has(member.id)){
                const userData = userMap.get(member.id)
                const {lastMessage, timer} = userData;
                const difference = message.createdTimestamp - lastMessage.createdTimestamp;

                let msgCount = userData.msgCount;
                if (difference > DIFF){
                    clearTimeout(timer);
                    userData.msgCount = 1;
                    userData.lastMessage = message;
                    userData.TIMER = setTimeout(()=> {
                        userMap.delete(member.id);
                    }, ms(client.config.automod_settings.anti_spam.max_interval));
                    userMap.set(member.id, userData);
                }else {
                    ++msgCount;
                    if (parseInt(msgCount) == parseInt(client.config.automod_settings.anti_spam.message_threshold)){
                        message.delete();
                        let messageContent = (content.length > 100) ? content.substring(0, 100) : content;
                        console.log(chalk.blue(`[Glowstone] Logs » ${message.author.tag}: `), chalk.yellow(messageContent));
            
                        embed.setDescription(`<@${member.id}>, you've triggered Automod for Spam.\nYou're muted for ${ms(ms(client.config.automod_settings.anti_spam.punishment[0]))}`);
                        message.channel.send({embeds:[embed]});

                        return client.punish.mute(client, message, member, `AUTOMOD Spam`, client.config.automod_settings.anti_spam.punishment[0]);

                    }else{

                        userData.msgCount = msgCount;
                        userMap.set(member.id. userData);
                    }
                }
            }else{
                let fn = setTimeout(()=>{
                    userMap.delete(member.id);
                }, ms(client.config.automod_settings.anti_spam.max_interval));
                userMap.set(member.id, {
                    msgCount: 1,
                    lastMessage: message,
                    timer: fn
                });
            }

            if((`${content}`.match(/(<@!|<@&)/g) || []).length > client.config.automod_settings.anti_spam.mass_mention_limit ||
                onlyEmoji(content).length >= 10){

                    message.delete();
                    let messageContent = (content.length > 100) ? content.substring(0, 100) : content;
                    console.log(chalk.blue(`[Glowstone] Logs » ${message.author.tag}: `), chalk.yellow(messageContent));
                       
                    embed.setDescription(`<@${member.id}>, you've triggered Automod for Mass Mentions.\nYou're muted for ${ms(ms(client.config.automod_settings.anti_spam.punishment[0]))}`);
                    message.channel.send({embeds:[embed]});

                    return client.punish.mute(client, message, member, `AUTOMOD Mass-mentions`, client.config.automod_settings.anti_spam.punishment[0]);
            }
        }

        /**
         * IP CHECK
         */

        if (client.config.automod_settings.ip.enabled){

            if (client.config.automod_settings.ip.ignored_channels.includes(message.channel.id)) return
            if (client.config.automod_settings.ip.ignored_users.includes(member.id)) return

            if(ipRegex({includeBoundaries: true}).test(content)){

                message.delete();
                let messageContent = (content.length > 100) ? content.substring(0, 100) : content;
                console.log(chalk.blue(`[Glowstone] Logs » ${message.author.tag}: `), chalk.yellow(messageContent));

                if (client.config.automod_settings.ip.punishment[0] == "Mute"){

                    embed.setDescription(`<@${member.id}>, you've triggered Automod for Sending IP(s).\nYou're muted for ${ms(ms(client.config.automod_settings.ip.punishment[1]))}`);
                    message.channel.send({embeds:[embed]});

                    return client.punish.mute(client, message, member, `AUTOMOD Sending IP(s)`, client.config.automod_settings.ip.punishment[1]);

                }else if (client.config.automod_settings.ip.punishment[0] == "Ban"){

                    if (client.config.automod_settings.ip.punishment[1] == "permanent"){

                        embed.setDescription(`<@${member.id}>, you've triggered Automod for Sending IP(s).\nUser is now banned permanently!`);
                        message.channel.send({embeds:[embed]});

                        return client.punish.ban(client, message, member, `AUTOMOD Sending IP(s)`);
                    }
        
                    embed.setDescription(`<@${member.id}>, you've triggered Automod for Sending IP(s).\nUser is banned for ${ms(ms(client.config.automod_settings.ip.punishment[1]))}!`);
                    message.channel.send({embeds:[embed]});

                    return client.punish.tempban(client, message, member, `AUTOMOD Sending IP(s)`, client.config.automod_settings.ip.punishment[1])

                }else if (client.config.automod_settings.ip.punishment[0] == "Kick"){

                    embed.setDescription(`<@${member.id}>, you've triggered Automod for Sending IP(s).\n User kicked!\n`);
                    message.channel.send({embeds:[embed]});

                    return client.punish.kick(client, message, member, `AUTOMOD Sending IP(s)`);

                }else{
                    embed.setDescription(`<@${member.id}>, you've triggered Automod for Sending IP(s).`);
                    return message.channel.send({embeds:[embed]});
                }
            }
        }
    });

    client.on('guildMemberAdd', async (member)=>{

        if (client.anti_join.toggle){
            member.kick().then(() => {
                
                client.anti_join.list[member.user.id] = member.user.tag;
            }).catch((err)=> {console.log(err)});
            return
        }

        const difference = (Date.now()-member.user.createdTimestamp);

        if (!client.db.get('muted')) client.db.set('muted', {});
        let mutedJson = client.db.get('muted');
        let channel = member.guild.channels.cache.get(client.logs.log_channels_ids.mod_logs_id);

        if (difference < ms(client.config.automod_settings.min_age)){

            const embed = new Discord.MessageEmbed()
            .setColor(client.config.branding.embed_color)
            .setAuthor(client.config.branding.name, member.guild.iconURL({dynamic: true}))
            .setThumbnail(member.user.displayAvatarURL({dynamic:true}))
            .setDescription(`Sorry, you've been kicked for not meeting the minimin required age for your account.\n\n**Required-age: **\`${client.config.automod_settings.min_age}\`\n**Your account: ** \`${(moment.duration(difference, 'milliseconds').asDays()).toFixed(2)}\``)
            .setTimestamp()
            .setFooter(client.config.branding.ip); 

            member.kick().then(() => {

                console.log(chalk.blue(`[Glowstone] AUTOMOD »`), chalk.yellow(`${member.user.tag} doesn't meet the minimum age required!`));

                embed.setTitle(`📋 Logs`)
                .setDescription(`<@${member.user.id}> didn't meet the minimum age required to join!`)
                .setTimestamp()
                .setFooter(client.config.branding.ip);

                if (channel) return channel.send({embeds:[embed]});
            }).catch((err)=> {console.log(err)});
            return
        }

        if (Object.keys(mutedJson).includes(member.id)) {

            let role = member.guild.roles.cache.find(role => role.name === 'muted');
    
            let timePassed = Date.now() - mutedJson[member.id].date;
            let timeLeft = parseInt(mutedJson[member.id].duration - timePassed);
    
            if (timePassed > mutedJson[member.id].duration) {
                let newMutedJson = client.db.get('muted')
                delete newMutedJson[member.id]
                client.db.set('muted', newMutedJson)
    
            }else{

                const roleCache = member.roles.cache;

                if (!role) {
                    try {

                        let muterole = await member.guild.roles.create({ name: "muted", color: "#262626" });
                        member.guild.channels.cache.filter(c => c.type === 'GUILD_TEXT').forEach(async (channel, id) => {
                            await channel.permissionOverwrites.create(muterole, {
                                SEND_MESSAGES: false,
                                ADD_REACTIONS: false
                            })
                        });

                    } catch (error) {
                        return console.log(error)
                    }
                };
                let role2 = member.guild.roles.cache.find(role => role.name === 'muted');

                try{

                    await member.roles.remove(roleCache)
                    await member.roles.add(role2)

                    

                }catch (err){
                    console.log(chalk.red(`[Glowstone] Missing permission to mute a user! ${member.user.tag}`))
                    return console.log(err)
                }

                const logsEmbed = new Discord.MessageEmbed()
                .setColor(client.config.branding.embed_color)
                .setThumbnail(member.guild.iconURL({dynamic:true}))
                .setAuthor(client.config.branding.name, member.guild.iconURL({dynamic: true}))
                .setTimestamp()
                .setTitle(`📋 Logs`)
                .setFooter(client.config.branding.ip);

                let timeMuted = Date.now();

                mutedJson[member.id] = {date: timeMuted, duration: ms(ms(timeLeft)), moderator: client.user.id, moment: moment().format('MMM Do YYYY')};
                client.db.set('muted', mutedJson);

                logsEmbed.setDescription(
                    `__**Player muted**__\n
                    **Channel: **\`NONE\`\n**Moderator: **<@${client.user.id}>\n**User: **<@${member.user.id}>\n**Reason: ** \`Bypassing mute by leaving\`\n**Duration Left: ** \`${(ms(timeLeft))}\``
                );

                if (channel) channel.send({embeds:[logsEmbed]});

                setTimeout(async() => {
                    let newMutedJson = client.db.get('muted');

                    if (!newMutedJson[member.id]) return;

                    userRoles = []
                    roleCache.each(role => {
                        if (role.name != '@everyone') userRoles.push(role.id)
                    })

                    try{
                        
                        await member.roles.remove(role2);
                        userRoles.forEach(role => member.roles.add(role))
                    }catch (err){

                        if (err == "DiscordAPIError: Unknown Member") return
                    }
                
                    let day = mutedJson[member.id].moment;

                    let channel = member.guild.channels.cache.get(client.logs.log_channels_ids.mod_logs_id);

                    logsEmbed.setDescription(
                        `__**Player unmuted**__\n
                        **Channel: **\`NONE\`\n**Moderator: **<@${client.user.id}>\n**User: **<@${member.user.id}>\n**Reason: ** \`Mute duration completed\`\n**Date: ** \`${day}\``
                    );

                    if (channel) channel.send({embeds:[logsEmbed]});

                    delete newMutedJson[member.id];
                    client.db.set('muted', newMutedJson);
                    
                }, ms(ms(timeLeft)));
            }
        }
    });
}