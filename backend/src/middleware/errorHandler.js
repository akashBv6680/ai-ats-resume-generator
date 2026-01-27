import { logError } from "../utils/logger.js";

export function errorHandler(err, req, res, next) {
  logError("Unhandled error", {
    path: req.path,
    message: err.message,
    stack: err.stack
  });

  if (res.headersSent) {
    return next(err);
  }

  return res.status(500).json({ message: "Internal server error" });
}
