const { Player } = require("discord-player");

module.exports = (client, Discord) =>{

    client.musicplayer = new Player(client);

    client.musicplayer.on("error", (queue, error) => {
        console.log(`[${queue.guild.name}] Error emitted from the queue: ${error.message}`);
    });
    client.musicplayer.on("connectionError", (queue, error) => {
        console.log(`[${queue.guild.name}] Error emitted from the connection: ${error.message}`);
    });


    client.musicplayer.on("trackStart", (queue, track) => {
        queue.metadata.channel.send(`🎶 | Now playing **${track.title}** in **${queue.connection.channel.name}**!`);
    });
    
    client.musicplayer.on("trackAdd", (queue, track) => {
        queue.metadata.channel.send(`🎶 | Track **${track.title}** queued!`);
    });
    
    client.musicplayer.on("botDisconnect", (queue) => {
        queue.metadata.channel.send("❌ | I was manually disconnected from the voice channel, clearing queue!");
    });
    
    client.musicplayer.on("channelEmpty", (queue) => {
        queue.metadata.channel.send("❌ | Nobody is in the voice channel, leaving...");
    });
}