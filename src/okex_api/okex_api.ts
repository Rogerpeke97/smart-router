import {Pool } from 'pg';
import express, { json } from 'express';
import jsonwebtoken from 'jsonwebtoken';

export class okex{
    user: string;
    pool: Pool;
    data: JSON;
    app: express.Application;
    constructor(user: string){
        this.user = user;
        this.data = JSON.parse("{}");
        this.pool = new Pool({
            user: process.env.DB_USER,
            host: process.env.DB_HOST,
            database: process.env.DB_DATABASE,
            password: process.env.DATABASE_PASSWORD,
            port: 5432,
        });
        this.app = express();
    }
    get_user_info(){
        return this.user;
    }
    get_user_data(response: express.Response){
        this.pool.query('SELECT * FROM find_user($1)', [`${this.user}`], (err, res) => {
            if(err){
                console.log(err);
            }
            else{
                this.data = res.rows[0].find_user;
                response.send(this.data);
            }
            this.pool.end()
        });
    }
    create_user(new_user_data: JSON, response: express.Response){
        this.pool.query('SELECT * FROM insert_user($1)', [new_user_data], (err, res) => {
            if(err){
                response.send(err);
            }
            else{
                console.log(res.rows[0]);
                jsonwebtoken.sign(res.rows[0].insert_user, `${process.env.TOKEN_SECRET}`, (err: any, token: any) => {
                    if(err){
                        console.log(err);
                    }
                    else{
                        response.send({token});
                    }
                  });  
            }
            this.pool.end()
        });
    }
}