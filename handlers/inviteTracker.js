module.exports = (client, Discord) =>{
    
    client.invites = {}
    if (!client.db.get('invites')){
        client.db.set('invites', {});
    }

    client.on('inviteCreate', async invite => {

        const invsDb = client.db.get('invites');
        invsDb[invite.guild.id].push(invite.code);

        client.invites[invite.guild.id][invite.code] = invite;

        client.db.set('invites', invsDb);

    });

    client.on('inviteDelete', async invite => {

        const invsDb = client.db.get('invites');

        if (invsDb[invite.guild.id].includes(invite.code)){

            const index = invsDb[invite.guild.id].indexOf(invite.code);
            invsDb[invite.guild.id].splice(index, 1);

            delete client.invites[invite.guild.id][invite.code]

            client.db.set('invites', invsDb);
        }

    });

    client.on('ready', async () =>{

        const invsDb = client.db.get('invites');

        client.guilds.cache.forEach(g => {
            client.invites[g.id] = [];

            if (!invsDb[g.id]){

                invsDb[g.id] = [];
            }else{

                if (invsDb[g.id].length != 0){
                    invsDb[g.id].forEach(code => {

                        client.fetchInvite(`https://discord.gg/${code}`)
                        .catch(()=>{})
                        .then(invite => {
                            client.invites[g.id][invite.code] = invite;
                        });
                    });
                }
            }
        });

        client.db.set('invites', invsDb);
    });

    

    client.on('guildMemberAdd', async (member) =>{

        const invsDb = client.db.get('invites');

        client.guilds.cache.forEach(g => {
            client.invites[g.id] = [];

            if (!invsDb[g.id]){

                invsDb[g.id] = [];
            }else{

                if (invsDb[g.id].length != 0){
                    invsDb[g.id].forEach(code => {

                        client.fetchInvite(`https://discord.gg/${code}`)
                        .catch(()=>{})
                        .then(invite => {
                            client.invites[g.id][invite.code] = invite;
                        });
                    });
                }
            }
        });

        client.db.set('invites', invsDb);
    });

    client.on('guildMemberRemove', async (member)=>{
        //console.log(member)
    });
}