import { Profession } from "../models/Profession.js";

export async function listProfessions(req, res) {
  const items = await Profession.find({ active: true }).lean();
  return res.json(items);
}
