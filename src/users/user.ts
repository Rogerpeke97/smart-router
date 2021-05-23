import {Pool } from 'pg';
import express, { json } from 'express';
import {Jwt} from './jwt';


export class User_props extends Jwt{
    pool: Pool;
    app: express.Application;
    constructor(){
        super();
        this.pool = new Pool({
            user: process.env.DB_USER,
            host: process.env.DB_HOST,
            database: process.env.DB_DATABASE,
            password: process.env.DATABASE_PASSWORD,
            port: 5432,
        });
        this.app = express();
    }
    get_user_data(response: express.Response, jwt: string){
        if(this.validate(response, jwt)){
            this.pool.query('SELECT * FROM find_user($1)', [this.decoded_user.data], (err, res) => {
                if(err){
                    console.log(err);
                }
                else{
                    response.send(res.rows[0].find_user);
                }
                this.pool.end();
            });
        }
    }
    create_user(new_user_data: JSON, response: express.Response){
        this.pool.query('SELECT * FROM insert_user($1)', [new_user_data], (err, res) => {
            if(err){
                response.send(err);
            }
            else{
                this.sign(response, res.rows[0].insert_user);
            }
            this.pool.end()
        });
    }
}