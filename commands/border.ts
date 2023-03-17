import { MessageAttachment, User } from "discord.js";
import fetch from "node-fetch";
import { ICommand } from "wokcommands";
import sharp from "sharp";


async function create_border(img_buffer: Buffer | string) {



    const resize_image = await sharp(img_buffer).resize({
        width: 620,
        height: 1060,
        fit: "fill"
    }).toBuffer()

    return await sharp("assets/imgs/border.png").composite([
        {
            input: resize_image,
            top: 270,
            left: 280
        }
    ]).toBuffer()



}


export default
    {
        category: "Basic Commands",
        name: "Border",
        description: "Border",


        callback: async ({ message, args }) => {
            if (!message.attachments.first()) {
                return message.reply("Nem lett kép megadva")
            } else {
                message.reply("Pillanat...");
                let fimg = await fetch(message.attachments.first()!.url)
                const img_buffer = Buffer.from(await fimg.arrayBuffer())

                const gyonyoru = await create_border(img_buffer);

                message.channel.send({
                    files: [
                        {
                            attachment: gyonyoru,
                            name: "racism.png"
                        }
                    ]
                });
            }


        },
    } as ICommand;