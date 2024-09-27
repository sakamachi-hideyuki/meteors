export function validateRelatedPages(pages) {
  const errors = pages
    .map((p) => validate(pages, p))
    .reduce((a, c) => a + c, 0);
  if (errors !== 0) {
    throw new Error(`関連ページエラー: ${errors} 件`);
  }
}

function validate(pages, page) {
  if (ignoredPages.includes(page.filename)) {
    return 0;
  }
  const html = page.contentHtml;
  const summaryHeading = `<p class="heading">まとめ</p>`;
  const relatedPagesHeading = `<p class="heading">関連ページ</p>`;

  const summaryBegin = html.indexOf(summaryHeading);
  if (summaryBegin === -1) {
    return 0;
  }
  const relatedPagesBegin = html.indexOf(relatedPagesHeading);
  const summaryEnd = relatedPagesBegin === -1 ? html.length : relatedPagesBegin;

  let htmlBeforeSummary = html.substring(0, summaryBegin);
  // ……の後にリンクがある場合、まとめ、関連ページになくても良いので除外
  htmlBeforeSummary = htmlBeforeSummary.replaceAll(/……<a [^<]+<\/a>/g, "");

  const htmlOfSummary = html.substring(summaryBegin, summaryEnd);

  const htmlOfRelatedPages =
    relatedPagesBegin === -1 ? "" : html.substring(relatedPagesBegin);

  const linksBeforeSummary = getLinks(htmlBeforeSummary);
  const linksOfSummary = getLinks(htmlOfSummary);
  const linksOfRelatedPages = getLinks(htmlOfRelatedPages);

  const errors1 = validateLinksInSummaryOrRelatedPages(
    page,
    linksBeforeSummary,
    linksOfSummary,
    linksOfRelatedPages
  );
  const errors2 = validateMutualLinks(
    pages,
    page,
    linksOfSummary,
    linksOfRelatedPages
  );

  return errors1 + errors2;
}

function validateLinksInSummaryOrRelatedPages(
  page,
  linksBeforeSummary,
  linksOfSummary,
  linksOfRelatedPages
) {
  const linksNotFoundInSummaryAndRelatedPages = linksBeforeSummary.filter(
    (link) =>
      !ignoredPages.includes(link) &&
      !ignoredLinks.includes(link) &&
      !linksOfSummary.includes(link) &&
      !linksOfRelatedPages.includes(link)
  );
  linksNotFoundInSummaryAndRelatedPages.forEach((link) => {
    console.error(
      `${page.filename} ${page.title}: ${link} へのリンクが、まとめ、関連ページにありません。`
    );
  });
  return linksNotFoundInSummaryAndRelatedPages.length;
}

function validateMutualLinks(pages, page, linksOfSummary, linksOfRelatedPages) {
  const linksNotMutual = [...linksOfSummary, ...linksOfRelatedPages].filter(
    (link) =>
      !ignoredPages.includes(link) &&
      !pages
        .find((p) => p.filename === link)
        .contentHtml.includes(`href="${page.filename}"`)
  );
  linksNotMutual.forEach((link) => {
    console.error(
      `${page.filename} ${page.title}: ${link} をリンクしていますが、このページからのリンクがありません。`
    );
  });
  return linksNotMutual.length;
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

const ignoredPages = [
  "toc.html",
  "index.html",
  "preface.html",
  "chapter-of-haya.html",
  "chapter-of-haya--section-o.html",
  "chapter-of-haya--summary.html",
  "chapter-of-kushi.html",
  "chapter-of-kushi--summary.html",
  "chapter-of-mika.html",
  "chapter-of-mika--section-o.html",
  "chapter-of-mika--summary.html",
  "chapter-of-tama.html",
  "chapter-of-tama--section-3.html", // 天玉櫛彦命、玉櫛媛、...
  "chapter-of-tama--section-o.html",
  "chapter-of-tama--summary.html",
  "chapter-of-hi.html",
  "chapter-of-hi--section-o.html",
  "chapter-of-hi--summary.html",
  "chapter-of-ishi.html",
  "chapter-of-ishi--section-o.html",
  "chapter-of-ishi--summary.html",
  "chapter-of-ishi--supplement-3.html", // 補足　タケ、トヨの意味
  "appendix.html",
  "revision-history.html",
];

const ignoredLinks = [
  "chapter-of-haya--section-2.html", // 正哉吾勝勝速日天忍穂耳尊（流星は昴から来る）
  "chapter-of-haya--supplement-1.html", // 補足　大日孁貴、月読尊、蛭児の意味（神名解釈の方法）
  "chapter-of-kushi--section-10.html", // 櫛真智命（ウ段への変化）
];
