import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const network: string = req.body.network;
    const path = process.cwd() + "/utils/dataNetwork.json";
    let networksJson = fs.readFileSync(path, "utf-8");
    let networks: string[] = JSON.parse(networksJson);

    const available = networks.includes(network);
    console.log(available);

    if (available) {
      const newNeworks = networks.filter((item) => item !== network);
      console.log(newNeworks);
      networksJson = JSON.stringify(newNeworks);
      fs.writeFileSync(path, networksJson, "utf-8");
      res.status(200).send(`${network} Deactivated`);
    } else {
      networks.push(network);
      networksJson = JSON.stringify(networks);
      fs.writeFileSync(path, networksJson, "utf-8");

      res.status(200).send(`${network} Activated`);
    }
  } catch (error) {
    res.status(400).json({ error });
  }
}
