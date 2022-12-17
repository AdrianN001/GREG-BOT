import { ICommand } from 'wokcommands';
// @ts-ignroe
import { joinVoiceChannel, createAudioResource, createAudioPlayer } from "@discordjs/voice"





export default {
    category: 'soundboard',
    name: 'play',
    description: 'Egy adott file-t lejatszik',



    callback: ({ message, args }) => {
        if (!message.guild?.id || !message.member!.voice.channel!.id) {
            message.reply("HIBA");
            return;
        }
        const connection = joinVoiceChannel({
            channelId: message.member!.voice.channel!.id,
            guildId: message.guild!.id,
            adapterCreator: message.guild!.voiceAdapterCreator,
        });

        const file: string | undefined = message.attachments.first()?.url;
        if (!file) { message.reply("Nem lett hang fajl hozzacsatolva az üzenethez"); return; }
        const resource =
            createAudioResource(file!, {
                inlineVolume: true
            })

        const player = createAudioPlayer();
        connection.subscribe(player)
        player.play(resource)
    }


} as ICommand;