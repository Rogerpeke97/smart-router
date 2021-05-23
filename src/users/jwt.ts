import jsonwebtoken from 'jsonwebtoken';
import express from 'express';

interface Decoded {
    exp: number;
    data: string;
    iat: number;
}
export class Jwt{
    public decoded_user: Decoded = JSON.parse('{}');
    public validate(response: express.Response, jwt: string){
        let is_valid: boolean = false;
        jsonwebtoken.verify(jwt, `${process.env.TOKEN_SECRET}`, (err, decoded)=>{
            if(err){
                console.log(err);
                response.send('Invalid JWT');
            }
            else{
                console.log(decoded);
                this.decoded_user = (decoded as Decoded);
                is_valid = true;
            }
          });
        return is_valid;
    }
    public sign(response: express.Response, data: string){
        jsonwebtoken.sign({
            exp: Math.floor(Date.now() / 1000) + (60 * 60),
            data: data
        }, `${process.env.TOKEN_SECRET}`, (err: any, token: any) => {
            if(err){
                console.log(err);
            }
            else{
                response.send({token});
            }
          }); 
    }
}