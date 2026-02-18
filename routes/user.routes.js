import { creatNewUser, getAllUsers, deletUserByID, getUserByID } from "../controllers/user.controller.js";

 export const userRouter = (req, res) => {

    if(req.method === "POST" && req.url === "/users") {
        return creatNewUser(req, res)
    }

    if(req.method === "GET" && req.url === "/users") {
        return getAllUsers(req, res)
    }

    if(req.method === "GET" && req.url.startsWith("/users/")) {
        const id = req.url.split("/")[2]
        req.params = {id};
        return getUserByID(req, res)
    }

    if(req.method === "DELETE" && req.url.startsWith("/users/")) {
        const id = req.url.split("/")[2];
        req.params = {id}
        return deletUserByID(req,res)
    }
}