class Builder {
  static amazonUrl = "https://www.amazon.co.jp/dp/B09DX3WVX6/";

  static canonicalHtml =
    '<link rel="canonical" href="https://sakamachi-hideyuki.github.io/meteors/">';

  static googleAnalyticsHtml = `
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-45DHNXBNFZ"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-45DHNXBNFZ');
</script>
`;

  static h2TitleToId = {
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

  build(inputHtml) {
    const rootElem = document.createElement("div");
    rootElem.innerHTML = inputHtml;

    const oldLinks = this.getOldLinks(rootElem);
    this.removeElemsAndDescendants(rootElem, "[class^=MsoToc], br");
    this.removeElems(rootElem, 'a[href], a[name^="_Toc"], span');
    this.convertClass(rootElem);
    this.removeUnnecessaryAttrs(rootElem);

    this.convertToRem(rootElem);
    this.convertImages(rootElem);

    this.removeBlankLines(rootElem);
    this.removeUnnecessaryParagraphs(rootElem);

    this.changeTagNames(rootElem, "h3", "h4");
    this.changeTagNames(rootElem, "h2", "h3");
    this.changeTagNames(rootElem, "h1", "h2");

    this.createH2Sections(rootElem);
    this.setH2SectionIds(rootElem);
    this.moveH2SectionImages(rootElem);

    this.createH3Sections(rootElem);
    this.setH3SectionIdsAndClasses(rootElem);
    this.moveH3Sections(rootElem);
    this.removeBlankLinesAtEndOfSections(rootElem);
    this.setTitleOnlyClasses(rootElem);

    const pages = this.createPages(rootElem);
    this.combineTitleOnlyPages(pages);
    this.createLinks(pages);
    this.createPageHtmls(pages);

    console.log("pages:");
    console.log(pages);

    this.validateLinks(oldLinks, pages);

    return pages;
  }

  getOldLinks(rootElem) {
    const oldLinks = [];
    Array.from(rootElem.querySelectorAll("a[href]")).forEach((el) => {
      const href = el.getAttribute("href");
      if (!href.startsWith("#") || href.startsWith("#_Toc")) {
        return;
      }
      const link = { href, text: el.innerText };
      oldLinks.push(link);
    });
    return oldLinks;
  }

  removeElemsAndDescendants(rootElem, selector) {
    Array.from(rootElem.querySelectorAll(selector)).forEach((el) => {
      el.remove();
    });
  }

  removeElems(rootElem, selector) {
    Array.from(rootElem.querySelectorAll(selector)).forEach((el) => {
      while (el.firstChild) {
        el.parentElement.insertBefore(el.firstChild, el);
      }
      el.remove();
    });
  }

  convertClass(rootElem) {
    rootElem.querySelectorAll("*").forEach((el) => {
      if (el.tagName.toLowerCase() === "p" && el.innerText === "\u00A0") {
        // 空行
        el.setAttribute("class", "blank-line");
      } else if (
        el.className === "par" ||
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

  removeUnnecessaryAttrs(rootElem) {
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

  convertToRem(rootElem) {
    rootElem.querySelectorAll("*[style]").forEach((el) => {
      if (el.style.textIndent) {
        el.style.textIndent = this.toRem(el.style.textIndent);
      }
    });
  }

  toRem(str) {
    // pt/mmを数値で取得
    const pt = Number(str.substring(0, str.length - 2));
    if (pt === 0) {
      // 0mmの場合
      return "0rem";
    }
    // 10.5ptあたり1remに変換、四捨五入で小数部１桁にする
    const rem = Math.round((pt / 10.5) * 10) / 10;
    return `${rem}rem`;
  }

  convertImages(rootElem) {
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
        const newElem = this.htmlToElem(html);
        ancestor.replaceWith(newElem);
      }
    });
  }

  removeBlankLines(rootElem) {
    rootElem.innerHTML = rootElem.innerHTML.replace(/\n+/g, "\n");
  }

  removeUnnecessaryParagraphs(rootElem) {
    // 内容のないpを削除
    rootElem.innerHTML = rootElem.innerHTML.replace(/<p[^>]*>\n?<\/p>\n?/g, "");
  }

  changeTagNames(rootElem, oldTagName, newTagName) {
    Array.from(rootElem.querySelectorAll(oldTagName)).forEach((oldTag) => {
      const newTag = document.createElement(newTagName);
      while (oldTag.firstChild) {
        newTag.appendChild(oldTag.firstChild);
      }
      oldTag.replaceWith(newTag);
    });
  }

  createH2Sections(rootElem) {
    let h2Section = undefined;
    for (const node of Array.from(rootElem.childNodes)) {
      if (node.nodeType === 1 && node.tagName.toLowerCase() === "h2") {
        h2Section = this.htmlToElem('<section class="h2-section"></section>');
        node.replaceWith(h2Section);
      }
      if (h2Section !== undefined) {
        h2Section.appendChild(node);
      }
    }
  }

  setH2SectionIds(rootElem) {
    rootElem.querySelectorAll(".h2-section").forEach((el) => {
      const h2Title = el.querySelector("h2").innerText;
      const id = Builder.h2TitleToId[h2Title];
      if (id === undefined) {
        throw new Error(`Unknown h2 title: ${h2Title}`);
      }
      el.id = id;
    });
  }

  moveH2SectionImages(rootElem) {
    const h2Sections = Array.from(rootElem.querySelectorAll(".h2-section"));
    let prevH2Section = undefined;
    for (const h2Section of h2Sections) {
      if (
        prevH2Section !== undefined &&
        prevH2Section.lastElementChild.className === "image-and-caption"
      ) {
        h2Section.prepend(prevH2Section.lastElementChild);
      }
      prevH2Section = h2Section;
    }
  }

  createH3Sections(rootElem) {
    const h2Sections = Array.from(rootElem.querySelectorAll(".h2-section"));
    for (const h2Section of h2Sections) {
      let h3Section = undefined;
      for (const node of Array.from(h2Section.childNodes)) {
        if (node.nodeType === 1 && node.tagName.toLowerCase() === "h3") {
          h3Section = this.htmlToElem('<section class="h3-section"></section>');
          node.replaceWith(h3Section);
        }
        if (h3Section !== undefined) {
          h3Section.appendChild(node);
        }
      }
    }
  }

  setH3SectionIdsAndClasses(rootElem) {
    const h2Sections = Array.from(rootElem.querySelectorAll(".h2-section"));
    for (const h2Section of h2Sections) {
      const h3Sections = Array.from(h2Section.querySelectorAll(".h3-section"));
      let sectionCount = 0;
      let supplementCount = 0;
      for (const h3Section of h3Sections) {
        const h3Title = h3Section.querySelector("h3").innerText;
        if (h3Title.endsWith("まとめ")) {
          h3Section.id = `${h2Section.id}--summary`;
          h3Section.classList.add("summary");
        } else if (h3Title.startsWith("補足")) {
          supplementCount++;
          h3Section.id = `${h2Section.id}--supplement-${supplementCount}`;
          h3Section.classList.add("supplement");
        } else {
          sectionCount++;
          h3Section.id = `${h2Section.id}--section-${sectionCount}`;
          h3Section.classList.add("section");
        }
      }
    }
  }

  moveH3Sections(rootElem) {
    const h2Sections = Array.from(rootElem.querySelectorAll(".h2-section"));
    for (const h2Section of h2Sections) {
      const h3Sections = Array.from(h2Section.querySelectorAll(".h3-section"));
      const nextH2Section = h2Section.nextElementSibling;
      for (const h3Section of h3Sections) {
        nextH2Section.before(h3Section);
      }
    }
  }

  removeBlankLinesAtEndOfSections(rootElem) {
    rootElem.querySelectorAll("section").forEach((el) => {
      // 末尾の空行は削除
      el.innerHTML = el.innerHTML.replace(/(<p[^>]*>&nbsp;<\/p>\n+)+$/g, "");
    });
  }

  setTitleOnlyClasses(rootElem) {
    rootElem.querySelectorAll(".h3-section").forEach((el) => {
      if (el.querySelector("p") === null) {
        el.classList.add("title-only");
      }
    });
  }

  createPages(rootElem) {
    const pages = [];

    const tocPage = {
      level: 1,
      id: "toc",
      title: "目次",
      h2Title: "",
      h3Title: "",
      filename: "toc.html",
      contentHtml: undefined,
      titleOnly: false,
      anchorName: undefined,
    };
    pages.push(tocPage);

    const introductionHtml = this.createIntroductionHtml(rootElem);
    const indexPage = {
      level: 2,
      id: "index",
      title: "先頭ページ",
      h2Title: "",
      h3Title: "",
      filename: "index.html",
      contentHtml: introductionHtml,
      titleOnly: false,
      anchorName: undefined,
    };
    pages.push(indexPage);

    const els = Array.from(rootElem.querySelectorAll("h2, h3"));
    let h2Title = "";
    for (const el of els) {
      const anchorName = el.querySelector("a")?.getAttribute("name");
      const section = el.parentElement;
      this.removeElems(section, "a[name]");
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
      const titleOnly = section.classList.contains("title-only");
      const page = {
        level,
        id,
        title,
        h2Title,
        h3Title,
        filename,
        contentHtml,
        titleOnly,
        anchorName,
      };
      pages.push(page);
    }
    return pages;
  }

  createIntroductionHtml(rootElem) {
    const intro = document.createElement("div");
    // 最初のsectionの手前までのノードを取り出す
    for (const node of Array.from(rootElem.childNodes)) {
      if (node.nodeType === 1 && node.tagName.toLowerCase() === "section") {
        break;
      }
      intro.appendChild(node);
    }
    // 末尾の空行は削除
    intro.innerHTML = intro.innerHTML.replace(/(<p[^>]*>&nbsp;<\/p>\n)+$/g, "");
    return intro.innerHTML;
  }

  combineTitleOnlyPages(pages) {
    // タイトルのみのセクションがある場合、htmlとfilenameを修正
    for (let i = 0; i < pages.length; i++) {
      if (pages[i].titleOnly) {
        for (let j = i + 1; j < pages.length; j++) {
          pages[i].contentHtml += pages[j].contentHtml; // 最初のタイトルのみのセクションにcontentHtmlをまとめる
          pages[j].contentHtml = undefined;
          pages[j].filename = pages[i].filename; // filenameは全部同じにする
          if (!pages[j].titleOnly) {
            i = j;
            break;
          }
        }
      }
    }
  }

  createLinks(pages) {
    const preface = pages.find((p) => p.id === "preface");
    const appendix = pages.find((p) => p.id === "appendix");
    for (let i = 0; i < pages.length; i++) {
      const page = pages[i];
      // タイトルのみのセクションや改版履歴のページはスキップ
      if (page.contentHtml === undefined || page.id === "revision-history") {
        continue;
      }
      // "「序文」"をリンク化
      page.contentHtml = page.contentHtml.replaceAll(/「序文」/g, (s) => {
        return `<a href="${preface.filename}">${s}</a>`;
      });
      // "付録参照"をリンク化
      page.contentHtml = page.contentHtml.replaceAll(/付録参照/g, (s) => {
        return `<a href="${appendix.filename}">${s}</a>`;
      });
      // 「付録　神名末尾のパターン」以外のページでは"神名末尾のパターン"をリンク化
      if (page.id !== "appendix") {
        page.contentHtml = page.contentHtml.replace(
          /神名末尾のパターン/,
          (s) => {
            return `<a href="${appendix.filename}">${s}</a>`;
          }
        );
      }
      // "「～の章)」～の項"をリンク化
      page.contentHtml = page.contentHtml.replaceAll(
        /「([^<>「」]+の章)」([^<>「」項]+)の項/g,
        (s, p1, p2) => {
          const index = p2.indexOf("、");
          if (index !== -1) {
            p2 = p2.substring(0, index);
          }
          const target = pages.find(
            (p) => p.h2Title === p1 && p.h3Title === p2
          );
          if (target === undefined) {
            console.error(`createLinks: ${s} not found.`);
            return s;
          }
          return `<a href="${target.filename}">${s}</a>`;
        }
      );
      // "本章の～の項"をリンク化
      page.contentHtml = page.contentHtml.replaceAll(
        /本章の([^<>「」項]+)の項/g,
        (s, p1) => {
          const index = p1.indexOf("、");
          if (index !== -1) {
            p1 = p1.substring(0, index);
          }
          const target = pages.find(
            (p) => p.h2Title === page.h2Title && p.h3Title === p1
          );
          if (target === undefined) {
            console.error(`createLinks: ${s} not found.`);
            return s;
          }
          return `<a href="${target.filename}">${s}</a>`;
        }
      );
      // "「～の章」で"をリンク化
      page.contentHtml = page.contentHtml.replaceAll(
        /「([^<>「」]+の章)」で/g,
        (s, p1) => {
          const target = pages.find(
            (p) => p.h2Title === p1 && p.h3Title === ""
          );
          if (target === undefined) {
            console.error(`createLinks: ${s} not found.`);
            return s;
          }
          return `<a href="${target.filename}">「${p1}」</a>で`;
        }
      );
      // "本章冒頭"をリンク化
      page.contentHtml = page.contentHtml.replaceAll(/本章冒頭/g, (s) => {
        const target = pages.find(
          (p) => p.h2Title === page.h2Title && p.h3Title === ""
        );
        if (target === undefined) {
          console.error(`createLinks: ${s} not found.`);
          return s;
        }
        return `<a href="${target.filename}">${s}</a>`;
      });
      // "前項"をリンク化
      page.contentHtml = page.contentHtml.replaceAll(/前項/g, (s) => {
        const target = pages[i - 1];
        return `<a href="${target.filename}">${s}</a>`;
      });
      // "次項"をリンク化
      page.contentHtml = page.contentHtml.replaceAll(/次項/g, (s) => {
        const target = pages[i + 1];
        return `<a href="${target.filename}">${s}</a>`;
      });
      // "「補足　～」"をリンク化
      page.contentHtml = page.contentHtml.replaceAll(
        /「(補足　[^<>「」]+)」/g,
        (s, p1) => {
          const target = pages.find((p) => p.h3Title === p1);
          if (target === undefined) {
            console.error(`createLinks: ${s} not found.`);
            return s;
          }
          return `<a href="${target.filename}">${s}</a>`;
        }
      );
    }
  }

  createPageHtmls(pages) {
    pages[0].html = this.createTocHtml(pages);

    pages[1].html = this.createIndexHtml(
      pages[1],
      this.createNavbarHtml(undefined, pages[1], pages[2]),
      this.createNextPageLinkHtml(pages[2])
    );

    for (let i = 2; i < pages.length; i++) {
      if (pages[i].contentHtml === undefined) {
        continue;
      }
      let nextPage = undefined;
      for (let j = i + 1; j < pages.length; j++) {
        if (pages[j].contentHtml !== undefined) {
          nextPage = pages[j];
          break;
        }
      }
      pages[i].html = this.createPageHtml(
        pages[i],
        this.createNavbarHtml(pages[i - 1], pages[i], nextPage),
        this.createNextPageLinkHtml(nextPage)
      );
    }
  }

  createTocHtml(pages) {
    const tocUl = document.createElement("ul");
    let curUls = [undefined, undefined, tocUl, undefined];
    let curLevel = 2;
    for (const page of pages) {
      if (page.level === 1) {
        continue; // 目次ページは目次に入れない
      } else if (page.level === curLevel) {
      } else if (page.level === curLevel + 1) {
        const newUl = document.createElement("ul");
        curUls[curLevel].lastElementChild.appendChild(newUl);
        curUls[page.level] = newUl;
        curLevel = page.level;
      } else if (page.level < curLevel) {
        curLevel = page.level;
      } else {
        throw new Error();
      }
      const li = document.createElement("li");
      const a = document.createElement("a");
      a.href = page.filename === "index.html" ? "./" : page.filename;
      a.id = `toc-${page.id}`;
      a.innerText = page.title;
      li.appendChild(a);
      curUls[curLevel].appendChild(li);
      curUls[curLevel].appendChild(document.createTextNode("\n"));
    }
    return `<!DOCTYPE html>
<html lang="ja" id="html-toc">
<head>
${Builder.googleAnalyticsHtml}
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>目次 - ${Shared.bookTitle}</title>
<link rel="stylesheet" href="style.css">
</head>
<body>
<header>
<div class="h1-title">${Shared.bookTitle}</div>
</header>
<main>
<h2>目次</h2>
<nav id="toc">
${tocUl.outerHTML}
</nav>
</main>
<footer>
<div id="copyright">© 2021 SAKAMACHI HIDEYUKI</div>
</footer>
</body>
</html>
`;
  }

  createIndexHtml(page, navbarHtml, nextPageLinkHtml) {
    return `<!DOCTYPE html>
<html lang="ja" id="html-${page.id}">
<head>
${Builder.googleAnalyticsHtml}
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${Shared.bookTitle}</title>
${Builder.canonicalHtml}
<link rel="stylesheet" href="style.css">
</head>
<body>
${navbarHtml}
<header>
${Shared.photoCoverHtml}
<div id="website-desc">
本Webサイトは <a href="${Builder.amazonUrl}" target="_blank">書籍『${Shared.bookTitle}』(著:${Shared.author})</a> の内容を著者がWeb公開したものです。
</div>
</header>
<main>
<section class="h1-section" id="index">
<h1>${Shared.bookTitle}</h1>
${page.contentHtml}
</section>
${nextPageLinkHtml}
</main>
<footer>
<div id="copyright">© 2021 SAKAMACHI HIDEYUKI</div>
</footer>
</body>
</html>
`;
  }

  createPageHtml(page, navbarHtml, nextPageLinkHtml) {
    const documentTitle = this.createDocumentTitle(page.h2Title, page.h3Title);
    const h2TitleDiv =
      page.h3Title === "" ? "" : `<div class="h2-title">${page.h2Title}</div>`;
    return `<!DOCTYPE html>
<html lang="ja" id="html-${page.id}">
<head>
${Builder.googleAnalyticsHtml}
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${documentTitle}</title>
<link rel="stylesheet" href="style.css">
</head>
<body>
${navbarHtml}
<header>
<div class="h1-title">${Shared.bookTitle}</div>
${h2TitleDiv}
</header>
<main>
${page.contentHtml}
${nextPageLinkHtml}
</main>
<footer>
<div id="copyright">© 2021 SAKAMACHI HIDEYUKI</div>
</footer>
</body>
</html>
`;
  }

  createDocumentTitle(h2Title, h3Title) {
    if (h3Title === "") {
      return `${h2Title} - ${Shared.bookTitle}`;
    } else if (h3Title.endsWith("まとめ") || h3Title.startsWith("補足")) {
      return `${h3Title} - ${Shared.bookTitle}`;
    } else {
      return `${h2Title}　${h3Title} - ${Shared.bookTitle}`;
    }
  }

  createNavbarHtml(prevPage, curPage, nextPage) {
    return `<nav id="navbar">
<ul>
<li>
${
  prevPage === undefined
    ? ""
    : `<a href="${
        prevPage.filename === "index.html" ? "./" : prevPage.filename
      }">&lt;&nbsp;前ページ</a>`
}
</li>
<li>
<a href="toc.html#toc-${curPage.id}">目次</a>
</li>
<li>
${
  nextPage === undefined
    ? ""
    : `<a href="${nextPage.filename}">次ページ&nbsp;&gt;</a>`
}
</li>
</ul>
</nav>`;
  }

  createNextPageLinkHtml(nextPage) {
    return nextPage === undefined
      ? ""
      : `<a id="next-page" href="${nextPage.filename}">次ページ&nbsp;&gt;&nbsp;${nextPage.title}</a>`;
  }

  validateLinks(oldLinks, pages) {
    this.convertHref(oldLinks, pages);
    const newLinks = this.getNewLinks(pages);

    console.log("oldLinks:");
    console.log(oldLinks);
    console.log("newLinks:");
    console.log(newLinks);
    const len = Math.max(oldLinks.length, newLinks.length);
    for (let i = 0; i < len; i++) {
      const oldLink = oldLinks[i];
      const newLink = newLinks[i];
      const oldLinkJson = JSON.stringify(oldLink);
      const newLinkJson = JSON.stringify(newLink);
      if (
        oldLink === undefined ||
        newLink === undefined ||
        oldLink.href !== newLink.href ||
        oldLink.text !== newLink.text
      ) {
        throw new Error(
          `link unmatch: i=${i} oldLinkJson=${oldLinkJson}, newLinkJson=${newLinkJson}`
        );
      }
    }
  }

  convertHref(oldLinks, pages) {
    oldLinks.forEach((link) => {
      const anchorName = link.href.substring(1);
      const page = pages.find((p) => p.anchorName === anchorName);
      link.href = page.filename;
    });
  }

  getNewLinks(pages) {
    const newLinks = [];
    pages.forEach((page) => {
      if (page.contentHtml === undefined) {
        return;
      }
      const elem = document.createElement("div");
      elem.innerHTML = page.contentHtml;
      Array.from(elem.querySelectorAll("a[href]")).forEach((el) => {
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

  htmlToElem(html) {
    const dummy = document.createElement("div");
    dummy.innerHTML = html;
    return dummy.children[0];
  }
}

document.getElementById("buildButton").addEventListener("click", () => {
  const inputIframe = document.getElementById("inputIframe");
  const inputElem =
    inputIframe.contentWindow.document.querySelector("body>div");
  const inputHtml = inputElem.innerHTML;

  const pages = new Builder().build(inputHtml);

  const outputElem = document.getElementById("outputElem");
  outputElem.innerHTML = "";

  pages
    .filter((page) => page.html !== undefined)
    .forEach((page) => {
      const dataUrl =
        "data:text/html;charset=UTF-8," + encodeURIComponent(page.html);
      const p = document.createElement("p");
      const a = document.createElement("a");
      a.href = dataUrl;
      a.download = page.filename;
      a.innerText = page.filename;
      p.appendChild(a);
      outputElem.appendChild(p);
    });
});

document.getElementById("saveButton").addEventListener("click", () => {
  const links = document.querySelectorAll("a[download]");
  Array.from(links).forEach((el) => el.click());
});
