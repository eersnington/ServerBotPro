const { GiveawaysManager } = require('discord-giveaways');

module.exports = (client, Discord) =>{
    
    // Starts updating currents giveaways
    const manager = new GiveawaysManager(client, {
        storage: './giveaways.json',
        updateCountdownEvery: 10000,
        default: {
            botsCanWin: false,
            embedColor: client.config.branding.embed_color,
            embedColorEnd: '#000000',
            reaction: '🎉'
        }
    });
    // We now have a giveawaysManager property to access the manager everywhere!
    client.giveawaysManager = manager;
}