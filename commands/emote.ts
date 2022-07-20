import { Emoji } from 'discord.js';
import { ICommand } from 'wokcommands';
import DISCORDJS from 'discord.js';



export default
{
    category: "Complex Commands",
    name : "emote",
    description: "A megadott emotet rakja rá az előző üzenetre",

    callback: ({message, args}) => {

        let channel = message.channel // <-- your pre-filled channel variable

        function string_to_list(string: string): string[] {
             
            return string.split("");
        };
        
        let argumentumok: string[] = string_to_list(args.join(" "));

        function translate_emote(emote_1: string) {

            let emote_2: string = emote_1.toLocaleLowerCase();
            switch(emote_2)
            {
                
                case "a":
                    return "🇦"
                case "b":
                    return "🇧"
                case "c":
                    return "🇨"
                case "d":
                    return "🇩"
                case "e":
                    return "🇪"
                case "f":
                    return "🇫"
                case "g":
                    return "🇬"
                case "h":
                    return "🇭"
                case "i":
                    return "🇮"
                case "j":
                    return "🇯"
                case "k":
                    return "🇰"
                case "l":
                    return "🇱"
                case "m":
                    return "🇲"
                case "n":
                    return "🇳"
                case "o":
                    return "🇴"
                case "p":
                    return "🇵"
                case "q":
                    return "🇶"
                case "r":
                    return "🇷"
                case "s":
                    return "🇸"
                case "t":
                    return "🇹"
                case "u":
                    return "🇺"
                case "v":
                    return "🇻"
                case "w":
                    return "🇼"
                case "x":
                    return "🇽"
                case "y":
                    return "🇾"
                case "z":
                    return "🇿"

                
                case "1":
                    return"1️⃣";
                case "2":
                    return"2️⃣";
                case "3":
                    return"3️⃣";
                case "4":
                    return"4️⃣";
                case "5":
                    return"5️⃣";
                case "6":
                    return"6️⃣";
                case "7":
                    return"7️⃣";
                case "8":
                    return"8️⃣";
                case "9":
                    return"9️⃣";
                case "0":
                    return"0️⃣";

                case "#":
                    return "#️⃣"; 
                case "!":
                    return "❗️";
                case "?":
                    return "❓";
                
                
                default:
                    return '🔤';
            }

        }

        let normalis:any[] = [];

        let emote = [];

        const alphabet = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
        const other_alphabet = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
        const szamok = ["0","1","2","3","4","5","6","7","8","9"];
        const osszes = alphabet.concat(other_alphabet).concat(szamok).concat([":",'<',">","?","!","#"]);

        for(let i = 0; i < argumentumok.length; i++)
        {
            if(argumentumok[i] == "<")
            {
                normalis.push(argumentumok.slice(i , argumentumok.indexOf(">") + 1).join(""));
                argumentumok.splice(i , argumentumok.indexOf(">") + 1)
                
                
            }else if ((osszes.includes(argumentumok[i]))) // nem betu es nem is egy custom emotet
            {
                normalis.push(translate_emote(argumentumok[i]));
            }

        }
        console.log(normalis)
        console.log(args)
        
        channel.messages.fetch({ limit: 2 }).then(messages => {

            
            let lastMessage = messages.last();

            

            for (const emoji of normalis)
            {
                
                if (!emoji.startsWith(":")){
                    
                    const getEmoji = DISCORDJS.Util.parseEmoji(emoji);
                    
        
                    
                    
                    lastMessage?.react(getEmoji?.id ?? emoji);
                   
                }else
                {
                    lastMessage?.react(emoji);
                }
    
            }
            messages.first()?.delete();
            
        });
        
        
    }
} as ICommand;