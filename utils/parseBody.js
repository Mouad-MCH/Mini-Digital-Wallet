import { rejects } from "node:assert";
import { resolve } from "node:dns";

export const parseBody = (req) => {
  return new Promise((resolve, rejects) => {
    let body = "";

    req.on("data", (chunks) => {
      body += chunks.toString();
    });

    req.on("end", () => {
      try {
        body = JSON.parse(body);
        resolve(body);
      } catch (e) {
        rejects(e);
      }
    });
  });
};
