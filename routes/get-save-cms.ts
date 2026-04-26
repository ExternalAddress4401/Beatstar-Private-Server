import { ProtobufHandler } from "@externaladdress4401/beatstar-protobuf/ProtobufHandler";
import { CMSMap } from "@externaladdress4401/beatstar-protobuf/tools/CMSMap";
import { Request, Response } from "express";
import z from "zod";
import { promises as fs } from "fs";
import prisma from "../lib/prisma";

const schema = z.object({
  name: z.string(),
  data: z.string(),
  id: z.string(),
});

export const getSaveCMS = async (req: Request, res: Response) => {
  const result = schema.safeParse(req.body);
  if (result.error) {
    return res.status(400);
  }

  const user = await prisma.user.findUnique({
    where: {
      sessionId: result.data.id,
    },
  });

  if (!user?.admin) {
    return;
  }

  const data = JSON.parse(result.data.data);

  const proto = CMSMap[result.data.name];
  if (!proto) {
    return;
  }

  const writer = new ProtobufHandler("WRITE");
  const fileData = await writer.writeProto(data, proto);

  await fs.writeFile(`./express/cms/${result.data.name}`, fileData);
};
