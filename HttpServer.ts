import express, { Express } from "express";
import Settings from "./Settings";
import path from "path";
import fs from "fs";
import crypto from "crypto";
import zlib from "zlib";

const cmsFiles = [
  "GameConfig",
  "SongConfig",
  "AssetsPatchConfig",
  "LangConfig",
  "AudioConfig",
  "NotificationConfig",
  "ScalingConfig",
  "FontFallbackConfig",
  "LiveOpsCallingCardsConfig",
  "LiveOpsProfileIconConfig",
  "LiveOpsTrackSkinConfig",
  "LiveOpsEmojiConfig",
];

export class HttpServer {
  hashes: Record<string, string> = {};
  app: Express = express();

  constructor() {
    this.init();
    this.app.use("/cms", express.static(path.join(__dirname, "./express/cms")));

    this.app.get("/info", async (req, res) => {
      res.json(this.hashes);
    });

    this.app.listen(Settings.EXPRESS_PORT, () => {
      console.log(`HTTP server running on port ${Settings.EXPRESS_PORT}`);
    });
  }

  init() {
    const files = fs.readdirSync("./express/raw");
    for (const file of files) {
      const data = fs.readFileSync(`./express/raw/${file}`);
      this.hashes[file] = crypto.createHash("md5").update(data).digest("hex");
      fs.writeFileSync(`./express/cms/${file}.gz`, zlib.gzipSync(data));
    }
  }
}
