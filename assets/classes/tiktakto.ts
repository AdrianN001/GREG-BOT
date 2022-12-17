import DISCORDJs, {User} from 'discord.js';

class TikTakToe {
    private board:Map<string, string[]> = new Map<string, string[]>();
    private players:User[] = [];
    private currentPlayer:User;
    public Winner:any;

    private channel:DISCORDJs.TextChannel;

    private input_collector:DISCORDJs.MessageCollector; 


    constructor(private player_1:User, private player_2:User, channel:DISCORDJs.TextChannel, collector:DISCORDJs.MessageCollector) {
        this.players = [player_1, player_2];
        if (Math.random() >= 0.5){
            
            this.currentPlayer = player_1;
        }
        else{
            this.currentPlayer = player_2;
        }

        this.board.set("A", ["A1", "A2", "A3"]);
        this.board.set("B", ["B1", "B2", "B3"]);
        this.board.set("C", ["C1", "C2", "C3"]);

        this.channel = channel;
        this.input_collector = collector;
    }


    public generateStartingEmbed():DISCORDJs.MessageEmbed{
        const starting_embed = new DISCORDJs.MessageEmbed()
        .setAuthor("11.E rulez", "https://cdn.discordapp.com/attachments/986288476834123799/987469337357062204/Nev11erulezelen.png")
        .setColor("#0099ff")
        .setTimestamp()
        .addFields(
            [
                {name:"Köszöntünk a játékban",value :" ⠀⠀⠀⠀⠀",inline:false},
                {name: "Játékosok", value:"⠀⠀⠀⠀",inline:false},
                {name:`${this.player_1.username}`, value:"mint O", inline:true},
                {name:`${this.player_2.username}`, value:"mint X", inline:true},

            ],
            )
        .setFooter("TikTakToe", "https://cdn.discordapp.com/attachments/986288476834123799/987469337357062204/Nev11erulezelen.png");
        
        return starting_embed;
    }

    public generate_Round_Embed():DISCORDJs.MessageEmbed{
        const round_embed = new DISCORDJs.MessageEmbed()
                                        .setColor(this.currentPlayer === this.getPlayers()[1] ? "#ff0000" : "#e1ff00")
                                        .setAuthor("11.E rulez", "https://cdn.discordapp.com/attachments/986288476834123799/987469337357062204/Nev11erulezelen.png")
                                        .setTitle("Amőba")
                                        .addField(`${this.currentPlayer.username}`,"Aktuális játékos",  false)
                                        .addFields([
                                            {value:"A", name:`${this.board.get("A")![0]}        ${this.board.get("A")![1]}      ${this.board.get("A")![2]}`, inline:false},
                                            {value:"B", name:`${this.board.get("B")![0]}        ${this.board.get("B")![1]}      ${this.board.get("B")![2]}`, inline:false},
                                            {value:"C", name:`${this.board.get("C")![0]}        ${this.board.get("C")![1]}      ${this.board.get("C")![2]}`, inline:false}
                                        ])
                                        .setTimestamp()
        return round_embed;
                                        

    }

    public generate_Ending_Embed():DISCORDJs.MessageEmbed{
        this.change_current_player();
        const ending_embed = new DISCORDJs.MessageEmbed()
                                            .setColor(this.currentPlayer === this.getPlayers()[1] ? "#ff0000" : "#e1ff00")
                                            .setTitle("Vége a játéknak")
                                            .addField(this.currentPlayer.username, "A győztes", false)
                                            .setImage(this.currentPlayer.avatarURL()!)



        return ending_embed;
    }


    public getCurrentPlayer():User{
        return this.currentPlayer;
    }
    public getPlayers():User[]{
        return this.players;
    }

    public UpdateMap(row:string, column: number):void{
        this.change_current_player(); //off-syncronized volt a játék, ezért kell az hogy ez itt legyen
        let value: "X"|"O";

        if (this instanceof TikTakToe && this.board.has(row)){

            if (this.currentPlayer == this.player_1){
                value = "X";
            }
            else{
                value = "O";
            }

            const new_row = this.board.get(row)!;
            if (new_row[column] !== "X" && new_row[column] !== "O")
            {
                new_row![column] = value;
                this.board.set(row, new_row!);

                

                if (this.checkWin()){
                
                 this.input_collector.stop();
            
                };

                

            }
            else{
                this.channel.send("Ez a mező már foglalt!");
            }
            
        }

        
    }

    public change_current_player():void{
        if (this.currentPlayer === this.player_1)
        {
            this.currentPlayer = this.player_2;
        }
        else if (this.currentPlayer === this.player_2)
        {
            this.currentPlayer = this.player_1;
        }
    }


    public getBoard():Map<string, string[]>{
        return this.board;
    }
    public check_draw():boolean
    {
         

        if (this.getBoard().get("A")?.includes("A1") || this.getBoard().get("A")?.includes("A2") || this.getBoard().get("A")?.includes("A3")){
            
            return false;
        }
        else if (this.getBoard().get("B")?.includes("B1") || this.getBoard().get("B")?.includes("B2") || this.getBoard().get("B")?.includes("B3")){
            
            return false;
        }
        else if (this.getBoard().get("C")?.includes("C1") || this.getBoard().get("C")?.includes("C2") || this.getBoard().get("C")?.includes("C3")){
            
            return false;
        }
        else{
            this.input_collector.stop();
            return true;
        }
        
        

    }

    public checkWin():boolean{
        let win = false;
        
        for (let [key, value] of this.board) // horzorzontal check
        {
            if (value[0] == "X" && value[1] == "X" && value[2] == "X"){
                win = true;
                this.Winner = this.player_1;
                return win;
                
                
            }
            else if( value[0] == "O" && value[1] == "O" && value[2] == "O"){
                win = true;
                this.Winner = this.player_2;
                return win;
            }

        
        }



        for (let i = 0; i < 3; i++) // vertical check
        {
            
            if (this.board.get("A")![i] == "X" && this.board.get("B")![i] == "X" && this.board.get("C")![i] == "X"){
                win = true;
                this.Winner = this.player_1;
                return win
            }else if (this.board.get("A")![i] == "O" && this.board.get("B")![i] == "O" && this.board.get("C")![i] == "O"){
                win = true;
                this.Winner = this.player_2;
                return win;
            }
        
        }

        //diagonal check 1
        if (this.board.get("A")![0] == "X" && this.board.get("B")![1] == "X" && this.board.get("C")![2] == "X"){
            win = true;
            return win;
        }
        //diagonal check 2
        if (this.board.get("A")![2] == "X" && this.board.get("B")![1] == "X" && this.board.get("C")![0] == "X"){
            win = true;
            return win;
        }


        return win;
    }



    
   


};


export default TikTakToe;