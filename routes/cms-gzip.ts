import { Request, Response } from "express";
import z from "zod";
import CMSSlugs from "../utilities/getCmsSlugs";
import { promises as fs } from "fs";
import { gzip } from "zlib";
import { promisify } from "util";

const asyncGzip = promisify(gzip);

const schema = z.object({
  slug: z.string(),
});

export const getCMSGzip = async (req: Request, res: Response) => {
  const result = schema.safeParse(req.params);
  if (result.error) {
    return res.status(400);
  }

  const slug = result.data.slug.split(".")[0]!;

  if (!CMSSlugs.includes(slug)) {
    return res.status(404).send("CMS file not found.");
  }

  const data = await fs.readFile(`./express/cms/${slug}`);
  const gzipData = await asyncGzip(data);

  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Content-Type", "application/gzip");
  res.setHeader("Content-Length", gzipData.length);
  res.setHeader("Content-Disposition", `attachment; filename="${slug}.gz"`);

  res.end(gzipData);
};
