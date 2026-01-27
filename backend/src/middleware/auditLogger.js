import { logInfo } from "../utils/logger.js";

export function auditLogger(req, res, next) {
  const start = Date.now();
  res.on("finish", () => {
    const duration = Date.now() - start;
    logInfo("request", {
      method: req.method,
      path: req.path,
      status: res.statusCode,
      durationMs: duration
    });
  });
  next();
}
