import DISCORDJS, { Intents } from 'discord.js';
import PATH from 'path';
import dotenv from 'dotenv';
import WOKCommands from 'wokcommands';
dotenv.config();


const client = new DISCORDJS.Client(
    {
        intents:[
            Intents.FLAGS.GUILDS,
            Intents.FLAGS.GUILD_MESSAGES,
        ]
    }
);


const TILTOTT_SZAVAK: string[] = ['whisperton','wisperton','lessz','jukas',"whisperton",
"wisperton",
"wh1sp3rt0n",
"wh1sperton",
"whisp3rton",
"whispert0n",
"wh1spert0n",
"wh1sp3rton",
"whisp3rt0n",
"sutogoston",
"viszperton",
"Viperton",
"csendeston",
"shhton",
"csendeston",
"halkanbeszeloton",
"w h i s p e r t o n"
]


client.on('ready', () => {
    console.log('I am ready!');
    client.user?.setActivity({type: "PLAYING", name: "League Of Legends"});
    client.user?.setPresence({
        status:"idle"
    })

    //guild 
    //global
    const guildId: string = '986288476834123796';
    const guild = client.guilds.cache.get(guildId);
    let commands;

    if (guild) {
        commands = guild.commands;
    }
    else {

        commands = client.application?.commands;
    }


    new WOKCommands(client,
        {
            commandDir:PATH.join(__dirname, 'commands'),
            typeScript:true,
        });

    new WOKCommands(client,
            {
                commandDir:PATH.join(__dirname, 'commands/image_manipulator'),
                typeScript:true,
            });
    
});




client.on('interactionCreate',
async (interaction) => {
    if (!interaction.isCommand())
    {
        return;

    }

    const { commandName, options } = interaction;

   
});

client.on('messageCreate', (message): void => 
{
    if (message.content.includes("<@323149666336374797>") || message.content == "<@323149666336374797>")
    {

        message.react("🇰");
        message.react("🇾");
        message.react("🇸");
        
    }
    
    //tiltott szavak miatt bannolas
    TILTOTT_SZAVAK.forEach(element => {
        if (message.content.includes(element))
        {
            const memberTarget = message.guild?.members.cache.get(message.author.id);
            if (memberTarget)
            {
                memberTarget.kick();
            }
        }
    });

    if(message.content.startsWith("!bot_status"))
    {
        const args = message.content.split(" ").slice(1);
        if (args)
        {

            const status: string = message.content.split(" ").slice(1).join(" ");
            client.user?.setActivity({type: "PLAYING", name: status});
        }

    }
})

client.on('messageCreate',
(message) => 
{
    if(message.content === 'ping')
    {
        message.reply('pong');
    }
    
});


client.login(process.env.DISCORD_TOKEN);