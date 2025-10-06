import express, { Express } from "express";
import Settings from "./Settings";
import path from "path";
import { promises as fs } from "fs";

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
  app: Express = express();

  constructor() {
    this.app.use("/cms", express.static(path.join(__dirname, "./express/cms")));

    this.app.get("/info", async () => {
      const files = await fs.readdir("./express/cms");
    });

    this.app.listen(Settings.EXPRESS_PORT, () => {
      console.log(`HTTP server running on port ${Settings.EXPRESS_PORT}`);
    });
  }
}
