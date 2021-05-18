import {Pool } from 'pg';

export class User_props{
    user: string;
    pool: Pool;
    // data: JSON;
    constructor(user: string){
        this.user = user;
        this.pool = new Pool({
            user: process.env.PGUSER,
            host: process.env.PGHOST,
            database: process.env.PGDATABASE,
            password: process.env.PGPASSWORD,
            port: 5432
        });
        this.assign_values();
    }
    get_user_info(){
        return this.user;
    }
    assign_values(){
        this.pool.query(`SELECT find_user(${this.user})`, (err, res) => {
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