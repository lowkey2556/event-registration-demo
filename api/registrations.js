export default async function handler(req, res) {
  const fs = await import("fs");
  const filePath = "/tmp/registrations.json";
  if (fs.existsSync(filePath)) {
    const data = JSON.parse(fs.readFileSync(filePath, "utf8"));
    return res.status(200).json(data);
  }
  return res.status(200).json([]);
}
