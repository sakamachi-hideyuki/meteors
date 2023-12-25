import { renderNavbarNav } from "./render-navbar-nav.js";
import { renderNextPageNav } from "./render-next-page-nav.js";

export const renderIndexHtml = (page, nextPage) =>
  `<!DOCTYPE html>
<html lang="ja" id="html-${page.id}">
<head>
${Shared.googleAnalyticsHtml}
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="description" content="日本神話に星の神は少ないと言われているが、実際は星が付く名の神社は多く祭神も様々で、日本神話では様々な星の神・神話が「見立て」を用いて語られている。">
<title>${Shared.bookTitle}</title>
<link rel="canonical" href="https://sakamachi-hideyuki.github.io/meteors/">
<link rel="stylesheet" href="style.css">
</head>
<body>
${renderNavbarNav(page, undefined, nextPage)}
<main>
${Shared.photoPleiadesWebHtml}
<div id="website-desc">
本Webサイトは <a href="https://www.amazon.co.jp/dp/B09DX3WVX6/" target="_blank">書籍『${
    Shared.bookTitle
  }』(著:坂町英之)</a> の内容を著者がWeb公開したものです。
</div>
<div id="content">
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
