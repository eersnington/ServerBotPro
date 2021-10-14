module.exports = async (client, Discord, member) => { 

    let placeholders = {
        "%USERNAME%": `${member.user.tag}`,
        "%USERTAG%" : `<@${member.user.id}>`,
        "%USER_AVATAR%": member.user.displayAvatarURL({dynamic : true}),
        "%SERVER_ICON%" : member.guild.iconURL({dynamic: true}),
        "%TOTAL_MEMBERS%" : `${member.guild.memberCount}`,
        "%STORE%" : `${client.config.branding.store}`,
        "%IP%" : `${client.config.branding.ip}`,
    }

    let channel = client.channels.cache.get(client.config.welcome_settings.welcome_channel_id);
    let joinRole = member.guild.roles.cache.find(r => r.id == client.config.join_role);

    if (joinRole && !Object.keys(client.db.get('muted')).includes(member.id)) member.roles.add(joinRole)
    if (!channel) return;
    if (!client.config.welcome_settings.welcome_message) return;

    let embed = {
        description : client.config.welcome_settings.embed_description,
        title : client.config.welcome_settings.embed_title,
        thumbnail : client.config.welcome_settings.embed_thumbnail,
        image : client.config.welcome_settings.embed_image,
    }

    Object.keys(embed).forEach((property) => {

        property_match = embed[property].match(/%(.*?)%/g);

        if (property_match){

            property_match.forEach((placeholder) => {
                if (property == "thumbnail" || property == "image"){

                    if (placeholders[placeholder]){
                        if (placeholders[placeholder].includes("https")) embed[property] = embed[property].replace(placeholder, placeholders[placeholder]);
                    }
                }else {

                    if (placeholders[placeholder]){
                        embed[property] = embed[property].replace(placeholder, placeholders[placeholder]);
                    }

                    if (placeholder.includes('%#')){
                        embed[property] = embed[property].replace(placeholder, "<"+placeholder.substring(1,placeholder.length - 1)+">");
                    }
                }
            });
        }
    });


    const embed1 = new Discord.MessageEmbed()
    .setColor(client.config.branding.embed_color)
    .setAuthor(client.config.branding.name, member.guild.iconURL({dynamic: true}))
    .setThumbnail(embed.thumbnail)
    .setImage(embed.image)
    .setDescription(embed.description)
    .setTitle(embed.title)
    .setTimestamp()
    .setFooter(client.config.branding.ip);

    channel.send({embeds: [embed1]});

}