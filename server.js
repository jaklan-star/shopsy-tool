const express = require("express");
const puppeteer = require("puppeteer");

const app = express();

app.use(express.static(__dirname));

app.get("/resolve", async (req, res) => {
  let url = req.query.url;

  try {
    const browser = await puppeteer.launch({
      headless: true,
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
        "--disable-accelerated-2d-canvas",
        "--no-first-run",
        "--no-zygote",
        "--single-process",
        "--disable-gpu"
      ]
    });

    const page = await browser.newPage();

    await page.goto(url, {
      waitUntil: "networkidle2",
      timeout: 60000
    });

    const finalURL = page.url();

    await browser.close();

    res.json({ url: finalURL });

  } catch (error) {
    console.log(error);
    res.json({ url: url });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
