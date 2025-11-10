import fs from 'fs';

export class InternalLogger {
	async log(...message: string[]) {
		fs.appendFileSync('./log.txt', message + '\n');
	}
}

const Logger = new InternalLogger();
export default Logger;
