import { ICommand } from 'wokcommands';
import axios, { AxiosResponse } from "axios";
import fs from "fs";
import request from 'request';
import { exec } from "child_process";
// @ts-ignore
import download from "download";

/*
const download_file = (URL: string, name: string) => {
    console.log("DOWNLOAD ELINDITVA")
    console.log("PARMS :", URL, name)
    request
        .get(URL)
        .on("error", () => { console.log("HIBA") })
        .pipe(fs.createWriteStream(name));
}
*/
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
            const status_Message = message.channel.send("Fajl olvasása ....")

            const fileNames: string[] = file.split("/");
            const fileName = fileNames[fileNames.length - 1];

            // only  MP3 files are allowed
            if (fileName.substring(fileName.length - 4, fileName.length) !== ".mp3") {
                message.channel.send("Csak MP3 file megengedett.");
                return;
            }
            const response: AxiosResponse = await axios.get(file);

            if (response.status !== 200) {
                message.channel.send("Hiba történet a file feldolgozása közben");
                return;
            }

            //download_file(file, fileName);

            download(file, fileName).then(async () => {
                (await status_Message).edit({ "content": "Kész (:" })
            });



        } catch { }
    }


} as ICommand;