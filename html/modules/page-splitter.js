import { DomUtils } from "./dom-utils.js";

export class PageSplitter {
  static split(html) {
    const pages = this.#createPages(html);
    this.#combineTitleOnlyPages(pages);
    return pages;
  }

  static #createPages(html) {
    const rootElem = document.createElement("div");
    rootElem.innerHTML = html;

    const pages = [];

    const tocPage = this.#createTocPageData();
    pages.push(tocPage);

    const h1 = rootElem.querySelector("h1");
    const indexPage = this.#createIndexPageData(h1);
    pages.push(indexPage);

    const h2h3s = Array.from(rootElem.querySelectorAll("h2, h3"));
    let h2Title = "";
    for (const h2h3 of h2h3s) {
      if (h2h3.tagName.toLowerCase() === "h2") {
        h2Title = h2h3.innerText;
      }
      const page = this.#createNormalPageData(h2h3, h2Title);
      pages.push(page);
    }
    return pages;
  }

  static #createTocPageData() {
    return {
      tocLevel: 0,
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

  static #createIndexPageData(h1) {
    return {
      tocLevel: 1,
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

  static #createNormalPageData(h2h3, h2Title) {
      const anchorNames = Array.from(h2h3.querySelectorAll("a")).map((a) =>
        a.getAttribute("name")
      );
      const section = h2h3.parentElement;
      DomUtils.removeElems(section, "a[name]");
      const id = section.id;
      const title = h2h3.innerText;
      let tocLevel;
      let h3Title;
      if (h2h3.tagName.toLowerCase() === "h2") {
        tocLevel = 1;
        h3Title = "";
      } else {
        tocLevel = 2;
        h3Title = title;
      }
      const filename = `${id}.html`;
      const contentHtml = section.outerHTML;
      const descElem = section.querySelector("p.desc");
      const descHtml = descElem?.innerHTML ?? "";
      const descText = descElem?.innerText ?? "";
      const titleOnly = section.classList.contains("title-only");
      return {
        tocLevel,
        id,
        title,
        h2Title,
        h3Title,
        filename,
        contentHtml,
        descHtml,
        descText,
        titleOnly,
        anchorNames,
      };
  }

  static #combineTitleOnlyPages(pages) {
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
}
