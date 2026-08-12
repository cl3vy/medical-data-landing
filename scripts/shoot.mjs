import { chromium } from "playwright";
import { mkdirSync } from "node:fs";

const OUT = "/tmp/shfa-shots";
mkdirSync(OUT, { recursive: true });

const width = Number(process.argv[2] || 1440);
const height = Number(process.argv[3] || 900);
const tag = process.argv[4] || `${width}`;

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width, height } });

await page.goto("http://localhost:3000", { waitUntil: "networkidle" });
await page.waitForTimeout(1200);

const total = await page.evaluate(() => document.body.scrollHeight);
const steps = Math.ceil(total / height);

for (let i = 0; i < steps; i++) {
  await page.evaluate((y) => window.scrollTo(0, y), i * height);
  await page.waitForTimeout(900);
  await page.screenshot({ path: `${OUT}/${tag}-${String(i).padStart(2, "0")}.png` });
}

console.log(`pageHeight=${total} viewport=${width}x${height} frames=${steps}`);
await browser.close();
