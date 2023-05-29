class Builder {
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
    序文: "preface",
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

    this.removeElemsAndDescendants(rootElem, "[class^=MsoToc], br");
    this.removeElems(rootElem, "a, span");
    this.removeUnnecessaryAttrs(rootElem);
    this.removeBlankLines(rootElem);
    this.removeUnnecessaryParagraphs(rootElem);

    this.convertTextIndents(rootElem);
    this.convertImages(rootElem);

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

    const introductionHtml = this.createIntroductionHtml(rootElem);

    const pages = this.createPageData(rootElem);

    const tocHtml = this.createTocHtml(pages);
    const coverHeaderHtml = this.createCoverHeaderHtml();
    const h1SectionHtml = this.createH1SectionHtml(introductionHtml, tocHtml);
    pages[0].html = this.createPageHtml(
      Shared.bookTitle,
      Builder.canonicalHtml,
      coverHeaderHtml,
      h1SectionHtml,
      this.createNextPageLinkHtml(pages[1])
    );

    let h2SectionTitle;
    for (let i = 1; i < pages.length; i++) {
      if (pages[i].html === undefined) {
        continue;
      }
      let pageTitle;
      if (pages[i].level === 2) {
        h2SectionTitle = pages[i].title;
        pageTitle = `${pages[i].title} - ${Shared.bookTitle}`;
      } else {
        pageTitle = `${pages[i].title} - ${h2SectionTitle} - ${Shared.bookTitle}`;
      }
      let nextPage;
      for (let j = i + 1; j < pages.length; j++) {
        if (pages[j].html !== undefined) {
          nextPage = pages[j];
          break;
        }
      }
      const navbarAndHeaderHtml = this.createNavbarAndHeaderHtml(
        `${Shared.bookTitle} - ${h2SectionTitle}`,
        pages[i - 1],
        pages[i],
        nextPage
      );
      pages[i].html = this.createPageHtml(
        pageTitle,
        "",
        navbarAndHeaderHtml,
        pages[i].html,
        this.createNextPageLinkHtml(nextPage)
      );
    }

    return pages;
  }

  htmlToElem(html) {
    const dummy = document.createElement("div");
    dummy.innerHTML = html;
    return dummy.children[0];
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

  removeUnnecessaryAttrs(rootElem) {
    rootElem.querySelectorAll("*").forEach((el) => {
      const textIndent = el.style.textIndent;
      for (const name of el.getAttributeNames()) {
        if (name.toLowerCase() === "alt") {
          // alt属性は削除しない
          continue;
        }
        // それ以外の属性は削除
        el.removeAttribute(name);
      }
      if (textIndent) {
        // style属性のtext-indentのみ復活
        el.style.textIndent = textIndent;
      }
    });
  }

  removeBlankLines(rootElem) {
    rootElem.innerHTML = rootElem.innerHTML.replace(/\n+/g, "\n");
  }

  removeUnnecessaryParagraphs(rootElem) {
    rootElem.innerHTML = rootElem.innerHTML.replace(/<p>\n?<\/p>\n?/g, ""); // 内容のないpを削除
  }

  convertTextIndents(rootElem) {
    rootElem.querySelectorAll("*[style]").forEach((el) => {
      const textIndent = el.style.textIndent;
      if (textIndent && textIndent.endsWith("pt")) {
        // ptを数値で取得
        const pt = Number(textIndent.substring(0, textIndent.length - 2));
        // 10.5ptあたり1remに変換、四捨五入で小数部１桁にする
        const rem = Math.round((pt / 10.5) * 10) / 10;
        el.style.textIndent = `${rem}rem`;
      }
    });
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

  createIntroductionHtml(rootElem) {
    const intro = this.htmlToElem('<div id="introduction"></div>');
    // 最初のsectionの手前までのノードを取り出す
    for (const node of Array.from(rootElem.childNodes)) {
      if (node.nodeType === 1 && node.tagName.toLowerCase() === "section") {
        break;
      }
      intro.appendChild(node);
    }
    // 末尾の空行は削除
    intro.innerHTML = intro.innerHTML.replace(/(<p[^>]*>&nbsp;<\/p>\n)+$/g, "");
    return intro.outerHTML;
  }

  createPageData(rootElem) {
    const pages = Array.from(rootElem.querySelectorAll("h2, h3")).map((el) => {
      const level = Number(el.tagName.substring(1)); // h2->2, h3->3
      const id = el.parentElement.id;
      const title = el.innerText;
      const filename = `${id}.html`;
      const section = el.parentElement;
      const html = section.outerHTML;
      const titleOnly = section.classList.contains("title-only");
      return { level, id, title, filename, html, titleOnly };
    });
    // タイトルのみのセクションがある場合、htmlとfilenameを修正
    for (let i = 0; i < pages.length; i++) {
      if (pages[i].titleOnly) {
        for (let j = i + 1; j < pages.length; j++) {
          pages[i].html += pages[j].html; // 最初のタイトルのみのセクションにhtmlをまとめる
          pages[j].html = undefined;
          pages[j].filename = pages[i].filename; // filenameは全部同じにする
          if (!pages[j].titleOnly) {
            i = j;
            break;
          }
        }
      }
    }
    const indexPage = {
      level: 1,
      id: "index",
      title: "先頭ページ",
      filename: "index.html",
      html: "",
      titleOnly: false,
    };
    pages.splice(0, 0, indexPage);
    return pages;
  }

  createTocHtml(pages) {
    const tocNav = document.createElement("nav");
    tocNav.id = "toc";
    const tocUl = document.createElement("ul");
    tocNav.appendChild(tocUl);
    let curUls = [undefined, undefined, tocUl, undefined];
    let curLevel = 2;
    for (const page of pages) {
      if (page.level === 1) {
        continue; // h1は目次にしない
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
      a.href = page.filename;
      a.id = `toc-${page.id}`;
      a.innerText = page.title;
      li.appendChild(a);
      curUls[curLevel].appendChild(li);
    }
    return tocNav.outerHTML;
  }

  createCoverHeaderHtml() {
    return `
<header class="cover-header">
${Shared.photoCoverHtml}
<div id="website-desc">
本Webサイトは <a href="https://www.amazon.co.jp/dp/B09DX3WVX6/" target="_blank">書籍『${Shared.bookTitle}』(著:${Shared.author})</a> の内容を著者がWeb公開したものです。
</div>
</header>
`;
  }

  createH1SectionHtml(introductionHtml, tocHtml) {
    return `
<section class="h1-section" id="index">
<h1>${Shared.bookTitle}</h1>
${introductionHtml}
${tocHtml}
</section>
`;
  }

  createNavbarAndHeaderHtml(h2SectionTitle, prevPage, curPage, nextPage) {
    return `
<nav class="navbar">
<ul>
<li>
<a href="index.html">≪&nbsp;先頭ページ</a>
</li>
<li>
<a href="index.html#toc-${curPage.id}">目次</a>
</li>
<li>
<a href="${prevPage.filename}">&lt;&nbsp;前ページ</a>
</li>
<li>
${
  nextPage == undefined
    ? ""
    : `<a href="${nextPage.filename}">次ページ&nbsp;&gt;</a>`
}
</li>
</ul>
</nav>
<header>
<div class="h2-section-title">${h2SectionTitle}</div>
</header>
`;
  }

  createNextPageLinkHtml(nextPage) {
    return nextPage === undefined
      ? ""
      : `<a class="next-page" href="${nextPage.filename}">次ページ&nbsp;&gt;&nbsp;${nextPage.title}</a>`;
  }

  createPageHtml(
    title,
    canonicalHtml,
    headerHtml,
    contentHtml,
    nextPageLinkHtml
  ) {
    return `<!DOCTYPE html>
<html lang="ja">
<head>
${Builder.googleAnalyticsHtml}
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${title}</title>
${canonicalHtml}
<link rel="stylesheet" href="style.css">
</head>
<body>
${headerHtml}
<main>
${contentHtml}
</main>
<footer>
${nextPageLinkHtml}
<div class="copyright">${Shared.bookTitle} © 2021 SAKAMACHI HIDEYUKI</div>
<a class="top-of-page" href="#" title="ページ先頭へ">↑</a>
</footer>
</body>
</html>
`;
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
