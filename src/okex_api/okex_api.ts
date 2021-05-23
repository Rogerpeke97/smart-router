import {Pool } from 'pg';
import express, { json } from 'express';
import jsonwebtoken from 'jsonwebtoken';
import { timeStamp } from 'console';
interface AuthBody { 
    op: string,
    args: Array<{
        apiKey: string,
        passphrase: string,
        timestamp: string,
        sign: string  
    }>;
}
export class Okex{
    private pool: Pool;
    private body: AuthBody;
    private secretKey: string;
    constructor(authbody: AuthBody, secretkey: string){
        this.body = authbody;
        this.secretKey = secretkey;
        this.pool = new Pool({
            user: process.env.DB_USER,
            host: process.env.DB_HOST,
            database: process.env.DB_DATABASE,
            password: process.env.DATABASE_PASSWORD,
            port: 5432,
        });
        for(let i in this.body.args[0]){
            if(i === 'timestamp'){
                this.body.args[0][i] = `${Date.parse(this.body.args[0][i]) / 1000}`;
            }
            if(i === 'sign'){
                this.body.args[0][i] = require("crypto").createHmac("sha256", this.secretKey).update(this.body.args[0][i] +'GET'+'/users/self/verify').digest("base64");
            }
        }
    }


}