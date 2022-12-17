import { ICommand } from 'wokcommands';
import fs from "fs";



export default {
    category: 'soundboard',
    name: 'hangok',
    description: 'List all the files in the folder',



    callback: ({ message, args }) => {
        fs.readdir('~/commands/soundboard', (err, files) => {
            files.forEach(file => {
                if (file.substring(file.length - 4, file.length - 1) !== ".ts") {
                    message.channel.send(file)
                }
            })
        });

    }


} as ICommand;