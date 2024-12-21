import {
  changeTagNames,
  htmlToElem,
  removeBlankLines,
  removeElems,
  removeElemsAndDescendants,
} from "./dom-utils.js";

const availableClasses = [
  "desc",
  "heading",
  "list-1",
  "list-1s",
  "list-2",
  "list-3",
  "par",
];

const h2TitleToId = {
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

export function convertPages(html) {
  const rootElem = document.createElement("div");
  rootElem.innerHTML = html;

  removeElemsAndDescendants(rootElem, "[class^=MsoToc], br, p.chapter");
  removeElems(rootElem, 'a[href], a[name^="_Toc"], span, p.heading b');
  removeUnnecessaryAttrs(rootElem);

  convertBlankPs(rootElem);
  convertTextIndents(rootElem);
  convertImages(rootElem);

  removeBlankLines(rootElem);
  removeUnnecessaryPs(rootElem);

  changeTagNames(rootElem, "h3", "h4");
  changeTagNames(rootElem, "h2", "h3");
  changeTagNames(rootElem, "h1", "h2");

  createH2Sections(rootElem);
  setH2SectionIds(rootElem);

  createH3Sections(rootElem);
  setH3SectionIds(rootElem);
  moveH3Sections(rootElem);
  setTitleOnlyClasses(rootElem);

  createH1Section(rootElem);

  removeBlankLines(rootElem);
  removeBlankPsAtEndOfSections(rootElem);

  return rootElem.innerHTML;
}

/**
 * 不要な属性を削除する.
 */
function removeUnnecessaryAttrs(rootElem) {
  rootElem.querySelectorAll("*").forEach((el) => {
    const textIndent = el.style.textIndent;
    const attrNames = el.getAttributeNames();
    for (const attrName of attrNames) {
      if (attrName === "alt" || attrName === "name") {
        // alt, name属性は削除しない
        continue;
      }
      if (attrName === "class") {
        // class属性は使用しているものは削除しない
        const className = el.getAttribute(attrName);
        if (availableClasses.includes(className)) {
          continue;
        }
      }
      // それ以外の属性は削除
      el.removeAttribute(attrName);
    }
    if (textIndent) {
      // style属性のtext-indentは復活
      el.setAttribute("style", "text-indent:" + textIndent);
    }
  });
}

/**
 * 空行のp要素をclass属性が"blank"、style属性なしに変換する.
 */
function convertBlankPs(rootElem) {
  rootElem.querySelectorAll("*").forEach((el) => {
    if (el.tagName.toLowerCase() === "p" && el.innerText === "\u00A0") {
      // 空行
      el.setAttribute("class", "blank");
      el.removeAttribute("style");
    }
  });
}

/**
 * 各text-indentスタイルの値の単位をremに変換する.
 */
function convertTextIndents(rootElem) {
  rootElem.querySelectorAll("*[style]").forEach((el) => {
    if (el.style.textIndent) {
      el.style.textIndent = toRem(el.style.textIndent);
    }
  });
}

/**
 * 指定のtext-indentの値の単位をremに変換する.
 * ptまたは0mmのみを想定.
 *
 * @param textIndent text-indentの値
 * @retrun remに単位変換後の値
 */
function toRem(textIndent) {
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

/**
 * 電子書籍用画像をWeb用画像に変換する.
 */
function convertImages(rootElem) {
  Array.from(rootElem.querySelectorAll("img")).forEach((el) => {
    const alt = el.getAttribute("alt") ?? "";
    // imgのaltに対応するWeb用画像HTMLを取得
    const html = Shared.altToHtml[alt];
    if (html === undefined) {
      throw new Error(`Unknown alt: ${alt}`);
    }
    // imgの祖先のp要素またはtable要素を探す
    let ancestor = el.parentElement;
    while (
      ancestor.tagName.toLowerCase() !== "p" &&
      ancestor.tagName.toLowerCase() !== "table"
    ) {
      ancestor = ancestor.parentElement;
    }
    // imgの祖先のp要素またはtable要素をWeb用画像HTMLに置換
    if (html === "") {
      ancestor.remove();
    } else {
      const newElem = htmlToElem(html);
      ancestor.replaceWith(newElem);
    }
  });
}

/**
 * 内容のないp要素を削除する.
 */
function removeUnnecessaryPs(rootElem) {
  rootElem.innerHTML = rootElem.innerHTML.replace(/<p[^>]*>\n?<\/p>\n?/g, "");
}

/**
 * 各H2セクションを作成する.
 * ルート要素の子ノードにH2要素があればH2セクションを作成し、
 * H2要素と後続の子ノードをそのH2セクションの子とする.
 */
function createH2Sections(rootElem) {
  let h2Section = undefined;
  for (const node of Array.from(rootElem.childNodes)) {
    if (node.nodeType === 1 && node.tagName.toLowerCase() === "h2") {
      h2Section = htmlToElem('<section class="h2-section"></section>');
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
function setH2SectionIds(rootElem) {
  rootElem.querySelectorAll(".h2-section").forEach((el) => {
    const h2Title = el.querySelector("h2").innerText;
    const id = h2TitleToId[h2Title];
    if (id === undefined) {
      throw new Error(`Unknown h2 title: ${h2Title}`);
    }
    el.id = id;
  });
}

/**
 * 各H3セクションを作成する.
 * 各H2セクションの子ノードにH3要素があればH3セクションを作成し、
 * H3要素と後続の子ノードをそのH3セクションの子とする.
 */
function createH3Sections(rootElem) {
  const h2Sections = Array.from(rootElem.querySelectorAll(".h2-section"));
  for (const h2Section of h2Sections) {
    let h3Section = undefined;
    for (const node of Array.from(h2Section.childNodes)) {
      if (node.nodeType === 1 && node.tagName.toLowerCase() === "h3") {
        h3Section = htmlToElem('<section class="h3-section"></section>');
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
function setH3SectionIds(rootElem) {
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
function moveH3Sections(rootElem) {
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
function setTitleOnlyClasses(rootElem) {
  rootElem.querySelectorAll(".h3-section").forEach((el) => {
    if (el.querySelector("p") === null) {
      el.classList.add("title-only");
    }
  });
}

/**
 * H1セクションを作成する.
 */
function createH1Section(rootElem) {
  const intro = document.createElement("div");
  // 最初のsectionの手前までのノードを取り出す
  for (const node of Array.from(rootElem.childNodes)) {
    if (node.nodeType === 1 && node.tagName.toLowerCase() === "section") {
      break;
    }
    intro.appendChild(node);
  }
  const h1Section = htmlToElem(
    `<section class="h1-section" id="index">
<h1>${Shared.websiteTitle}</h1>${intro.innerHTML}
</section>`
  );
  rootElem.prepend(h1Section);
}

/**
 * 各セクションの末尾の空行のp要素を削除する.
 */
function removeBlankPsAtEndOfSections(rootElem) {
  rootElem.querySelectorAll("section").forEach((el) => {
    // 末尾の空行のp要素は削除
    el.innerHTML = el.innerHTML.replace(/(<p[^>]*>&nbsp;<\/p>\n)+$/g, "");
  });
}
