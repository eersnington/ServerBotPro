const backup = require("discord-backup");

module.exports = {
    name: 'info-backup',
    description: 'Get info of a  discord backup',
    usage: 'info-backup <backup-id>',
    aliases: [],
    args: 1,
    requiredRoles: [],
    requiredPerms: [],
    async execute(client, Discord, message, args){

        const backupID = args.join(' ');

        if (!backupID) return message.channel.send('Please mention an ID');

        backup.fetch(backupID).then((backup) => {

            const date = new Date(backup.data.createdTimestamp);
            const yyyy = date.getFullYear().toString(), mm = (date.getMonth()+1).toString(), dd = date.getDate().toString();
            const formattedDate = `${yyyy}/${(mm[1]?mm:"0"+mm[0])}/${(dd[1]?dd:"0"+dd[0])}`;

            const embed = new Discord.MessageEmbed()
                .setAuthor('ℹ️ Backup', backup.data.iconURL)
                .addField('Server name', backup.data.name)
                .addField('Size', backup.size + ' kb')
                .addField('Created at', formattedDate)
                .setFooter('Backup ID: '+backup.id);

            return message.channel.send({embeds: [embed]});

        }).catch((err) => {

            if (err === 'No backup found')
                return message.channel.send(':x: No backup found for ID '+backupID+'!');
            else
                return message.channel.send(':x: An error occurred: '+(typeof err === 'string') ? err : JSON.stringify(err));

        });

    }
}