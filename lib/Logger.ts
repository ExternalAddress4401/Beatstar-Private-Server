class InternalLogger {
  constructor() {}
  info(str: string) {
    console.log(`[-] ${str}`);
  }
  warn(str: string) {
    console.log(`[?] ${str}`);
  }
  error(str: string) {
    console.log(`[X] ${str}`);
  }
}

const Logger = new InternalLogger();
export default Logger;
