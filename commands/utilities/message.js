
module.exports = {
    name: 'message',
    description: 'Send a message through the bot',
    usage: 'message <text>',
    aliases: ['sudo', 'announce'],
    args: 1,
    requiredRoles: [],
    requiredPerms: [],
    async execute(client, Discord, message, args){

        let messageArgs = args.join(' ');

        message.channel.send({content: messageArgs}).then(()=>{
            message.delete()
        })

    }
}