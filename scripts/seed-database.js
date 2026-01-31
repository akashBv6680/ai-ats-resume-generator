#!/usr/bin/env node
/* eslint-disable no-console */

import fs from "fs";
import path from "path";
import mongoose from "mongoose";
import { fileURLToPath } from "url";

import { ENV } from "../backend/src/config/environment.js";
import { connectDatabase } from "../backend/src/config/database.js";
import { Profession } from "../backend/src/models/Profession.js";
import { Template } from "../backend/src/models/Template.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function loadJson(relativePath) {
  const fullPath = path.join(__dirname, "..", relativePath);
  const raw = await fs.promises.readFile(fullPath, "utf-8");
  return JSON.parse(raw);
}

async function seedProfessions() {
  console.log("[seed] Seeding professions...");
  const data = await loadJson("database/seeds/professions.json");

  for (const item of data) {
    await Profession.updateOne(
      { code: item.code },
      { $set: item },
      { upsert: true }
    );
  }
  console.log(`[seed] Upserted ${data.length} professions.`);
}

async function seedTemplates() {
  console.log("[seed] Seeding templates...");
  const data = await loadJson("database/seeds/templates.json");

  for (const item of data) {
    await Template.updateOne(
      { key: item.key },
      { $set: item },
      { upsert: true }
    );
  }
  console.log(`[seed] Upserted ${data.length} templates.`);
}

async function main() {
  try {
    console.log(`[seed] Connecting to Mongo: ${ENV.MONGO_URI}`);
    await connectDatabase();

    await seedProfessions();
    await seedTemplates();

    console.log("[seed] Done.");
    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error("[seed] Error:", err);
    await mongoose.disconnect().catch(() => {});
    process.exit(1);
  }
}

main();
