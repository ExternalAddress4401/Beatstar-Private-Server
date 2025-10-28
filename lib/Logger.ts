import fs from "fs";

class InternalLogger {
  constructor() {}
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
    fs.appendFileSync("../log.txt", str + "\n");
  }
}

const Logger = new InternalLogger();
export default Logger;
