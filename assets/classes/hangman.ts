//nincs megirva a hp
import DISCORDJs from "discord.js";
import hangman from "../jsons/hangman_words.json";


class Hangman
{
    // private words = [
    //     ["Game Title", ["Call of Duty"]]
    //     ]

    public static ALL_WORD: string[] = Array.from(Object.keys(hangman));

    private words:object = hangman;

    private imgs: string[] =[
        "https://i.imgur.com/36UF2QQ.png",
    "https://i.imgur.com/VMM5Tfk.png",
    "https://i.imgur.com/zbO2p5i.png",
    "https://i.imgur.com/5uECSJO.png",
    "https://i.imgur.com/Z4Poz4o.png",
    "https://i.imgur.com/pwknQkS.png",
    "https://i.imgur.com/M4giPIQ.png",

    ]
        
    private current_hp: number = 6;     
    private TOPIC:string = "";
    private CHOOSEN_GAME:string = "";
    private GUESSED_LETTERS:Set<string> = new Set<string>();
    
    protected CENSORED_WORD:any[];
    

    public WON: boolean = false;
    
    
    
    private getRandomProperty(obj : object) :string{
        const keys = Object.keys(obj);
      
        return keys[Math.floor(Math.random() * keys.length)];
      }


    constructor(protected player: DISCORDJs.User, private channel:DISCORDJs.TextChannel, private collector:DISCORDJs.MessageCollector, theme?: string)
    {
        //player-tol fogja csak kapni az inputot
        //channel-re fogja kuldeni a hibajelento uzenetet (pl hibas szoveg)
        //collector-t fogja leallitani ha kell
        if (theme)
        {
            this.TOPIC = theme;
        }
        else if (!theme)
        {
            
            const idk:string  = this.getRandomProperty(this.words).toString();
            this.TOPIC = idk;
        }
        const CHOOSEN_GAME_list = (this.words as any)[this.TOPIC];
        this.CHOOSEN_GAME = CHOOSEN_GAME_list[Math.floor(Math.random()*CHOOSEN_GAME_list.length)]
        

        
        this.CENSORED_WORD = this.CHOOSEN_GAME.split("").map((letter) => {
            if(letter === " ")
            {
                return " "
            }
            else if (letter === "-"){
                return "-";
            }
            else{
                return "#"
            }
        })

        
        

        
            
    }
    
    
    

    public generate_embed():DISCORDJs.MessageEmbed{

                let sent_embed = new DISCORDJs.MessageEmbed()
                                              .setAuthor("11.E rulez", "https://cdn.discordapp.com/attachments/986288476834123799/987469337357062204/Nev11erulezelen.png")
                                              .setColor("#0099ff")
                                              .setTimestamp()
                                              .addField(this.CENSORED_WORD.join(" "), "⠀⠀⠀⠀⠀⠀⠀")
                                              .addField("⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀", "⠀⠀⠀⠀⠀⠀⠀")
                                              .addField("⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀", "⠀⠀⠀⠀⠀⠀⠀")
                                              .addField("⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀", "⠀⠀⠀⠀⠀⠀⠀")
                                              .addField(!Array.from(this.GUESSED_LETTERS).join("    ") ? `Nincs még` : Array.from(this.GUESSED_LETTERS).join("    "), "Tippelt Betűk")
                                              .setImage(this.imgs[this.current_hp])
                                              .setFooter(`A témája ${this.TOPIC}`)

                console.log(this.CENSORED_WORD.join(" "));
                console.log(this.CENSORED_WORD)
                return sent_embed;
    }
    
    public get_Input(letter:string)
    {
        
        if (letter.length === 1 && letter !== " ")
        {
            if (this.CHOOSEN_GAME.includes(letter) || this.CHOOSEN_GAME.includes(letter.toUpperCase()))
            {
                this.GUESSED_LETTERS.add(letter.toUpperCase());
                
                this.CENSORED_WORD = this.CHOOSEN_GAME.split("").map((letter) =>
                {   
                    if (letter === " "){
                        return " ";
                    }
                    else if ( letter === "-")
                    {
                        return "-";
                    }
                    else if (!this.GUESSED_LETTERS.has(letter.toUpperCase()))
                    {
                        return "#";
                    }
                    else{
                        return letter.toUpperCase();
                    }

                })

                if (this.CENSORED_WORD.join("") === this.CHOOSEN_GAME)
                {
                    this.channel.send("Eltaláltad")
                    this.collector.stop();
                    this.channel.send({embeds:[this.generate_embed()]})
                    return;
                }

                this.channel.send({embeds:[this.generate_embed()]})
                
            }
            else{
                this.GUESSED_LETTERS.add(letter.toUpperCase());

                this.current_hp--;

                if (this.current_hp === 0){
                    this.collector.stop();
                    this.channel.send(`A játékosidőnek vége \n A szavad ez volt ${this.CHOOSEN_GAME}`);
                    this.channel.send({embeds:[this.generate_embed()]});
                    
                    return;
                }

                this.channel.send({embeds:[this.generate_embed()]});
            }
            
        }else if (letter === this.CHOOSEN_GAME || letter === this.CHOOSEN_GAME.toLocaleLowerCase())
        {
            this.channel.send("Eltalaltad");
            this.collector.stop();
        }else{
            this.channel.send("Csak egy betut adjal meg");
            //console.log("Csak egy betut adjal meg");
        }
        
        if (this.CENSORED_WORD.join("") === this.CHOOSEN_GAME )
        {
            this.channel.send("NYERTEL")
        }
        
    }
    
    public get_censored_word():string[]
    {
        return this.CENSORED_WORD;
    }
    
    
}

export default Hangman;