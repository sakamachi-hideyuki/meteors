import { writeFile } from "node:fs/promises";
import path from "node:path";
import { chromium } from "playwright-core";

(async () => {
  const buildHtmlUrl = process.argv[2];
  const outDirPath = path.resolve(process.cwd(), process.argv[3]);
  const browser = await chromium.launch({
    channel: "chrome",
    headless: true,
  });
  const page = await browser.newPage();
  await page.goto(buildHtmlUrl);
  await page.locator("#buildButton").click();
  const htmlFiles = await page.locator("a[download]").evaluateAll((links) =>
    links.map((el) => ({
      filename: el.getAttribute("download"),
      html: decodeURIComponent(
        el.href.substring("data:text/html;charset=UTF-8,".length),
      ),
    })),
  );
  for (const { filename, html } of htmlFiles) {
    const outFilePath = path.resolve(outDirPath, filename);
    console.log(`build-html: write ${outFilePath}`);
    await writeFile(outFilePath, html);
  }
  await browser.close();
})();
