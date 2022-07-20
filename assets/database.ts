const mysql = require( "mysql" );

const pool = mysql.createPool(
    {
        host:"eu-cdbr-west-02.cleardb.net",
        user:"ba84886ab781bb",
        password:"1fe3a3c1",
        database:"heroku_d3b5df38dc6b6e2",
        connectionLimit:10,
    }
)


// pool.query(
//     `CREATE TABLE roulette(
//         ID varchar(22),
//         Time_Played int,
//         Money int
//     );`
// );

// pool.query("SHOW TABLES;",(err:any,result:any,fields:any) => 
// {
//     return console.log(result)
// });

// pool.query("SHOW TABLES;",(err:any,result:any,fields:any) => {
//     return console.log(result)
// })
// pool.query("SELECT * FROM roulette;",(err:any,result:any,fields:any) => 
// {
//     return console.log(result)
// })
type QUERY_RESULT = void | object; // ha setter, akkkor void  \\ ha getter, akkor obj


function dbQuery(databaseQuery: string) : Promise<Array<any>>{ //nem stackoverflow-rol lett szedve + IMPLICIT KONVERZIO OBJECT ES INTERFACE KOZOTT 
    return new Promise(data => {
        pool.query(databaseQuery, (error:any, result:any) => { 
            if (error) {
                console.log(error);
                throw error;
            }
            try {
                
                data(result);

            } catch (error) {
                console.log("HIBA TORTENT, AMIKOR LE AKARTAK KERNI VALAMIT")
                data(result)
                throw error;
            }
        });
    });

}



export {dbQuery};