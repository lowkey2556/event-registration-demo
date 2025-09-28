export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Only POST allowed" });
  }

  const { name, email } = req.body || {};

  if (!name || !email) {
    return res.status(400).json({ success: false, message: "Name and email are required" });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ success: false, message: "Invalid email" });
  }

  const fs = await import("fs");
  const filePath = "/tmp/registrations.json"; // ephemeral storage

  let data = [];
  if (fs.existsSync(filePath)) {
    data = JSON.parse(fs.readFileSync(filePath, "utf8"));
  }

  data.push({ name, email });
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

  console.log(`New Registration: ${name} - ${email}`);
  return res.status(200).json({ success: true, message: "Registration successful!" });
}
