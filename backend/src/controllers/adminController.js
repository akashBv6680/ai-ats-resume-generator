import { User } from "../models/User.js";
import { Template } from "../models/Template.js";
import { Profession } from "../models/Profession.js";

export async function listUsers(req, res) {
  const users = await User.find({}).select("email role createdAt").lean();
  return res.json(users);
}

export async function adminListTemplates(req, res) {
  const items = await Template.find({}).lean();
  return res.json(items);
}

export async function adminListProfessions(req, res) {
  const items = await Profession.find({}).lean();
  return res.json(items);
}
