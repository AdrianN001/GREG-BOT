import {dbQuery} from "./database"
     
dbQuery(`SELECT * FROM roulette;`).then(player_model => {
   

    console.log(player_model[0].Time_Played);
    
})
