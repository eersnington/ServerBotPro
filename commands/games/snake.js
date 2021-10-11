const { Snake } = require("weky");

module.exports = {
    name: 'snake',
    description: 'Eat as much apples as you can',
    usage: 'snake',
    aliases: ['sss'],
    requiredRoles: [],
    requiredPerms: [],
    async execute(client, Discord, message, args){

        await Snake({
            message: message,
            embed: {
                title: `🐍 Snake | ${client.config.branding.name}`,
                description: 'GG, you scored **{{score}}** points!',
                color: client.config.branding.embed_color,
                footer: client.config.branding.ip,
                timestamp: true
            },
            emojis: {
                empty: '⬛',
                snakeBody: '🟩',
                food: '🍎',
                up: '⬆️',
                right: '⬅️',
                down: '⬇️',
                left: '➡️',
            },
            othersMessage: 'Only <@{{author}}> can use the buttons!',
            buttonText: 'Cancel'
        });
    }
}