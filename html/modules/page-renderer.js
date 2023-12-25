import { renderTocHtml } from "./render-toc-html.js";
import { renderIndexHtml } from "./render-index-html.js";
import { renderNormalHtml } from "./render-normal-html.js";
import { renderNavbarHtml } from "./render-navbar-html.js";
import { renderNextPageLinkHtml } from "./render-next-page-link-html.js";

export class PageRenderer {
  static render(pages) {
    pages[0].html = renderTocHtml(pages);

    pages[1].html = renderIndexHtml(
      pages[1],
      renderNavbarHtml(undefined, pages[1], pages[2]),
      renderNextPageLinkHtml(pages[2])
    );

    for (let i = 2; i < pages.length; i++) {
      if (pages[i].contentHtml === "") {
        pages[i].html = "";
        continue;
      }
      let nextPage = undefined;
      for (let j = i + 1; j < pages.length; j++) {
        if (pages[j].contentHtml !== "") {
          nextPage = pages[j];
          break;
        }
      }
      pages[i].html = renderNormalHtml(
        pages[i],
        renderNavbarHtml(pages[i - 1], pages[i], nextPage),
        renderNextPageLinkHtml(nextPage)
      );
    }
  }
}
