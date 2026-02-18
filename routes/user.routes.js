import { creatNewUser, getAllUsers } from "../controllers/user.controller.js";

 export const userRouter = (req, res) => {

    if(req.method === "POST" && req.url === "/users") {
        return creatNewUser(req, res)
    }

    if(req.method === "GET" && req.url === "/users") {
        return getAllUsers(req, res)
    }

    if(req.method === "DELETE" && req.url === "/users") {
        return getAllUsers()
    }
}