import { ICommand } from 'wokcommands';
import DISCORDJS, { TextChannel } from "discord.js";
import Hangman from "../assets/classes/hangman";


export default
{
    category: "GAME",

    names: "akaszto",
    description:"Akasztofa jatek",

    callback : ({message, args}) => {
        const channel = message.channel;

        if (args)
        {
            if(Hangman.ALL_WORD.includes(args.join(" ")))
            {

                const message_collector = new DISCORDJS.MessageCollector(channel,{time: 3000000})
                message_collector.filter = (response:DISCORDJS.Message) => (!response.author.bot);
        
                if (channel instanceof TextChannel){
        
                    
                    const Active_Game = new Hangman(message.author,channel,message_collector, args.join(" "));
                
                    channel.send({embeds:[Active_Game.generate_embed()]})
        
                    message_collector.on("collect",(reply) => {
        
                    if (reply.content !== "ff" || reply.author.id === message.author.id)
                    {
        
                        Active_Game.get_Input(reply.content);
                    }else{
                        message_collector.stop();
                        channel.send("FELADTAD")
                    }
        
                    
                    
                    })
            }else
            {
                message.reply("Hibás téma")
                return;
            }

        }else if(!args || args.join("").replace(" ", "") == "")
        {
            const message_collector = new DISCORDJS.MessageCollector(channel,{time: 3000000})
                message_collector.filter = (response:DISCORDJS.Message) => (!response.author.bot);
        
                if (channel instanceof TextChannel){
        
                    
                    const Active_Game = new Hangman(message.author,channel,message_collector);
                
                    channel.send({embeds:[Active_Game.generate_embed()]})
        
                    message_collector.on("collect",(reply) => {
        
                    if (reply.content !== "ff" || reply.author.id === message.author.id)
                    {
        
                        Active_Game.get_Input(reply.content);
                    }else{
                        message_collector.stop();
                        channel.send("FELADTAD")
                    }
        
                    
                    
                    })
        }

    }}}
} as ICommand;