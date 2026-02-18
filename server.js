import http from 'node:http';
import { userRouter } from './routes/user.routes.js';


let app = http.createServer((req, res) => {
    if(req.url.startsWith("/users")) {
       return userRouter(req,res)
    }
})


app.listen(3000, () => {
    console.log('server running at http://localhost:3000')
})