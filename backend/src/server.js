import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { connectDatabase } from "./config/database.js";
import { ENV } from "./config/environment.js";
import { apiRateLimiter } from "./middleware/rateLimiter.js";
import { auditLogger } from "./middleware/auditLogger.js";
import { errorHandler } from "./middleware/errorHandler.js";

import authRoutes from "./routes/auth.js";
import resumeRoutes from "./routes/resume.js";
import templateRoutes from "./routes/template.js";
import adminRoutes from "./routes/admin.js";

async function bootstrap() {
  await connectDatabase();

  const app = express();

  app.use(helmet());
  app.use(cors());
  app.use(express.json({ limit: "1mb" }));
  app.use(morgan("tiny"));
  app.use(apiRateLimiter);
  app.use(auditLogger);

  app.get("/health", (_req, res) => {
    res.json({ status: "ok" });
  });

  app.use("/api/auth", authRoutes);
  app.use("/api/resumes", resumeRoutes);
  app.use("/api/templates", templateRoutes);
  app.use("/api/admin", adminRoutes);

  app.use(errorHandler);

  app.listen(ENV.PORT, () => {
    console.log(`Backend API listening on port ${ENV.PORT}`);
  });
}

bootstrap().catch((err) => {
  console.error("Failed to bootstrap server", err);
  process.exit(1);
});
