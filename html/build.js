class Builder {
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
    this.setH3SectionIds(rootElem);
    this.setTitleOnlyClasses(rootElem);

    const tocData = this.createTocData(rootElem);
    const pages = this.createPageData(tocData);

    const introductionHtml = this.createIntroductionHtml(rootElem);
    const tocHtml = this.createTocHtml(tocData);
    const coverHeaderHtml = this.createCoverHeaderHtml();
    const h1SectionHtml = this.createH1SectionHtml(introductionHtml, tocHtml);
    pages[0].html = this.createPageHtml(
      Shared.bookTitle,
      coverHeaderHtml,
      h1SectionHtml,
      this.createNextPageLinkHtml(pages[1])
    );

    rootElem.querySelectorAll(".h2-section").forEach((h2Section, i) => {
      const index = i + 1;
      const curPage = pages[index];
      const prevPage = pages[index - 1];
      const nextPage = index + 1 < pages.length ? pages[index + 1] : null;

      curPage.html = this.createPageHtml(
        `${curPage.title} - ${Shared.bookTitle}`,
        this.createStickyHeaderHtml(prevPage, curPage, nextPage),
        h2Section.outerHTML,
        this.createNextPageLinkHtml(nextPage)
      );
    });

    return pages;
  }

  htmlToElem(html) {
    const dummy = document.createElement("div");
    dummy.innerHTML = html;
    return dummy.children[0];
  }

  removeElemsAndDescendants(rootElem, selector) {
    Array.from(rootElem.querySelectorAll(selector)).forEach((el) =>
      el.parentElement.removeChild(el)
    );
  }

  removeElems(rootElem, selector) {
    Array.from(rootElem.querySelectorAll(selector)).forEach((el) => {
      while (el.firstChild) {
        el.parentElement.insertBefore(el.firstChild, el);
      }
      el.parentElement.removeChild(el);
    });
  }

  removeUnnecessaryAttrs(rootElem) {
    rootElem.querySelectorAll("*").forEach((el) => {
      const textIndent = el.style.textIndent;
      for (const name of el.getAttributeNames()) {
        if (name.toLowerCase() === "alt") {
          continue;
        }
        el.removeAttribute(name);
      }
      if (textIndent) {
        el.style.textIndent = textIndent;
      }
    });
  }

  removeBlankLines(rootElem) {
    rootElem.innerHTML = rootElem.innerHTML.replace(/\n+/g, "\n");
  }

  removeUnnecessaryParagraphs(rootElem) {
    rootElem.innerHTML = rootElem.innerHTML
      .replace(/(<p>\n?<\/p>)+/g, "") // 内容のないpを削除
      .replace(/(<p>&nbsp;<\/p>\n)+/g, "<p>&nbsp;</p>\n"); // 連続空行は１行に
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
      if (html == undefined) {
        throw new Error(`Unknown alt: ${alt}`);
      }
      let ancestor = el.parentElement;
      while (
        ancestor.tagName.toLowerCase() !== "p" &&
        ancestor.tagName.toLowerCase() !== "table"
      ) {
        ancestor = ancestor.parentElement;
      }
      if (html == "") {
        ancestor.parentElement.removeChild(ancestor);
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
    let h2Section = null;
    for (const node of Array.from(rootElem.childNodes)) {
      if (node.nodeType === 1 && node.tagName.toLowerCase() === "h2") {
        h2Section = this.htmlToElem('<section class="h2-section"></section>');
        node.replaceWith(h2Section);
      }
      if (h2Section != null) {
        h2Section.appendChild(node);
      }
    }
  }

  setH2SectionIds(rootElem) {
    rootElem.querySelectorAll(".h2-section").forEach((el) => {
      const h2Title = el.querySelector("h2").innerText;
      const id = Builder.h2TitleToId[h2Title];
      if (id == undefined) {
        throw new Error(`Unknown h2 title: ${h2Title}`);
      }
      el.id = id;
    });
  }

  moveH2SectionImages(rootElem) {
    const h2Sections = Array.from(rootElem.querySelectorAll(".h2-section"));
    let prevH2Section = null;
    for (const h2Section of h2Sections) {
      if (
        prevH2Section != null &&
        prevH2Section.lastElementChild.className === "image-and-text"
      ) {
        h2Section.prepend(prevH2Section.lastElementChild);
      }
      prevH2Section = h2Section;
    }
  }

  createH3Sections(rootElem) {
    const h2Sections = Array.from(rootElem.querySelectorAll(".h2-section"));
    for (const h2Section of h2Sections) {
      let h3Section = null;
      for (const node of Array.from(h2Section.childNodes)) {
        if (node.nodeType === 1 && node.tagName.toLowerCase() === "h3") {
          h3Section = this.htmlToElem('<section class="h3-section"></section>');
          node.replaceWith(h3Section);
        }
        if (h3Section != null) {
          h3Section.appendChild(node);
        }
      }
    }
  }

  setH3SectionIds(rootElem) {
    const h2Sections = Array.from(rootElem.querySelectorAll(".h2-section"));
    for (const h2Section of h2Sections) {
      const h3Sections = Array.from(h2Section.querySelectorAll(".h3-section"));
      let sectionCount = 0;
      let supplementCount = 0;
      for (const h3Section of h3Sections) {
        const h3Title = h3Section.querySelector("h3").innerText;
        if (h3Title.endsWith("まとめ")) {
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

  setTitleOnlyClasses(rootElem) {
    rootElem.querySelectorAll(".h3-section").forEach((el) => {
      if (el.querySelector("p") == null) {
        el.classList.add("title-only");
      }
    });
  }

  createTocData(rootElem) {
    return Array.from(rootElem.querySelectorAll("h2, h3")).map((el) => {
      const level = Number(el.tagName.substring(1) - 1); // h2->1, h3->2
      const id = el.parentElement.id;
      const title = el.innerText;
      const href =
        level === 1 ? `${id}.html` : `${id.replace(/--.*/, ".html")}#${id}`;
      return { level, id, title, href };
    });
  }

  createPageData(tocData) {
    const pages = tocData
      .filter((i) => i.level === 1)
      .map((i) => {
        return { id: i.id, title: i.title, filename: i.href };
      });
    const indexPage = {
      id: "index",
      title: "先頭ページ",
      filename: "index.html",
    };
    pages.splice(0, 0, indexPage);
    return pages;
  }

  createIntroductionHtml(rootElem) {
    const intro = this.htmlToElem('<div id="introduction"></div>');
    for (const node of Array.from(rootElem.childNodes)) {
      if (node.nodeType === 1 && node.tagName.toLowerCase() === "section") {
        break;
      }
      intro.appendChild(node);
    }
    return intro.outerHTML;
  }

  createTocHtml(tocData) {
    const tocNav = document.createElement("nav");
    tocNav.id = "toc";
    const tocUl = document.createElement("ul");
    tocNav.appendChild(tocUl);
    let curUls = [null, tocUl, null];
    let curLevel = 1;
    for (const toc of tocData) {
      if (toc.level == curLevel) {
      } else if (toc.level == curLevel + 1) {
        const newUl = document.createElement("ul");
        curUls[curLevel].lastElementChild.appendChild(newUl);
        curUls[toc.level] = newUl;
        curLevel = toc.level;
      } else if (toc.level < curLevel) {
        curLevel = toc.level;
      } else {
        throw new Error();
      }
      const li = document.createElement("li");
      const a = document.createElement("a");
      a.href = toc.href;
      a.id = `toc-${toc.id}`;
      a.innerText = toc.title;
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
本Webサイトは<a href="https://www.amazon.co.jp/dp/B09DX3WVX6/" target="_blank">書籍『${Shared.bookTitle}』(著:坂町英之)</a>の内容を著者がWeb公開したものです。
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

  createNextPageLinkHtml(nextPage) {
    return nextPage == null
      ? ""
      : `
<div class="next-page">
<a href="${nextPage.filename}">≫&nbsp;次ページ: ${nextPage.title}</a>
</div>
`;
  }

  createStickyHeaderHtml(prevPage, curPage, nextPage) {
    return `
<header class="sticky-header">
<nav>
<ul>
<li>
<a href="index.html">先頭ページ</a>
</li>
<li>
<a href="index.html#toc-${curPage.id}">目次</a>
</li>
<li>
${prevPage == null ? "" : `<a href="${prevPage.filename}">前ページ&nbsp;≪</a>`}
</li>
<li>
${nextPage == null ? "" : `<a href="${nextPage.filename}">≫&nbsp;次ページ</a>`}
</li>
</ul>
</nav>
</header>
`;
  }

  createPageHtml(title, headerHtml, contentHtml, nextPageLinkHtml) {
    return `<!DOCTYPE html>
<html lang="ja">
<head>
${Builder.googleAnalyticsHtml}
<meta charset="UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${title}</title>
<link rel="stylesheet" href="style.css">
</head>
<body>
${headerHtml}
<main>
${contentHtml}
${nextPageLinkHtml}
</main>
<footer>
<div class="copyright">© 2021 Sakamachi Hideyuki</div>
<a class="top-of-page" href="#" title="ページ先頭へ">↑</a>
</footer>
</body>
</html>
`;
  }
}

document.getElementById("buildButton").addEventListener("click", (ev) => {
  const inputIframe = document.getElementById("inputIframe");
  const inputElem =
    inputIframe.contentWindow.document.querySelector("body>div");
  const inputHtml = inputElem.innerHTML;

  const pages = new Builder().build(inputHtml);

  const outputElem = document.getElementById("outputElem");

  pages.forEach((page) => {
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
