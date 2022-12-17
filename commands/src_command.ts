import { ICommand } from 'wokcommands';
import DISCORDJS from 'discord.js';



export default
{
    category: "Basic Commands",
    name : "forraskod",
    description: "A Bot forráskódja",

    callback: ({message}) => {
            
            let channel = message.channel // <-- your pre-filled channel variable  

            const embed_sent = new DISCORDJS.MessageEmbed()
                                        .setTitle("Forráskód")
                                        .setAuthor("Görög Istenek", "https://cdn.discordapp.com/attachments/986288476834123799/987469337357062204/Nev11erulezelen.png")
                                        .setColor("#0099ff")
                                        .setImage("https://hu.wizcase.com/wp-content/uploads/2022/03/GitHub-Logo.png")
                                        .setThumbnail("https://preview.redd.it/s08dv9xoj6581.jpg?width=640&crop=smart&auto=webp&s=3c55422802b8e7c932851e8ed5b042309b66c7d2")
                                        .setTimestamp()
                                        .addField("https://github.com/AdrianN001/Discord-Bot-2", "A Bot forráskódja")
            
            channel.send({embeds: [embed_sent]});

    }
} as ICommand;