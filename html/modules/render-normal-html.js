export function renderNormalHtml(page, navbarHtml, nextPageLinkHtml) {
  const metaDescription =
    page.descText === ""
      ? ""
      : `<meta name="description" content="${page.descText}">`;
  const documentTitle = renderDocumentTitle(page);
  const h2TitleDiv = renderH2TitleDiv(page);
  return `<!DOCTYPE html>
<html lang="ja" id="html-${page.id}">
<head>
${Shared.googleAnalyticsHtml}
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
${metaDescription}
<title>${documentTitle}</title>
<link rel="stylesheet" href="style.css">
</head>
<body>
${navbarHtml}
<main>
<div id="content">
<div class="h1-title">${Shared.bookTitle}</div>
${h2TitleDiv}
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
