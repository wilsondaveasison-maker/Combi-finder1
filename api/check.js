import fs from "fs";

export default async function handler(req, res) {
  if (req.method !== "POST")
    return res.status(405).json({ found: false, msg: "POST only" });

  const { serverId, items } = req.body;

  if (!serverId)
    return res.status(400).json({ found: false, msg: "Missing serverId" });

  let db = {};

  try {
    db = JSON.parse(fs.readFileSync("data.json"));
  } catch (e) {}

  const foundItems = db[serverId] || [];

  for (const item of items) {
    if (foundItems.includes(item)) {
      return res.json({ found: true, item });
    }
  }

  return res.json({ found: false });
}
