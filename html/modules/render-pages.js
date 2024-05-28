import { renderTocHtml } from "./render-toc-html.js";
import { renderIndexHtml } from "./render-index-html.js";
import { renderNormalHtml } from "./render-normal-html.js";

export function renderPages(pages) {
  pages[0].html = renderTocHtml(pages[0], pages);

  pages[1].html = renderIndexHtml(pages[1], pages[2]);

  for (let i = 2; i < pages.length; i++) {
    const page = pages[i];
    if (page.contentHtml === "") {
      page.html = "";
      continue;
    }
    const prevPage = pages[i - 1];
    let nextPage = undefined;
    for (let j = i + 1; j < pages.length; j++) {
      if (pages[j].contentHtml !== "") {
        nextPage = pages[j];
        break;
      }
    }
    page.html = renderNormalHtml(page, prevPage, nextPage);
  }
}
