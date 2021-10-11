  
const Discord = require('discord.js');


class TicTacToe {
    constructor() {
        this.gameEmbed = null
    }

    startGame(msg) {

        let opponent = msg.mentions.users.first();
        if (!opponent) return msg.channel.send(`**Who do you wanna play TicTacToe with?(you have to tag the person you want to play with after the command.)**`)

        this.gameAuthor = msg.author
        this.gameOpp = opponent

        let board = [
            ["⚪", "⚪", "⚪", "⚫", "⚪", "⚪", "⚪", "⚫", "⚪", "⚪", "⚪"],
            ["⚪", "1️⃣", "⚪", "⚫", "⚪", "2️⃣", "⚪", "⚫", "⚪", "3️⃣", "⚪"],
            ["⚪", "⚪", "⚪", "⚫", "⚪", "⚪", "⚪", "⚫", "⚪", "⚪", "⚪"],
            ["⚫", "⚫", "⚫", "⚫", "⚫", "⚫", "⚫", "⚫", "⚫", "⚫", "⚫"],
            ["⚪", "⚪", "⚪", "⚫", "⚪", "⚪", "⚪", "⚫", "⚪", "⚪", "⚪"],
            ["⚪", "4️⃣", "⚪", "⚫", "⚪", "5️⃣", "⚪", "⚫", "⚪", "6️⃣", "⚪"],
            ["⚪", "⚪", "⚪", "⚫", "⚪", "⚪", "⚪", "⚫", "⚪", "⚪", "⚪"],
            ["⚫", "⚫", "⚫", "⚫", "⚫", "⚫", "⚫", "⚫", "⚫", "⚫", "⚫"],
            ["⚪", "⚪", "⚪", "⚫", "⚪", "⚪", "⚪", "⚫", "⚪", "⚪", "⚪"],
            ["⚪", "7️⃣", "⚪", "⚫", "⚪", "8️⃣", "⚪", "⚫", "⚪", "9️⃣", "⚪"],
            ["⚪", "⚪", "⚪", "⚫", "⚪", "⚪", "⚪", "⚫", "⚪", "⚪", "⚪"],
        ];

        let renderBoard = (board) => {
            let tempString = "";
            for (let boardSection of board) {
                tempString += `${boardSection.join("")}\n`;
            }
            return tempString;
        }

        const initialState = renderBoard(board);

        let embed = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setTitle(`❌ - it's your turn ${msg.author.username}!`)
            .setDescription(initialState)
            .setFooter(`${msg.author.username} vs ${opponent.username}`)
        msg.channel.send({ embeds: [embed] }).then(emsg => {
            this.gameAuthor = msg.author
            this.gameEmbed = emsg;
            this.gameEmbed.react('1️⃣');
            this.gameEmbed.react('2️⃣');
            this.gameEmbed.react('3️⃣');
            this.gameEmbed.react('4️⃣');
            this.gameEmbed.react('5️⃣');
            this.gameEmbed.react('6️⃣');
            this.gameEmbed.react('7️⃣');
            this.gameEmbed.react('8️⃣');
            this.gameEmbed.react('9️⃣');

            const filter = (reaction, user) => ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣'].includes(reaction.emoji.name) && (user.id === this.gameAuthor.id || user.id === this.gameOpp.id)

            const gameCollector = this.gameEmbed.createReactionCollector({ filter: filter });

            const gameData = [
                { member: this.gameAuthor, playerColor: "❌" },
                { member: this.gameOpp, playerColor: "🔵" }
            ]

            let player = 0;

            gameCollector.on("collect", async (reaction, user) => {

                reaction.message.reactions.cache.get(reaction.emoji.name).users.remove(user.id);

                if (user.id === gameData[player].member.id) {

                    reaction.message.reactions.cache.get(reaction.emoji.name).remove();

                    switch (reaction.emoji.name) {

                        case "1️⃣":
                            board[0][0] = gameData[player].playerColor
                            board[0][1] = gameData[player].playerColor
                            board[0][2] = gameData[player].playerColor
                            board[1][0] = gameData[player].playerColor
                            board[1][1] = gameData[player].playerColor
                            board[1][2] = gameData[player].playerColor
                            board[2][0] = gameData[player].playerColor
                            board[2][1] = gameData[player].playerColor
                            board[2][2] = gameData[player].playerColor
                            break;
                        case "2️⃣":
                            board[0][4] = gameData[player].playerColor
                            board[0][5] = gameData[player].playerColor
                            board[0][6] = gameData[player].playerColor
                            board[1][4] = gameData[player].playerColor
                            board[1][5] = gameData[player].playerColor
                            board[1][6] = gameData[player].playerColor
                            board[2][4] = gameData[player].playerColor
                            board[2][5] = gameData[player].playerColor
                            board[2][6] = gameData[player].playerColor
                            break;
                        case "3️⃣":
                            board[0][8] = gameData[player].playerColor
                            board[0][9] = gameData[player].playerColor
                            board[0][10] = gameData[player].playerColor
                            board[1][8] = gameData[player].playerColor
                            board[1][9] = gameData[player].playerColor
                            board[1][10] = gameData[player].playerColor
                            board[2][8] = gameData[player].playerColor
                            board[2][9] = gameData[player].playerColor
                            board[2][10] = gameData[player].playerColor
                            break;
                        case "4️⃣":
                            board[4][0] = gameData[player].playerColor
                            board[4][1] = gameData[player].playerColor
                            board[4][2] = gameData[player].playerColor
                            board[5][0] = gameData[player].playerColor
                            board[5][1] = gameData[player].playerColor
                            board[5][2] = gameData[player].playerColor
                            board[6][0] = gameData[player].playerColor
                            board[6][1] = gameData[player].playerColor
                            board[6][2] = gameData[player].playerColor
                            break;
                        case "5️⃣":
                            board[4][4] = gameData[player].playerColor
                            board[4][5] = gameData[player].playerColor
                            board[4][6] = gameData[player].playerColor
                            board[5][4] = gameData[player].playerColor
                            board[5][5] = gameData[player].playerColor
                            board[5][6] = gameData[player].playerColor
                            board[6][4] = gameData[player].playerColor
                            board[6][5] = gameData[player].playerColor
                            board[6][6] = gameData[player].playerColor
                            break;
                        case "6️⃣":
                            board[4][8] = gameData[player].playerColor
                            board[4][9] = gameData[player].playerColor
                            board[4][10] = gameData[player].playerColor
                            board[5][8] = gameData[player].playerColor
                            board[5][9] = gameData[player].playerColor
                            board[5][10] = gameData[player].playerColor
                            board[6][8] = gameData[player].playerColor
                            board[6][9] = gameData[player].playerColor
                            board[6][10] = gameData[player].playerColor
                            break;
                        case "7️⃣":
                            board[8][0] = gameData[player].playerColor
                            board[8][1] = gameData[player].playerColor
                            board[8][2] = gameData[player].playerColor
                            board[9][0] = gameData[player].playerColor
                            board[9][1] = gameData[player].playerColor
                            board[9][2] = gameData[player].playerColor
                            board[10][0] = gameData[player].playerColor
                            board[10][1] = gameData[player].playerColor
                            board[10][2] = gameData[player].playerColor
                            break;
                        case "8️⃣":
                            board[8][4] = gameData[player].playerColor
                            board[8][5] = gameData[player].playerColor
                            board[8][6] = gameData[player].playerColor
                            board[9][4] = gameData[player].playerColor
                            board[9][5] = gameData[player].playerColor
                            board[9][6] = gameData[player].playerColor
                            board[10][4] = gameData[player].playerColor
                            board[10][5] = gameData[player].playerColor
                            board[10][6] = gameData[player].playerColor
                            break;
                        case "9️⃣":
                            board[8][8] = gameData[player].playerColor
                            board[8][9] = gameData[player].playerColor
                            board[8][10] = gameData[player].playerColor
                            board[9][8] = gameData[player].playerColor
                            board[9][9] = gameData[player].playerColor
                            board[9][10] = gameData[player].playerColor
                            board[10][8] = gameData[player].playerColor
                            board[10][9] = gameData[player].playerColor
                            board[10][10] = gameData[player].playerColor
                            break;
                    }

                    if (board[0][0] === gameData[player].playerColor &&
                        board[0][1] === gameData[player].playerColor &&
                        board[0][2] === gameData[player].playerColor &&
                        board[1][0] === gameData[player].playerColor &&
                        board[1][1] === gameData[player].playerColor &&
                        board[1][2] === gameData[player].playerColor &&
                        board[2][0] === gameData[player].playerColor &&
                        board[2][1] === gameData[player].playerColor &&
                        board[2][2] === gameData[player].playerColor &&

                        board[0][4] === gameData[player].playerColor &&
                        board[0][5] === gameData[player].playerColor &&
                        board[0][6] === gameData[player].playerColor &&
                        board[1][4] === gameData[player].playerColor &&
                        board[1][5] === gameData[player].playerColor &&
                        board[1][6] === gameData[player].playerColor &&
                        board[2][4] === gameData[player].playerColor &&
                        board[2][5] === gameData[player].playerColor &&
                        board[2][6] === gameData[player].playerColor &&

                        board[0][8] === gameData[player].playerColor &&
                        board[0][9] === gameData[player].playerColor &&
                        board[0][10] === gameData[player].playerColor &&
                        board[1][8] === gameData[player].playerColor &&
                        board[1][9] === gameData[player].playerColor &&
                        board[1][10] === gameData[player].playerColor &&
                        board[2][8] === gameData[player].playerColor &&
                        board[2][9] === gameData[player].playerColor &&
                        board[2][10] === gameData[player].playerColor) {
                        this.gameEmbed.reactions.removeAll()

                        const WinEmbed = new Discord.MessageEmbed()
                            .setTitle(`${gameData[player].member.username} has won the game!`)
                            .setDescription(renderBoard(board))
                            .setFooter(`${msg.author.username} vs ${opponent.username}`)
                        gameCollector.stop(`${gameData[player].member.id} won`)
                        return this.gameEmbed.edit({ embeds: [WinEmbed] })
                    }

                    if (board[4][0] === gameData[player].playerColor &&
                        board[4][1] === gameData[player].playerColor &&
                        board[4][2] === gameData[player].playerColor &&
                        board[5][0] === gameData[player].playerColor &&
                        board[5][1] === gameData[player].playerColor &&
                        board[5][2] === gameData[player].playerColor &&
                        board[6][0] === gameData[player].playerColor &&
                        board[6][1] === gameData[player].playerColor &&
                        board[6][2] === gameData[player].playerColor &&

                        board[4][4] === gameData[player].playerColor &&
                        board[4][5] === gameData[player].playerColor &&
                        board[4][6] === gameData[player].playerColor &&
                        board[5][4] === gameData[player].playerColor &&
                        board[5][5] === gameData[player].playerColor &&
                        board[5][6] === gameData[player].playerColor &&
                        board[6][4] === gameData[player].playerColor &&
                        board[6][5] === gameData[player].playerColor &&
                        board[6][6] === gameData[player].playerColor &&

                        board[4][8] === gameData[player].playerColor &&
                        board[4][9] === gameData[player].playerColor &&
                        board[4][10] === gameData[player].playerColor &&
                        board[5][8] === gameData[player].playerColor &&
                        board[5][9] === gameData[player].playerColor &&
                        board[5][10] === gameData[player].playerColor &&
                        board[6][8] === gameData[player].playerColor &&
                        board[6][9] === gameData[player].playerColor &&
                        board[6][10] === gameData[player].playerColor) {

                        this.gameEmbed.reactions.removeAll()
                        const WinEmbed = new Discord.MessageEmbed()
                            .setTitle(`${gameData[player].member.username} has won the game!`)
                            .setDescription(renderBoard(board))
                            .setFooter(`${msg.author.username} vs ${opponent.username}`)
                        gameCollector.stop(`${gameData[player].member.id} won`)
                        return this.gameEmbed.edit({ embeds: [WinEmbed] })

                    }

                    if (board[8][0] === gameData[player].playerColor &&
                        board[8][1] === gameData[player].playerColor &&
                        board[8][2] === gameData[player].playerColor &&
                        board[9][0] === gameData[player].playerColor &&
                        board[9][1] === gameData[player].playerColor &&
                        board[9][2] === gameData[player].playerColor &&
                        board[10][0] === gameData[player].playerColor &&
                        board[10][1] === gameData[player].playerColor &&
                        board[10][2] === gameData[player].playerColor &&

                        board[8][4] === gameData[player].playerColor &&
                        board[8][5] === gameData[player].playerColor &&
                        board[8][6] === gameData[player].playerColor &&
                        board[9][4] === gameData[player].playerColor &&
                        board[9][5] === gameData[player].playerColor &&
                        board[9][6] === gameData[player].playerColor &&
                        board[10][4] === gameData[player].playerColor &&
                        board[10][5] === gameData[player].playerColor &&
                        board[10][6] === gameData[player].playerColor &&

                        board[8][8] === gameData[player].playerColor &&
                        board[8][9] === gameData[player].playerColor &&
                        board[8][10] === gameData[player].playerColor &&
                        board[9][8] === gameData[player].playerColor &&
                        board[9][9] === gameData[player].playerColor &&
                        board[9][10] === gameData[player].playerColor &&
                        board[10][8] === gameData[player].playerColor &&
                        board[10][9] === gameData[player].playerColor &&
                        board[10][10] === gameData[player].playerColor) {

                        this.gameEmbed.reactions.removeAll()
                        const WinEmbed = new Discord.MessageEmbed()
                            .setTitle(`${gameData[player].member.username} has won the game!`)
                            .setDescription(renderBoard(board))
                            .setFooter(`${msg.author.username} vs ${opponent.username}`)
                        gameCollector.stop(`${gameData[player].member.id} won`);
                        return this.gameEmbed.edit({ embeds: [WinEmbed] })

                    }

                    if (board[0][0] === gameData[player].playerColor &&
                        board[0][1] === gameData[player].playerColor &&
                        board[0][2] === gameData[player].playerColor &&
                        board[1][0] === gameData[player].playerColor &&
                        board[1][1] === gameData[player].playerColor &&
                        board[1][2] === gameData[player].playerColor &&
                        board[2][0] === gameData[player].playerColor &&
                        board[2][1] === gameData[player].playerColor &&
                        board[2][2] === gameData[player].playerColor &&
                        board[4][0] === gameData[player].playerColor &&
                        board[4][1] === gameData[player].playerColor &&
                        board[4][2] === gameData[player].playerColor &&
                        board[5][0] === gameData[player].playerColor &&
                        board[5][1] === gameData[player].playerColor &&
                        board[5][2] === gameData[player].playerColor &&
                        board[6][0] === gameData[player].playerColor &&
                        board[6][1] === gameData[player].playerColor &&
                        board[6][2] === gameData[player].playerColor &&
                        board[8][0] === gameData[player].playerColor &&
                        board[8][1] === gameData[player].playerColor &&
                        board[8][2] === gameData[player].playerColor &&
                        board[9][0] === gameData[player].playerColor &&
                        board[9][1] === gameData[player].playerColor &&
                        board[9][2] === gameData[player].playerColor &&
                        board[10][0] === gameData[player].playerColor &&
                        board[10][1] === gameData[player].playerColor &&
                        board[10][2] === gameData[player].playerColor) {

                        this.gameEmbed.reactions.removeAll()
                        const WinEmbed = new Discord.MessageEmbed()
                            .setTitle(`${gameData[player].member.username} has won the game!`)
                            .setDescription(renderBoard(board))
                            .setFooter(`${msg.author.username} vs ${opponent.username}`)
                        gameCollector.stop(`${gameData[player].member.id} won`);
                        return this.gameEmbed.edit({ embeds: [WinEmbed] })

                    }

                    if (board[0][4] === gameData[player].playerColor &&
                        board[0][5] === gameData[player].playerColor &&
                        board[0][6] === gameData[player].playerColor &&
                        board[1][4] === gameData[player].playerColor &&
                        board[1][5] === gameData[player].playerColor &&
                        board[1][6] === gameData[player].playerColor &&
                        board[2][4] === gameData[player].playerColor &&
                        board[2][5] === gameData[player].playerColor &&
                        board[2][6] === gameData[player].playerColor &&
                        board[4][4] === gameData[player].playerColor &&
                        board[4][5] === gameData[player].playerColor &&
                        board[4][6] === gameData[player].playerColor &&
                        board[5][4] === gameData[player].playerColor &&
                        board[5][5] === gameData[player].playerColor &&
                        board[5][6] === gameData[player].playerColor &&
                        board[6][4] === gameData[player].playerColor &&
                        board[6][5] === gameData[player].playerColor &&
                        board[6][6] === gameData[player].playerColor &&
                        board[8][4] === gameData[player].playerColor &&
                        board[8][5] === gameData[player].playerColor &&
                        board[8][6] === gameData[player].playerColor &&
                        board[9][4] === gameData[player].playerColor &&
                        board[9][5] === gameData[player].playerColor &&
                        board[9][6] === gameData[player].playerColor &&
                        board[10][4] === gameData[player].playerColor &&
                        board[10][5] === gameData[player].playerColor &&
                        board[10][6] === gameData[player].playerColor) {

                        this.gameEmbed.reactions.removeAll()
                        const WinEmbed = new Discord.MessageEmbed()
                            .setTitle(`${gameData[player].member.username} has won the game!`)
                            .setDescription(renderBoard(board))
                            .setFooter(`${msg.author.username} vs ${opponent.username}`)
                        gameCollector.stop(`${gameData[player].member.id} won`);
                        return this.gameEmbed.edit({ embeds: [WinEmbed] })

                    }

                    if (board[0][8] === gameData[player].playerColor &&
                        board[0][9] === gameData[player].playerColor &&
                        board[0][10] === gameData[player].playerColor &&
                        board[1][8] === gameData[player].playerColor &&
                        board[1][9] === gameData[player].playerColor &&
                        board[1][10] === gameData[player].playerColor &&
                        board[2][8] === gameData[player].playerColor &&
                        board[2][9] === gameData[player].playerColor &&
                        board[2][10] === gameData[player].playerColor &&
                        board[4][8] === gameData[player].playerColor &&
                        board[4][9] === gameData[player].playerColor &&
                        board[4][10] === gameData[player].playerColor &&
                        board[5][8] === gameData[player].playerColor &&
                        board[5][9] === gameData[player].playerColor &&
                        board[5][10] === gameData[player].playerColor &&
                        board[6][8] === gameData[player].playerColor &&
                        board[6][9] === gameData[player].playerColor &&
                        board[6][10] === gameData[player].playerColor &&
                        board[8][8] === gameData[player].playerColor &&
                        board[8][9] === gameData[player].playerColor &&
                        board[8][10] === gameData[player].playerColor &&
                        board[9][8] === gameData[player].playerColor &&
                        board[9][9] === gameData[player].playerColor &&
                        board[9][10] === gameData[player].playerColor &&
                        board[10][8] === gameData[player].playerColor &&
                        board[10][9] === gameData[player].playerColor &&
                        board[10][10] === gameData[player].playerColor) {

                        this.gameEmbed.reactions.removeAll()
                        const WinEmbed = new Discord.MessageEmbed()
                            .setTitle(`${gameData[player].member.username} has won the game!`)
                            .setDescription(renderBoard(board))
                            .setFooter(`${msg.author.username} vs ${opponent.username}`)
                        gameCollector.stop(`${gameData[player].member.id} won`);
                        return this.gameEmbed.edit({ embeds: [WinEmbed] })

                    }

                    if (board[0][0] === gameData[player].playerColor &&
                        board[0][1] === gameData[player].playerColor &&
                        board[0][2] === gameData[player].playerColor &&
                        board[1][0] === gameData[player].playerColor &&
                        board[1][1] === gameData[player].playerColor &&
                        board[1][2] === gameData[player].playerColor &&
                        board[2][0] === gameData[player].playerColor &&
                        board[2][1] === gameData[player].playerColor &&
                        board[2][2] === gameData[player].playerColor &&
                        board[4][4] === gameData[player].playerColor &&
                        board[4][5] === gameData[player].playerColor &&
                        board[4][6] === gameData[player].playerColor &&
                        board[5][4] === gameData[player].playerColor &&
                        board[5][5] === gameData[player].playerColor &&
                        board[5][6] === gameData[player].playerColor &&
                        board[6][4] === gameData[player].playerColor &&
                        board[6][5] === gameData[player].playerColor &&
                        board[6][6] === gameData[player].playerColor &&
                        board[8][8] === gameData[player].playerColor &&
                        board[8][9] === gameData[player].playerColor &&
                        board[8][10] === gameData[player].playerColor &&
                        board[9][8] === gameData[player].playerColor &&
                        board[9][9] === gameData[player].playerColor &&
                        board[9][10] === gameData[player].playerColor &&
                        board[10][8] === gameData[player].playerColor &&
                        board[10][9] === gameData[player].playerColor &&
                        board[10][10] === gameData[player].playerColor) {

                        this.gameEmbed.reactions.removeAll()
                        const WinEmbed = new Discord.MessageEmbed()
                            .setTitle(`${gameData[player].member.username} has won the game!`)
                            .setDescription(renderBoard(board))
                            .setFooter(`${msg.author.username} vs ${opponent.username}`)
                        gameCollector.stop(`${gameData[player].member.id} won`);
                        return this.gameEmbed.edit({ embeds: [WinEmbed] })

                    }

                    if (board[0][8] === gameData[player].playerColor &&
                        board[0][9] === gameData[player].playerColor &&
                        board[0][10] === gameData[player].playerColor &&
                        board[1][8] === gameData[player].playerColor &&
                        board[1][9] === gameData[player].playerColor &&
                        board[1][10] === gameData[player].playerColor &&
                        board[2][8] === gameData[player].playerColor &&
                        board[2][9] === gameData[player].playerColor &&
                        board[2][10] === gameData[player].playerColor &&
                        board[4][4] === gameData[player].playerColor &&
                        board[4][5] === gameData[player].playerColor &&
                        board[4][6] === gameData[player].playerColor &&
                        board[5][4] === gameData[player].playerColor &&
                        board[5][5] === gameData[player].playerColor &&
                        board[5][6] === gameData[player].playerColor &&
                        board[6][4] === gameData[player].playerColor &&
                        board[6][5] === gameData[player].playerColor &&
                        board[6][6] === gameData[player].playerColor &&
                        board[8][0] === gameData[player].playerColor &&
                        board[8][1] === gameData[player].playerColor &&
                        board[8][2] === gameData[player].playerColor &&
                        board[9][0] === gameData[player].playerColor &&
                        board[9][1] === gameData[player].playerColor &&
                        board[9][2] === gameData[player].playerColor &&
                        board[10][0] === gameData[player].playerColor &&
                        board[10][1] === gameData[player].playerColor &&
                        board[10][2] === gameData[player].playerColor) {

                        this.gameEmbed.reactions.removeAll()
                        const WinEmbed = new Discord.MessageEmbed()
                            .setTitle(`${gameData[player].member.username} has won the game!`)
                            .setDescription(renderBoard(board))
                            .setFooter(`${msg.author.username} vs ${opponent.username}`)
                        gameCollector.stop(`${gameData[player].member.id} won`);
                        return this.gameEmbed.edit({ embeds: [WinEmbed] })

                    }

                    if (board[0][0] !== '⚪' &&
                        board[0][1] !== '⚪' &&
                        board[0][2] !== '⚪' &&
                        board[1][0] !== '⚪' &&
                        board[1][1] !== '1️⃣' &&
                        board[1][2] !== '⚪' &&
                        board[2][0] !== '⚪' &&
                        board[2][1] !== '⚪' &&
                        board[2][2] !== '⚪' &&

                        board[0][4] !== '⚪' &&
                        board[0][5] !== '⚪' &&
                        board[0][6] !== '⚪' &&
                        board[1][4] !== '⚪' &&
                        board[1][5] !== '2️⃣' &&
                        board[1][6] !== '⚪' &&
                        board[2][4] !== '⚪' &&
                        board[2][5] !== '⚪' &&
                        board[2][6] !== '⚪' &&

                        board[0][8] !== '⚪' &&
                        board[0][9] !== '⚪' &&
                        board[0][10] !== '⚪' &&
                        board[1][8] !== '⚪' &&
                        board[1][9] !== '3️⃣' &&
                        board[1][10] !== '⚪' &&
                        board[2][8] !== '⚪' &&
                        board[2][9] !== '⚪' &&
                        board[2][10] !== '⚪' &&

                        board[4][0] !== '⚪' &&
                        board[4][1] !== '⚪' &&
                        board[4][2] !== '⚪' &&
                        board[5][0] !== '⚪' &&
                        board[5][1] !== '4️⃣' &&
                        board[5][2] !== '⚪' &&
                        board[6][0] !== '⚪' &&
                        board[6][1] !== '⚪' &&
                        board[6][2] !== '⚪' &&

                        board[4][4] !== '⚪' &&
                        board[4][5] !== '⚪' &&
                        board[4][6] !== '⚪' &&
                        board[5][4] !== '⚪' &&
                        board[5][5] !== '5️⃣' &&
                        board[5][6] !== '⚪' &&
                        board[6][4] !== '⚪' &&
                        board[6][5] !== '⚪' &&
                        board[6][6] !== '⚪' &&

                        board[4][8] !== '⚪' &&
                        board[4][9] !== '⚪' &&
                        board[4][10] !== '⚪' &&
                        board[5][8] !== '⚪' &&
                        board[5][9] !== '6️⃣' &&
                        board[5][10] !== '⚪' &&
                        board[6][8] !== '⚪' &&
                        board[6][9] !== '⚪' &&
                        board[6][10] !== '⚪' &&

                        board[8][0] !== '⚪' &&
                        board[8][1] !== '⚪' &&
                        board[8][2] !== '⚪' &&
                        board[9][0] !== '⚪' &&
                        board[9][1] !== '7️⃣' &&
                        board[9][2] !== '⚪' &&
                        board[10][0] !== '⚪' &&
                        board[10][1] !== '⚪' &&
                        board[10][2] !== '⚪' &&

                        board[8][4] !== '⚪' &&
                        board[8][5] !== '⚪' &&
                        board[8][6] !== '⚪' &&
                        board[9][4] !== '⚪' &&
                        board[9][5] !== '8️⃣' &&
                        board[9][6] !== '⚪' &&
                        board[10][4] !== '⚪' &&
                        board[10][5] !== '⚪' &&
                        board[10][6] !== '⚪' &&

                        board[8][8] !== '⚪' &&
                        board[8][9] !== '⚪' &&
                        board[8][10] !== '⚪' &&
                        board[9][8] !== '⚪' &&
                        board[9][9] !== '9️⃣' &&
                        board[9][10] !== '⚪' &&
                        board[10][8] !== '⚪' &&
                        board[10][9] !== '⚪' &&
                        board[10][10] !== '⚪') {

                        this.gameEmbed.reactions.removeAll()
                        const WinEmbed = new Discord.MessageEmbed()
                            .setTitle(`Draw! Nobody won`)
                            .setDescription(renderBoard(board))
                            .setFooter(`${msg.author.username} vs ${opponent.username}`)
                        gameCollector.stop(`${gameData[player].member.id} won`);
                        return this.gameEmbed.edit({ embeds: [WinEmbed] })

                    }

                    player = (player + 1) % 2;

                    const newEmbed = new Discord.MessageEmbed()
                        .setTitle(`${gameData[player].playerColor} - It's your turn, ${gameData[player].member.username}!`)
                        .setDescription(renderBoard(board))
                        .setFooter(`${msg.author.username} vs ${opponent.username}`)
                    this.gameEmbed.edit({ embeds: [newEmbed] });
                }
            })
        });
    }
}


class ConnectFour {

    constructor() {
        this.gameEmbed = null
    }

    startGame(msg) {

        const challenger = msg.author;
        const oppenent = msg.mentions.users.first();

        if (!oppenent) return msg.channel.send(`**Who do you wanna play Connect Four with?(Mention the person with the command.**`)

        const board = [
            ["⚪", "⚪", "⚪", "⚪", "⚪", "⚪", "⚪"],
            ["⚪", "⚪", "⚪", "⚪", "⚪", "⚪", "⚪"],
            ["⚪", "⚪", "⚪", "⚪", "⚪", "⚪", "⚪"],
            ["⚪", "⚪", "⚪", "⚪", "⚪", "⚪", "⚪"],
            ["⚪", "⚪", "⚪", "⚪", "⚪", "⚪", "⚪"],
            ["⚪", "⚪", "⚪", "⚪", "⚪", "⚪", "⚪"],
        ];

        const renderBoard = (board) => {
            let tempString = "";
            for (const boardSection of board) {
                tempString += `${boardSection.join("")}\n`;
            }

            tempString = tempString.concat("1️⃣2️⃣3️⃣4️⃣5️⃣6️⃣7️⃣");
            return tempString;
        }

        const initialState = renderBoard(board);

        const initial = new Discord.MessageEmbed()
            .setTitle(`🔴 It's your turn, ${msg.author.username}!`)
            .setDescription(initialState)
            .setFooter(`${challenger.username} vs ${oppenent.username}`)
        msg.channel.send({ embeds: [initial] }).then(gameMessage => {

            gameMessage.react("1️⃣")
            gameMessage.react("2️⃣")
            gameMessage.react("3️⃣")
            gameMessage.react("4️⃣")
            gameMessage.react("5️⃣")
            gameMessage.react("6️⃣")
            gameMessage.react("7️⃣")

            const gameFilter = (reaction, user) => ["1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣", "7️⃣"].includes(reaction.emoji.name) && (user.id === oppenent.id || user.id === challenger.id);

            const gameCollector = gameMessage.createReactionCollector({ filter: gameFilter });

            const gameData = [
                { member: challenger, playerColor: "🔴" },
                { member: oppenent, playerColor: "🟡" }
            ]

            let player = 0;

            const checkFour = (a, b, c, d) => (a === b) && (b === c) && (c === d) && (a !== "⚪");

            const horizontalCheck = () => {

                for (let i = 0; i < 6; i++) {

                    for (let j = 0; j < 4; j++) {
                        if (checkFour(board[i][j], board[i][j + 1], board[i][j + 2], board[i][j + 3])) return [
                            board[i][j], board[i][j + 1], board[i][j + 2], board[i][j + 3]
                        ];
                    }
                }
            }

            const verticalCheck = () => {
                for (let j = 0; j < 7; j++) {
                    for (let i = 0; i < 3; i++) {

                        if (checkFour(board[i][j], board[i + 1][j], board[i + 2][j], board[i + 3][j])) return [
                            board[i][j], board[i + 1][j], board[i + 2][j], board[i + 3][j]
                        ]
                    }
                }
            }

            const diagonal1 = () => {
                for (let col = 0; col < 4; col++) {
                    for (let row = 0; row < 3; row++) {
                        if (checkFour(board[row][col], board[row + 1][col + 1], board[row + 2][col + 2], board[row + 3][col + 3])) return [
                            board[row][col], board[row + 1][col + 1], board[row + 2][col + 2], board[row + 3][col + 3]
                        ]
                    }
                }
            }

            const diagonal2 = () => {
                for (let col = 0; col < 4; col++) {
                    for (let row = 5; row > 2; row--) {
                        if (checkFour(board[row][col], board[row - 1][col + 1], board[row - 2][col + 2], board[row - 3][col + 3])) return [
                            board[row][col], board[row - 1][col + 1], board[row - 2][col + 2], board[row - 3][col + 3]
                        ]
                    }
                }
            }

            const tieCheck = () => {
                let count = 0;
                for (const el of board) {
                    for (const string of el) {
                        if (string !== "⚪") count++;
                    }
                }
                if (count === 42) return true;
                else return false;
            }

            const checks = [horizontalCheck, verticalCheck, diagonal1, diagonal2];

            gameCollector.on("collect", (reaction, user) => {

                reaction.message.reactions.cache.get(reaction.emoji.name).users.remove(user.id);

                if (user.id === gameData[player].member.id) {

                    const openSpaces = [];

                    switch (reaction.emoji.name) {
                        case "1️⃣":
                            for (let i = 5; i > -1; i--) {
                                if (board[i][0] === "⚪") openSpaces.push({ i, j: 0 });
                            }
                            if (openSpaces.length == 0) return msg.channel.send(`**${gameData[player].member}, that column is already full. Choose another one**`).then(msg1 => msg1.delete({ timeout: 10000 }))
                            else board[openSpaces[0].i][openSpaces[0].j] = gameData[player].playerColor;
                            break;
                        case "2️⃣":
                            for (let i = 5; i > -1; i--) {
                                if (board[i][1] === "⚪") openSpaces.push({ i, j: 1 });
                            }
                            if (openSpaces.length == 0) return msg.channel.send(`**${gameData[player].member}, that column is already full. Choose another one**`).then(msg1 => msg1.delete({ timeout: 10000 }))
                            else board[openSpaces[0].i][openSpaces[0].j] = gameData[player].playerColor;
                            break;
                        case "3️⃣":
                            for (let i = 5; i > -1; i--) {
                                if (board[i][2] === "⚪") openSpaces.push({ i, j: 2 });
                            }
                            if (openSpaces.length == 0) return msg.channel.send(`**${gameData[player].member}, that column is already full. Choose another one**`).then(msg1 => msg1.delete({ timeout: 10000 }))
                            else board[openSpaces[0].i][openSpaces[0].j] = gameData[player].playerColor;
                            break;
                        case "4️⃣":
                            for (let i = 5; i > -1; i--) {
                                if (board[i][3] === "⚪") openSpaces.push({ i, j: 3 });
                            }
                            if (openSpaces.length == 0) return msg.channel.send(`**${gameData[player].member}, that column is already full. Choose another one**`).then(msg1 => msg1.delete({ timeout: 10000 }))
                            else board[openSpaces[0].i][openSpaces[0].j] = gameData[player].playerColor;
                            break;
                        case "5️⃣":
                            for (let i = 5; i > -1; i--) {
                                if (board[i][4] === "⚪") openSpaces.push({ i, j: 4 });
                            }
                            if (openSpaces.length == 0) return msg.channel.send(`**${gameData[player].member}, that column is already full. Choose another one**`).then(msg1 => msg1.delete({ timeout: 10000 }))
                            else board[openSpaces[0].i][openSpaces[0].j] = gameData[player].playerColor;
                            break;
                        case "6️⃣":
                            for (let i = 5; i > -1; i--) {
                                if (board[i][5] === "⚪") openSpaces.push({ i, j: 5 });
                            }
                            if (openSpaces.length == 0) return msg.channel.send(`**${gameData[player].member}, that column is already full. Choose another one**`).then(msg1 => msg1.delete({ timeout: 10000 }))
                            else board[openSpaces[0].i][openSpaces[0].j] = gameData[player].playerColor;
                            break;
                        case "7️⃣":
                            for (let i = 5; i > -1; i--) {
                                if (board[i][6] === "⚪") openSpaces.push({ i, j: 6 });
                            }
                            if (openSpaces.length == 0) return msg.channel.send(`**${gameData[player].member}, that column is already full. Choose another one**`).then(msg1 => msg1.delete({ timeout: 10000 }))
                            else board[openSpaces[0].i][openSpaces[0].j] = gameData[player].playerColor;
                            break;
                    }

                    if (tieCheck()) {
                        gameMessage.reactions.removeAll()
                        const TieEmbed = new Discord.MessageEmbed()
                            .setTitle(`The game ended, it is a Tie!`)
                            .setDescription(renderBoard(board))
                            .setFooter(`${challenger.username} vs ${oppenent.username}`)
                        gameCollector.stop("Tie Game")
                        return gameMessage.edit({ embeds: [TieEmbed] })
                    }

                    for (const func of checks) {

                        const data = func();
                        if (data) {
                            gameMessage.reactions.removeAll()

                            const WinEmbed = new Discord.MessageEmbed()
                                .setTitle(`${gameData[player].member.username} has won the game!`)
                                .setDescription(renderBoard(board))
                                .setFooter(`${challenger.username} vs ${oppenent.username}`)
                            gameCollector.stop(`${gameData[player].member.id} won`);
                            return gameMessage.edit({ embeds: [WinEmbed] })
                        }
                    }

                    player = (player + 1) % 2;

                    const newEmbed = new Discord.MessageEmbed()
                        .setTitle(`${gameData[player].playerColor} -  It's your turn, ${gameData[player].member.username}!`)
                        .setDescription(renderBoard(board))
                        .setFooter(`${challenger.username} vs ${oppenent.username}`)
                    gameMessage.edit({ embeds: [newEmbed] });
                }
            })
        })
    }
}




module.exports = {
    c4 : ConnectFour,
    ttt : TicTacToe
}