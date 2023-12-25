export function renderIndexHtml(page, navbarHtml, nextPageLinkHtml) {
  return `<!DOCTYPE html>
<html lang="ja" id="html-${page.id}">
<head>
${Shared.googleAnalyticsHtml}
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="description" content="日本神話に星の神は少ないと言われているが、実際は星が付く名の神社は多く祭神も様々で、日本神話では様々な星の神・神話が「見立て」を用いて語られている。">
<title>${Shared.bookTitle}</title>
<link rel="canonical" href="${Shared.websiteUrl}">
<link rel="stylesheet" href="style.css">
</head>
<body>
${navbarHtml}
<main>
${Shared.photoPleiadesWebHtml}
<div id="website-desc">
本Webサイトは <a href="${Shared.amazonUrl}" target="_blank">書籍『${Shared.bookTitle}』(著:${Shared.author})</a> の内容を著者がWeb公開したものです。
</div>
<div id="content">
${page.contentHtml}
${nextPageLinkHtml}
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
