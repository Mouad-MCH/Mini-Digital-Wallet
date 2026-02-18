import fs from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { creatNewUser } from '../controllers/user.controller.js';

let url_path = fileURLToPath(new URL('./db.json', import.meta.url));



export const readDB = async (type) => {
    let data = await fs.readFile(url_path, 'utf-8');
    let db = JSON.parse(data)

    return db[type]
}

// console.log(await readDB("users"))

export const readAllDB = async () => {
    let db = await fs.readFile(url_path, 'utf-8');

    return JSON.parse(db)
}

export const readUserById = async (id) => {
    let db = await readAllDB();

    let user = db.users.find(el => el.id === id);
    let wal = db.wallets.find(el => el.userId === id)

    if(!user) {
        return {success: false, message: 'user not found'}
    }

    return { user: user, wallet: wal }
}

export const saveDB = async (db) => {
    await fs.writeFile(url_path, JSON.stringify(db, null, 2));
    return { success: true , message: 'db is saved'}
}


export const creatDB = async (user, wallet) => {
    let db = await readAllDB();
    db.users.push(user);
    db.wallets.push(wallet)

    try {
        await saveDB(db)
    }catch(error) {
        return { success: false, message: 'user not saved' }
    }

    return { success: true, message: 'user is created succsusfly' }
}

// console.log(await creatNewUser({name:"MMMMMMM"}))


export const deletUserById = async (id) => {
    let data = await readAllDB();

    let newUsers = data.users.filter(el => el.id !== id);
    let newWallets = data.wallets.filter(el => el.userId !== id)

    let newData =  {
        users: newUsers,
        wallets: newWallets
    }

    await saveDB(newData)
}


// deletUserById(1771433048472)