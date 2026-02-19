import { readAllDB, readDB, saveDB } from "../data/db.js"
import { parseBody } from "../utils/parseBody.js"

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


export const deposit = async (req, res) => {
    let body = await parseBody(req);

    const {id} = req.params;
    const userId = Number(id);
    const db = await readAllDB();

    const wallet = db.wallets.find(el => el.userId === userId);

    if(!wallet) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, message: "wallet not found" }));
        return
    }

    wallet.sold += body.amount;


    try {
        await saveDB(db)
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true, message: "solde is deposit" }));
    }catch(e) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, message: 'solde not deposit' }));
    }
    
}


export const withdraw = async (req, res) => {
    let body = await parseBody(req);

    const {id} = req.params;
    const userId = Number(id);
    const db = await readAllDB();

    const wallet = db.wallets.find(el => el.userId === userId);

    if(!wallet) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, message: "wallet not found" }));
        return
    }

    let newSold = wallet.sold - body.amount;

    if(newSold < 0) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, message: 'Your balance is insufficient' }))
        return
    }


    try {

        db.wallets.forEach(walet => {
            if(walet.userId == userId) {
                walet.sold = newSold;
            }
        });


        await saveDB(db)

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true, message: 'withdraw succsess!' }))
    }catch(e) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, message: 'problem server try again later' }))
    }

}