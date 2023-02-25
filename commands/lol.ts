import { MessageAttachment, User } from "discord.js";
import { ICommand } from "wokcommands";
import { svg2png } from "svg-png-converter"

export default
    {
        category: "Fun Commands",
        name: "lol",
        description: "Elkuld egy svg-t a keprol amit ",


        callback: ({ message, args }) => {
            if (args) {
                const user_name = message.content.split(" ")[1]
                const base_url: string = "https://masterychart.com/profile/eune/"
                fetch(`${base_url}${user_name}`).then(response => response.text()).then(async html => {

                    const parser = new DOMParser();

                    const doc = parser.parseFromString(html, "text/html");

                    const svg_element = doc.querySelector("#bubble svg") as unknown as string

                    const output_buffer = await svg2png({
                        input: svg_element,
                        encoding: 'buffer',
                        format: 'png'
                    })

                    message.channel.send(new MessageAttachment(output_buffer))
                })


            }

        },
    } as ICommand;