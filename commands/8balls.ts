const responses: string[] = ['Igen', 'Talán', 'Nem']


import { ICommand } from "wokcommands";

export default
{
    category: "Basic Commands",
    name: "8balls",
    description: "8balls",


    callback: ({message}) => {
        message.reply(responses[Math.floor(Math.random() * responses.length)]);
    },
} as ICommand;