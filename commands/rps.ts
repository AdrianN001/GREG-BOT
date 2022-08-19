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

        const game = new RPS(player_1, player_2)
                            //3x megtageli
        message.channel.send({content: `<@${player_2.id}> \n`.repeat(3), embeds: [game.generate_starting_ember()]})
        
        const reply_collector = new MessageCollector(message.channel,{time: 30000000, max: 1})
        reply_collector.filter = (reply: DISCORDjs.Message) => reply.author.id === player_2.id

        
        
        reply_collector.on("collect", (message: DISCORDjs.Message) => {
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

                const filter = (interaction: any) => interaction.user.id === player_1.id && interaction.user.id === player_2.id;
                

                // attach collector to every embed that has been sended

                players.forEach((player:DISCORDjs.User) => 
                {
                    if (player.dmChannel){
                        console.log("AsdDSA")

                        const collector = player.dmChannel.createMessageComponentCollector({filter:filter,
                        componentType: "SELECT_MENU",
                        time: 6000})
    
                        collector.on("collect", (collected) => {
                            
                
                            const value = collected.values[0]
                            choices.set(collected.user, value)
    
    
                            console.log(collected.user, value)
    
                            collected.reply({content: `${value}-t választottad ki`})
                            
                        })
                    }
                })
                
                
        }
    })
    }


} as ICommand; 