import DISCORDJs, {MessageActionRow,MessageSelectMenu, User, TextChannel, MessageEmbed} from 'discord.js';

function asd(b: number)
{
    return b * b
}


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

    private decision( first: string, second: string) : User | void
    {
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
                                        description: `Veri Ezeket: ${RPS.MAP.get(key)?.join(" ")}`,
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
                        .addField("Arra kérnélek most meg, hogy válasszál a listábol egyet, az elenfeled is jelenleg ugyanezt látja", `Jelenlegi ellenfeled: ${enemy.username} `, false)
                        .addField("Segitség képpen itt van egy rajz a lehetséges választásokról", "A nyil mindig afelé mutat amit megver", false)
                        .setImage("attachments://assets/imgs/PCB_NYAK.png")
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
}


export default RPS