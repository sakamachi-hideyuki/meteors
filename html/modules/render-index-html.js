import { renderHeader } from "./render-header.js";
import { renderFooter } from "./render-footer.js";


export const renderIndexHtml = (page, nextPage) =>
  `<!DOCTYPE html>
<html lang="ja" id="html-${page.id}" prefix="og: https://ogp.me/ns#">
<head>
${Shared.googleAnalyticsHtml}
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${Shared.websiteTitle}</title>
<meta name="description" content="${Shared.websiteDescription}">
<meta property="og:type" content="website">
<meta property="og:locale" content="ja_JP">
<meta property="og:url" content="${Shared.websiteUrl}">
<meta property="og:image" content="${Shared.websiteImage}">
<meta property="og:site_name" content="${Shared.websiteTitle}">
<meta property="og:title" content="${Shared.websiteTitle}">
<meta property="og:description" content="${Shared.websiteDescription}">
<link rel="canonical" href="${Shared.websiteUrl}">
<style>
/* FOUC(Flash of unstyled content)対策 */
html {
  visibility: hidden;
}
</style>
<link rel="stylesheet" href="style.css">
</head>
<body>
${renderHeader(page, undefined, nextPage)}
<main>
<div class="website-image">
${Shared.photoPleiadesWebHtml}
</div>
<div id="website-desc">
本Webサイトは <a href="https://www.amazon.co.jp/dp/B09DX3WVX6/" target="_blank">書籍『${
    Shared.bookTitle
  }』(著:坂町英之)</a> の内容を著者がWeb公開したものです。
</div>
<div id="content">
${page.contentHtml}
</div>
</main>
${renderFooter(nextPage)}
</body>
</html>
`;
