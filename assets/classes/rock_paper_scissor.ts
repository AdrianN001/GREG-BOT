import DISCORDJs, {MessageActionRow,MessageSelectMenu, User, TextChannel, MessageEmbed} from 'discord.js';


class RPS
{
    private static MAP: Map< string, string[]> = new Map<string,string[]>([
        ["ball sack", ["Subaru Impreza", "我要吃掉你的家人", "pinakopter", "Floki", "papir"]],
        ["Csilla", ["ball sack"]],
        ["Floki", ["olló", "Csilla", "papir", "pinakopter"]],
        ["olló", ["ball sack", "papir", "Csilla"]],
        ["pinakopter", ["olló", "Csilla", "toyota", "我要吃掉你的家人", "papir"]],
        ["toyota",["Floki", "ball sack", "olló", "Subaru Impreza"]],
        ["papir", ["Csilla", "Subaru Impreza", "kő", "toyota"]],
        ["kő", ["toyota", "Floki", "olló", "Csilla", "ball sack", "Subaru Impreza"]],
        ["Subaru Impreza", ["pinakopter", "Csilla", "toyota", "olló"]], 
        ["我要吃掉你的家人", ["Floki", "toyota", "kő", "olló", "papir", "Subaru Impreza"]]
    ])

    constructor(private player_1: User, private player_2: User){}

    public static delay = (ms: number | undefined) => new Promise(res => setTimeout(res, ms));

    public async decision( first: string, second: string) :  Promise< User | void >
    {
        await RPS.delay(15000)

        console.log(first)
        console.log(second)

        if (first === second) {return }
        let win: boolean = RPS.MAP.get(first)!.includes(second)

        return win ? this.player_1 : this.player_2
    }

    public static generate_rows() : MessageActionRow
    {
        const row = new MessageActionRow()
                        .addComponents(
                            new MessageSelectMenu()
                            .setCustomId("Kő Papir Olló 2")
                            .setPlaceholder("Válassz egyet")
                            
                            .addOptions(
                                [...RPS.MAP.keys()].map((key: string) => 
                                {
                                    return {
                                        label: key,
                                        description: `Veri Ezeket: ${RPS.MAP.get(key)?.join(" ,")}`,
                                        value: key
                                    }
                                })
                            )
                        )
        return row
    }

    public generate_main_embed(enemy:User): MessageEmbed
    {
        const embed = new MessageEmbed()
                        .setTitle("Kő papir Olló")
                        .setAuthor("11.E Rulez")
                        .setColor("#0099ff")
                        .addField("Arra kérnélek most meg, hogy válasszál a listábol egyet, erre 7 másodperced van", `Jelenlegi ellenfeled: ${enemy.username} `, false)
                        .addField("Segitség képpen itt van egy rajz a lehetséges választásokról", "A nyil mindig afelé mutat amit megver", false)
                        .setFooter("az elenfeled is jelenleg ugyanezt látja")
                        //.setImage("attachments://assets/imgs/PCB_NYAK.png")
        return embed
    }

    public generate_starting_ember(): MessageEmbed
    {
        const starting_embed = new DISCORDJs.MessageEmbed()
        .setAuthor("11.E rulez", "https://cdn.discordapp.com/attachments/986288476834123799/987469337357062204/Nev11erulezelen.png")
        .setColor("#0099ff")
        .setTimestamp()
        .addFields(
            [
                {name: `${this.player_2.username} kihivott játszani téged játszani,`, value: this.player_2.username, inline: false},
                {name: `Amennyiben most egy Igen( / igen)-nel válaszolsz, úgy elfogadod a kihivást`, value: "⠀⠀⠀⠀⠀⠀⠀", inline: true}

            ],
            )
        .setFooter("Kő Papir Olló 2 Open BETA", "https://cdn.discordapp.com/attachments/986288476834123799/987469337357062204/Nev11erulezelen.png");
        
        return starting_embed;
    }

    public generate_draw(choices: Map<DISCORDJs.User, string>): MessageEmbed
    {
        const draw = new DISCORDJs.MessageEmbed()
                                .setTimestamp()
                                .setTitle("Döntetlen")
                                .setAuthor("11.E Rulez")
                                .setColor("DARK_BUT_NOT_BLACK")
                                .addFields(
                                    
                                        [...choices.keys()].map((key: DISCORDJs.User) => 
                                        {
                                            const x = {
                                                name : choices.get(key)!,
                                                value: key.username,
                                                inline: true
                                            }
                                            return x
                                        })
                                    
                                )
        return draw
    }

    public generate_winner(choices: Map<DISCORDJs.User, string>, winner: DISCORDJs.User): MessageEmbed
    {

        const winner_embed = new DISCORDJs.MessageEmbed()
                                        .setTimestamp()
                                        .setTitle(winner.username)
                                        .setDescription("Győzelem")
                                        .setThumbnail("https://cdn.discordapp.com/attachments/986288476834123799/987469337357062204/Nev11erulezelen.png")
                                        .setFooter("Kő Papir Olló 2 Open BETA", "https://cdn.discordapp.com/attachments/986288476834123799/987469337357062204/Nev11erulezelen.png")
                                        .addFields(
                                    
                                            [...choices.keys()].map((key: DISCORDJs.User) => 
                                            {
                                                const x = {
                                                    name : choices.get(key)!,
                                                    value: key.username,
                                                    inline: true
                                                }
                                                return x
                                            })
                                        
                                         )
                                        .setImage(winner.displayAvatarURL())
        return winner_embed
    }
}


export default RPS