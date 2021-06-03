import {Pool } from 'pg';
import express, { json } from 'express';
import jsonwebtoken from 'jsonwebtoken';
import { timeStamp } from 'console';
export interface AuthBody { 
    op: string,
    args: Array<{
        apiKey: string,
        passphrase: string,
        timestamp: string,
        sign: string  
    }>;
}

export interface HeadersRequests{
    'Content-Type': string,
    'OK-ACCESS-KEY': string,
    'OK-ACCESS-SIGN': string,
    'OK-ACCESS-PASSPHRASE': string,
    'OK-ACCESS-TIMESTAMP': string,
    'x-simulated-trading': number
}
export class Okex{
    private pool: Pool;
    private header: HeadersRequests;
    private secretKey: string;
    private timestamp: string;
    constructor(authbody: HeadersRequests, secretkey: string){
        this.header = authbody;
        this.secretKey = secretkey;
        this.pool = new Pool({
            user: process.env.DB_USER,
            host: process.env.DB_HOST,
            database: process.env.DB_DATABASE,
            password: process.env.DATABASE_PASSWORD,
            port: 5432,
        });
        this.timestamp = new Date().toISOString();
        for(let i in this.header){
            if(i === 'OK-ACCESS-TIMESTAMP'){
                this.header[i] = this.timestamp;
            }
            if(i === 'OK-ACCESS-SIGN'){
                this.header[i] = require("crypto").createHmac("sha256", this.secretKey)
                    .update(this.timestamp+"GET"+"/api/v5/account/account-position-risk")
                    .digest('base64');
                    console.log(this.secretKey)
                    console.log(this.timestamp+"GET"+"/users/self/verify")
            }
        }
    }
    get_header(){
        return this.header;
    }
    save_user_data(){
         
    }
    

}