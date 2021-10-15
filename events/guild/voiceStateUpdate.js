let vcSet = new Map();
const performance = require('perf_hooks').performance;

module.exports = async (Discord, client, oldMember, newMember) => {

    let newUserChannel = newMember.channelId;
    let oldUserChannel = oldMember.channelId;

    const userID = newMember.member.id;

    // note: check sessionId
    if(newUserChannel != undefined && !vcSet.has(userID)){ 

        vcSet.set(userID, performance.now());
    }else if (newUserChannel == undefined && vcSet.has(userID)){

        if (!client.db.get("stats")) client.db.set("stats", {});

        let userStats = client.db.get("stats");

        if (!userStats[userID]){

            const member = oldMember.guild.members.cache.get(userID);
            userStats[userID] = {tag: member.user.tag, messageCount: 0, voiceChatCount: 0};
        } 
        
        userStats[userID].voiceChatCount = userStats[userID].voiceChatCount + (performance.now() - vcSet.get(userID));
        vcSet.delete(userID);
        client.db.set("stats", userStats);
    }
}