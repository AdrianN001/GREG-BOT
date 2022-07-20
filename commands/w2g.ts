import { ICommand } from 'wokcommands';
import dotenv from "dotenv";
import axios, { AxiosResponse } from 'axios';
import { MessageEmbed } from 'discord.js';
dotenv.config();




export default {
    category: 'Fun Commands',
    name: 'w2g',
    description: 'Letrehoz egy W2G szobat',



    callback: async ({message}) =>  {
        const URL:string = "https://w2g.tv/rooms/create.json";

        const header1 = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        };

        const body1: object =
            {"w2g_api_key": process.env.W2GTOKEN,"share": "https://youtu.be/BprlvWJoeAM","bg_color": "#00ff00","bg_opacity": 50 };
        

        const response:AxiosResponse = await axios.post(URL,body1);
        const streamkey:string = await response.data["streamkey"];
        
    


        const W2GSZOBALINK = `https://w2g.tv/rooms/${streamkey}`;


        const link_embed = new MessageEmbed()
                            .setColor("#6a00ff")
                            .setTitle("Random Watch 2 Gether szoba")
                            .addField("Szoba Linkje",W2GSZOBALINK,false)
                            .setAuthor("11.E rulez", "https://cdn.discordapp.com/attachments/986288476834123799/987469337357062204/Nev11erulezelen.png")
                            .setTimestamp()
                            .setFooter(`Jó Szorakozást: ${message.author.username}`)
                            .setImage("https://w2g.tv/assets/w2g-logo-e3c008bf59b955e0b2e893537a52513fefcf9295e3eaa6926320726a11a50370.png")

        message.reply({embeds:[link_embed]})

    }


} as ICommand;
