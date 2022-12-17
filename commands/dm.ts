import { Client, MessageEmbed, User } from 'discord.js';
import { ICommand } from 'wokcommands';




export default
{
    category: "Complex Commands",
    name: "dm",
    description: "A megadott üzenetet küldi a megadott felhasználó(k)nak",


    callback: ({message, args}) => {
        let uzenet: string[] = [];
        let celzott_emberek =   Array.from( message.mentions.users.keys() );
        let celzott_emberek_2:string[];

        for(let i = 0; i < args.length; i++)
        {
            if (!(args[i].startsWith("<@") && args[i].endsWith(">")))
            {
                uzenet.push(args[i]);
            }
            
        }

        if (uzenet.join(" ").length >= 250)
        {
            message.reply("A megadott üzenet túl hosszú! (max. 250 karakter)");
            return;
        }
        var today: any = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();

        today = mm + '/' + dd + '/' + yyyy;

        const embed_sent:MessageEmbed = new MessageEmbed()
                                .setColor("#0099ff")
                                .setTitle("DM küldés")
                                .setAuthor("11.E rulez", "https://cdn.discordapp.com/attachments/986288476834123799/987469337357062204/Nev11erulezelen.png")
                                .addField(`${message.author.username} küldött üzenet neked`, "Az üzenet a következő",false)
                                .addField(`${uzenet.join(" ")}`,"⠀⠀⠀⠀⠀⠀",false)
                                .setImage(`${message.author.avatarURL()}`)
                                .setTimestamp(today)
        



        celzott_emberek.forEach(element => {
            message.guild?.members.cache.get(element)?.send({content: "Üzeneted érkezet",embeds: [embed_sent]});
        });
        

        
    }
    
} as ICommand;