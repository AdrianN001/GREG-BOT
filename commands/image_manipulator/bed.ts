import { ICommand } from 'wokcommands';
import DISCORDJS ,{MessageAttachment} from "discord.js";
import { IMAGE_MANIPULATOR,MODS } from '../../assets/classes/image_manipulator';




export default {
    category: 'image_manipulator',
    name: 'bed',
    description: 'idk',



    callback: async ({message,args}) => {
        if (args.includes("help"))
        {
            message.reply("Taggelj meg 1 vagy 2 embert");
            return;
        }

        let manipulator = new IMAGE_MANIPULATOR( message.author, MODS.BED ,message.mentions.users.first()); 


        const avatar2 = message.mentions.users.first();

        if ( message.mentions.users.first() &&  message.mentions.users.last() && message.mentions.users.last()?.id !== message.mentions.users.first()?.id)
        {
            manipulator = new IMAGE_MANIPULATOR( message.mentions.users.first()!, MODS.BED ,message.mentions.users.last())
        }


        

        const image = await manipulator.MAIN();

        message.channel.send({files:[new MessageAttachment(image, "idk.gif")]})
    }


} as ICommand;