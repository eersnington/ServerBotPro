const { Trivia } = require("weky");

module.exports = {
    name: 'trivia',
    description: 'Play a game of trivia',
    usage: 'trivia',
    aliases: [],
    requiredRoles: [],
    requiredPerms: [],
    async execute(client, Discord, message, args){

        await Trivia({
            message: message,
            embed: {
                title: `🧞‍♀️ Trivia | ${client.config.branding.name}`,
                description: 'You only have **{{time}}** to guess the answer!',
                color: client.config.branding.embed_color,
                footer: client.config.branding.ip,
                timestamp: true
            },
            difficulty: 'hard',
            thinkMessage: 'I am thinking',
            winMessage:
                'GG, It was **{{answer}}**. You gave the correct answer in **{{time}}**.',
            loseMessage: 'Better luck next time! The correct answer was **{{answer}}**.',
            emojis: {
                one: '1️⃣',
                two: '2️⃣',
                three: '3️⃣',
                four: '4️⃣',
            },
            othersMessage: 'Only <@{{author}}> can use the buttons!',
            returnWinner: false
        });
    }
}