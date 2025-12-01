import express, { Express } from "express";
import Settings from "./Settings";
import path from "path";
import prisma from "./lib/prisma";
import z from "zod";

export class HttpServer {
  app: Express = express();

  constructor() {
    this.app.use(express.json());

    this.app.use("/cms/:slug/raw", async (req, res) => {
      const slug = req.params.slug.split(".")[0]!;

      const cms = await prisma.cms.findFirst({
        select: { data: true },
        where: { name: slug },
      });

      if (!cms || !cms.data) {
        return res.status(404).send("CMS not found");
      }

      res.setHeader("Access-Control-Allow-Origin", "*");

      res.json(cms.data);
    });
    this.app.use("/cms/:slug", async (req, res) => {
      const slug = req.params.slug.split(".")[0]!;

      const cms = await prisma.cms.findFirst({
        select: { gzip: true },
        where: { name: slug },
      });

      if (!cms) return res.status(404).send("CMS not found");

      const buffer = Buffer.from(cms.gzip);

      res.setHeader("Access-Control-Allow-Origin", "*");
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

    this.app.post("/scores", async (req, res) => {
      const schema = z.object({
        cinta: z.string().uuid(),
      });

      const response = await schema.safeParseAsync(req.body);
      if (response.error) {
        res.writeHead(400, { error: response.error.message });
        return res.end();
      }

      const cinta = response.data.cinta;

      const scores = await prisma.customScore.findMany({
        where: {
          user: {
            uuid: cinta,
          },
        },
      });

      res.json(scores);
      res.end();
    });

    this.app.listen(Settings.EXPRESS_PORT, () => {
      console.log(`HTTP server running on port ${Settings.EXPRESS_PORT}`);
    });
  }
}
