import { readDB } from "../data/db.js"

export const creatWallet = (user) => {
    let wallet = {
        id: Date.now(),
        name: user.name,
        userId: user.id,
        sold: 0
    }
 
    return wallet
}

export const getAllWalles = async (req, res) => {
    let walet = await readDB("wallets");
    res.writeHead(200, {"Content-Type": "application/json"})
    res.end(JSON.stringify({ success: true, wallets: walet }))
}

export const getWalletByUserID = async (req, res) => {
    let {id} = req.params;
    let userId = Number(id);
    let walet = await readDB("wallets");
    let wal = walet.find(el => el.userId === userId);

    if(!wal) {
        res.writeHead(400, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ success:false, message: 'wallet not found' }))
        return
    }

    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ success: true, wal }))


}