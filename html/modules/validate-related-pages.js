export function validateRelatedPages(pages) {
  const errors = pages.map((p) => validate(p)).reduce((a, c) => a + c, 0);
  if (errors !== 0) {
    throw new Error(`関連ページエラー: ${errors} 件`);
  }
}

function validate(page) {
  const html = page.contentHtml;
  const relatedPagesBegin = html.indexOf('<p class="heading">関連ページ</p>');
  if (relatedPagesBegin === -1) {
    return 0;
  }

  const htmlBeforeRelatedPages = html.substring(0, relatedPagesBegin);
  const htmlOfRelatedPages = html.substring(relatedPagesBegin);

  const linksBeforeRelatedPages = getLinks(htmlBeforeRelatedPages);
  const linksOfRelatedPages = getLinks(htmlOfRelatedPages);

  const linksFound = linksOfRelatedPages.filter((link) =>
    linksBeforeRelatedPages.includes(link)
  );
  linksFound.forEach((link) => {
    console.error(
      `${page.filename} ${page.title}: 関連ページ ${link} へのリンクは本文またはまとめにあるので不要です。`
    );
  });
  return linksFound.length;
}

function getLinks(html) {
  const links = [];
  if (html === "") {
    return links;
  }
  const elem = document.createElement("div");
  elem.innerHTML = html;
  elem.querySelectorAll("a[href]").forEach((el) => {
    const href = el.getAttribute("href");
    if (href.startsWith("http")) {
      return;
    }
    links.push(href);
  });
  return [...new Set(links)]; // 重複削除
}
