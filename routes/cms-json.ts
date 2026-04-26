import { Request, Response } from "express";
import z from "zod";
import CMSSlugs from "../utilities/getCmsSlugs";
import { promises as fs } from "fs";
import { gzip } from "zlib";
import { promisify } from "util";
import { CMSMap } from "@externaladdress4401/beatstar-protobuf/tools/CMSMap";
import { ProtobufHandler } from "@externaladdress4401/beatstar-protobuf/ProtobufHandler";

const asyncGzip = promisify(gzip);

const schema = z.object({
  slug: z.string(),
});

export const getCMSJson = async (req: Request, res: Response) => {
  const result = schema.safeParse(req.params);
  if (result.error) {
    return res.status(400);
  }

  const slug = result.data.slug.split(".")[0]!;

  if (!CMSSlugs.includes(slug)) {
    return res.status(404).send("CMS file not found.");
  }

  const data = await fs.readFile(`./express/cms/${slug}`);

  const handler = new ProtobufHandler("READ", data);
  handler.process();
  const json = handler.parseProto(CMSMap[slug]);

  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Content-Type", "application/json");

  res.end(JSON.stringify(json));
};
