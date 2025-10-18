import express, { Express } from "express";
import Settings from "./Settings";
import path from "path";
import prisma from "./website/beatstar/src/lib/prisma";

export class HttpServer {
  app: Express = express();

  constructor() {
    this.app.use("/cms", express.static(path.join(__dirname, "./express/cms")));
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
