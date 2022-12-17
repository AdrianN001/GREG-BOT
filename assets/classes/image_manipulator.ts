const {Canvas}  = require( "canvacord" );
import { User } from "discord.js";



enum MODS
{
    AFFECT,
    BEAUTIFUL,
    BED,
    CHANGE_MY_MIND,
    DISTRACTED_BF,
    FACEPALM,
    FUSE,
    GREYSCALE,
    HITLER,
    INVERT,
    JAIL,
    JOKE_OVER_HEAD,
    KISS,
    OHNO,
    OPINION,
    RAINBOW,
    RIP,
    SHIT,
    SPANK,
    TRASH,
    TRIGGER,
    WANTED,
    WASTED,
    SLAP

}

class IMAGE_MANIPULATOR
{
    

    private avatar;

    private avatar2;

    private avatar3;

   

    constructor(user: User|string,private mod: MODS, private user2?:User, private user3?:User, private TEXT?:string)
    {
        if (user instanceof User)
        {
            this.avatar = user.displayAvatarURL({format: "png"});
        }else
        {
            this.avatar = user;
        }

        if (user2)
        {
            this.avatar2 = user2.displayAvatarURL({format:"png"});
        }
        if (user3)
        {
            this.avatar3 = user3.displayAvatarURL({format: "png"});
        }


    }

    public MAIN(): Promise<Buffer>
    {
        let image;
        switch (this.mod)
        {
            case 0:
                image = Canvas.affect(this.avatar);
                return image;
            case 1: return Canvas.beautiful(this.avatar);
            case 2: return Canvas.bed(this.avatar,this.avatar2);
            case 3: return Canvas.changemymind(this.TEXT);
            case 4: return Canvas.distracted(this.avatar,this.avatar2,this.avatar3);
            case 5: return Canvas.facepalm(this.avatar);
            case 6: return Canvas.fuse(this.avatar,this.avatar2);
            case 7: return Canvas.greyscale(this.avatar);
            case 8: return Canvas.hitler(this.avatar);
            case 9: return Canvas.invert(this.avatar);
            case 10: return Canvas.jail(this.avatar,true);
            case 11: return Canvas.jokeOverHead(this.avatar);
            case 12: return Canvas.kiss(this.avatar,this.avatar2);
            case 13: return Canvas.ohno(this.TEXT);
            case 14: return Canvas.opinion(this.avatar,this.TEXT);
            case 15: return Canvas.rainbow(this.avatar);
            case 16: return Canvas.rip(this.avatar);
            case 17: return Canvas.shit(this.avatar);
            case 18: return Canvas.spank(this.avatar,this.avatar2);
            case 19: return Canvas.trash(this.avatar);
            case 20: return Canvas.trigger(this.avatar);
            case 21: return Canvas.wanted(this.avatar);
            case 22: return Canvas.wasted(this.avatar);
            case 23: return Canvas.slap(this.avatar,this.avatar2);
            default: return Canvas.burn(this.avatar,1);
           
                
        }
    }
}



export {IMAGE_MANIPULATOR, MODS};