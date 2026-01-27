import { Template } from "../models/Template.js";

export async function listTemplates(req, res) {
  const items = await Template.find({ active: true }).lean();
  return res.json(items);
}
