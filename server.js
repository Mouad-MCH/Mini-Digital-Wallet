import http from 'node:http';
import { userRouter } from './routes/user.routes.js';
import { walletsRuter } from './routes/wallet.routes.js';


let app = http.createServer((req, res) => {
    if(req.url.startsWith("/users")) {
       return userRouter(req,res)
    }

    if(req.url.startsWith("/wallets")) {
        return walletsRuter(req,res)
    } 
})


app.listen(3000, () => {
    console.log('server running at http://localhost:3000')
})