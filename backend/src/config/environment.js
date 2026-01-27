import dotenv from "dotenv";

dotenv.config();

export const ENV = {
  NODE_ENV: process.env.NODE_ENV || "development",
  PORT: Number(process.env.PORT || 4000),
  MONGO_URI: process.env.MONGO_URI || "mongodb://localhost:27017/ai_ats_resume",
  JWT_SECRET: process.env.JWT_SECRET || "change-this-secret",
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || "1h",
  AI_SERVICE_URL: process.env.AI_SERVICE_URL || "http://localhost:5000"
};
