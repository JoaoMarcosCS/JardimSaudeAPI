export class HandleResponseError extends Error {
  private _message: string;
  private _status: number;

  constructor(message: string, status: number) {
    super(message); //construtor de Error
    this._message = message;
    this._status = status;
  }

  get message() {
    return this._message;
  }

  get status() {
    return this._status;
  }
}
