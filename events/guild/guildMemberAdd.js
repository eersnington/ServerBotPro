
module.exports = async (Discord, client, member) => {
    
    let potentialuser = member;

    let placeholders = {
        "%USERNAME%": `${potentialuser.user.tag}`,
        "%USERTAG%" : `<@${potentialuser.user.id}>`,
        "%USER_AVATAR%": potentialuser.user.displayAvatarURL({dynamic : true}),
        "%SERVER_ICON%" : potentialuser.guild.iconURL({dynamic: true}),
        "%TOTAL_MEMBERS%" : `${potentialuser.guild.memberCount}`,
        "%STORE%" : `${client.config.branding.store}`,
        "%IP%" : `${client.config.branding.ip}`,
    }

    let channel = client.channels.cache.get(client.config.welcome_settings.welcome_channel_id);
    let joinRole = potentialuser.guild.roles.cache.find(r => r.id == client.config.join_role);

    const delay = ms => new Promise(res => setTimeout(res, ms));
    await delay(500);

    if (!channel.guild.members.cache.get(potentialuser.user.id)) return;

    if (joinRole && !Object.keys(client.db.get('muted')).includes(potentialuser.id)) potentialuser.roles.add(joinRole)
    if (!channel) return;
    if (!client.config.welcome_settings.welcome_message) return;

    let description = client.config.welcome_settings.embed_description;
    let title = client.config.welcome_settings.embed_title;
    let thumbnail = client.config.welcome_settings.embed_thumbnail;
    let image = client.config.welcome_settings.embed_image;

    let description_match = description.match(/%(.*?)%/g)
    let title_match = title.match(/%(.*?)%/g)
    let thumbnail_match = thumbnail.match(/%(.*?)%/g)
    let image_match = image.match(/%(.*?)%/g)

    for (placeholderIndex in description_match){
        let placeholder = description_match[placeholderIndex]
        
        if (placeholders[placeholder]){
            description = description.replace(placeholder, placeholders[placeholder])
        }
        if (placeholder.includes('%#')){
            channel_ID = placeholder.substring(1,placeholder.length - 1);
            description = description.replace(placeholder, "<"+channel_ID+">")
        }
    }

    for (placeholderIndex in title_match){
        let placeholder = title_match[placeholderIndex]
    
        if (placeholders[placeholder]){
            title = title.replace(placeholder, placeholders[placeholder])
        }
    
    }

    for (placeholderIndex in thumbnail_match){
        let placeholder = thumbnail_match[placeholderIndex]

        if (placeholders[placeholder]){
            if (placeholders[placeholder].includes("https")) thumbnail = thumbnail.replace(placeholder, placeholders[placeholder])
        }
    
    }

    for (placeholderIndex in image_match){
        let placeholder = image_match[placeholderIndex]
    
        if (placeholders[placeholder]){
            if (placeholders[placeholder].includes("https")) image = image.replace(placeholder, placeholders[placeholder])
        }
    
    }

    const embed1 = new Discord.MessageEmbed()
    .setColor(client.config.branding.embed_color)
    .setAuthor(client.config.branding.name, potentialuser.guild.iconURL({dynamic: true}))
    .setThumbnail(thumbnail)
    .setImage(image)
    .setDescription(description)
    .setTitle(title)
    .setTimestamp()
    .setFooter(client.config.branding.ip);

    channel.send({embeds: [embed1]});

}