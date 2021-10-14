module.exports = {
    name: 'giveaway-reroll',
    description: 'Reroll a giveaway',
    usage: 'giveaway-refoll <message_id>',
    aliases: ['g-reroll', 'greroll'],
    args: 1,
    requiredRoles: [],
    requiredPerms: [],
    async execute(client, Discord, message, args){
        if(!args[0]) return message.channel.send('Please specify a message id')

        const messageID = args[0];
        client.giveawaysManager.reroll(messageID).then(() => {
            message.channel.send('Success! Giveaway rerolled!');
        }).catch((err) => {
            message.channel.send('No giveaway found for \`' + messageID + '\`, please check and try again');
        });
    }
}