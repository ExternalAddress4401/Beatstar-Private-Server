import fs from "fs";
import { stringify } from "../utilities/stringify";

class InternalLogger {
  constructor() {
    try {
      fs.mkdirSync("./logs");
    } catch (e) {}
  }
  info(str: string, clide?: string | null) {
    console.log(`[- : ${clide ?? "?"}] ${str}`);
  }
  warn(str: string, clide?: string | null) {
    console.log(`[? : ${clide ?? "?"}] ${str}`);
  }
  error(str: string, clide?: string | null) {
    console.log(`[X : ${clide ?? "?"}] ${str}`);
  }
  saveError(str: string, clide?: string | null) {
    console.log(`[X : ${clide ?? "?"}] ${str}`);
    fs.appendFileSync("./log.txt", str + "\n");
  }
  saveClientInfo(
    str: string,
    params: Record<string, any>,
    clide: string | null
  ) {
    if (!clide) {
      Logger.error("[-] Failed to save log for null clide");
      this.error(str, clide);
      return;
    }
    fs.appendFileSync(`./logs/${clide}.txt`, `[-] ${str}` + "\n");
    fs.appendFileSync(`./logs/${clide}.txt`, stringify(params) + "\n");
  }
  saveClientError(
    str: string,
    params: Record<string, any>,
    clide: string | null
  ) {
    if (!clide) {
      this.error(str, clide);
      Logger.error("[X] Failed to save log for null clide");
      return;
    }
    fs.appendFileSync(`./logs/${clide}.txt`, `[X] ${str}` + "\n");
    fs.appendFileSync(`./logs/${clide}.txt`, stringify(params) + "\n");
  }
}

const Logger = new InternalLogger();
export default Logger;
