import { ICommand } from 'wokcommands';
import DISCORDJS ,{MessageAttachment} from "discord.js";
import { IMAGE_MANIPULATOR,MODS } from '../../assets/classes/image_manipulator';




export default {
    category: 'image_manipulator',
    name: 'ohno',
    description: 'idk',



    callback: async ({message,args}) => {
        if (args.includes("help"))
        {
            message.reply("Adjál meg egy szöveget")
            return;
        }

        const idk = new IMAGE_MANIPULATOR(message.author,MODS.OHNO,undefined,undefined,args.join(" "));
        const image = await idk.MAIN();
        
        message.channel.send({attachments: [new MessageAttachment(image, "image.gif")] });
    }


} as ICommand;