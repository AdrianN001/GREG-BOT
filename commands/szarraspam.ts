import { ICommand } from "wokcommands";

export default 
{

    category: "Spam",
    description: "Spammel af",



    callback: ({message, args}) => {
        if (args)
        {
            let mennyiseg: number = parseInt(args[args.length - 1]);
            
            let szoveg: string = args.slice(0, args.length - 1).join(" ");

            if (mennyiseg <= 20){
                for (let i = 0; i < mennyiseg; i++)
                {
                    message.channel.send(szoveg);
                }
            }
            else
            {
                message.channel.send("Max 20");
            }
        }
    }



} as ICommand;