const backup = require("discord-backup");

module.exports = {
    name: 'create-backup',
    description: 'Create a discord backup',
    usage: 'create-backup',
    aliases: [],
    requiredRoles: [],
    requiredPerms: [],
    async execute(client, Discord, message, args){

        backup.create(message.guild).then((backupData) => {

            return message.channel.send('Backup created! Here is your ID: `'+backupData.id+'`! Use `'+client.config.bot.prefix+'load-backup '+backupData.id+'` to load the backup on another server!');
    
        }).catch(() => {
    
            return message.channel.send(':x: An error occurred, please check if the bot is administrator!');
    
        });

    }
}