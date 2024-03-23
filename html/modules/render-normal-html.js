import { renderHeader } from "./render-header.js";
import { renderFooter } from "./render-footer.js";

export const renderNormalHtml = (page, prevPage, nextPage) =>
  `<!DOCTYPE html>
<html lang="ja" id="html-${page.id}">
<head>
${Shared.googleAnalyticsHtml}
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${renderDocumentTitle(page)}</title>
${renderDescMeta(page)}
<style>
/* FOUC(Flash of unstyled content)対策 */
html {
  visibility: hidden;
}
</style>
<link rel="stylesheet" href="style.css">
</head>
<body>
${renderHeader(page, prevPage, nextPage)}
<main>
<div class="h1-title">${Shared.bookTitle}</div>
${renderH2TitleDiv(page)}
<div id="content">
${page.contentHtml}
</div>
</main>
${renderFooter(nextPage)}
</body>
</html>
`;

const renderDescMeta = (page) =>
  page.descText === ""
    ? ""
    : `<meta name="description" content="${page.descText}">`;

const renderDocumentTitle = (page) =>
  page.h3Title === "" ||
  page.h3Title.endsWith("まとめ") ||
  page.h3Title.startsWith("補足")
    ? `${page.title} - ${Shared.bookTitle}`
    : `${page.h2Title}　${page.title} - ${Shared.bookTitle}`;

const renderH2TitleDiv = (page) =>
  page.h3Title === "" ||
  page.h3Title.endsWith("まとめ") ||
  page.h3Title.startsWith("補足")
    ? ""
    : `<div class="h2-title">${page.h2Title}</div>`;
