import { ICommand } from 'wokcommands';
import ROULETTE from '../assets/classes/roulette';
import DISCORDJS from "discord.js";
import { dbQuery } from '../assets/database';




export default {
    category: 'Game',
    name: 'rulett',
    description: 'Roulette',



    callback: ({message,args}) => {
        const channel = message.channel

        const collector = new DISCORDJS.MessageCollector(channel,{time: 30000000});
        if (channel instanceof DISCORDJS.TextChannel)
        {
         const game_session:ROULETTE = new ROULETTE(message.author,message.author.id,channel,collector);

         const message_filter = (reply:DISCORDJS.Message) => (reply.author.id == message.author.id);

         collector.filter = message_filter;

         dbQuery(`SELECT * FROM roulette WHERE ID = '${message.author.id}';`).then(data => {
            const starting_embed = new DISCORDJS.MessageEmbed()
            .setAuthor("11.E rulez", "https://cdn.discordapp.com/attachments/986288476834123799/987469337357062204/Nev11erulezelen.png")
            .setColor("#0099ff")
            .setTimestamp()
            .setTitle("Roulette")
            .addFields(
                [
                    {value:"Köszöntünk a játékban",name :message.author.username,inline:false},
                    {value:"Jelenlegi Pénzösszeged", name: `${ data[0].Money}`, inline:true},
                    {value:"Ennyiszer Játszottál a Bottal", name:`${ data[0].Time_Played}`,inline:true}
                    
    
                ],
                )
                
            .setImage("https://thumbs.dreamstime.com/b/casino-roulette-wheel-chips-green-table-reali-vector-illustration-realistic-objects-d-place-text-eps-78054777.jpg")
            .setFooter("Roulette", "https://cdn.discordapp.com/attachments/986288476834123799/987469337357062204/Nev11erulezelen.png");
                
                channel.send({embeds:[starting_embed]})
            })

         channel.send({embeds:[game_session.generate_guide()]})


         collector.on("collect",(message)=>{
            game_session.HandleInput(message.content);

         })
        }
    }


} as ICommand;