import { User } from "discord.js";
import { ICommand } from "wokcommands";

export default
{
    category: "Basic Commands",
    name: "avatars",
    description: "Avatar parancs, amely visszaadja a megadott felhasználó avatarját, vagy a sajátját",

    
    callback: ({message, args}) => {
        if (args){
            const user = message.mentions.users.first();
            if (user)
            {
                message.reply(user.avatarURL()!);
            }
                
            else
            {
                message.reply(message.author.avatarURL()!);
            }
        }
        
    },
} as ICommand;