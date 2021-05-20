import {Pool } from 'pg';

export class User_props{
    user: string;
    pool: Pool;
    // data: JSON;
    constructor(user: string){
        this.user = user;
        this.pool = new Pool({
            user: process.env.DB_USER,
            host: process.env.DB_HOST,
            database: process.env.DB_DATABASE,
            password: process.env.DATABASE_PASSWORD,
            port: 5432
        });
        this.assign_values();
    }
    get_user_info(){
        return this.user;
    }
    assign_values(){
        this.pool.query('SELECT find_user($1::text)', [`${this.user}`], (err, res) => {
            if(err){
                console.log(err);
            }
            else{
                console.log(res);
            }
            this.pool.end()
          })
    }
}