import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const network: string = req.body.network;
    const path = process.cwd() + "/pages/api/dataNetwork.json";
    console.log({ path });

    let networksJson = fs.readFileSync(path, "utf-8");
    console.log({ networksJson });

    let networks: string[] = JSON.parse(networksJson);

    const available = networks.includes(network);
    console.log(available);

    if (available) {
      const newNetworks = networks.filter((item) => item !== network);
      console.log(newNetworks);
      networksJson = JSON.stringify(newNetworks);
      fs.writeFileSync(path, networksJson, "utf-8");
      res.status(200).send(`${network} Deactivated`);
    } else {
      networks.unshift(network);
      console.log(networks);

      networksJson = JSON.stringify(networks);
      fs.writeFileSync(path, networksJson, "utf-8");

      res.status(200).send(`${network} Activated`);
    }
  } catch (error) {
    res.status(400).json({ error });
  }
}
