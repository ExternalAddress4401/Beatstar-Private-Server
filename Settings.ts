import { configDotenv } from "dotenv";
import localtunnel from "localtunnel";

configDotenv();

type Environment = "dev" | "prod";

export class InternalSettings {
  USE_PRIVATE_SERVER: boolean;
  SERVER_IP: string | null;
  SERVER_PORT: number;
  EXPRESS_PORT: number;
  ENVIRONMENT: Environment;
  TUNNEL: string = "";

  constructor() {
    if (
      !process.env.USE_PRIVATE_SERVER ||
      !process.env.SERVER_PORT ||
      !process.env.EXPRESS_PORT ||
      !process.env.ENVIRONMENT
    ) {
      process.exit("Environment variables are not set.");
    }
    this.USE_PRIVATE_SERVER = process.env.USE_PRIVATE_SERVER === "true";
    this.SERVER_IP = process.env.SERVER_IP || null;
    this.SERVER_PORT = parseInt(process.env.SERVER_PORT);
    this.EXPRESS_PORT = parseInt(process.env.EXPRESS_PORT);
    this.ENVIRONMENT = process.env.ENVIRONMENT as Environment;
  }
  async init() {
    if (this.ENVIRONMENT === "dev") {
      this.TUNNEL = (await localtunnel({ port: this.EXPRESS_PORT })).url;
    }
  }
}

const Settings = new InternalSettings();
export default Settings;
