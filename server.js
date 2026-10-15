
const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;
const ROOT = __dirname;

app.disable("x-powered-by");

app.use(express.static(ROOT));

app.get("/", (req, res) => {
  res.sendFile(path.join(ROOT, "index.html"));
});

app.get("/health", (req, res) => {
  res.json({ status: "ok", site: "Watan Craft 2" });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Watan Craft 2 running on port ${PORT}`);
});
