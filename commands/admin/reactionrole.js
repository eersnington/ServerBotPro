onlyEmoji = require('emoji-aware').onlyEmoji;

module.exports = {
    name: 'reactionrole',
    description: 'Add/Delete a reaction role',
    usage: 'reactionrole <add/del/list> <message_id> <emoji> <role>',
    aliases: ['rr'],
    args: 1,
    requiredRoles: [],
    requiredPerms: [],
    async execute(client, Discord, message, args){

        const embed = new Discord.MessageEmbed()
        .setAuthor(`${message.guild.name} | Reaction Roles`, message.guild.iconURL({ dynamic: true }))
        .setThumbnail(message.guild.iconURL({ dynamic: true }))
        .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
        .setTimestamp()
        .setColor(client.config.branding.embed_color);

        if (args[0] === 'add'){

            if (isNaN(parseInt(args[1]))) return message.reply(`Please enter a valid message id`);

            const channels = message.guild.channels.cache;
            const role = message.mentions.roles.first();
            const emoji = args[2];

            let checkEmoji = emoji.replace(/[^:]/g, "").length;
            if (checkEmoji < 2 && onlyEmoji(emoji).length == 0) return message.reply(`Please enter a valid emoji`);

            if (!role) return message.reply(`Please mention a valid role`);

            let reactMessage;
            let i = 0;
            
            channels.each((channel) => {
                if (channel.type != 'GUILD_TEXT') channels.delete(channel.id);
            });

            let iteratingChannels = new Promise((resolve, reject) => {

                channels.each((channel) =>{

                    if (!reactMessage){
                        i++;
                        channel.messages.fetch(args[1])
                        .then((message) =>{

                            if (channel){
                                reactMessage = message;
                                resolve();
                            } 
                        }).catch(()=>{if (i == [...channels.keys()].length)resolve();});
                    }
                });
            });

            iteratingChannels.then(()=>{

                if (!reactMessage) return message.reply(`Please enter a valid message id (Message not found)`);
                client.reactionroleDB[args[1]] = {emoji: emoji, role: role.id};
                client.db.set("reactionrole", client.reactionroleDB);

                try {reactMessage.react(emoji)} catch (err) {message.reply(`I do not have access to that emoji ${emoji}`);}

                embed.setDescription(`✅ You have successfully **added** a new reaction role!\n\n> **❯ Emoji: ** ${emoji}\n> **❯ Role: ** ${role}\n> **❯ Message content: **\n> ${reactMessage.content.substring(0, 1000)}\n`);
                return message.channel.send({embeds:[embed]});
            });
            return

        }else if (args[0] == "del"){

            if (isNaN(parseInt(args[1]))) return message.reply(`Please enter a valid message id`);
            if (!client.reactionroleDB[args[1]]){
                embed.setDescription(`Couldn't find the specified reaction role \`${args[1]}\`\n(Please check for the correct message id in the reaction role list)`);
                return message.channel.send({embeds:[embed]});
            }

            delete client.reactionroleDB[args[1]];
            client.db.set("reactionrole", client.reactionroleDB);

            embed.setDescription(`❎ You have successfully **removed** the reaction role \`${args[1]}\``);
            return message.channel.send({embeds:[embed]});
        }else{

            let embed_description = `> Reaction roles allows you to add reactions to a message that members can react to to get or remove a role.\n\n**__List:__**\n`
            const rrList = client.reactionroleDB;

            Object.keys(rrList).forEach(id => {

                embed_description +=  `\n${rrList[id].emoji} <@&${rrList[id].role}> **❯❯ ID:** \`${id}\``
            });
            embed.setTitle("👆 Reaction Roles")
            .setDescription(embed_description);

            return message.channel.send({embeds:[embed]});
        }
    }
}