import { configDotenv } from "dotenv";

configDotenv();

export class InternalSettings {
  USE_PRIVATE_SERVER: boolean;
  SERVER_PORT: number;
  EXPRESS_PORT: number;

  constructor() {
    if (
      !process.env.USE_PRIVATE_SERVER ||
      !process.env.SERVER_PORT ||
      !process.env.EXPRESS_PORT
    ) {
      process.exit("Environment variables are not set.");
    }
    this.USE_PRIVATE_SERVER = process.env.USE_PRIVATE_SERVER === "true";
    this.SERVER_PORT = parseInt(process.env.SERVER_PORT);
    this.EXPRESS_PORT = parseInt(process.env.EXPRESS_PORT);
  }
}

const Settings = new InternalSettings();
export default Settings;
