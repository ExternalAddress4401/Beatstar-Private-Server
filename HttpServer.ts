import express, { Express } from "express";
import Settings from "./Settings";
import path from "path";
import prisma from "./website/beatstar/src/lib/prisma";

export class HttpServer {
  app: Express = express();

  constructor() {
    this.app.use("/cms/:slug", async (req, res) => {
      const slug = req.params.slug.split(".")[0]!;

      const cms = await prisma.cms.findFirst({
        select: { gzip: true },
        where: { name: slug },
      });

      if (!cms) return res.status(404).send("CMS not found");

      const buffer = Buffer.from(cms.gzip);

      res.setHeader("Content-Type", "application/gzip");
      res.setHeader("Content-Length", buffer.length);

      res.end(buffer);
    });
    this.app.use(
      "/images",
      express.static(path.join(__dirname, "./express/images"))
    );

    this.app.all("/info", async (req, res) => {
      const cms = await prisma.cms.findMany({
        select: {
          name: true,
          hash: true,
        },
      });

      res.json(
        cms.reduce((acc: Record<string, string>, row) => {
          acc[row.name] = row.hash;
          return acc;
        }, {})
      );
    });

    this.app.listen(Settings.EXPRESS_PORT, () => {
      console.log(`HTTP server running on port ${Settings.EXPRESS_PORT}`);
    });
  }
}
