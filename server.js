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
"--disable-setuid-sandbox"
]
});

const page = await browser.newPage();

await page.goto(url, { waitUntil: "domcontentloaded" });

// Wait until Flipkart loads
await page.waitForFunction(() => {
return window.location.href.includes("flipkart.com");
}, { timeout: 15000 }).catch(()=>{});

// Small delay for final redirect
await page.waitForTimeout(2000);

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
