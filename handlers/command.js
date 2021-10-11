const fs = require('fs');
const chalk = require('chalk')

module.exports = (client, Discord) =>{
    const commands_dir = './commands/';
    const command_folder = fs.readdirSync(commands_dir);

    for (const folder of command_folder) {
        const command_folder = fs.readdirSync(`${commands_dir}${folder}`).filter(file => file.endsWith('.js'));
        for (const file of command_folder) {

            try{

                const command = require(`.${commands_dir}${folder}/${file}`);

                client.commands.set(command.name, command);
                client.commands.get(command.name).requiredRoles = client.cmdyml[folder][command.name].RolesRequired;
                client.commands.get(command.name).requiredPerms = client.cmdyml[folder][command.name].DiscordPermissions;

            }catch(err){
                console.log(chalk.red(`Error in loading ->`), `${file}`);
            }
        }
    }
}