import { CustomError } from "./CustomError";

export class BeatmapIdInvalidError extends CustomError {
  constructor(message: string, params: Record<string, any> = {}) {
    super("BeatmapIdInvalidError", message, params);
  }
}
