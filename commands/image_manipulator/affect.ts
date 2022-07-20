import { ICommand } from 'wokcommands';
import DISCORDJS, { MessageAttachment } from "discord.js";
import { IMAGE_MANIPULATOR,MODS } from '../../assets/classes/image_manipulator';




export default {
    category: 'image_manipulator',
    name: 'affect',
    description: "No, it doesn't affect my baby",



    callback: async ({message,args}) => {
        if (args.includes("help"))
        {
            message.reply("https://cdn130.picsart.com/302367780051201.jpg");
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

        const manipulator = new IMAGE_MANIPULATOR(idk,MODS.AFFECT);

        const image = await manipulator.MAIN();

        message.channel.send({attachments: [new MessageAttachment(image, "image.gif")] });
    }


} as ICommand;