const { QuickClick } = require("weky");

module.exports = {
    name: 'quickclick',
    description: 'First to click wins!',
    usage: 'quickclick',
    aliases: ['click'],
    requiredRoles: [],
    requiredPerms: [],
    async execute(client, Discord, message, args){

        await QuickClick({
            message: message,
            embed: {
                title: `👆 Quick Click | ${client.config.branding.name}`,
                color: client.config.branding.embed_color,
                footer: client.config.branding.ip,
                timestamp: true
            },
            time: 60000,
            waitMessage: 'The buttons may appear anytime now!',
            startMessage:
                'First person to press the correct button will win. You have **{{time}}**!',
            winMessage: 'GG, <@{{winner}}> pressed the button in **{{time}} seconds**.',
            loseMessage: 'No one pressed the button in time. So, I dropped the game!',
            emoji: '👆',
            ongoingMessage:
                "A game is already runnning in <#{{channel}}>. You can't start a new one!"
        });
    }
}