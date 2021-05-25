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
    'OK-ACCESS-PASSPHRASE': string,
    'OK-ACCESS-TIMESTAMP': string,
    'OK-ACCESS-SIGN': string,
    'x-simulated-trading': number
}
export class Okex{
    private pool: Pool;
    private header: HeadersRequests;
    private secretKey: string;
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
        for(let i in this.header){
            if(i === 'OK-ACCESS-TIMESTAMP'){
                this.header[i] = new Date().toISOString();
            }
            if(i === 'OK-ACCESS-SIGN'){
                this.header[i] = require("crypto").createHmac("sha256", this.secretKey).update(this.header['OK-ACCESS-TIMESTAMP'] +'GET'+'/users/self/verify').digest("base64");
            }
        }
    }
    get_header(){
        return this.header;
    }
    save_user_data(){
         
    }
    

}