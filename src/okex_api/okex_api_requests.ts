import {Okex, AuthBody, HeadersRequests} from './okex_api';
import * as https from 'https';

export interface Requests_struct{
    hostname: string,
    port: number,
    path: string,
    method: string,
    headers: {
        'Content-Type': string,
        'OK-ACCESS-KEY': string,
        'OK-ACCESS-SIGN': string,
        'OK-ACCESS-PASSPHRASE': string,
        'OK-ACCESS-TIMESTAMP': string,
        'x-simulated-trading': number
    }
}


export class Okex_requests extends Okex{
    private headers: Requests_struct = JSON.parse('{}');
    constructor(authbody: HeadersRequests, secretkey: string){
        super(authbody, secretkey);
    }
    verify_login(){ 
        this.headers = {
            hostname: 'www.okex.com',
            port: 443,
            path: '/api/v5/account/account-position-risk',
            method: 'GET',
            headers: this.get_header()
        }
        console.log(this.get_header())
        const req = https.request(this.headers, (res) => {
            console.log('statusCode:', res.statusCode);
            console.log('headers:', res.headers);
        
        res.on('data', (d) => {
            process.stdout.write(d);
            })
        });
        
        req.on('error', (e) => {
            console.error(e);
        });
        // req.write(JSON.stringify('{}')); //<--- this line
        req.end();
    }
}
