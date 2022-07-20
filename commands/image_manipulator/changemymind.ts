import { ICommand } from 'wokcommands';
import DISCORDJS ,{MessageAttachment} from "discord.js";
import { IMAGE_MANIPULATOR,MODS } from '../../assets/classes/image_manipulator';




export default {
    category: 'image_manipulator',
    name: 'changemymind',
    description: 'idk',



    callback: async ({message,args}) => {
        if (args.includes("help"))
        {
            message.reply("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSy1Cb3L_M4YQptcaR7GqUrJq8aYfmHuRE0j6tAJaeR8WgQcDVtWw9V66SZaR6N66KE7kg&usqp=CAU")
            return;
        }

        const idk = new IMAGE_MANIPULATOR(message.author,MODS.CHANGE_MY_MIND,undefined,undefined,args.join(" "));
        const image = await idk.MAIN();
        
        message.channel.send({attachments: [new MessageAttachment(image, "image.gif")] });
    }


} as ICommand;