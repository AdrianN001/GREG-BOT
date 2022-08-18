import { ICommand } from 'wokcommands';




export default {
    category: 'Basic',
    name: 'say',
    description: 'Mond valamit',



    callback: ({message,args}) => {
        message.channel.send(args.join(" "))
    }


} as ICommand;