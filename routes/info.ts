import { Request, Response } from "express";
import CMSSlugs from "../utilities/getCmsSlugs";
import { promises as fs } from "fs";
import crypto from "crypto";

export const getInfo = async (req: Request, res: Response) => {
  const info: Record<string, string> = {};
  for (const slug of CMSSlugs) {
    const data = await fs.readFile(`./express/cms/${slug}`);
    info[slug] = crypto.createHash("md5").update(data).digest("hex");
  }

  return res.json(info);
};
