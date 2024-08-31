import { renderHead } from "./render-head.js";
import { renderHeader } from "./render-header.js";
import { renderFooter } from "./render-footer.js";

export const renderNormalHtml = (page, prevPage, nextPage) =>
  `<!DOCTYPE html>
<html lang="ja" id="html-${page.id}" prefix="og: https://ogp.me/ns#">
<head>
${renderHead(
  renderTitle(page),
  page.descText,
  `${Shared.websiteUrl}${page.filename}`
)}
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
  page.h3Title === ""
    ? `${page.title} - ${Shared.websiteTitle}`
    : `${page.h2Title}／${page.title} - ${Shared.websiteTitle}`;

const renderChapterImage = (page) =>
  Shared.pageIdToHtml[page.id] === undefined
    ? ""
    : `<div class="chapter-image">${Shared.pageIdToHtml[page.id]}</div>`;

const renderH2TitleDiv = (page) =>
  page.h3Title === "" ? "" : `<div class="h2-title">${page.h2Title}</div>`;
