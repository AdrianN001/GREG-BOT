import { ICommand } from 'wokcommands';
import DISCORDJS ,{MessageAttachment} from "discord.js";
import { IMAGE_MANIPULATOR,MODS } from '../../assets/classes/image_manipulator';




export default {
    category: 'image_manipulator',
    name: 'opinion',
    description: 'idk',



    callback: async ({message,args}) => {
        if (args.includes("help"))
        {
            message.reply( "Taggelj meg valakit és Irjál egy Szöveget" );
            return;
        }

        

        const avatar2 = message.mentions.users.first();


        let idk: DISCORDJS.User | string = message.author;

        if (avatar2)
        {
            idk = avatar2
        }
        



        const manipulator = new IMAGE_MANIPULATOR(idk,MODS.OPINION,undefined,undefined,args.filter(arg => !DISCORDJS.MessageMentions.USERS_PATTERN.test(arg)).join(" "));

        const image = await manipulator.MAIN();

        message.channel.send({attachments: [new MessageAttachment(image, "image.gif")] });
    }


} as ICommand;