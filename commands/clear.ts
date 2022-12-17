import { DMChannel, NewsChannel, TextChannel } from 'discord.js';
import { ICommand } from 'wokcommands';



export default
{
    category: "Basic Commands",
    name: "clear_msg",
    description: "Kitörli a megadott számú üzenetet",

    callback: ({message, args}) => {
        if (args && message.channel instanceof TextChannel && message.channel.permissionsFor(message.guild!.me!).has("MANAGE_MESSAGES"))
        { 
            let mennyiseg: number = parseInt(args[0]);
            
            let message_channel = message.channel;

            message_channel.bulkDelete(mennyiseg + 1);
           

            message.channel.send(`Sikeresen töröltél ${mennyiseg} üzenetet!`);
        }
    }

} as ICommand;