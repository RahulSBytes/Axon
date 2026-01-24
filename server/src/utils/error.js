import { envMode } from "../../index.js";


export class customError extends Error {
  constructor(message, status) {
    super();
    (this.status = status), (this.message = message);
  }
}



export function errorHandlerMiddleware(err, req, res, next) {
  const { status = 500, message = "something broke server-side" } = err;

// modify status and message for other errors that may occur

  return res.status(status).json({
    success: false,
    message: envMode === 'DEVELOPMENT'? err : message,
  });
}