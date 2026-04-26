import express, { Express } from "express";
import Settings from "./Settings";
import path from "path";
import prisma from "./lib/prisma";
import z from "zod";
import { getCMSRaw } from "./routes/cms-raw";
import { getInfo } from "./routes/info";
import { getCMSJson } from "./routes/cms-json";
import { getCMSGzip } from "./routes/cms-gzip";
import { getSaveCMS } from "./routes/get-save-cms";

export class HttpServer {
  app: Express = express();

  constructor() {
    this.app.use(express.json({ limit: 50 * 1024 * 1024 }));
    this.app.use(express.urlencoded({ limit: "10mb", extended: true }));

    this.app.get("/cms/:slug/raw", getCMSRaw);
    this.app.get("/cms/:slug/json", getCMSJson);
    this.app.get("/cms/:slug.gz", getCMSGzip);
    this.app.post("/cms/:slug/save", getSaveCMS);
    this.app.use(
      "/images",
      express.static(path.join(__dirname, "./express/images")),
    );
    this.app.get("/info", getInfo);

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
