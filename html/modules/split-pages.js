import { removeElems } from "./dom-utils.js";

export function splitPages(html) {
  const pages = createPages(html);
  combineTitleOnlyPages(pages);
  return pages;
}

function createPages(html) {
  const rootElem = document.createElement("div");
  rootElem.innerHTML = html;

  const pages = [];

  const tocPage = createTocPageData();
  pages.push(tocPage);

  const h1 = rootElem.querySelector("h1");
  const indexPage = createIndexPageData(h1);
  pages.push(indexPage);

  const h2h3s = Array.from(rootElem.querySelectorAll("h2, h3"));
  let h2Title = "";
  for (const h2h3 of h2h3s) {
    if (h2h3.tagName.toLowerCase() === "h2") {
      h2Title = h2h3.innerText;
    }
    const page = createNormalPageData(h2h3, h2Title);
    pages.push(page);
  }
  return pages;
}

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

function createIndexPageData(h1) {
  return {
    id: "index",
    title: "先頭ページ",
    h2Title: "",
    h3Title: "",
    filename: "index.html",
    contentHtml: h1.parentElement.outerHTML,
    descHtml: "",
    descText: "",
    titleOnly: false,
    anchorNames: [],
  };
}

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
