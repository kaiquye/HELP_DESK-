import http from "http";

class AppError {
  public message?: String;
  public Status: Number;
  private path?: Error;
  private status_code: string | undefined;

  public constructor(
    Status: Number,
    message: String | undefined = http.STATUS_CODES[500],
    path?: Error
  ) {
    this.message = message;
    this.Status = Status;
    this.path = path;
    this.status_code = http.STATUS_CODES[Status.toString()];
  }

  public getMessageError(): object {
    return {
      message: this.message,
      status_code: this.status_code,
      ok: false,
    };
  }
}

export default AppError;
