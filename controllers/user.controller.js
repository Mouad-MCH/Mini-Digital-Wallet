import { creatDB, readUserById, readDB, deletUserById } from "../data/db.js";
import { parseBody } from "../utils/parseBody.js";
import { creatWallet } from "./wallet.controller.js";

export const creatNewUser = async (req, res) => {
    const body = await parseBody(req)
    let user = {
        id: Date.now(),
        name: body.name
    }

    let walet = creatWallet(user)

     await creatDB(user, walet)

    res.writeHead(200, {'Content-Type': 'application/json'})
    res.end(JSON.stringify({success: true, message:"user is created", user}))
}


export const deletUserByID = async (req, res) => {
    let {id} = req.params
    let userId = Number(id)
    let db = await readUserById(userId)

    if(!db.success) {
        res.writeHead(400, {'Content-Type': 'application/json'})
        res.end(JSON.stringify({success: false, message:'user not found'}))
        return
    }

    try {
        await deletUserById(userId)
        res.writeHead(200, {'Content-Type': 'application/json'})
        res.end(JSON.stringify({success: true, message:'user is deleted'}))
    }catch (error) {
        res.writeHead(500, {'Content-Type': 'application/json'})
         res.end(JSON.stringify({success: false, message:'user is not deleted'}))
    }
}


export const getAllUsers = async (req, res) => {
    let users = await readDB("users")
    res.writeHead(200, {"Content-Type": "application/json"})
    res.end(JSON.stringify({ success: true, users }))
}

export const getUserByID = async (req, res) => {
    let {id} = req.params;
    let userId = Number(id);
    let db = await readUserById(userId)

    if(!db.success) {
        res.writeHead(400, {'Content-Type' : 'application/json'});
        res.end(JSON.stringify({success: false, message:'user not found'}))
        return
    }

    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(JSON.stringify({success: true, user: db.user, wallet: db.wallet}))
}