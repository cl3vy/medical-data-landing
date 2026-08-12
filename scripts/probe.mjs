import { chromium } from "playwright";

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto("http://localhost:3000", { waitUntil: "networkidle" });

const result = await page.evaluate(() => {
  const root = getComputedStyle(document.documentElement);
  const vars = [
    "--space-section",
    "--space-band",
    "--space-block",
    "--space-group",
    "--space-item",
    "--gutter",
    "--header-h",
  ].map((v) => `${v} = "${root.getPropertyValue(v).trim()}"`);

  const probes = [];
  const push = (label, el) => {
    if (!el) return probes.push(`${label}: NOT FOUND`);
    const cs = getComputedStyle(el);
    probes.push(
      `${label}: mt=${cs.marginTop} pt=${cs.paddingTop} pb=${cs.paddingBottom} h=${Math.round(el.getBoundingClientRect().height)}`,
    );
  };

  push("process h2", document.querySelector("#process-h"));
  push("process progressWrap", document.querySelector("#process-h")?.nextElementSibling);
  push("control h2", document.querySelector("#control-h"));
  push("control grid", document.querySelector("#control-h")?.nextElementSibling);
  push("value h2", document.querySelector("#value-h"));

  return { vars, probes };
});

console.log("VARS:\n" + result.vars.join("\n"));
console.log("\nPROBES:\n" + result.probes.join("\n"));
await browser.close();
