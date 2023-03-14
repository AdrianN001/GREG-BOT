import { User } from "discord.js";
import { ICommand } from "wokcommands";
import save_website_as_png from "../assets/save_image";

export default
    {
        category: "Basic Commands",
        name: "r6_stats",
        description: "Csinal egy screenshotot az R6Tracker-rol",


        callback: async ({ message, args }) => {
            console.log(message, args)
            if (!args) {
                return message.reply("Nem volt felhasznalo nev megadva");
            }

            const image: Buffer = await save_website_as_png(args[0]);

            message.channel.send({ content: "Screenshot:", files: [image] })



        },
    } as ICommand;