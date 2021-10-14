const {MessageActionRow, MessageSelectMenu } = require('discord.js');
const fs = require('fs');

module.exports = {
    name: 'help',
    description: 'help command',
    usage: 'help [cmd]',
    aliases: ['commands'],
    args: 0,
    requiredRoles: [],
    requiredPerms: [],
    async execute(client, Discord, message, args){

        if (!args[0]) {
            let utilitiesCommands = []
            let utilitiesFolder = fs.readdirSync(`./commands/utilities`);
            utilitiesFolder.forEach(file => {
                fileName = String(file).split('.')[0]
                utilitiesCommands.push(`> **${client.config.bot.prefix}${fileName} ➜ ** ${client.commands.get(fileName).description}`)
            });

            let adminCommands = []
            let adminFolder = fs.readdirSync(`./commands/admin`);
            adminFolder.forEach(file => {
                fileName = String(file).split('.')[0]
                adminCommands.push(`> **${client.config.bot.prefix}${fileName} ➜ ** ${client.commands.get(fileName).description}`)
            });

            let staffCommands = []
            let staffFolder = fs.readdirSync(`./commands/staff`);
            staffFolder.forEach(file => {
                fileName = String(file).split('.')[0]
                staffCommands.push(`> **${client.config.bot.prefix}${fileName} ➜ ** ${client.commands.get(fileName).description}`)
            });

            let moderationCommands = []
            let moderationFolder = fs.readdirSync(`./commands/moderation`);
            moderationFolder.forEach(file => {
                fileName = String(file).split('.')[0]
                moderationCommands.push(`> **${client.config.bot.prefix}${fileName} ➜ ** ${client.commands.get(fileName).description}`)
            });

            let ticketCommands = []
            let ticketFolder = fs.readdirSync(`./commands/tickets`);
            ticketFolder.forEach(file => {
                fileName = String(file).split('.')[0]
                ticketCommands.push(`> **${client.config.bot.prefix}${fileName} ➜ ** ${client.commands.get(fileName).description}`)
            });
            
            let gamesCommands = []
            let gamesFolder = fs.readdirSync(`./commands/games`);
            gamesFolder.forEach(file => {
                fileName = String(file).split('.')[0]
                gamesCommands.push(`> **${client.config.bot.prefix}${fileName} ➜ ** ${client.commands.get(fileName).description}`)
            });

            let funCommands = []
            let funFolder = fs.readdirSync(`./commands/fun`);
            funFolder.forEach(file => {
                fileName = String(file).split('.')[0]
                funCommands.push(`> **${client.config.bot.prefix}${fileName} ➜ ** ${client.commands.get(fileName).description}`)
            });

            let communityCommands = []
            let communityFolder = fs.readdirSync(`./commands/community`);
            communityFolder.forEach(file => {
                fileName = String(file).split('.')[0]
                communityCommands.push(`> **${client.config.bot.prefix}${fileName} ➜ ** ${client.commands.get(fileName).description}`)
            });
            
            const noArguments = new Discord.MessageEmbed()
                .setAuthor(`Help Menu`, message.guild.iconURL({ dynamic: true }))
                .setDescription(`*Click on the button that corresponds to your command help needs!*
                \n🛠️ **» Utility Commands**\n🎪 **» Community Commands**\n🚫 **» Staff Commands**\n🚨 **» Admin Commands**\n
                **Note: ** *Some of these categories contain sub categories!*
                `)
                .setThumbnail(message.guild.iconURL())
                .setColor(client.config.branding.embed_color)
                .setTimestamp()
                .setFooter(client.config.branding.ip);

            const utilityEmbed = new Discord.MessageEmbed()
                .setAuthor(`🛠️  Utility Menu`, message.guild.iconURL({ dynamic: true }))
                .setDescription(`*List of utility commands!*
                \n${utilitiesCommands.join(`\n`)}
                \n**Note: ** *Type \`${client.config.bot.prefix}help [cmd]\` for command details*
                `)
                .setThumbnail(message.guild.iconURL())
                .setColor(client.config.branding.embed_color)
                .setTimestamp()
                .setFooter(client.config.branding.ip);
            
            const staffEmbed = new Discord.MessageEmbed()
                .setAuthor(`🚫  Staff Menu`, message.guild.iconURL({ dynamic: true }))
                .setDescription(`*List of staff commands!*
                \n🔨 **» Moderation Menu**\n🎟️ **» Tickets Menu**
                \n${staffCommands.join(`\n`)}
                \n**Note: ** *Type \`${client.config.bot.prefix}help [cmd]\` for command details*
                `)
                .setThumbnail(message.guild.iconURL())
                .setColor(client.config.branding.embed_color)
                .setTimestamp()
                .setFooter(client.config.branding.ip);

                const ticketEmbed = new Discord.MessageEmbed()
                .setAuthor(`🎟️ Tickets Menu`, message.guild.iconURL({ dynamic: true }))
                .setDescription(`*List of ticket commands!*
                \n${ticketCommands.join(`\n`)}
                \n**Note: ** *Type \`${client.config.bot.prefix}help [cmd]\` for command details*
                `)
                .setThumbnail(message.guild.iconURL())
                .setColor(client.config.branding.embed_color)
                .setTimestamp()
                .setFooter(client.config.branding.ip);

            const moderationEmbed = new Discord.MessageEmbed()
                .setAuthor(`🔨 Moderation Menu`, message.guild.iconURL({ dynamic: true }))
                .setDescription(`*List of moderation commands!*
                \n${moderationCommands.join(`\n`)}
                \n**Note: ** *Type \`${client.config.bot.prefix}help [cmd]\` for command details*
                `)
                .setThumbnail(message.guild.iconURL())
                .setColor(client.config.branding.embed_color)
                .setTimestamp()
                .setFooter(client.config.branding.ip);
                
            const adminEmbed = new Discord.MessageEmbed()
                .setAuthor(`🚨 Admin Menu`, message.guild.iconURL({ dynamic: true }))
                .setDescription(`*List of admin commands!*
                \n${adminCommands.join(`\n`)}
                \n**Note: ** *Type \`${client.config.bot.prefix}help [cmd]\` for command details*
                `)
                .setThumbnail(message.guild.iconURL())
                .setColor(client.config.branding.embed_color)
                .setTimestamp()
                .setFooter(client.config.branding.ip);
            
            const communityEmbed = new Discord.MessageEmbed()
                .setAuthor(`🎪 Community Menu`, message.guild.iconURL({ dynamic: true }))
                .setDescription(`*List of community commands!*
                \n🕹️ **» Game Commands**\n🌆 **» Image Commands**
                \n${communityCommands.join(`\n`)}
                \n**Note: ** *Type \`${client.config.bot.prefix}help [cmd]\` for command details*
                `)
                .setThumbnail(message.guild.iconURL())
                .setColor(client.config.branding.embed_color)
                .setTimestamp()
                .setFooter(client.config.branding.ip);

            const gamesEmbed = new Discord.MessageEmbed()
                .setAuthor(`🕹️ Games Menu`, message.guild.iconURL({ dynamic: true }))
                .setDescription(`*List of community commands!*
                \n${gamesCommands.join(`\n`)}
                \n**Note: ** *Type \`${client.config.bot.prefix}help [cmd]\` for command details*
                `)
                .setThumbnail(message.guild.iconURL())
                .setColor(client.config.branding.embed_color)
                .setTimestamp()
                .setFooter(client.config.branding.ip);
            
            const imagesEmbed = new Discord.MessageEmbed()
                .setAuthor(`🌆 Images Menu`, message.guild.iconURL({ dynamic: true }))
                .setDescription(`*List of image commands!*
                \n${funCommands.join(`\n`)}
                \n**Note: ** *Type \`${client.config.bot.prefix}help [cmd]\` for command details*
                `)
                .setThumbnail(message.guild.iconURL())
                .setColor(client.config.branding.embed_color)
                .setTimestamp()
                .setFooter(client.config.branding.ip);
            
            const row = new MessageActionRow().addComponents(
                new MessageSelectMenu()
                .setCustomId("help-menu")
                .setPlaceholder("Choose a category")
                .addOptions([
                    {
                        label:"Utility Commands",
                        value: "utility",
                        description: "General info and utility commands!",
                        emoji: "🛠️"
                    },{
                        label:"Community Commands",
                        value: "community",
                        description: "Fun and entertaining commands along with minigames!",
                        emoji: "🎪"
                    },{
                        label:"Staff Commands",
                        value: "staff",
                        description: "Staff utility to control server activity!",
                        emoji: "🚫"
                    },{
                        label:"Admin Commands",
                        value: "admin",
                        description: "Admin utility to oversee staff and members!",
                        emoji: "🚨"
                    }
                ])
            )

            const row2 = new MessageActionRow().addComponents(
                new MessageSelectMenu()
                .setCustomId("help-menu2")
                .setPlaceholder("Choose a sub-category")
                .addOptions([
                    {
                        label:"Image Command",
                        value: "image",
                        description: "Generate cool images!",
                        emoji: "🌆"
                    },{
                        label:"Game Commands",
                        value: "games",
                        description: "Fun minigames!",
                        emoji: "🕹️"
                    }
                ])
            )

            const row3 = new MessageActionRow().addComponents(
                new MessageSelectMenu()
                .setCustomId("help-menu4")
                .setPlaceholder("Choose a sub-category")
                .addOptions([
                    {
                        label:"Moderation",
                        value: "mod",
                        description: "Moderation commands to keep the server under control",
                        emoji: "🔨"
                    },{
                        label:"Tickets",
                        value: "ticket",
                        description: "Ticket commands to help staff manage tickets",
                        emoji: "🎟️"
                    }
                ])
            )

            const filter = (interaction) => interaction.isSelectMenu() && interaction.user.id === message.author.id;

            const collector = message.channel.createMessageComponentCollector({filter});

            collector.on("collect", async (collected) => {
                const value = collected.values[0];
                
                switch (value) {
                    case 'utility':
                        collected.message.edit({embeds: [utilityEmbed]})
                        break;
                    case 'community':
                        collected.message.edit({embeds: [communityEmbed], components: [row2]})
                        break;
                    case 'admin':
                        collected.message.edit({embeds: [adminEmbed]})
                        break;
                    case 'staff':
                        collected.message.edit({embeds: [staffEmbed], components: [row3]})
                        break;
                    case 'mod':
                        collected.message.edit({embeds: [moderationEmbed], components: [row]})
                        break;
                    case 'ticket':
                        collected.message.edit({embeds: [ticketEmbed], components: [row]});
                        break;
                    case 'image':
                        collected.message.edit({embeds: [imagesEmbed], components:[row]})
                        break;
                    case 'games':
                        collected.message.edit({embeds: [gamesEmbed], components: [row]})
                        break;
                    default:
                        console.log(`Invalid button!`);
                  }
            })

            return message.channel.send({ embeds: [noArguments], components: [row]});
        } else {
            const command = client.commands.get(args[0].toLowerCase()) || client.commands.find(command => command.aliases.includes(args[0]));
            if (command) {
                roles = []
                command.requiredRoles.forEach(role => {
                    roles.push(`<@&${role}>`)
                });
                const foundEmbed = new Discord.MessageEmbed()
                    .setAuthor(`Command Info » ${command.name}`, message.guild.iconURL({ dynamic: true }))
                    .setDescription(`**❯ Name:** \`${command.name}\`\n**❯ Aliases:** \`${command.aliases.join('\`, \` ') ? command.aliases : "No Aliases"}\`\n**❯ Usage:** \`${client.config.bot.prefix}${command.usage}\`\n**❯ Description:** \`${command.description}\`\n**❯ User Roles:** ${roles.join(', ') ? roles : "\`No Roles Required\`"}\n**❯ User Permissions:** \`${command.requiredPerms.join('\`, \` ') ? command.requiredPerms : "No User Permissions"}\`\n\n<> = Required | [] = Optional`)
                    .setColor(client.config.branding.embed_color)
                    message.channel.send({embeds: [foundEmbed]});
            }
        }
    }
}