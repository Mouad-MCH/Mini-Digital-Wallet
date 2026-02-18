
export const creatWallet = (user) => {
    let wallet = {
        id: Date.now(),
        name: user.name,
        userId: user.id,
        sold: 0
    }
 
    return wallet
}