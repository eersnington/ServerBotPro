const chalk = require("chalk");

module.exports = async (client, Discord) => { 

    if (!client.db.get("reactionrole")) client.db.set("reactionrole", {});

    client.reactionroleDB = client.db.get('reactionrole');

    client.on('messageReactionAdd', async (reaction, user) => {
        
        if (reaction.partial) {
           
            try {
                await reaction.fetch();
            } catch (error) {
                return console.error('Something went wrong when fetching the message:', error);
            }
        }

        if (Object.keys(client.reactionroleDB).includes(reaction.message.id)){

            if (client.reactionroleDB[reaction.message.id].emoji == reaction.emoji.name || 
                client.reactionroleDB[reaction.message.id].emoji == `<:${reaction.emoji.name}:${reaction.emoji.id}>` ||
                client.reactionroleDB[reaction.message.id].emoji == `<a:${reaction.emoji.name}:${reaction.emoji.id}>`){

                    const role = reaction.message.guild.roles.cache.get(client.reactionroleDB[reaction.message.id].role);
                    if (!role) return console.log(chalk.red(`[Glowstone] Roles has been deleted for the following reaction role > ${reaction.message.content}`));

                    const guildUser = reaction.message.guild.members.cache.get(user.id)
                    if (!guildUser) return;
                    if (guildUser.roles.cache.has(role.id)) return;

                    try{
                        await guildUser.roles.add(role);
                    }catch(err){
                        return console.log(chalk.red('[Glowstone] Couldn\'t handle reaction roles: ', err));
                    }
                }
        }
    });

    client.on('messageReactionRemove', async (reaction, user) => {
        
        if (reaction.partial) {
           
            try {
                await reaction.fetch();
            } catch (error) {
                return console.error('Something went wrong when fetching the message:', error);
            }
        }

        if (Object.keys(client.reactionroleDB).includes(reaction.message.id)){

            if (client.reactionroleDB[reaction.message.id].emoji == reaction.emoji.name || 
                client.reactionroleDB[reaction.message.id].emoji == `<:${reaction.emoji.name}:${reaction.emoji.id}>` ||
                client.reactionroleDB[reaction.message.id].emoji == `<a:${reaction.emoji.name}:${reaction.emoji.id}>`){

                    const role = reaction.message.guild.roles.cache.get(client.reactionroleDB[reaction.message.id].role);
                    if (!role) return console.log(chalk.red(`[Glowstone] Roles has been deleted for the following reaction role > ${reaction.message.content}`));

                    const guildUser = reaction.message.guild.members.cache.get(user.id)
                    if (!guildUser) return;
                    if (!guildUser.roles.cache.has(role.id)) return;

                    try{
                        await guildUser.roles.remove(role);
                    }catch(err){
                        return console.log(chalk.red('[Glowstone] Couldn\'t handle reaction roles: ', err));
                    }
                }
        }
    });


}