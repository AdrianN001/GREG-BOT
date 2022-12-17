import DISCORDjs, { DMChannel, MessageCollector } from 'discord.js';
import { ICommand } from 'wokcommands';
import RPS from '../assets/classes/rock_paper_scissor';




export default {
    category: 'Game',
    name: 'rps2',
    description: 'Kő Papir Olló 2',



    callback: async ({message,args}) => {


        const delay = (ms: number | undefined) => new Promise(res => setTimeout(res, ms));

        const player_1 = message.author
        const player_2 = message.mentions.users.first() // Player 2 deklaralas

        if (!player_2){message.reply("Valakit meg kell tagelned, hogy játszhass vele"); return}
        if (player_1 === player_2){message.reply("Magaddal akarsz játszani?"); message.react("💀"); return;}
        if (player_2.bot){message.reply("A Második játékos egy bot"); return}

        const game = new RPS(player_1, player_2)
                            //3x megtageli
        message.channel.send({content: `<@${player_2.id}> \n`.repeat(3), embeds: [game.generate_starting_ember()]})
        
        const reply_collector = new MessageCollector(message.channel,{time: 30000000, max: 1})
        reply_collector.filter = (reply: DISCORDjs.Message) => reply.author.id === player_2.id

        
        
        reply_collector.on("collect", async (message: DISCORDjs.Message) => {
            if (message.content.toLowerCase() !== "igen" ) {
                message.channel.send("Visszautasitva ):"); 
                reply_collector.stop(); 
                return
            }
            else { 
                message.channel.send("Elfogadva");
                reply_collector.stop();
                
                console.log(player_1.username)
                console.log(player_2.username)


                const players : DISCORDjs.User[] = [player_1, player_2];

                const messages : DISCORDjs.Message[] = [];

                players.forEach(async (player: DISCORDjs.User) => 
                {
                    
                    const message = await player.send({embeds: [game.generate_main_embed(player == player_1 ? player_2: player_1)] , components: [RPS.generate_rows()]});
                    
                    messages.push(message)
                }) // send game for every player



                //GATHERING INFO
                let choices : Map <DISCORDjs.User, string> = new Map<DISCORDjs.User, string>([
                    [player_1, "semmi"],
                    [player_2, "asd"]
                ])

                
                

                // attach collector to every embed that has been sended

                
                const dmchannel_1 = player_1.dmChannel || await player_1.createDM(true)
                const dmchannel_2 = player_2.dmChannel || await player_2.createDM(true)  

                // const [dmchannel_1, dmchannel_2] = messages

                // for (message of messages)
                // {
                //     console.log(message)
                // }
                        

                let collector_1 = dmchannel_1.createMessageComponentCollector({ componentType: "SELECT_MENU", time: 60000})
    
                collector_1.on("collect", (collected) => {
                            
                    
                            
                
                    const value = collected.values[0]
                    choices.set(player_1, value)
    
                            
                    
                    collected.deferUpdate() // deferUpdate szukseges ahhoz, hogy lenyegebe mukodjon

                    // https://youtu.be/n1hr0Idv4hQ?t=997 A MEGMENTO
    
                    dmchannel_1.send({content: `${value}-t választottad ki`})

                            
                    })
                    

                let collector_2 = dmchannel_2.createMessageComponentCollector({ componentType: "SELECT_MENU", time: 60000, max: 12})
    
                collector_2.on("collect", (collected) => {
                                
                    
                                
                    
                        const value = collected.values[0]
                        choices.set(player_2, value)
        
                                
                        
                        collected.deferUpdate() // deferUpdate szukseges ahhoz, hogy lenyegebe mukodjon

                        // https://youtu.be/n1hr0Idv4hQ?t=997 A MEGMENTO
        
                        dmchannel_2.send({content: `${value}-t választottad ki`})
    
                                
                            })

                //gathering INFO

                

            
                const winner = await game.decision( choices) //await-elni kell, mivel tartalmaz egy 7 sec-es delay-t

                if (!winner)
                {
                    message.channel.send({embeds : [game.generate_draw(choices)]})
                    return;
                }

                message.channel.send({embeds: [game.generate_winner(choices,winner)]})

                }
                
                
                
                
                
                
        }
    )
    }


} as ICommand; 