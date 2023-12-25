import { renderNavbarNav } from "./render-navbar-nav.js";
import { renderNextPageNav } from "./render-next-page-nav.js";

export function renderNormalHtml(page, prevPage, nextPage) {
  return `<!DOCTYPE html>
<html lang="ja" id="html-${page.id}">
<head>
${Shared.googleAnalyticsHtml}
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
${renderDescMeta(page)}
<title>${renderDocumentTitle(page)}</title>
<link rel="stylesheet" href="style.css">
</head>
<body>
${renderNavbarNav(page, prevPage, nextPage)}
<main>
<div id="content">
<div class="h1-title">${Shared.bookTitle}</div>
${renderH2TitleDiv(page)}
${page.contentHtml}
${renderNextPageNav(nextPage)}
</div>
</main>
<footer>
<div id="copyright">© 2021 SAKAMACHI HIDEYUKI</div>
</footer>
<a class="top-of-page" href="#" title="ページ先頭へ">▲</a>
</body>
</html>
`;
}

function renderDescMeta(page) {
  if (page.descText === "") {
    return "";
  }
  return `<meta name="description" content="${page.descText}">`;
}

function renderDocumentTitle(page) {
  if (
    page.h3Title !== "" &&
    !page.h3Title.endsWith("まとめ") &&
    !page.h3Title.startsWith("補足")
  ) {
    return `${page.h2Title}　${page.title} - ${Shared.bookTitle}`;
  } else {
    return `${page.title} - ${Shared.bookTitle}`;
  }
}

function renderH2TitleDiv(page) {
  if (
    page.h3Title !== "" &&
    !page.h3Title.endsWith("まとめ") &&
    !page.h3Title.startsWith("補足")
  ) {
    return `<div class="h2-title">${page.h2Title}</div>`;
  } else {
    return "";
  }
}
