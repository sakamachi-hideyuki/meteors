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

    const tocPage = {
      level: 1,
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
    pages.push(tocPage);

    const h1Section = rootElem.querySelector(".h1-section");
    const indexPage = {
      level: 2,
      id: "index",
      title: "先頭ページ",
      h2Title: "",
      h3Title: "",
      filename: "index.html",
      contentHtml: h1Section.outerHTML,
      descHtml: "",
      descText: "",
      titleOnly: false,
      anchorNames: [],
    };
    pages.push(indexPage);

    const els = Array.from(rootElem.querySelectorAll("h2, h3"));
    let h2Title = "";
    for (const el of els) {
      const anchorNames = Array.from(el.querySelectorAll("a")).map((a) =>
        a.getAttribute("name")
      );
      const section = el.parentElement;
      DomUtils.removeElems(section, "a[name]");
      const level = Number(el.tagName.substring(1)); // h2->2, h3->3
      const id = section.id;
      const title = el.innerText;
      let h3Title = "";
      if (level === 2) {
        h2Title = title;
      } else {
        h3Title = title;
      }
      const filename = `${id}.html`;
      const contentHtml = section.outerHTML;
      const descElem = section.querySelector("p.desc");
      const descHtml = descElem?.innerHTML ?? "";
      const descText = descElem?.innerText ?? "";
      const titleOnly = section.classList.contains("title-only");
      const page = {
        level,
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
      pages.push(page);
    }
    return pages;
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
