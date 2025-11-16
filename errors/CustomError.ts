export class CustomError extends Error {
  params: Record<string, any>;

  constructor(name: string, message: string, params: Record<string, any>) {
    super(message);
    this.name = name;
    this.params = params;
  }
}
