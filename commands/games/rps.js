const { RockPaperScissors } = require("weky");

module.exports = {
    name: 'rps',
    description: 'Challenge a user to a game of rock paper scissors!',
    usage: 'rps <@user>',
    aliases: ['rockpaperscissors'],
    requiredRoles: [],
    requiredPerms: [],
    async execute(client, Discord, message, args){

        const opponent = message.mentions.users.first();

        if (!opponent) return message.reply("**You need to mention an opponet!**");
        if (opponent.id == message.author.id) return message.reply("**You can't play it with your self**");

        await RockPaperScissors({
            message: message,
            opponent: opponent,
            embed: {
                title: `🙋‍♂️ Rock Paper Scissors | ${client.config.branding.name}`,
                description: 'Press the button below to choose your element.',
                color: client.config.branding.embed_color,
                footer: client.config.branding.ip,
                timestamp: true
            },
            buttons: {
                rock: 'Rock',
                paper: 'Paper',
                scissors: 'Scissors',
                accept: 'Accept',
                deny: 'Deny',
            },
            time: 60000,
            acceptMessage:
                '<@{{challenger}}> has challenged <@{{opponent}}> for a game of Rock Paper and Scissors!',
            winMessage: 'GG, <@{{winner}}> won!',
            drawMessage: 'This game is deadlock!',
            endMessage: "<@{{opponent}}> didn't answer in time. So, I dropped the game!",
            timeEndMessage:
                "Both of you didn't pick something in time. So, I dropped the game!",
            cancelMessage:
                '<@{{opponent}}> refused to have a game of Rock Paper and Scissors with you!',
            choseMessage: 'You picked {{emoji}}',
            noChangeMessage: 'You cannot change your selection!',
            othersMessage: 'Only {{author}} can use the buttons!',
            returnWinner: false
        });
    }
}