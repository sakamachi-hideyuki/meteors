/**
 * 加工前後のリンクを比較し、不一致があれば例外をスローする.
 * @param {string} html 加工前HTML
 * @param {Array} pages ページデータ配列
 */
export function validateLinks(html, pages) {
  const oldLinks = getOldLinks(html);
  convertHref(oldLinks, pages);
  const newLinks = getNewLinks(pages);
  validate(oldLinks, newLinks);
}

/**
 * 加工前HTML中のリンク情報を取得する.
 * @param {string} html 加工前HTML
 * @returns {Array} 加工前リンク情報配列
 */
function getOldLinks(html) {
  const rootElem = document.createElement("div");
  rootElem.innerHTML = html;

  const oldLinks = [];
  rootElem.querySelectorAll("a[href]").forEach((el) => {
    const href = el.getAttribute("href");
    // 外部へのリンク、目次のリンクは除外
    if (!href.startsWith("#") || href.startsWith("#_Toc")) {
      return;
    }
    const link = { href, text: el.innerText };
    oldLinks.push(link);
  });
  return oldLinks;
}

/**
 * 加工前リンク情報中のリンク先を加工後のリンク先に変換する.
 * @param {Array} oldLinks 加工前リンク情報配列
 * @param {Array} pages ページデータ配列
 */
function convertHref(oldLinks, pages) {
  oldLinks.forEach((oldLink) => {
    const anchorName = oldLink.href.substring(1);
    const page = pages.find((p) => p.anchorNames.includes(anchorName));
    if (page === undefined) {
      throw new Error(`page not found. anchorName=${anchorName}`);
    }
    oldLink.href = page.filename;
  });
}

/**
 * 加工後のページデータ配列からリンク情報を取得する.
 * @param {Array} pages ページデータ配列
 * @returns {Array} 加工後リンク情報配列
 */
function getNewLinks(pages) {
  const newLinks = [];
  pages.forEach((page) => {
    if (page.contentHtml === "") {
      return;
    }
    const elem = document.createElement("div");
    elem.innerHTML = page.contentHtml;
    elem.querySelectorAll("a[href]").forEach((el) => {
      const href = el.getAttribute("href");
      if (href.startsWith("http")) {
        return;
      }
      const link = { href, text: el.innerText, filename: page.filename };
      newLinks.push(link);
    });
  });
  return newLinks;
}

/**
 * 加工前後のリンク情報を比較し、不一致があれば例外をスローする.
 * @param {Array} oldLinks 加工前リンク情報配列
 * @param {Array} newLinks 加工後リンク情報配列
 */
function validate(oldLinks, newLinks) {
  console.log("oldLinks:");
  console.log(oldLinks);
  console.log("newLinks:");
  console.log(newLinks);
  const len = Math.max(oldLinks.length, newLinks.length);
  for (let i = 0; i < len; i++) {
    const oldLink = oldLinks[i];
    const newLink = newLinks[i];
    if (
      oldLink === undefined ||
      newLink === undefined ||
      oldLink.href !== newLink.href ||
      oldLink.text !== newLink.text
    ) {
      const oldLinkJson = JSON.stringify(oldLink);
      const newLinkJson = JSON.stringify(newLink);
      throw new Error(
        `link unmatch: i=${i} oldLinkJson=${oldLinkJson}, newLinkJson=${newLinkJson}`
      );
    }
  }
}
