const ms = require('ms');

module.exports = {
    name: 'giveaway-end',
    description: 'End a giveaway',
    usage: 'giveaway-end <message_id>',
    aliases: ['g-end', 'gend'],
    requiredRoles: [],
    requiredPerms: [],
    async execute(client, Discord, message, args){
        if(!args[0]) return message.channel.send('Please specify a message id')

        const messageID = args[0];
        client.giveawaysManager.end(messageID).then(() => {
            message.channel.send('Success! Giveaway ended!');
        }).catch((err) => {
            message.channel.send('No giveaway found for \`' + messageID + '\`, please check and try again');
        });
    }
}