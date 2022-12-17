import { ICommand } from 'wokcommands';
import DISCORDJS from "discord.js";
import RUSSIAN_ROULETTE from '../assets/classes/russian_roulete';




export default {
    category: 'Game',
    name: 'orosz_roulette',
    description: 'A vesztes kickelve lesz :D',



    callback: async ({message,args}) => {
        const channel = message.channel;

        const delay = (ms: number | undefined) => new Promise(res => setTimeout(res, ms));

      

        const player_2 =  message.mentions.users.first();

        if(!player_2)
        {
            return;
        }else if (player_2.bot)
        {
            return;
        }else if (player_2.id === message.author.id)
        {
            return;
        }

        const collector = new DISCORDJS.MessageCollector(channel,{time: 30000000});
        if (channel instanceof DISCORDJS.TextChannel)
        { 
            const game_session = new RUSSIAN_ROULETTE(message.author,player_2,channel,collector)

            collector.filter = (reply) => reply.author.id === player_2.id //csak a masodik ember tudjon valaszolni, elfogadni
            
            channel.send(`<@${player_2.id}> \n
                            ${message.author.username} szeretne veled orosz rulettezni veled. Elfogadaod? `)
            

            collector.on("collect", async (message) => 
            {
                if(message.content === "igen" || message.content === "Igen" || message.content === "ja")
                {
                    for (let i = 0; i < 6; i++)
                    {
                        await delay(5000);

                        channel.send({embeds:[game_session.Generate_Embed()]})
                        const ember = game_session.Main()

                        if (ember)
                        {
                            channel.send({embeds: [game_session.Death_Embed(ember)]})
                            collector.stop();
                            
                            if (args.includes("kick"))
                            {
                                setTimeout(() => {const guild = message.guild;
                                    guild?.members.kick(ember)}, 500)
                            }
                            break;
                        }

                    }
                }else{
                    collector.stop();
                }
            })





        }
        

    }


} as ICommand;