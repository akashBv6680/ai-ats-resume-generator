// backend/src/server.js
import express from "express";
import cors from "cors";
import morgan from "morgan";

import { ENV } from "./config/environment.js";
import { connectDatabase } from "./config/database.js";

import authRoutes from "./routes/auth.js";
import resumeRoutes from "./routes/resume.js";
import templateRoutes from "./routes/template.js";
import adminRoutes from "./routes/admin.js";

import { errorHandler } from "./middleware/errorHandler.js";
import rateLimiter from "./middleware/rateLimiter.js";
import auditLogger from "./middleware/auditLogger.js";

async function startServer() {
  try {
    // Connect to MongoDB
    await connectDatabase();

    const app = express();

    // Core middleware
    app.use(cors());
    app.use(express.json({ limit: "1mb" }));
    app.use(morgan("dev"));
    app.use(auditLogger);
    app.use(rateLimiter);

    // Health check
    app.get("/health", (req, res) => {
      res.json({
        status: "ok",
        env: ENV.NODE_ENV,
        timestamp: new Date().toISOString()
      });
    });

    // API routes
    app.use("/api/auth", authRoutes);
    app.use("/api/resumes", resumeRoutes);
    app.use("/api/templates", templateRoutes);
    app.use("/api/admin", adminRoutes);

    // 404 for unknown API routes
    app.use("/api", (req, res) => {
      res.status(404).json({ message: "API route not found" });
    });

    // Global error handler (keep last)
    app.use(errorHandler);

    app.listen(ENV.PORT, () => {
      console.log(
        `Backend server running on port ${ENV.PORT} in ${ENV.NODE_ENV} mode`
      );
    });
  } catch (err) {
    console.error("Failed to start server", err);
    process.exit(1);
  }
}

startServer();
