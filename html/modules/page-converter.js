import { DomUtils } from "./dom-utils.js";

export class PageConverter {
  static #h2TitleToId = {
    "序文　星の神を祀る神社": "preface",
    速の章: "chapter-of-haya",
    櫛の章: "chapter-of-kushi",
    甕の章: "chapter-of-mika",
    玉の章: "chapter-of-tama",
    火の章: "chapter-of-hi",
    石の章: "chapter-of-ishi",
    "付録　神名末尾のパターン": "appendix",
    改版履歴: "revision-history",
  };

  static convert(html) {
    const rootElem = document.createElement("div");
    rootElem.innerHTML = html;

    DomUtils.removeElemsAndDescendants(rootElem, "[class^=MsoToc], br");
    DomUtils.removeElems(rootElem, 'a[href], a[name^="_Toc"], span');
    this.#removeUnnecessaryClasses(rootElem);
    this.#removeUnnecessaryAttrs(rootElem);

    this.#convertBlankLines(rootElem);
    this.#convertTextIndents(rootElem);
    this.#convertImages(rootElem);

    DomUtils.removeBlankLines(rootElem);
    this.#removeUnnecessaryParagraphs(rootElem);

    DomUtils.changeTagNames(rootElem, "h3", "h4");
    DomUtils.changeTagNames(rootElem, "h2", "h3");
    DomUtils.changeTagNames(rootElem, "h1", "h2");

    this.#createH2Sections(rootElem);
    this.#setH2SectionIds(rootElem);
    this.#moveH2SectionImages(rootElem);

    this.#createH3Sections(rootElem);
    this.#setH3SectionIds(rootElem);
    this.#moveH3Sections(rootElem);
    this.#setTitleOnlyClasses(rootElem);

    this.#createH1Section(rootElem);

    this.#removeBlankLinesAtEndOfSections(rootElem);

    return rootElem.innerHTML;
  }

  static #removeUnnecessaryClasses(rootElem) {
    rootElem.querySelectorAll("*").forEach((el) => {
      if (
        el.className === "blank-line" ||
        el.className === "desc" ||
        el.className === "par" ||
        el.className === "par-bold" ||
        el.className === "list-1" ||
        el.className === "list-2" ||
        el.className === "list-3"
      ) {
        // そのまま残す
      } else {
        el.removeAttribute("class");
      }
    });
  }

  static #removeUnnecessaryAttrs(rootElem) {
    rootElem.querySelectorAll("*").forEach((el) => {
      const textIndent = el.style.textIndent;
      const attrNames = el.getAttributeNames();
      for (const attrName of attrNames) {
        if (attrName === "alt" || attrName === "class" || attrName === "name") {
          // alt/class/name属性は削除しない
          continue;
        }
        // それ以外の属性は削除
        el.removeAttribute(attrName);
      }
      if (textIndent) {
        // style属性のtext-indentは復活
        el.style.textIndent = textIndent;
      }
    });
  }

  static #convertBlankLines(rootElem) {
    rootElem.querySelectorAll("*").forEach((el) => {
      if (el.tagName.toLowerCase() === "p" && el.innerText === "\u00A0") {
        // 空行
        el.setAttribute("class", "blank-line");
        el.removeAttribute("style");
      }
    });
  }

  static #convertTextIndents(rootElem) {
    rootElem.querySelectorAll("*[style]").forEach((el) => {
      if (el.style.textIndent) {
        el.style.textIndent = this.#toRem(el.style.textIndent);
      }
    });
  }

  /**
   * text-indentの数値の単位をremに変換する.
   * ptまたは0mmのみを想定.
   */
  static #toRem(textIndent) {
    if (textIndent.endsWith("pt")) {
      // ptを数値で取得
      const pt = Number(textIndent.substring(0, textIndent.length - 2));
      // 10.5ptあたり1remに変換、四捨五入で小数部１桁にする
      const rem = Math.round((pt / 10.5) * 10) / 10;
      return `${rem}rem`;
    } else if (textIndent === "0mm") {
      return "0rem";
    } else {
      throw new Error(`Unexpected text-indent: ${textIndent}`);
    }
  }

  static #convertImages(rootElem) {
    Array.from(rootElem.querySelectorAll("img")).forEach((el) => {
      const alt = el.getAttribute("alt") ?? "";
      const html = Shared.altToHtml[alt];
      if (html === undefined) {
        throw new Error(`Unknown alt: ${alt}`);
      }
      let ancestor = el.parentElement;
      while (
        ancestor.tagName.toLowerCase() !== "p" &&
        ancestor.tagName.toLowerCase() !== "table"
      ) {
        ancestor = ancestor.parentElement;
      }
      if (html === "") {
        ancestor.remove();
      } else {
        const newElem = DomUtils.htmlToElem(html);
        ancestor.replaceWith(newElem);
      }
    });
  }

  /**
   * 内容のないpを削除する.
   */
  static #removeUnnecessaryParagraphs(rootElem) {
    rootElem.innerHTML = rootElem.innerHTML.replace(/<p[^>]*>\n?<\/p>\n?/g, "");
  }

  /**
   * 各H2セクションを作成する.
   * ルート要素の子ノードにH2要素があればH2セクションを作成し、
   * H2要素と後続の子ノードをそのH2セクションの子とする.
   */
  static #createH2Sections(rootElem) {
    let h2Section = undefined;
    for (const node of Array.from(rootElem.childNodes)) {
      if (node.nodeType === 1 && node.tagName.toLowerCase() === "h2") {
        h2Section = DomUtils.htmlToElem(
          '<section class="h2-section"></section>'
        );
        node.replaceWith(h2Section);
      }
      if (h2Section !== undefined) {
        h2Section.appendChild(node);
      }
    }
  }

  /**
   * 各H2セクションのidを設定する.
   * H2のタイトルに対応するidとする.
   */
  static #setH2SectionIds(rootElem) {
    rootElem.querySelectorAll(".h2-section").forEach((el) => {
      const h2Title = el.querySelector("h2").innerText;
      const id = this.#h2TitleToId[h2Title];
      if (id === undefined) {
        throw new Error(`Unknown h2 title: ${h2Title}`);
      }
      el.id = id;
    });
  }

  /**
   * H2セクション先頭の画像は1つ前のH2セクションの最後の子要素となっているので、
   * H2セクションの最初の子要素に移動する.
   */
  static #moveH2SectionImages(rootElem) {
    const h2Sections = Array.from(rootElem.querySelectorAll(".h2-section"));
    let prevH2Section = undefined;
    for (const h2Section of h2Sections) {
      // 1つ前のH2セクションの最後の子要素が .image-and-caption なら現在のH2セクションの最初の子要素に変更
      if (
        prevH2Section !== undefined &&
        prevH2Section.lastElementChild.className === "image-and-caption"
      ) {
        h2Section.prepend(prevH2Section.lastElementChild);
      }
      prevH2Section = h2Section;
    }
  }

  /**
   * 各H3セクションを作成する.
   * 各H2セクションの子ノードにH3要素があればH3セクションを作成し、
   * H3要素と後続の子ノードをそのH3セクションの子とする.
   */
  static #createH3Sections(rootElem) {
    const h2Sections = Array.from(rootElem.querySelectorAll(".h2-section"));
    for (const h2Section of h2Sections) {
      let h3Section = undefined;
      for (const node of Array.from(h2Section.childNodes)) {
        if (node.nodeType === 1 && node.tagName.toLowerCase() === "h3") {
          h3Section = DomUtils.htmlToElem(
            '<section class="h3-section"></section>'
          );
          node.replaceWith(h3Section);
        }
        if (h3Section !== undefined) {
          h3Section.appendChild(node);
        }
      }
    }
  }

  /**
   * 各H3セクションのidを設定する.
   */
  static #setH3SectionIds(rootElem) {
    const h2Sections = Array.from(rootElem.querySelectorAll(".h2-section"));
    for (const h2Section of h2Sections) {
      const h3Sections = Array.from(h2Section.querySelectorAll(".h3-section"));
      let sectionCount = 0;
      let supplementCount = 0;
      for (const h3Section of h3Sections) {
        const h3Title = h3Section.querySelector("h3").innerText;
        if (h3Title === "その他の神") {
          h3Section.id = `${h2Section.id}--section-o`;
        } else if (h3Title.endsWith("まとめ")) {
          h3Section.id = `${h2Section.id}--summary`;
        } else if (h3Title.startsWith("補足")) {
          supplementCount++;
          h3Section.id = `${h2Section.id}--supplement-${supplementCount}`;
        } else {
          sectionCount++;
          h3Section.id = `${h2Section.id}--section-${sectionCount}`;
        }
      }
    }
  }

  /**
   * 各H3セクションをH2セクションの子要素からそのH2セクションの弟要素に移動する.
   * H2セクションもH3セクションもそれぞれHTMLの1ページとするため、
   * H2セクション内からH3セクションを分離する.
   */
  static #moveH3Sections(rootElem) {
    const h2Sections = Array.from(rootElem.querySelectorAll(".h2-section"));
    for (const h2Section of h2Sections) {
      const h3Sections = Array.from(h2Section.querySelectorAll(".h3-section"));
      const nextH2Section = h2Section.nextElementSibling;
      for (const h3Section of h3Sections) {
        nextH2Section.before(h3Section);
      }
    }
  }

  /**
   * 配下にp要素がないH3セクションには "title-only" という class 属性を付ける.
   */
  static #setTitleOnlyClasses(rootElem) {
    rootElem.querySelectorAll(".h3-section").forEach((el) => {
      if (el.querySelector("p") === null) {
        el.classList.add("title-only");
      }
    });
  }

  /**
   * H1セクションを作成する.
   */
  static #createH1Section(rootElem) {
    const intro = document.createElement("div");
    // 最初のsectionの手前までのノードを取り出す
    for (const node of Array.from(rootElem.childNodes)) {
      if (node.nodeType === 1 && node.tagName.toLowerCase() === "section") {
        break;
      }
      intro.appendChild(node);
    }
    const h1Section = DomUtils.htmlToElem(
      `<section class="h1-section" id="index">
<h1>${Shared.bookTitle}</h1>
${intro.innerHTML}
</section>`
    );
    rootElem.prepend(h1Section);
  }

  /**
   * 各セクションの末尾の空行を削除する.
   */
  static #removeBlankLinesAtEndOfSections(rootElem) {
    rootElem.querySelectorAll("section").forEach((el) => {
      // 末尾の空行は削除
      el.innerHTML = el.innerHTML.replace(/(<p[^>]*>&nbsp;<\/p>\n+)+$/g, "");
    });
  }
}
