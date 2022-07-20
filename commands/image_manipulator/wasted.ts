import { ICommand } from 'wokcommands';
import DISCORDJS ,{MessageAttachment} from "discord.js";
import { IMAGE_MANIPULATOR,MODS } from '../../assets/classes/image_manipulator';




export default {
    category: 'image_manipulator',
    name: 'wasted',
    description: 'idk',



    callback: async ({message,args}) => {
        if (args.includes("help"))
        {
            message.reply("Wasted Filter")
            return;
        }

        const attachments = (message.attachments)?.first()?.url

        const avatar2 = message.mentions.users.first();


        let idk: DISCORDJS.User | string = message.author;

        if (avatar2)
        {
            idk = avatar2
        }
        if (attachments)
        {
            idk = attachments
        }



        const manipulator = new IMAGE_MANIPULATOR(idk,MODS.WASTED);

        const image = await manipulator.MAIN();

        message.channel.send({files:[new MessageAttachment(image, "idk.gif")]})
    }


} as ICommand;