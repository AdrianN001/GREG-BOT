import { ICommand } from 'wokcommands';
import axios, { AxiosResponse } from "axios";
import fs from "fs";


export default {
    category: 'soundboard',
    name: 'load',
    description: 'Loads a file which was attached to the message',



    callback: async ({ message, args }) => {
        if (message.author.bot) { return; }

        // FILE URI
        const file: string | undefined = message.attachments.first()?.url;
        if (!file) { message.reply("Nem lett hang fajl hozzacsatolva az üzenethez"); return; }

        try {
            message.channel.send("Fajl olvasása ....")

            const fileNames: string[] = file.split("/");
            const fileName = fileNames[fileNames.length - 1];

            // only PCM files are allowed
            if (fileName.substring(fileName.length - 4, fileName.length) !== ".pcm") {
                return message.channel.send("Csak PCM file megengedett annak érdekében, hogy a bot le tudja majd futtatni.");
            }
            const response: AxiosResponse = await axios.get(file);

            if (response.status !== 200) {
                return message.channel.send("Hiba történet a file feldolgozása közben");
            }

        } catch { }
    }


} as ICommand;