import { Request, Response } from "express";
import { promises as fs } from "fs";
import CMSSlugs from "../utilities/getCmsSlugs";
import z from "zod";

const schema = z.object({
  slug: z.string(),
});

export const getCMSRaw = async (req: Request, res: Response) => {
  const result = schema.safeParse(req.params);
  if (result.error) {
    return res.status(400);
  }

  const slug = result.data.slug.split(".")[0]!;

  if (!CMSSlugs.includes(slug)) {
    return res.status(404).send("CMS file not found.");
  }

  const data = await fs.readFile(`./express/cms/${slug}`);

  res.setHeader("Access-Control-Allow-Origin", "*");
  res.json(data);
};
