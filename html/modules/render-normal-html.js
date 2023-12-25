import { renderNavbarNav } from "./render-navbar-nav.js";
import { renderNextPageNav } from "./render-next-page-nav.js";

export const renderNormalHtml = (page, prevPage, nextPage) =>
  `<!DOCTYPE html>
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

const renderDescMeta = (page) =>
  page.descText === ""
    ? ""
    : `<meta name="description" content="${page.descText}">`;

const renderDocumentTitle = (page) =>
  page.h3Title !== "" &&
  !page.h3Title.endsWith("まとめ") &&
  !page.h3Title.startsWith("補足")
    ? `${page.h2Title}　${page.title} - ${Shared.bookTitle}`
    : `${page.title} - ${Shared.bookTitle}`;

const renderH2TitleDiv = (page) =>
  page.h3Title !== "" &&
  !page.h3Title.endsWith("まとめ") &&
  !page.h3Title.startsWith("補足")
    ? `<div class="h2-title">${page.h2Title}</div>`
    : "";
