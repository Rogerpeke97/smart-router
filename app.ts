import express from 'express';
import * as bodyParser from 'body-parser';
import * as http from 'http';
import * as dotenv from "dotenv";
import {User_props} from "./src/users/user_queries";

dotenv.config();

const app: express.Application = express();
const port = 3000;
const httpServer = http.createServer(app);

app.use(bodyParser.json());

app.post('/', (req: express.Request)=>{
    let data = new User_props(req.body.user);
    console.log(data.get_user_info());
})


httpServer.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});