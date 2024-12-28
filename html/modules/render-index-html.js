import { renderHead } from "./render-head.js";
import { renderHeader } from "./render-header.js";
import { renderFooter } from "./render-footer.js";

export const renderIndexHtml = (page, nextPage) =>
  `<!DOCTYPE html>
<html lang="ja" id="html-${page.id}" prefix="og: https://ogp.me/ns#">
<head>
${renderHead(Shared.websiteTitle, Shared.websiteDescription, Shared.websiteUrl)}
<link rel="canonical" href="${Shared.websiteUrl}">
</head>
<body>
${renderHeader(page, undefined, nextPage)}
<main>
<div class="website-image">
${Shared.photoPleiadesWebHtml}
</div>
<div id="content">
${page.contentHtml}
</div>
</main>
${renderFooter(nextPage)}
</body>
</html>
`;
