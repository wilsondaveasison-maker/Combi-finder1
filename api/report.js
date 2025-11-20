import fs from "fs";

export default async function handler(req, res) {
  if (req.method !== "POST")
    return res.status(405).json({ ok: false, msg: "POST only" });

  const { serverId, items } = req.body;

  if (!serverId)
    return res.status(400).json({ ok: false, msg: "Missing serverId" });

  let db = {};

  try {
    db = JSON.parse(fs.readFileSync("data.json"));
  } catch (e) {}

  db[serverId] = items || [];

  fs.writeFileSync("data.json", JSON.stringify(db, null, 2));

  return res.json({ ok: true, msg: "Updated server data" });
}
