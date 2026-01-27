import mongoose from "mongoose";
import { ENV } from "./environment.js";

export async function connectDatabase() {
  mongoose.set("strictQuery", true);

  await mongoose.connect(ENV.MONGO_URI, {
    autoIndex: true
  });

  console.log("MongoDB connected");
}
