const { Calculator } = require("weky");

module.exports = {
    name: 'calculator',
    description: 'Opens up a calculator',
    usage: 'calculator',
    aliases: ['calc'],
    requiredRoles: [],
    requiredPerms: [],
    async execute(client, Discord, message, args){

        await Calculator({
            message: message,
            embed: {
                title: `📱 Calculator | ${client.config.branding.name}`,
                color: client.config.branding.embed_color,
                footer: client.config.branding.ip,
                timestamp: true
            },
            disabledQuery: 'Calculator is disabled!',
            invalidQuery: 'The provided equation is invalid!',
            othersMessage: 'Only <@{{author}}> can use the buttons!'
        });  
    }
}
