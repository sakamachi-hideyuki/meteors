/**
 * ページ内の関連ページのリンク検証を行う.
 * 関連ページへのリンクが関連ページより前のHTMLに存在しないか検証する.
 * エラーがあれば例外をスローする.
 * @param {Array} pages ページデータ配列
 * @throws {Error} 関連ページへのリンクが関連ページより前のHTMLに存在する場合
 */
export function validateRelatedPages(pages) {
  const errors = pages.map((p) => validate(p)).reduce((a, c) => a + c, 0);
  if (errors !== 0) {
    throw new Error(`関連ページエラー: ${errors} 件`);
  }
}

/**
 * 指定ページの関連ページへのリンクが関連ページより前のHTMLに存在しないか検証する.
 * 存在する場合はエラーメッセージをコンソールに出力する.
 * @param {Object} page ページデータ
 * @returns {number} エラー件数
 */
function validate(page) {
  const html = page.contentHtml;
  const relatedPagesBegin = html.indexOf('<p class="heading">関連ページ</p>');
  if (relatedPagesBegin === -1) {
    return 0;
  }

  // 関連ページより前のHTMLと関連ページ以降のHTMLに分割
  const htmlBeforeRelatedPages = html.substring(0, relatedPagesBegin);
  const htmlOfRelatedPages = html.substring(relatedPagesBegin);

  // 両方のHTMLからリンク先を取得
  const linksBeforeRelatedPages = getLinks(htmlBeforeRelatedPages);
  const linksOfRelatedPages = getLinks(htmlOfRelatedPages);

  // 関連ページへのリンクが関連ページより前のHTMLに存在するか検証
  const linksFound = linksOfRelatedPages.filter((link) =>
    linksBeforeRelatedPages.includes(link)
  );
  linksFound.forEach((link) => {
    console.error(
      `${page.filename} ${page.title}: 関連ページ ${link} はそれより前にリンクがあるので不要です。`
    );
  });
  return linksFound.length;
}

/**
 * HTML文字列からリンク先を取得する.
 * @param {string} html HTML文字列
 * @returns {Array} リンク先配列
 */
function getLinks(html) {
  const links = [];
  if (html === "") {
    return links;
  }
  const elem = document.createElement("div");
  elem.innerHTML = html;
  elem.querySelectorAll("a[href]").forEach((el) => {
    const href = el.getAttribute("href");
    // 外部リンクは除外
    if (href.startsWith("http")) {
      return;
    }
    links.push(href);
  });
  return [...new Set(links)]; // 重複削除
}
