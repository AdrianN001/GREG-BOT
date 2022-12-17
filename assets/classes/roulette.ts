import DISCORDJs, {Collector, User} from 'discord.js';
import {dbQuery} from '../database';

class ROULETTE
{
    //#region ATTRIBUTES
    private player:User;

    private money_owned!:number;

    private first_game:string | undefined;

    public the_winner_num: number;

    private time_played!:number;

    private is_new!: boolean;

    //#endregion

    constructor(user_1:User,private player_id:string,private channel:DISCORDJs.TextChannel, private collector:DISCORDJs.MessageCollector)
    {
        this.player = user_1;

        this.the_winner_num = Math.floor(Math.random() * (36 + 1));

        
            
            
        dbQuery(`SELECT * FROM roulette WHERE ID = '${player_id}';`).then(player_model => {
            this.money_owned = player_model[0]?.Money;
               
            this.time_played = player_model[0]?.Time_Played;

            console.log(this.money_owned,this.time_played)

            if(typeof this.money_owned == "number" && typeof this.time_played == "number" )
            {
                

                this.is_new = false;

            }
            else if (typeof this.money_owned == 'undefined' )
            {
                this.money_owned = 30000;
                this.time_played = 1;

                

                (async () => {await dbQuery(`INSERT INTO roulette (ID, Time_Played,Money) VALUES('${user_1.id}',1,30000) ;`);})();
                
                this.is_new = true;

        }
             
        });
    }

    public generate_starting_embed()    
    { // van egy problem, miszerint konkretan a constructor utan lett meghivva ez a method, es ezert nincs ideje inicializalni a "This.money_owned"-et
        
        dbQuery(`SELECT * FROM roulette WHERE ID = '${this.player_id}';`).then(data => {this.money_owned = data[0].Money; this.time_played = data[0].Time_Played; console.log(data);
            let starting_embed = new DISCORDJs.MessageEmbed()
            .setAuthor("11.E rulez", "https://cdn.discordapp.com/attachments/986288476834123799/987469337357062204/Nev11erulezelen.png")
            .setColor("#0099ff")
            .setTimestamp()
            .setTitle("Roulette")
            .addFields(
                [
                    {value:"Köszöntünk a játékban",name :this.player.username,inline:false},
                    {value:"Jelenlegi Pénzösszeged", name: `${this.money_owned ?? data[0].Money}`, inline:true},
                    {value:"Ennyiszer Játszottál a Bottal", name:`${this.time_played ?? data[0].Time_Played}`,inline:true}
                    
    
                ],
                )
                
            .setImage("https://thumbs.dreamstime.com/b/casino-roulette-wheel-chips-green-table-reali-vector-illustration-realistic-objects-d-place-text-eps-78054777.jpg")
            .setFooter("Roulette", "https://cdn.discordapp.com/attachments/986288476834123799/987469337357062204/Nev11erulezelen.png");
                
                return starting_embed;
            })

        

    }
    public generate_guide(): DISCORDJs.MessageEmbed
    {
        const guide_embed = new DISCORDJs.MessageEmbed()
                                         .setAuthor("11.E rulez", "https://cdn.discordapp.com/attachments/986288476834123799/987469337357062204/Nev11erulezelen.png")
                                         .setColor("#0099ff")
                                         .setTimestamp()
                                         .setTitle("Útmutató")
                                         .addField(`A következő üzenetednek, ${this.player.username} igy kéne kinéznie`, "⠀⠀⠀⠀⠀ ⠀⠀⠀⠀⠀ ⠀⠀⠀⠀⠀", false)
                                         .addField("______________________________", "⠀⠀⠀⠀⠀ ⠀⠀⠀⠀⠀⠀⠀ ⠀⠀",false)
                                         .addField("{FELTETT PÉNZ} {LÉPÉS}", "A lépések a következők:")
                                         .addFields(
                                            {name: "fix {szám} {szám2} {szám3} ... ", value:"1-től 36-ig kijelőlhetsz minimum 1, maximum 6 helyet", inline:true},
                                            {name: "tucat {1-3}", value:"Ilyenkor az első/második/harmadik 12 helyre teszel fel", inline:true},
                                            {name: "oszlop {1-3}",value: "____________________", inline: true},
                                            {name: "'1-18'", value: "Ilyenkor az első 18 helyre teszel fel",inline: false},
                                            {name: "'19-36'",value:"Ilyenkor a második 18 helyre teszel fel", inline: true},
                                            {name: "'piros' VAGY 'fekete'" ,value:"Az összes piros VAGY fekete", inline: true},
                                            {name: "'páros' VAGY 'páratlan'", value: "Az összes páros VAGY páratlan", inline: true}


                                         )
                                         .setImage("https://gamblingbaba.com/wp-content/uploads/2021/03/european-roulette-table.png")
        return guide_embed;
    }



    public  HandleInput(input: string):void
    {
        const [bet_Strign,...argumentumok] = input.split(" ");

        const bet:number = parseInt(bet_Strign);
        
        let nyert = false
        

        let ratio = 0;

        if (bet > this.money_owned)
        {
            this.channel.send("HIBA : \n Nem tehetsz fel több pénzet a sajátodénál")
            this.collector.stop();
            return;
        }



        switch(argumentumok[0])
        {
            case "fix":
                const szamok:number[] = argumentumok.map(elem => parseInt(elem));

                szamok.shift(); //eltunjon a "fix"

                const megadott_Szamok_mennyisege = szamok.length ; 

                console.log(argumentumok);
                console.log(szamok);

                if (szamok.includes(this.the_winner_num))
                {
                    //MEGNYERTE
                    
                    

                    switch (megadott_Szamok_mennyisege)
                    {
                        case 1:
                            ratio = 35; 
                            break;
                        case 2: 
                            ratio = 17;
                            break;
                        case 3:
                            ratio = 11;
                            break;
                        case 4:
                            ratio = 8;
                            break;
                        case 5:
                            ratio = 6;
                            break;
                        case 6:
                            ratio = 5;
                            break;

                    }

                    nyert = true;
                    
                    
                }
                break;
            case "tucat":
                const tucat = parseInt(argumentumok[1]);
                
                if (tucat < 4 && tucat > 0)
                {
                    const lehetseges_Szamok:number[] = [1,2,3,4,5,6,7,8,9,10,11,12].map(szam => szam + (tucat * 12) - 12)

                    if (lehetseges_Szamok.includes(this.the_winner_num))
                    {

                        ratio = 2;

                        nyert = true;
                    }else{
                        nyert = false;
                    }
                }else 
                {
                    this.channel.send("Érvénytelen")
                }
                break;
            case "oszlop":

                const oszlop = parseInt(argumentumok[1]);
                
                if (oszlop < 4 && oszlop > 0)
                {

                    let lehetseges_Szamok:number[] = Array.from(Array(36).keys()).map(element => element + 1)
                                                                                 .filter(elem => elem % 3 == 1)
                                                                                 .map(szam => szam + oszlop - 1);
                    
                    if (lehetseges_Szamok.includes(this.the_winner_num))
                    {
                        
                        

                        ratio = 2;
                        nyert = true
                    }else{
                        
                        nyert = false
                    }
                }else{
                    //HIBA
                    this.channel.send("Érvénytelen")
                }
            
                break;
            case "1-18":
                let lehetseges_Szamok:number[] = Array.from(Array(36).keys()).map(element => element + 1)
                                                                             .slice(0,18)
                if (lehetseges_Szamok.includes(this.the_winner_num))
                { 
                    
                    
                    ratio = 1
                    nyert =true;
                }
                break;
            case "19-36":
                let lehetseges_Szamok_2:number[] = Array.from(Array(36).keys()).map(element => element + 1)
                                                                             .slice(19,36)
                if (lehetseges_Szamok_2.includes(this.the_winner_num))
                {
                    
                        
                    nyert = true;
                    ratio = 1
                }
                break;
            case "páros":
                let lehetseges_Szamok_3:number[] = Array.from(Array(36).keys()).map(element => element + 1)
                                                                               .filter(element => element % 2 == 0)
                if (lehetseges_Szamok_3.includes(this.the_winner_num))
                {
                    nyert = true;
                        
                    
                    ratio = 1
                }
                break;
            case "páratlan":
                let lehetseges_Szamok_4:number[] = Array.from(Array(36).keys()).map(element => element + 1)
                                                                               .filter(element => element % 2 == 1)
                    if (lehetseges_Szamok_4.includes(this.the_winner_num))
                    {
                        
                        nyert = true;
                        ratio = 1
                    }
                break;
            case "piros":
                let lehetseges_Szamok_5:number[] = [1,3,5,7,9,12,14,16,18,19,21,23,25,27,30,32,34,36]

                if (lehetseges_Szamok_5.includes(this.the_winner_num))
                    {
                        
                        nyert = true;
                        ratio = 1
                    }
                break;
            


            case "fekete":
                let lehetseges_Szamok_6:number[] = [2,4,6,8,10,11,13,15,17,20,22,24,26,28,29,31,33,35]

                if (lehetseges_Szamok_6.includes(this.the_winner_num))
                    {
                        
                        nyert = true    
                        
                        ratio = 1
                    }
                break;

        }
       
        if (!nyert){this.money_owned -= bet;};
        
        

        this.money_owned += bet * ratio; // ha nyert akkor a ratio az nagyobb lesz mint 0 

        console.log(ratio);


        if (nyert)
        {
            const embed_nyert = new DISCORDJs.MessageEmbed()
                                            .setImage("https://i.pinimg.com/564x/bb/19/2d/bb192d00960abc2efa068122e8fd44d8.jpg")
                                            .setTimestamp()
                                            .setAuthor("11.E rulez", "https://cdn.discordapp.com/attachments/986288476834123799/987469337357062204/Nev11erulezelen.png")
                                            .setColor("#10ebbb")
                                            .setTitle("Nyertél")
                                            .addField(`${bet * ratio}`, "Ennyit nyertél",false)
                                            .addField("______________________________", "⠀⠀⠀⠀⠀ ⠀⠀⠀⠀⠀⠀⠀ ⠀⠀",false)
                                            .addField(this.money_owned.toString(), `Jelenlegi ennyi pénzed van`, false)
                                            .addField("______________________________", "⠀⠀⠀⠀⠀ ⠀⠀⠀⠀⠀⠀⠀ ⠀⠀",false)
            this.channel.send({embeds:[embed_nyert]})
                                          
        }else if (!nyert)
        {
            const embed_nyert = new DISCORDJs.MessageEmbed()
                                            .setImage("https://clipart.world/wp-content/uploads/2021/04/Sad-Face-Emoji-clipart-6.png")
                                            .setTimestamp()
                                            .setAuthor("11.E rulez", "https://cdn.discordapp.com/attachments/986288476834123799/987469337357062204/Nev11erulezelen.png")
                                            .setColor("#000000")
                                            .setTitle("Nem Nyert")
                                            .addField(`${bet}`, "Ennyit buktál",false)
                                            .addField("______________________________", "⠀⠀⠀⠀⠀ ⠀⠀⠀⠀⠀⠀⠀ ⠀⠀",false)
                                            .addField(this.money_owned.toString(), `Jelenlegi ennyi pénzed van`, false)
                                            .addField("______________________________", "⠀⠀⠀⠀⠀ ⠀⠀⠀⠀⠀⠀⠀ ⠀⠀",false)
            this.channel.send({embeds:[embed_nyert]})
        }
        

        //update database
        (async () => {
            await dbQuery(`
            UPDATE roulette SET Money = ${this.money_owned} WHERE ID = ${this.player_id};`)
        })()


        this.collector.stop()
    }
}
export default ROULETTE