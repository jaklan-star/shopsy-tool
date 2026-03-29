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
"--disable-dev-shm-usage"
]
});

const page = await browser.newPage();

let lastURL = "";
let stableCount = 0;

page.on("framenavigated", frame => {
if (frame === page.mainFrame()) {
lastURL = frame.url();
stableCount = 0;
}
});

await page.goto(url, {
waitUntil: "domcontentloaded",
timeout: 60000
});

// Wait until URL stops changing
for (let i = 0; i < 20; i++) {

await new Promise(r => setTimeout(r, 1000));

let currentURL = page.url();

if (currentURL === lastURL) {
stableCount++;
} else {
stableCount = 0;
lastURL = currentURL;
}

if (stableCount >= 3) break;
}

let finalURL = page.url();

await browser.close();

res.json({ url: finalURL });

} catch (error) {

res.json({ url: url });

}

});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
console.log("Server running");
});
