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
  pages.push(createIndexPageData(rootElem.querySelector(".level0-section")));

  let level1Title = "";
  let level2Title = "";
  for (const section of rootElem.querySelectorAll(
    ".level1-section, .level2-section",
  )) {
    const title = section.querySelector("h1").innerText;
    if (section.className === "level1-section") {
      level1Title = title;
      level2Title = "";
    } else {
      level2Title = title;
    }
    pages.push(createNormalPageData(section, title, level1Title, level2Title));
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
    level1Title: "",
    level2Title: "",
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
 * @param {Element} section Level0セクション要素
 * @returns {Object} 先頭ページのページデータ
 */
function createIndexPageData(section) {
  const websiteDescription =
    "日本神話には星の神・神話が少ないと言われているが、実際は様々な星の神・神話が「見立て」を用いて語られている。";

  return {
    id: "index",
    title: "先頭ページ",
    level1Title: "",
    level2Title: "",
    filename: "index.html",
    contentHtml: section.outerHTML,
    descHtml: "", // 目次上の先頭ページには説明文を入れない
    descText: websiteDescription,
    titleOnly: false,
    anchorNames: [],
  };
}

/**
 * 通常ページのページデータを作成する.
 * @param {Element} section Level1またはLevel2セクション要素
 * @param {string} title セクションタイトル
 * @param {string} level1Title Level1タイトル
 * @param {string} level2Title Level2タイトル
 * @returns {Object} 通常ページのページデータ
 */
function createNormalPageData(section, title, level1Title, level2Title) {
  const anchorNames = Array.from(section.querySelectorAll("h1 a")).map((a) =>
    a.getAttribute("name"),
  );
  removeElems(section, "a[name]");
  const descElem = section.querySelector("p.desc");
  return {
    id: section.id,
    title,
    level1Title,
    level2Title,
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
