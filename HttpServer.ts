import express, { Express } from "express";
import Settings from "./Settings";
import path from "path";

export class HttpServer {
  app: Express = express();

  constructor() {
    this.app.use("/cms", express.static(path.join(__dirname, "./express/cms")));

    this.app.get("/", (req, res) => {
      res.send("Hello world!");
    });

    this.app.listen(Settings.EXPRESS_PORT);
  }
}
