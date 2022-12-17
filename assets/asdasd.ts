import fs from "fs";
import request from 'request';

const download_file = (URL: string, name: string) => {
    console.log("DOWNLOAD ELINDITVA")
    console.log("PARMS :", URL, name)
    request
        .get(URL)
        .on("error", () => { console.log("HIBA") })
        .pipe(fs.createWriteStream(name));
}
download_file("https://cdn.discordapp.com/attachments/765634888782184523/1053632118602862622/obstacles.mp3", "obstacles.mp3")