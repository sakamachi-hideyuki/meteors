import { removeElems } from "./dom-utils.js";

/**
 * HTML文字列をセクションごとに分割し、タイトルのみのセクションのページはまとめた
 * ページデータ配列を作成する.
 * @param {string} html HTML文字列
 * @returns {Array} 分割後のページデータ配列
 */
export function splitPages(html) {
  const pages = createPages(html);
  combineTitleOnlyPages(pages);
  return pages;
}

/**
 * HTML文字列をセクションごとに分割したページデータ配列を作成する.
 * @param {string} html HTML文字列
 * @returns {Array} 分割後のページデータ配列
 */
function createPages(html) {
  const rootElem = document.createElement("div");
  rootElem.innerHTML = html;

  const pages = [];
  pages.push(createTocPageData());
  pages.push(createIndexPageData(rootElem.querySelector("h1")));

  let h2Title = "";
  for (const h2h3 of rootElem.querySelectorAll("h2, h3")) {
    if (h2h3.tagName.toLowerCase() === "h2") {
      h2Title = h2h3.innerText;
    }
    pages.push(createNormalPageData(h2h3, h2Title));
  }
  return pages;
}

/**
 * 目次ページのページデータを作成する.
 * @returns {Object} 目次ページのページデータ
 */
function createTocPageData() {
  return {
    id: "toc",
    title: "目次",
    h2Title: "",
    h3Title: "",
    filename: "toc.html",
    contentHtml: "",
    descHtml: "",
    descText: "",
    titleOnly: false,
    anchorNames: [],
  };
}

/**
 * 先頭ページのページデータを作成する.
 * @param {Element} h1 H1要素
 * @returns {Object} 先頭ページのページデータ
 */
function createIndexPageData(h1) {
  const websiteDescription =
    "日本神話には星の神・神話が少ないと言われているが、実際は様々な星の神・神話が「見立て」を用いて語られている。";

  return {
    id: "index",
    title: "先頭ページ",
    h2Title: "",
    h3Title: "",
    filename: "index.html",
    contentHtml: h1.parentElement.outerHTML,
    descHtml: "", // 目次上の先頭ページには説明文を入れない
    descText: websiteDescription,
    titleOnly: false,
    anchorNames: [],
  };
}

/**
 * 通常ページのページデータを作成する.
 * @param {Element} h2h3 H2またはH3要素
 * @param {string} h2Title 親のH2タイトル
 * @returns {Object} 通常ページのページデータ
 */
function createNormalPageData(h2h3, h2Title) {
  const anchorNames = Array.from(h2h3.querySelectorAll("a")).map((a) =>
    a.getAttribute("name")
  );
  const section = h2h3.parentElement;
  removeElems(section, "a[name]");
  const descElem = section.querySelector("p.desc");
  return {
    id: section.id,
    title: h2h3.innerText,
    h2Title,
    h3Title: h2h3.tagName.toLowerCase() === "h2" ? "" : h2h3.innerText,
    filename: `${section.id}.html`,
    contentHtml: section.outerHTML,
    descHtml: descElem?.innerHTML ?? "",
    descText: descElem?.innerText ?? "",
    titleOnly: section.classList.contains("title-only"),
    anchorNames,
  };
}

/**
 * タイトルのみのセクションがある場合、ページをまとめる.
 * @param {Array} pages ページデータ配列
 */
function combineTitleOnlyPages(pages) {
  // タイトルのみのセクションがある場合、title、contentHtml、descHtml、descText、filenameを修正
  for (let i = 0; i < pages.length; i++) {
    if (pages[i].titleOnly) {
      for (let j = i + 1; j < pages.length; j++) {
        // 最初のタイトルのみのセクションにtitle、contentHtml、descHtml、descTextをまとめる
        pages[i].title += "、" + pages[j].title;
        pages[j].title = "";
        pages[i].contentHtml += pages[j].contentHtml;
        pages[j].contentHtml = "";
        pages[i].descHtml += pages[j].descHtml;
        pages[j].descHtml = "";
        pages[i].descText += pages[j].descText;
        pages[j].descText = "";
        // filenameは全部同じにする
        pages[j].filename = pages[i].filename;
        if (!pages[j].titleOnly) {
          i = j;
          break;
        }
      }
    }
  }
}
