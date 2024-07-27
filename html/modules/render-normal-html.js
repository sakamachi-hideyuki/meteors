import { renderHeader } from "./render-header.js";
import { renderFooter } from "./render-footer.js";

export const renderNormalHtml = (page, prevPage, nextPage) =>
  `<!DOCTYPE html>
<html lang="ja" id="html-${page.id}" prefix="og: https://ogp.me/ns#">
<head>
${Shared.googleAnalyticsHtml}
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${renderTitle(page)} - ${Shared.websiteTitle}</title>
${renderMetaDescription(page)}
<meta property="og:type" content="website">
<meta property="og:locale" content="ja_JP">
<meta property="og:url" content="${Shared.websiteUrl}${page.filename}">
<meta property="og:image" content="${Shared.websiteImage}">
<meta property="og:site_name" content="${Shared.websiteTitle}">
<meta property="og:title" content="${renderTitle(page)} - ${Shared.websiteTitle}" />
${renderMetaOgDescription(page)}
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
${renderChapterImage(page)}<div class="h1-title">${Shared.websiteTitle}</div>
${renderH2TitleDiv(page)}
<div id="content">
${page.contentHtml}
</div>
</main>
${renderFooter(nextPage)}
</body>
</html>
`;

const renderTitle = (page) =>
  page.h3Title === "" ||
  page.h3Title.endsWith("まとめ") ||
  page.h3Title.startsWith("補足")
    ? `${page.title}`
    : `${page.h2Title}　${page.title}`;

const renderMetaDescription = (page) =>
  page.descText === ""
    ? ""
    : `<meta name="description" content="${page.descText}">`;

const renderMetaOgDescription = (page) =>
  page.descText === ""
    ? ""
    : `<meta property="og:description" content="${page.descText}">`;

const renderChapterImage = (page) =>
  Shared.pageIdToHtml[page.id] === undefined
    ? ""
    : `<div class="chapter-image">${Shared.pageIdToHtml[page.id]}</div>`;

const renderH2TitleDiv = (page) =>
  page.h3Title === "" ||
  page.h3Title.endsWith("まとめ") ||
  page.h3Title.startsWith("補足")
    ? ""
    : `<div class="h2-title">${page.h2Title}</div>`;
