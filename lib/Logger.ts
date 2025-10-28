import fs from "fs";

class InternalLogger {
  constructor() {}
  info(str: string, clide?: string) {
    console.log(`[- : ${clide ?? "?"}] ${str}`);
  }
  warn(str: string, clide?: string) {
    console.log(`[? : ${clide ?? "?"}] ${str}`);
  }
  error(str: string, clide?: string) {
    console.log(`[X : ${clide ?? "?"}] ${str}`);
    if (clide) {
      fs.appendFileSync("../log.txt", str + "\n");
    }
  }
}

const Logger = new InternalLogger();
export default Logger;
