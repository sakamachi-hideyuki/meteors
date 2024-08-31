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
<div id="website-notes">
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
