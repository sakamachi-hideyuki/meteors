import path from "node:path";
import { chromium } from "playwright-core";

(async () => {
  const htmlPath = path.resolve(process.cwd(), process.argv[2]);
  const pngPath = path.resolve(process.cwd(), process.argv[3]);
  const browser = await chromium.launch({
    channel: "chrome",
    headless: true,
  });
  const page = await browser.newPage({ deviceScaleFactor: 2 });
  await page.setViewportSize({ width: 100, height: 100 });
  await page.goto(`file://${htmlPath}`);
  await page.screenshot({ path: pngPath, fullPage: true });
  await browser.close();
})();
