const moment = require("moment");
const {MessageButton,MessageActionRow} = require('discord.js');

module.exports = {
    name: 'leaderboard',
    description: 'Top msgs and vc activity',
    usage: 'leaderboard',
    aliases: ['top'],
    args: 0,
    requiredRoles: [],
    requiredPerms: [],
    async execute(client, Discord, message, args){

        const userStats = client.db.get("stats");

        const embed = new Discord.MessageEmbed()
        .setTitle(`🏆 Leaderboard`)
        .setThumbnail("https://i.imgur.com/fgd9Dzk.png")
        .setColor(client.config.branding.embed_color)
        .setDescription(`List of top members in messages and voice channel activity!\n\n*Click on the buttons below to see the leaderboard statistics*`)
        .setFooter(client.config.branding.name, message.guild.iconURL({ dynamic: true }))
        .setTimestamp();

        const msgEmbed = new Discord.MessageEmbed()
        .setTitle(`💬 Messages | Leaderboard`)
        .setThumbnail("https://i.imgur.com/fgd9Dzk.png")
        .setColor(client.config.branding.embed_color)
        .setFooter(client.config.branding.name, message.guild.iconURL({ dynamic: true }))
        .setTimestamp();

        const vcEmbed = new Discord.MessageEmbed()
        .setTitle(`🎙️ Voice Chat | Leaderboard`)
        .setThumbnail("https://i.imgur.com/fgd9Dzk.png")
        .setColor(client.config.branding.embed_color)
        .setFooter(client.config.branding.name, message.guild.iconURL({ dynamic: true }))
        .setTimestamp();

        if (Object.keys(userStats).length  == 0) return message.channel.send({embeds:[embed]});

        let messageCounts = [];
        let vcCounts = [];

        Object.keys(userStats).forEach((id) => {

            messageCounts.push([userStats[id].tag, userStats[id].messageCount]);
            vcCounts.push([userStats[id].tag, userStats[id].voiceChatCount]);
        });

        messageCounts.sort((a, b)=>{
            return b[1] - a[1];
        });

        vcCounts.sort((a, b)=>{
            return b[1] - a[1];
        });

        let msgCount = 1;
        let vcCount = 1;

        msgEmbedDesc = `**Top Message Activity**\n`
        messageCounts.slice(0, 25).forEach((array)=>{msgEmbedDesc = msgEmbedDesc  + `\n**#${msgCount++} ${array[0]} »** ${array[1]}`})
        msgEmbed.setDescription(msgEmbedDesc);

        vcEmbedDesc = `**Top Voice Chat Activity**\n`
        vcCounts.slice(0, 25).forEach((array)=>{vcEmbedDesc = vcEmbedDesc  + `\n**#${vcCount++} ${array[0]} »** \`${moment.duration(array[1]).format(" H [hrs], m [mins], s [secs]")}\``})
        vcEmbed.setDescription(vcEmbedDesc);

        const row = new MessageActionRow()
        .addComponents(
            new MessageButton()
            .setCustomId('message-top')
            .setLabel('💬 Messages')
            .setStyle('SECONDARY'),
        ).addComponents(
            new MessageButton()
            .setCustomId('voice-top')
            .setLabel('🎙️ Voice Chat')
            .setStyle('SECONDARY'),
        );

        message.channel.send({embeds:[embed], components: [row]}).then(async embed => {

            const buttonFilter = (interaction) => interaction.user.id == message.author.id;
            const collector = message.channel.createMessageComponentCollector({buttonFilter, max:2});

            collector.on("collect", async (interaction)=>{

                interaction.deferUpdate();
                if (interaction.customId === 'message-top' && interaction.message.id == embed.id) embed.edit({embeds: [msgEmbed]});
                if (interaction.customId === 'voice-top' && interaction.message.id == embed.id) embed.edit({embeds: [vcEmbed]});
            });
        });
    }
}