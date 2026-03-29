const express = require("express");
const puppeteer = require("puppeteer");

const app = express();
app.use(express.static("."));

app.get("/resolve", async (req, res) => {
let url = req.query.url;
try{
const browser = await puppeteer.launch({
headless: "new",
args: ["--no-sandbox", "--disable-setuid-sandbox"]
});
const page = await browser.newPage();
await page.goto(url, {waitUntil:"networkidle2", timeout:60000});
let finalURL = page.url();
await browser.close();
res.json({url: finalURL});
}catch(e){
res.json({url: url});
}
});

app.listen(3000, ()=>{
console.log("Server running on port 3000");
});
