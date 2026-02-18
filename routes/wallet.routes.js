import { getAllWalles, getWalletByUserID } from "../controllers/wallet.controller.js"



export const walletsRuter = (req, res) => {
  if(req.method === "GET" && req.url == "/wallets") {
    return getAllWalles(req, res)
  }

  if(req.method == "GET" && req.url.startsWith('/wallets/')) {
    const id = req.url.split("/")[2];
    req.params = {id};

    return getWalletByUserID(req, res)
  }
}