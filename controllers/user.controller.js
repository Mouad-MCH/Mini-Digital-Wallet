import { creatDB, readDB } from "../data/db.js";
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

    // res.writeHead(200, {'Content-Type': 'application/json'})
    res.end(JSON.stringify({success: true, message:"user is created", user}))
}


export const deletUserById = async (req, res) => {
    let {id} = await req.params
    let db = await readUserById(id)

    if(!db.success) {
        res.writeHead(400, {'Content-Type': 'application/json'})
        res.end(JSON.stringify({success: false, message:'user not found'}))       
    }

    try {
        await deletUserById(id)
        res.writeHead(200, {'Content-Type': 'application/json'})
        res.end(JSON.stringify({success: true, message:'user is deleted'}))
    }catch (error) {
        res.writeHead(500, {'Content-Type': 'application/json'})
         res.end(JSON.stringify({success: false, message:'user is not deleted'}))
    }
}


export const getAllUsers = async (req, res) => {
    let users = await readDB("users")
    res.end({ success: true, users})
}