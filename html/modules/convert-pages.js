import {
  changeTagNames,
  htmlToElem,
  removeElems,
  removeElemsAndDescendants,
} from "./dom-utils.js";

// 利用しているclass属性の一覧
const availableClasses = [
  "bquote",
  "bquote-pl",
  "desc",
  "heading",
  "list-1",
  "list-1c",
  "list-1s",
  "list-2",
  "list-3",
  "small",
];

// h1タイトルからLevel1セクションidへの対応表
const h1TitleToLevel1SectionId = {
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

/**
 * Word文書の原稿をWebページ(フィルター後)形式で保存したHTMLをWeb公開用に変換する.
 * 不要な要素や属性、空行などを削除し、画像をWeb用に置換し、セクション分けを行う.
 * @param {string} html 変換前のHTML文字列
 * @return {string} 変換後のHTML文字列
 */
export function convertPages(html) {
  const rootElem = document.createElement("div");
  rootElem.innerHTML = html;

  // 目次、br要素、各項見出しの前の章名を削除
  removeElemsAndDescendants(rootElem, "[class^=MsoToc], br, p.chapter");
  // リンク、span要素(class="small"以外)、太字見出し中のb要素を削除（配下ノードは残す）
  removeElems(rootElem, "a[href], span:not(.small), p.heading b");
  removeUnnecessaryAttrs(rootElem);

  convertBlankPs(rootElem);
  replaceImages(rootElem);

  createLevel1Sections(rootElem);
  setLevel1SectionIds(rootElem);

  createLevel2Sections(rootElem);
  setLevel2SectionIds(rootElem);
  moveLevel2Sections(rootElem);
  setTitleOnlyClasses(rootElem);

  createLevel0Section(rootElem);
  removeBlankPsAtEndOfSections(rootElem);

  changeTagNames(rootElem, "h2", "h1");
  changeTagNames(rootElem, "p.heading", "h2");
  changeTagNames(rootElem, "p.bquote, p.bquote-pl", "blockquote");

  // 空行（改行コードのみの行）を削除
  return rootElem.innerHTML.replace(/\n+/g, "\n").replace(/^\n/, "");
}

/**
 * 不要な属性を削除する.
 * alt属性、name属性は削除しない.
 * class属性は利用しているものだけ削除しない.
 * それ以外の属性はすべて削除する.
 * @param {Element} rootElem ルート要素
 */
function removeUnnecessaryAttrs(rootElem) {
  rootElem.querySelectorAll("*").forEach((el) => {
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
  });
}

/**
 * 空行のp要素をclass属性が"blank"、style属性なしに変換する.
 * @param {Element} rootElem ルート要素
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
 * 電子書籍用画像をWeb用画像に置換する.
 * @param {Element} rootElem ルート要素
 */
function replaceImages(rootElem) {
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
 * 各Level1セクションを作成する.
 * ルート要素の子ノードにh1要素があればLevel1セクションを作成し、
 * h1要素と後続の子ノードをそのLevel1セクションの子とする.
 * @param {Element} rootElem ルート要素
 */
function createLevel1Sections(rootElem) {
  let level1Section = undefined;
  for (const node of Array.from(rootElem.childNodes)) {
    if (node.nodeType === 1 && node.tagName.toLowerCase() === "h1") {
      level1Section = htmlToElem('<section class="level1-section"></section>');
      node.replaceWith(level1Section);
    }
    if (level1Section !== undefined) {
      level1Section.appendChild(node);
    }
  }
}

/**
 * 各Level1セクションのidを設定する.
 * h1のタイトルに対応するidとする.
 * @param {Element} rootElem ルート要素
 */
function setLevel1SectionIds(rootElem) {
  rootElem.querySelectorAll(".level1-section").forEach((el) => {
    const h1Title = el.querySelector("h1").innerText;
    const id = h1TitleToLevel1SectionId[h1Title];
    if (id === undefined) {
      throw new Error(`Unknown h1 title: ${h1Title}`);
    }
    el.id = id;
  });
}

/**
 * 各Level2セクションを作成する.
 * 各Level1セクションの子ノードにh2要素があればLevel2セクションを作成し、
 * h2要素と後続の子ノードをそのLevel2セクションの子とする.
 * @param {Element} rootElem ルート要素
 */
function createLevel2Sections(rootElem) {
  const level1Sections = Array.from(
    rootElem.querySelectorAll(".level1-section"),
  );
  for (const level1Section of level1Sections) {
    let level2Section = undefined;
    for (const node of Array.from(level1Section.childNodes)) {
      if (node.nodeType === 1 && node.tagName.toLowerCase() === "h2") {
        level2Section = htmlToElem(
          '<section class="level2-section"></section>',
        );
        node.replaceWith(level2Section);
      }
      if (level2Section !== undefined) {
        level2Section.appendChild(node);
      }
    }
  }
}

/**
 * 各Level2セクションのidを設定する.
 * @param {Element} rootElem ルート要素
 */
function setLevel2SectionIds(rootElem) {
  const level1Sections = Array.from(
    rootElem.querySelectorAll(".level1-section"),
  );
  for (const level1Section of level1Sections) {
    const level2Sections = Array.from(
      level1Section.querySelectorAll(".level2-section"),
    );
    let sectionCount = 0;
    let supplementCount = 0;
    for (const level2Section of level2Sections) {
      const h2Title = level2Section.querySelector("h2").innerText;
      if (h2Title === "その他の神") {
        level2Section.id = `${level1Section.id}--section-o`;
      } else if (h2Title.endsWith("まとめ")) {
        level2Section.id = `${level1Section.id}--summary`;
      } else if (h2Title.startsWith("補足")) {
        supplementCount++;
        level2Section.id = `${level1Section.id}--supplement-${supplementCount}`;
      } else {
        sectionCount++;
        level2Section.id = `${level1Section.id}--section-${sectionCount}`;
      }
    }
  }
}

/**
 * 各Level2セクションをLevel1セクションの子要素からそのLevel1セクションの弟要素に移動する.
 * Level1セクションもLevel2セクションもそれぞれHTMLの1ページとするため、
 * Level1セクション内からLevel2セクションを分離する.
 * @param {Element} rootElem ルート要素
 */
function moveLevel2Sections(rootElem) {
  const level1Sections = Array.from(
    rootElem.querySelectorAll(".level1-section"),
  );
  for (const level1Section of level1Sections) {
    const level2Sections = Array.from(
      level1Section.querySelectorAll(".level2-section"),
    );
    const nextLevel1Section = level1Section.nextElementSibling;
    for (const level2Section of level2Sections) {
      nextLevel1Section.before(level2Section);
    }
  }
}

/**
 * 配下にp要素がないLevel2セクションには "title-only" という class 属性を付ける.
 * @param {Element} rootElem ルート要素
 */
function setTitleOnlyClasses(rootElem) {
  rootElem.querySelectorAll(".level2-section").forEach((el) => {
    if (el.querySelector("p") === null) {
      el.classList.add("title-only");
    }
  });
}

/**
 * Level0セクションを作成する.
 * ルート要素の最初のsection要素の手前までのノードを
 * Level0セクションの子ノードとする.
 * Level0セクションのタイトルはWebサイトのタイトルとする.
 * @param {Element} rootElem ルート要素
 */
function createLevel0Section(rootElem) {
  const intro = document.createElement("div");
  // 最初のsectionの手前までのノードを取り出す
  for (const node of Array.from(rootElem.childNodes)) {
    if (node.nodeType === 1 && node.tagName.toLowerCase() === "section") {
      break;
    }
    intro.appendChild(node);
  }
  // 先頭の<p>の手前までのノードは削除
  while (true) {
    const node = intro.firstChild;
    if (
      node.nodeType === 1 &&
      node.tagName.toLowerCase() === "p" &&
      !node.hasAttribute("class")
    ) {
      break;
    }
    node.remove();
  }
  const h1Section = htmlToElem(
    `<section class="level0-section" id="index">
<h1>${Shared.websiteTitle}</h1>
<p class="blank">&nbsp;</p>
${intro.innerHTML}
</section>`,
  );
  rootElem.prepend(h1Section);
}

/**
 * 各セクションの末尾の空行のp要素を削除する.
 * @param {Element} rootElem ルート要素
 */
function removeBlankPsAtEndOfSections(rootElem) {
  rootElem.querySelectorAll("section").forEach((el) => {
    // 末尾の空行のp要素は削除
    el.innerHTML = el.innerHTML.replace(/(<p[^>]*>&nbsp;<\/p>\n+)+$/g, "");
  });
}
