import { Channel, MessageCollector, MessageEmbed, User } from "discord.js";

class RUSSIAN_ROULETTE
{
    private mag: string[]
 
    private current_player: User;
    
    constructor(private p1:User, private p2:User, private channel:Channel, private collector:MessageCollector, )
    {
        this.mag = this.Generate_Revolver_Mag();

        if (Math.random() >= 0.5){ //random,hogy ki kezdi
            
            this.current_player = p1;
        }
        else{
            this.current_player = p2;
        }

        
    }

    private Generate_Revolver_Mag() : string[]
    {
        let mag:string[] = [...Array(6)]

        const bullet = Math.floor(Math.random() * mag.length);
        
        mag[bullet] = "Bullet";

        return mag

    }

    public Main()
    {
        //loves
        const idk = this.mag.shift();

        

        if (idk == "Bullet")
        {
            return this.current_player;
        }


        if (this.current_player === this.p1)
        {
            this.current_player = this.p2;
        }else if (this.current_player === this.p2)
        {
            this.current_player = this.p1;
        }
    }

    public Generate_Embed() : MessageEmbed
    {
        
        const current_embed = new MessageEmbed()
                                .setTitle("Orosz Rulett")
                                .setTimestamp()
                                .setAuthor("11.E rulez", "https://cdn.discordapp.com/attachments/986288476834123799/987469337357062204/Nev11erulezelen.png")
                                .setColor("GREYPLE")
                                .addFields(
                                    [
                                        {name: this.p1.username, value:"Player 1", inline: true},
                                        {name: this.current_player === this.p1 ? "⠀⠀⠀⠀⠀⠀⠀<----⠀⠀⠀⠀⠀⠀⠀" : "⠀⠀⠀⠀⠀⠀⠀---->⠀⠀⠀⠀⠀⠀⠀⠀", value: "⠀⠀⠀A PISZTOLY NÁLA VAN", inline: true},
                                        {name: this.p2.username, value: "Player 2", inline: true},
                                        {name: `${(100 - this.calculate_chance()).toFixed(1)} %`,value:`${this.current_player.username} esélye a túlélésre`,inline:false},

                                    ]
                                )
        return current_embed;
    }

    public Death_Embed(dead_one:User):MessageEmbed
    {
        const death_embed = new MessageEmbed()
                                .setTitle("Az Orosz Rulett Győztese")
                                .setTimestamp()
                                .setAuthor("11.E rulez", "https://cdn.discordapp.com/attachments/986288476834123799/987469337357062204/Nev11erulezelen.png")
                                .setColor("GREY")
                                .addField(dead_one === this.p1? this.p2.username:this.p1.username, "⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀", false)
                                .setImage(dead_one === this.p1? this.p2.avatarURL()!:this.p1.avatarURL()!)
            
            return death_embed;

    }
    private calculate_chance():number 
    {
        const mag_size = this.mag.length;

        let chance_to_die = 1 / mag_size;
        
        return chance_to_die * 100;
    }
    
}
export default RUSSIAN_ROULETTE;