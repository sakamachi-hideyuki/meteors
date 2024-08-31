import { buildPages } from "./build-pages.js";
import { validateLinks } from "./validate-links.js";
import { validateRelatedPages } from "./validate-related-pages.js";
import { validateSummaries } from "./validate-summaries.js";

document.getElementById("buildButton").addEventListener("click", () => {
  const inputIframe = document.getElementById("inputIframe");
  const inputElem =
    inputIframe.contentWindow.document.querySelector("body>div");
  const inputHtml = inputElem.innerHTML;

  const pages = buildPages(inputHtml);

  console.log("pages:");
  console.log(pages);

  validateLinks(inputHtml, pages);
  validateSummaries(pages);
  validateRelatedPages(pages);

  const outputElem = document.getElementById("outputElem");
  outputElem.innerHTML = "";

  pages
    .filter((page) => page.html !== "")
    .forEach((page) => {
      const dataUrl =
        "data:text/html;charset=UTF-8," + encodeURIComponent(page.html);
      const p = document.createElement("p");
      const a = document.createElement("a");
      a.href = dataUrl;
      a.download = page.filename;
      a.innerText = page.filename;
      p.appendChild(a);
      outputElem.appendChild(p);
    });
});

document
  .getElementById("saveButtonForFirefox")
  .addEventListener("click", () => {
    const links = document.querySelectorAll("a[download]");
    for (const link of links) {
      link.click();
    }
  });

document
  .getElementById("saveButtonForChrome")
  .addEventListener("click", async () => {
    const links = document.querySelectorAll("a[download]");
    for (const link of links) {
      link.click();
      // Chromeでは1秒間に最大10ダウンロードの制限があるため
      await pause(110);
    }
  });

function pause(millisec) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, millisec);
  });
}
