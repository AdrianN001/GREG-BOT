import { ICommand } from 'wokcommands';
import DISCORDJS from 'discord.js';
import TikTakToe from '../assets/classes/tiktakto';



export default
{
    category: "Complex Commands",
    names: "ttt",
    description:"Amőba játék",


    callback: ({message, args}) => {
        let channel = message.channel;



        function Print_Map(map:Map<string, string[]>):void {
            for (let [key, value] of map) {
                channel.send(value.join("    "));
            }
        }



        let player_1 = message.author;
        let player_2 = message.mentions.users.first();
        if (!player_2){
            channel.send("Nincs megadva a játékos");
            return;
        }
        if (player_1 == player_2){
            channel.send("Saját magaddal játszanál");
            return;
        }

        if (player_1.bot || player_2.bot){
            channel.send("Az egy bot, akivel szeretnél játszani");
            return;
        }
        const collector = new DISCORDJS.MessageCollector(channel,{time: 30000000});

        if (channel instanceof DISCORDJS.TextChannel){

        let ttt = new TikTakToe(player_1, player_2, channel, collector);
        

        channel.send({embeds:[ttt.generateStartingEmbed()]})

        channel.send({embeds:[ttt.generate_Round_Embed()]})


       
        

        const message_filter = (message:DISCORDJS.Message) => (message.author.id === ttt.getPlayers()[0].id) || (message.author.id === ttt.getPlayers()[1].id);

        
            collector.filter = message_filter;

            collector.on("collect",(message) =>{

                let row = message.content.substring(0,1);
                let column = parseInt(message.content.substring(1));
                if ((row == "A" || row == "B" || row == "C") &&(column >= 1 && column <= 3) && message.author.id === ttt.getCurrentPlayer().id){
                    
                    ttt.UpdateMap(row, column-1);
                    channel.send({embeds:[ttt.generate_Round_Embed()]})

                    if (ttt.checkWin()){
                        channel.send({embeds: [ttt.generate_Ending_Embed()]})
                        collector.stop();
                    
                    }else if(ttt.check_draw()){
                        channel.send("A játék döntetlen");
                        collector.stop();
                    }
                    
                    
                }
                else if (message.content == "exit" || message.content == "ff" || message.content == "felad" ) // a masodik fele nem is fontos, a filter kiszurte volna
                {
                    channel.send("Feladtad a játékot");
                    channel.send(`A győztes: ${message.author.id === ttt.getPlayers()[0].id? ttt.getPlayers()[1].username : ttt.getPlayers()[0].username}`);
                    collector.stop();
                }
                else if (message.author.id !== ttt.getCurrentPlayer().id)
                {
                    channel.send("Nem te következel");
                }
                
                
                else{
                    channel.send("Hibas üzenet!")
                    channel.send("A formátum például a következő: A1, B2, C3");
                }

            });
            
            
        
        
        
        
    }}

} as ICommand;